import { Box, Button, Stack, StackDivider } from "@chakra-ui/react";
import React from "react";
import FieldName from "./FieldName";
import FieldValue from "./FieldValue";
import ObjFieldValue from "./FieldValue/type-specific/ObjFieldValue";


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
            
                <ObjFieldValue
                onChange={console.log}
                />
        );
    }
}

