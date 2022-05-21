import { Textarea } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface TextFieldValueProps extends IFieldValueProps
{
    defaultValue?: string
    onChange: (newTxt: string) => void
    onEditStart?: () => void
}

interface TextFieldValueState
{

}

export default class TextFieldValue extends React.Component<TextFieldValueProps, TextFieldValueState>
{
    private _text: string = "";
    private _lastEdit: number = Date.now();

    constructor(props: TextFieldValueProps)
    {
        super(props);

        this._updateText = this._updateText.bind(this);
        this._callOnChangeOnStopInput = this._callOnChangeOnStopInput.bind(this)
    }

    render(): ReactNode
    {

        return(
            <Textarea
            style={{
                width: "90%",
                margin: "auto 5%"
            }}
            defaultValue={this.props.defaultValue}
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                this._updateText( evt.currentTarget.value )
            }} resize="vertical" />
        );
    }

    private _updateText( newText: string )
    {
        this._text = newText;

        this._lastEdit = Date.now();

        this._callOnChangeOnStopInput()
    }

    private _callOnChangeOnStopInput()
    {
        setTimeout(
            () => {
                // if at least 1 second is passed
                if( Date.now() - this._lastEdit > 990 )
                {
                    this.props.onChange( this._text );
                }
                else // still editing
                {
                    // do nothing; ```this._callOnChangeOnStopInput``` will be called again by ```this._updateText```
                    return;
                }
            }
        ,
        1000
        );

    }
}

