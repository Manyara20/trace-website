import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Textarea } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface TextFieldValueProps extends IFieldValueProps
{
    onChange: (newTxt: string) => void
}

interface TextFieldValueState
{

}

export default class TextFieldValue extends React.Component<TextFieldValueProps, TextFieldValueState>
{
    constructor(props: TextFieldValueProps)
    {
        super(props);
    }

    render(): ReactNode
    {

        return(
            <Textarea onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                this.props.onChange( evt.currentTarget.value )
            }} resize="vertical" />
        );
    }
}

