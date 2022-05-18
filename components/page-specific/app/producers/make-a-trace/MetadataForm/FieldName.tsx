import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { ButtonGroup, IconButton, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";


export interface FieldNameProps
{
    defaultValue: string

    editable?: boolean
    
    canEditTo?: (newName: string, prevName?: string) => boolean
    onNameEdit?: (newName: string, prevName?: string) => void
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

        this._submit = this._submit.bind(this);
        this._revert = this._revert.bind(this);
    }

    render(): ReactNode
    {
        if( this.state.isEditing )
        {
            return (
                <>
                <Input
                mr={2}
                defaultValue={this.state.fieldName}
                onChange={(evt: { target: { value: string; }; }) => this._updateName( evt.target.value ) }
                width="12vw"
                fontWeight="black"
                fontSize="lg"

                />
                <ButtonGroup justifyContent='center' size='sm' >
                    <SubmitButton 
                    isDisabled={ this.state.fieldName === this.state.prevName || !this._canEditTo( this.state.fieldName, this.state.prevName )}
                    onClick={() => {
                        if (this.state.fieldName === this.state.prevName ) return;

                        if(this._canEditTo( this.state.fieldName , this.state.prevName) ) {
                            this._submit();
                        }
                    }}
                    />
                    <DismissButton
                    onClick={this._revert}
                    />
                </ButtonGroup>
                </>
            )
        }
        else
        {
            return (
                <Flex>
                    <Text 
                    margin="0 5px 0 1.5vw"
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
        <Flex justifyContent='center' onClick={ isDisabled ? () => {} : onClick} >
            <IconButton 
            isDisabled={isDisabled}

            aria-label="edit-button" 
            size='sm' 
            icon={<CheckIcon />} />
        </Flex>   
    )
}



interface DismissButtonProps {
    onClick: () => void
    isDisabled?: boolean

}

const DismissButton: React.FC<DismissButtonProps> = ({onClick, isDisabled} : DismissButtonProps) => 
{
    return (
        <Flex justifyContent='center' onClick={ isDisabled ? () => {} : onClick} >
            <IconButton 
            isDisabled={isDisabled}

            aria-label="edit-button" 
            size='sm' 
            icon={<CloseIcon />} />
        </Flex>   
    )
}