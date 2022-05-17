import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { useEditableControls, ButtonGroup, IconButton, Flex, Editable, EditablePreview, Input, EditableInput, Text, Stack } from "@chakra-ui/react";
import React from "react";
import { ReactNode, useState } from "react";


interface FieldNameProps_ {
    editable?: boolean
    canChangeEditTo?: (newName: string) => boolean
    onNameEdit?: (newName: string, prevName?: string) => void
    defaultValue: string
}

 function FieldName_({editable, defaultValue, onNameEdit = () => {}, canChangeEditTo = (_newName) => true }: FieldNameProps_) {
    /* Here's a custom control */

    const [ fieldName, setFieldName ] = useState(defaultValue);
    const [ prevName, setPrevName ] = useState<string>(defaultValue);

    function EditableControls({mr}: {mr?:number})
    {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        const submitProps = getSubmitButtonProps();

        
        const editNameAndSubmit = ( strangeChakraMouseEvent: any ) => {
            
            const editName = () =>
            {
                onNameEdit(fieldName, prevName);
                setPrevName(fieldName);
            }

            if( canChangeEditTo( fieldName ) )
            {
                editName();
                submitProps.onClick && submitProps.onClick( strangeChakraMouseEvent );
            }
            else
            {
                // use toast
                console.error("can't change name to" + fieldName)
            }
        }

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm' mr={mr}>
                <IconButton
                
                icon={<CheckIcon />}
                {...{
                    ...submitProps,
                    onClick: editNameAndSubmit
                }}
                aria-label="Update field name"
                
                />
                <IconButton aria-label="Dismiss" icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center' mr={mr}>
                <IconButton aria-label="" size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        )
    }
  
    return (
    <Editable defaultValue={defaultValue} submitOnBlur={false}

        textAlign='center'
        fontSize='xl'
        fontWeight="black"
        isPreviewFocusable={false}

        onChange={ (next: string) =>  {
            throw Error;
        }}
        style={{
            width: "15vw", minWidth: "fit-content",

            display: "flex", flexDirection: "row",
            justifyContent: "center", alignItems: "center",

        }}
        className="
        placeholder-dbg-border
        "
    >
        <EditablePreview mr={2}/>
        
        <Input as={EditableInput}
        mr={2}
        onChange={(evt) => setFieldName( evt.target.value )}
        width="12vw"
        fontWeight="black"
        fontSize="lg"
        />

        {editable && <EditableControls mr={4}/>}
        <Text mr={4}>:</Text>
    </Editable>
    )

}


interface FieldNameProps
{
    defaultValue: string

    editable?: boolean
    /**
     * has to be PURE
     */
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
                    isDisabled={!this._canEditTo( this.state.fieldName, this.state.prevName )}
                    onClick={this._submit}
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
                <>
                <Text 
                width="12vw"
                fontWeight="black"
                fontSize="lg"
                >
                    {this.state.fieldName}
                </Text>
                {
                    (this.props.editable == true) &&
                    <EditButton
                    onClick={ () => {
                        this.setState({
                            isEditing: true
                        })
                    }}
                    />
                }
                </>
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
    onClick: () => void
}

const EditButton: React.FC<EditButtonProps> = ({onClick} : EditButtonProps) => 
{
    return (
        <Flex justifyContent='center' onClick={onClick} >
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