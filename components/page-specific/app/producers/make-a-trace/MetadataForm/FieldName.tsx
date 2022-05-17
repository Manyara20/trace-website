import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { useEditableControls, ButtonGroup, IconButton, Flex, Editable, EditablePreview, Input, EditableInput, Text } from "@chakra-ui/react";
import { useState } from "react";


interface FieldNameProps {
    editable?: boolean
    canChangeEditTo?: (newName: string) => boolean
    onNameEdit?: (newName: string, prevName?: string) => void
    defaultValue: string
}

export default function FieldName({editable, defaultValue, onNameEdit = () => {}, canChangeEditTo = (_newName) => true }: FieldNameProps) {
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
                onFocus={(event: any) => {
                    console.log(event)
                }}
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