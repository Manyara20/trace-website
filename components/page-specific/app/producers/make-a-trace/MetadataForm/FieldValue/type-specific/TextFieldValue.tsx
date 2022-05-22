import { Text, Textarea } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface TextFieldValueProps extends IFieldValueProps
{
    defaultValue?: string
    onChange: (newTxt: string | undefined) => void
    onEditStart?: () => void
}

interface TextFieldValueState
{
    isTextValid: boolean,
    leftChars: number
}

const MAX_TEXT_CHS: number = 500;

export default class TextFieldValue extends React.Component<TextFieldValueProps, TextFieldValueState>
{
    private _text: string | undefined;
    private _lastEdit: number = Date.now();

    constructor(props: TextFieldValueProps)
    {
        super(props);

        this._text = this.props.defaultValue === "" ? undefined : this.props.defaultValue;

        this.state = {
            isTextValid: TextFieldValue.isValidText( this._text ),
            leftChars: MAX_TEXT_CHS - (this._text?.length ?? 0)
        }

        this._updateText = this._updateText.bind(this);
        this._callOnChangeOnStopInput = this._callOnChangeOnStopInput.bind(this),

        this._callOnChangeOnStopInput();
    }

    render(): ReactNode
    {

        return(
            <>
            <Textarea
            style={{
                width: "90%",
                margin: "auto 5%",
                borderColor: this.state.isTextValid ?  undefined : "red",
            }}
            defaultValue={this.props.defaultValue}
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                this._updateText( evt.currentTarget.value )
            }} resize="vertical" />
            {
                this.state.leftChars < 100 &&
                <Text
                style={{
                    width: "90%",
                    margin: "auto 5%",
                    fontSize: "0.88em",
                    color: this.state.leftChars < 0 ? "red" : undefined,
                }}
                >
                    {this.state.leftChars.toString() + " "}chars left to use
                </Text>
            }
            </>
        );
    }

    private _updateText( newText: string )
    {
        this._text = newText === "" ? undefined : newText ;

        this.setState({
            isTextValid: TextFieldValue.isValidText( this._text ),
            leftChars: MAX_TEXT_CHS - (this._text?.length ?? 0)
        })

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

    public static isValidText( text: string | undefined ): boolean
    {
        if( text === undefined ) return false;

        if( text.length > 500 ) return false;

        return true;
    }
}

