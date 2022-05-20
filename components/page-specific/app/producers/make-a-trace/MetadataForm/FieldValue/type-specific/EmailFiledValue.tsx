import { Input } from "@chakra-ui/react";
import React from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface EmailFieldValueProps extends IFieldValueProps{

}

interface EmailFieldValueState {

}

export default class EmailFieldValue extends React.Component<EmailFieldValueProps,EmailFieldValueState>
{
    constructor( props: EmailFieldValueProps )
    {
        super( props );
    }

    render(): React.ReactNode
    {
        return (
            <Input type="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event.target.value) }/>
        );
    }
}
