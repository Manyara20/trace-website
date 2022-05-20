import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface NumFieldValueProps extends IFieldValueProps
{
    onChange: (number: number) => void
    min?: number
    max?: number
}

interface NumFieldValueState
{

}

export default class NumFieldValue extends React.Component<NumFieldValueProps, NumFieldValueState>
{
    constructor(props: NumFieldValueProps)
    {
        super(props);

        if( this.props.defaultValue )
        {
            this.props.onChange(
                this.props.defaultValue
            )
        }
    }

    render(): ReactNode
    {
        
        return (
            <NumberInput onChange={( _str: string, num: number) => {
                this.props.onChange(num);
            }} 
            defaultValue={this.props.defaultValue} allowMouseWheel
            max={this.props.max} min={this.props.min}
            >
                <NumberInputField />
                
            </NumberInput>
        );
    }
}