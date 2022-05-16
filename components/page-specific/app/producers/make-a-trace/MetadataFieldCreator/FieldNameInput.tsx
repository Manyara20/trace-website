import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { useEditableControls, ButtonGroup, IconButton, Flex, Editable, EditablePreview, Input, EditableInput, Text } from "@chakra-ui/react";


export default function FieldNameInput() {
    /* Here's a custom control */
    function EditableControls({mr}: {mr?:number})
    {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()
    
        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm' mr={mr}>
                <IconButton aria-label="Update field name" icon={<CheckIcon />} onClick={() => {}} {...getSubmitButtonProps()} />
                <IconButton aria-label="Dismiss" icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center' mr={mr}>
                <IconButton aria-label="" size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        )
    }
  
    return (
    <Editable defaultValue='field'

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
        width="12vw"
        fontWeight="black"
        fontSize="lg"
        />

        <EditableControls mr={4}/>
        <Text mr={4}>:</Text>
    </Editable>
    )

  }