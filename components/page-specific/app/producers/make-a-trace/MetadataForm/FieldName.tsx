import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { ButtonGroup, IconButton, Flex, Input, Text, Tag, HStack } from "@chakra-ui/react";
import { debug } from "console";
import React from "react";
import { ReactNode } from "react";
import Debug from "../../../../../../utils/Debug";


export type FieldNameTag = "required" | "suggested" | undefined

export interface FieldNameProps
{
    defaultValue: string

    editable?: boolean
    
    canEditTo?: (newName: string, prevName?: string) => boolean
    onNameEdit?: (newName: string, prevName?: string) => void

    tag: FieldNameTag
}


interface FieldNameState
{
    isEditing: boolean
    fieldName: string
    prevName: string
}

export default class FieldName extends React.Component<FieldNameProps, FieldNameState>
{
    private _canEditTo: ( newName: string, oldName: string ) => boolean

    private _editingInputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>(); 

    constructor( props: FieldNameProps)
    {
        super( props );

        this._canEditTo = this.props.canEditTo ?? ((_new,_old) => true);

        this.state = {
            isEditing: false,
            fieldName: this.props.defaultValue,
            prevName:  this.props.defaultValue,
        }

        this._updateName = this._updateName.bind(this)

        this._inputFocusEventHandler = this._inputFocusEventHandler.bind(this); 

        this._editAndSubmit = this._editAndSubmit.bind( this );
        this._submit = this._submit.bind(this);
        this._revert = this._revert.bind(this);
    }

    render(): ReactNode
    {
        if( this.state.isEditing )
        {

            return (
                <HStack
                style={{
                    margin: "12px"
                }}
                >
                    {
                        this.props.tag !== undefined &&
                        <Tag
                        variant={this.props.tag === "required" ? "solid" : "subtle"}
                        size="sm"
                        colorScheme={this.props.tag === "required" ? "blue" : "green"}
                        >
                            {this.props.tag}
                        </Tag>
                    }
                    <Input
                    ref={this._editingInputRef}
                    mr={2}
                    defaultValue={this.state.fieldName}
                    onChange={(evt: { target: { value: string; }; }) => this._updateName( evt.target.value ) }
                    width="12vw"
                    fontWeight="black"
                    fontSize="lg"

                    onFocus={() => {
                        window.addEventListener(
                            "keydown", this._inputFocusEventHandler
                        );
                    }}
                    onBlur={ () => {
                        window.removeEventListener("keydown", this._inputFocusEventHandler )
                    }}

                    />
                    <ButtonGroup justifyContent='center' size='sm' >
                        <SubmitButton 
                        isDisabled={ this.state.fieldName === this.state.prevName || !this._canEditTo( this.state.fieldName, this.state.prevName )}
                        onClick={this._editAndSubmit}
                        />
                        <DismissButton
                        onClick={this._revert}
                        />
                    </ButtonGroup>
                </HStack>
            )
        }

        else
        {
            return (
                <Flex
                style={{
                    margin: "12px"
                }}
                >
                    {
                        this.props.tag !== undefined &&
                        <Tag
                        variant={this.props.tag === "required" ? "solid" : "subtle"}
                        size="sm"
                        colorScheme={this.props.tag === "required" ? "blue" : "green"}
                        >
                            {this.props.tag}
                        </Tag>
                    }
                    <Text 
                    margin="0 5px 0 8px"
                    width="fit-content"
                    fontWeight="black"
                    fontSize="lg"
                    >
                        {this.state.fieldName}
                    </Text>
                    {
                        (this.props.editable == true) &&
                        <EditButton
                        mr="5px"
                        onClick={ () => {
                            this.setState({
                                isEditing: true
                            }, () => {
                                this._editingInputRef.current?.focus();
                                this._editingInputRef.current?.select();
                            })
                        }}
                        />
                    }
                    <Text 
                    width="12vw"
                    fontWeight="black"
                    fontSize="lg"
                    >
                        :
                    </Text>
                    
                </Flex>
            )
        }
    }

    private _updateName( newName: string , then ?: () => void )
    {
        this.setState({ 
            fieldName: newName,
        })
    }

    private _inputFocusEventHandler(evt: KeyboardEvent)
    {
        if( evt.key.toUpperCase() === "ENTER" && this._canEditTo( this.state.fieldName , this.state.prevName) )
        {
            if (this.state.fieldName === this.state.prevName ) return; // returns first so that the event listener is not removed

            this._editAndSubmit();
            
            window.removeEventListener("keydown", this._inputFocusEventHandler );
        }
    }

    private _editAndSubmit()
    {
        Debug.log("called_editAndSubmit from FieldName")
        if (this.state.fieldName === this.state.prevName ) return;

        if( this._canEditTo( this.state.fieldName , this.state.prevName) ) {
            this._submit();
        }
    }

    private _submit()
    {
        this.props.onNameEdit && this.props.onNameEdit( this.state.fieldName, this.state.prevName );

        this.setState({
            prevName: this.state.fieldName,
            isEditing: false
        })
    }

    private _revert()
    {
        this.setState({
            fieldName: this.state.prevName,
            isEditing: false
        })
    }
}



interface EditButtonProps {
    mr?: string
    onClick: () => void
}

const EditButton: React.FC<EditButtonProps> = ({onClick, mr} : EditButtonProps) => 
{
    return (
        <Flex justifyContent='center' onClick={onClick} mr={mr ?? 0}>
            <IconButton
            aria-label="edit-button"
            size='sm'
            icon={<EditIcon />}
            />
        </Flex>   
    )
}



interface SubmitButtonProps {
    onClick: () => void
    isDisabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({onClick, isDisabled} : SubmitButtonProps) => 
{
    return (
        <IconButton 
        isDisabled={isDisabled}

        onClick={ isDisabled ? () => {} : onClick} 

        aria-label="edit-button" 
        size='sm' 
        icon={<CheckIcon />} />
    )
}



interface DismissButtonProps {
    onClick: () => void
    isDisabled?: boolean

}

const DismissButton: React.FC<DismissButtonProps> = ({onClick, isDisabled} : DismissButtonProps) => 
{
    return (
        <IconButton 
        isDisabled={isDisabled}

        onClick={ isDisabled ? () => {} : onClick}

        aria-label="edit-button" 
        size='sm' 
        icon={<CloseIcon />} />
    )
}