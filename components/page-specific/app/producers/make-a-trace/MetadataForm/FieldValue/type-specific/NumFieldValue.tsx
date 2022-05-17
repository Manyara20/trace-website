import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface NumFieldValueProps extends IFieldValueProps
{
    onChange: (number: number) => void
}

interface NumFieldValueState
{

}

export default class NumFieldValue extends React.Component<NumFieldValueProps, NumFieldValueState>
{
    constructor(props: NumFieldValueProps)
    {
        super(props);
    }

    render(): ReactNode
    {
        
        return (
            <NumberInput onChange={( _str: string, num: number) => {
                this.props.onChange(num);
            }} 
            defaultValue={0} allowMouseWheel
            >
                <NumberInputField />
                
            </NumberInput>
        );
    }
}