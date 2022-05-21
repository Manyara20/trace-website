import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, HStack, NumberInputField, Center } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import Debug from "../../../../../../../../utils/Debug";
import TypeUtils from "../../../../../../../../utils/TypeUtils";
import IFieldValueProps from "../IFieldValueProps";
import NumFieldValue from "./NumFieldValue";

export interface RangeFieldValueProps extends IFieldValueProps
{
    defaultBoundaries: [number, number]
    onChange: (boudariesAndValues: [number, number, number, number]) => void
}

interface RangeFieldValueState
{
    minBound: number
    maxBound: number
}

export default class RangeFieldValue extends React.Component<RangeFieldValueProps, RangeFieldValueState>
{
    private _lastEdit: number;

    constructor(props: RangeFieldValueProps)
    {
        super(props);

        this._lastEdit = Date.now();

        this.state = {
            minBound: Math.min( ...this.props.defaultBoundaries ),
            maxBound: Math.max( ...this.props.defaultBoundaries )
        }

        this._callChange = this._callChange.bind(this);

        this._callChange(
            TypeUtils.copySerializable( 
                [
                    this.state.minBound,
                    this.state.maxBound
                ]
            )
        );
    }

    render(): ReactNode
    {

        return(
            <Center
            style={{
                width:"90%",
                margin: "auto 5%",
            }}
            >

                

                <HStack >
                    <NumFieldValue
                    defaultValue={this.state.minBound}
                    
                    onChange={n => {
                        if(n <= this.state.maxBound)
                        {
                            this.setState({
                                minBound: n
                            })
                        }
                    }}
                    />
                    <RangeSlider
                    aria-label={['min', 'max']}
                    colorScheme='d-green'

                    defaultValue={[ Math.min( ...this.props.defaultBoundaries ), Math.max( ...this.props.defaultBoundaries ) ]}
                    min={this.state.minBound} max={ this.state.maxBound }
                    
                    onChange={this._callChange}
                    >
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>


                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                    </RangeSlider>
                    <NumFieldValue
                    defaultValue={this.state.maxBound} 
                    
                    onChange={n => {
                        if(n >=this.state.minBound)
                        {
                            this.setState({
                                maxBound: n
                            })
                        }
                    }}
                    />
                </HStack>
            </Center>
        );
    }

    private _callChange( rangeValues : [number, number] )
    {

        const callChange = () => setTimeout(
            () => {
                if( Date.now() - this._lastEdit < 500 )
                {
                    return;
                }
                else
                {
                    Debug.log("central values", rangeValues , "result" ,
                        TypeUtils.copySerializable(
                            [
                                this.state.minBound,
                                ...rangeValues ,
                                this.state.maxBound 
                            ]
                        ),
                        "\n\n min bound:", this.state.minBound ,
                        "\n\n this.state.boundaries: ", this.state.maxBound
                    );

                    this.props.onChange(
                        TypeUtils.copySerializable(
                            [
                                this.state.minBound,
                                ...rangeValues ,
                                this.state.maxBound 
                            ]
                        )
                    );
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }
}
