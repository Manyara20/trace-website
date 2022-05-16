import { Box, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import ReadableSwitch from "../../../../../elements/ReadableSwitch";
import FieldNameInput from "./FieldNameInput";
import FieldValueTypeSelector, { FieldValueType } from "./FieldValue/FieldValueTypeSelector";


interface MetadataFieldCreatorProps {

}

interface MetadataFieldCreatorState {
    chosenField?: FieldValueType
}

export default class MetadataFieldCreator extends React.Component<MetadataFieldCreatorProps, MetadataFieldCreatorState>
{
    constructor( props: MetadataFieldCreatorProps)
    {
        super(props);

        this.state = {
            chosenField: undefined,
        }
    }

    render(): React.ReactNode
    {
        
        return (
            <Box
            style={{
                display: "flex",

                width: "80%", minWidth: "fit-content"
            }}

            className="
            placeholder-dbg-border
            "
            >
                <FieldNameInput/>
                {
                    this.state.chosenField === undefined ?
                    <FieldValueTypeSelector onChoice={(choice) => {
                        this.setState({
                            chosenField: choice
                        })
                    }} />
                    :
                    (() => {
                        switch( this.state.chosenField )
                        {
                            case "option":
                                return(
                                    <ReadableSwitch onChange={(isActive:boolean) => {
                                        console.log(isActive)
                                    }}/>
                                );
                            break;
                            case "number":
                                return(
                                    <NumberInput defaultValue={0} allowMouseWheel >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                );
                            break;
                            case "hour":
                                return(
                                    <>
                                    <NumberInput defaultValue={0} min={0} max={23} >
                                        <NumberInputField />
                                    </NumberInput>

                                    <Text>:</Text>

                                    <NumberInput defaultValue={0} min={0} max={59} >
                                        <NumberInputField />
                                    </NumberInput>
                                    <Text>UTC</Text>
                                    </>
                                );
                            break;
                            case "date":
                                return(
                                    <Input type="date" />
                                );

                            break;
                            case "range":
                                return(
                                    <RangeSlider
                                    aria-label={['min', 'max']}
                                    colorScheme='d-green'
                                    defaultValue={[10, 30]}
                                    >
                                        <RangeSliderTrack>
                                            <RangeSliderFilledTrack />
                                        </RangeSliderTrack>
                                        <RangeSliderThumb index={0} />
                                        <RangeSliderThumb index={1} />
                                    </RangeSlider>
                                );
                            break;
                            case "percentage":
                                return(
                                    <Slider aria-label='slider-ex-2' colorScheme='d-green' defaultValue={60}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                );
                            break;
                            case "mail":
                                return(
                                    <Input type="email" />
                                );
                            break;
                            case "link":
                                return(
                                    <Input type="url" />
                                );
                            break;
                            case "text":
                                return(
                                    <Textarea resize="vertical" />
                                );
                            break;
                            case "list":
                                return(
                                    <FieldValueTypeSelector hideStructuredValues 
                                    onChoice={function (choice: FieldValueType): void {
                                        throw new Error("Function not implemented.");
                                    } }
                                    />
                                );
                            break;
                            case "obj":
                                return(
                                    <MetadataFieldCreator />
                                );
                            break;
                        }
                    })()
                }
            </Box>
        );
    }
}

