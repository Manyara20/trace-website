import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";

export interface RangeFieldValueProps extends IFieldValueProps
{
    boundaries: [number, number]
    onChange: (fromTo: [number, number]) => void
}

interface RangeFieldValueState
{

}

export default class RangeFieldValue extends React.Component<RangeFieldValueProps, RangeFieldValueState>
{
    constructor(props: RangeFieldValueProps)
    {
        super(props);
    }

    render(): ReactNode
    {

        return(
            <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='d-green'

            min={ Math.min( ...this.props.boundaries ) } max={ Math.max( ...this.props.boundaries ) }
            
            onChange={this.props.onChange}
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
        );
    }
}
