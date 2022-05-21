import { NumberInput, NumberInputField, Text } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

interface HourFieldValueProps extends IFieldValueProps
{
    onChange: ( hour: [number,number]) => void
}

interface HourFieldValueState
{
    value: [number,number]
}

export default class HourFieldValue extends React.Component<HourFieldValueProps, HourFieldValueState>
{

    constructor(props: HourFieldValueProps)
    {
        super(props);

        this.state = {
            value: [0,0]
        }

        this.setHour = this.setHour.bind(this);
        this.setMin  = this.setMin.bind(this);

        this.fire_onChange = this.fire_onChange.bind(this)
    }

    render(): ReactNode
    {
        
        return(
            <>
            <NumberInput onChange={(_str: string, h: number) => this.setHour(h) } defaultValue={0} min={0} max={23} >
                <NumberInputField style={{
                    width:"7vw", minWidth: 75,
                }}
                />
            </NumberInput>
        
            <Text>:</Text>
        
            <NumberInput onChange={(_str: string, min: number) => this.setMin(min) } defaultValue={0} min={0} max={59} >
                <NumberInputField style={{
                    width:"7vw", minWidth: 75,
                }}
                />
            </NumberInput>
            <Text>UTC</Text>
            </>
            );
    }

    private setHour( h: number )
    {
        this.setState({
            value: [ h, this.state.value[1] ]
        },
        this.fire_onChange
        );
    }

    private setMin( min: number )
    {
        this.setState({
            value: [ this.state.value[0] , min ]
        },
        this.fire_onChange
        )
    }

    private fire_onChange()
    {
        this.props.onChange(this.state.value);
    }
}