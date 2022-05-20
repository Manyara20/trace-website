import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, HStack, NumberInputField } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";
import NumFieldValue from "./NumFieldValue";

export interface RangeFieldValueProps extends IFieldValueProps
{
    defaultBoundaries: [number, number]
    onChange: (fromTo: [number, number, number, number]) => void
}

interface RangeFieldValueState
{
    boundaries: [number,number]
}

export default class RangeFieldValue extends React.Component<RangeFieldValueProps, RangeFieldValueState>
{
    private _lastEdit: number;

    constructor(props: RangeFieldValueProps)
    {
        super(props);

        this._lastEdit = Date.now();

        this.state = {
            boundaries: [ Math.min( ...this.props.defaultBoundaries ), Math.max( ...this.props.defaultBoundaries ) ]
        }

        this._callChange = this._callChange.bind(this);

        this._callChange(
            [ Math.min( ...this.props.defaultBoundaries ), Math.max( ...this.props.defaultBoundaries ) ]
        );
    }

    render(): ReactNode
    {

        return(
            <>

            <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='d-green'

            defaultValue={[ Math.min( ...this.props.defaultBoundaries ), Math.max( ...this.props.defaultBoundaries ) ]}
            min={ Math.min( ...this.state.boundaries ) } max={ Math.max( ...this.state.boundaries ) }
            
            onChange={this._callChange}
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>

            <HStack >
                <NumFieldValue
                defaultValue={Math.min( ...this.state.boundaries )}
                
                onChange={n => this.setState({
                    boundaries: [ this.state.boundaries[0], n ]
                })}
                />
                <NumFieldValue
                defaultValue={Math.max( ...this.state.boundaries )} 
                
                onChange={n => this.setState({
                    boundaries: [ n, this.state.boundaries[1] ]
                })} 
                />
            </HStack>
            </>
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
                    this.props.onChange([ this.state.boundaries[0], ...rangeValues , this.state.boundaries[1] ])
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }
}
