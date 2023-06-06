import { Input } from "@chakra-ui/react";
import React from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface EmailFieldValueProps extends IFieldValueProps {

}

interface EmailFieldValueState {
    email: string | undefined
}

export default class EmailFieldValue extends React.Component<EmailFieldValueProps,EmailFieldValueState>
{
    private _lastEdit: number;

    constructor( props: EmailFieldValueProps )
    {
        super( props );


        this.state ={
            email: EmailFieldValue.isEmail(this.props.defaultValue) ? this.props.defaultValue : undefined
        };

        this._setEmail_and_callChange = this._setEmail_and_callChange.bind(this);
        this._callChange = this._callChange.bind(this);

        this._lastEdit = Date.now();
        this._callChange();
    }

    render(): React.ReactNode
    {
        return (
            <Input
            type="email"
            style={{
                width:"90%",
                margin: "auto 5%",
                borderColor: EmailFieldValue.isEmail( this.state.email ) ? undefined : "red" 
            }}
            isInvalid={!EmailFieldValue.isEmail( this.state.email )}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this._setEmail_and_callChange(event.target.value) }
            />
        );
    }

    public static isEmail( email: string | undefined ) : boolean
    {
        if( email === undefined ) return false;
        // ^                -> from start
        // [A-Z0-9._%+-]+   -> at least one letter / number / allowed email char
        // @                -> @
        // [A-Z0-9.-]+      -> at least one letter / number / allowed domain-name char
        // \.               -> .
        // [A-Z]{2,4}       -> 2 to 4 letter domain
        // $                -> end of string
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( email )
    }

    private _setEmail_and_callChange( email: string )
    {
        this.setState({
            email: email
        },
        () => {
            if( EmailFieldValue.isEmail( email ) )
                this._callChange()
        }
        )
    }

    private _callChange()
    {

        const callChange = () => setTimeout(
            () => {
                if( Date.now() - this._lastEdit < 500 )
                {
                    return;
                }
                else
                {
                    this.props.onChange( this.state.email )
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }
}
