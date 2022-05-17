import { Box, Button, Stack, StackDivider } from "@chakra-ui/react";
import React from "react";
import FieldName from "./FieldName";
import FieldValue from "./FieldValue";


interface MetadataFormProps {

}

interface MetadataFormState {
    addedFields: JSX.Element[]
}

export default class MetadataForm extends React.Component<MetadataFormProps, MetadataFormState>
{
    constructor( props: MetadataFormProps)
    {
        super(props);

        this.state = {
            addedFields: []
        }
    }


    render(): React.ReactNode
    {
        
        return (
            <Stack
            divider={<StackDivider borderColor='gray.200' />}
            style={{
                display: "flex",

                padding: "1vh 0",

                width: "100%", minWidth: "fit-content",
                margin: "auto",

                border: "#999a 1px solid", borderRadius: 12
            }}

            className="
            placeholder-dbg-border
            "
            >
                <>
                    <FieldName defaultValue="producer" editable={false} />
                    <FieldValue />
                </>
                <>
                    <FieldName defaultValue="product" editable={false} />
                    <FieldValue />
                </>
                {this.state.addedFields}
                <Button onClick={() => {
                    this.setState({
                        addedFields: [...this.state.addedFields, (
                            <>
                            <FieldName defaultValue="field" editable />
                            <FieldValue />
                            </>
                        )]
                    })
                }}>
                    Add a field
                </Button>
            </Stack>
        );
    }
}

