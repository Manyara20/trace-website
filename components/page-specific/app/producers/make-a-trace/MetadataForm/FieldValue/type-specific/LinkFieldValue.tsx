import { Input } from "@chakra-ui/react";
import React from "react";
import IFieldValueProps from "../IFieldValueProps";


export interface LinkFieldValueProps extends IFieldValueProps {

}

interface LinkFieldValueState {

}

export default class LinkFieldValue extends React.Component< LinkFieldValueProps, LinkFieldValueState >
{
    constructor( props: LinkFieldValueProps )
    {
        super( props );

        this.state = {

        }
    }

    render(): React.ReactNode
    {
        return(
            <Input type="url" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event.target.value)}/>
        );
    }

}
