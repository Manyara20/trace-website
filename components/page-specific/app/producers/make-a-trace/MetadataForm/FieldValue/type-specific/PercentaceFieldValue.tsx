import { Center, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface PercentageFieldValueProps extends IFieldValueProps
{
    showTracker ?: boolean
    onChange: ( newPercentage : [number] ) => void
}

interface PercentageFieldValueState
{
    value: number
}

export default class PercentageFieldValue extends React.Component<PercentageFieldValueProps, PercentageFieldValueState>
{
    private _defaultVal: number = 60;

    constructor(props: PercentageFieldValueProps)
    {
        super(props);

        this.state = {
            value: this._defaultVal
        }

        this.setValue = this.setValue.bind(this);
    }

    render(): ReactNode
    {

        return(
            <Center
            style={{
                width:"90%",
                height: "2em",
                margin: "auto 5%",
            }}
            >
                <Slider
                onChange={(val: number) => {
                    this.setValue(val)
                    this.props.onChange([val]);
                }}
                
                >

                    <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                        25%
                    </SliderMark>
                    <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                        50%
                    </SliderMark>
                    <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                        75%
                    </SliderMark>
                
                {
                    (this.props.showTracker ?? false) &&
                    <SliderMark
                        value={this.state.value}
                        textAlign='center'
                        color='white'
                        mt='-10'
                        ml='-5'
                        w='12'

                        style={{
                            backgroundColor: "green",
                            borderRadius: 5
                        }}
                    >
                        {this.state.value}%
                    </SliderMark>
                    }

                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Center>
        );
    }

    private setValue( val: number )
    {
        this.setState({
            value: val
        })
    }
}

