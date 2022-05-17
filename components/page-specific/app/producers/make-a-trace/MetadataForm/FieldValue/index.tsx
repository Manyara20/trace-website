import { Text,
    Center,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Textarea
} from "@chakra-ui/react";
import React from "react";
import MetadataFieldCreator from "..";
import ReadableSwitch from "../../../../../../elements/ReadableSwitch";
import FieldValueTypeSelector, { FieldValueType } from "./FieldValueTypeSelector";
import HourFieldValue from "./type-specific/HourFieldValue";
import NumFieldValue from "./type-specific/NumFieldValue";
import ObjFieldValue from "./type-specific/ObjFieldValue";
import PercentageFieldValue from "./type-specific/PercentaceFieldValue";
import RangeFieldValue from "./type-specific/RangeFieldValue";
import TextFieldValue from "./type-specific/TextFieldValue";


interface FieldValueProps {
    onChange ?: ( any: any ) => void
}

interface FieldValueState {
    chosenField?: FieldValueType
}

export default class FieldValue extends React.Component<FieldValueProps, FieldValueState>
{
    constructor(props: FieldValueProps)
    {
        super(props);

        this.state = {
            chosenField: undefined
        }
    }

    render(): React.ReactNode
    {
        
        return(
            this.state.chosenField === undefined ?
            <Center>
            <FieldValueTypeSelector onChoice={(choice) => {
                this.setState({
                    chosenField: choice
                })
            }} />
            </Center>
            :
            <Center>
            {    
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
                        return (<NumFieldValue onChange={console.log}/>);
                    break;
                    case "hour":
                        return <HourFieldValue onChange={console.log} />
                    break;
                    case "date":
                        return(
                            <Input type="date"  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                                evt.currentTarget.valueAsDate
                            }}/>
                        );
                    break;
                    case "range":
                        return <RangeFieldValue onChange={console.log}  boundaries={[10,200]}/>
                    break;
                    case "percentage":
                        return <PercentageFieldValue  onChange={(newValue: number) => {
                            console.log(newValue)
                        }} />
                    break;
                    case "mail":
                        return(
                            <Input type="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}/>
                        );
                    break;
                    case "link":
                        return(
                            <Input type="url" onChange={(event: React.ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}/>
                        );
                    break;
                    case "text":
                        return <TextFieldValue onChange={console.log} />
                    break;
                    case "list":
                        return (
                            <FieldValueTypeSelector
                            hideHeavyData 
                            onChoice={function (choice: FieldValueType): void {
                                throw new Error("Function not implemented.");
                            } }
                            />
                        );
                    break;
                    case "obj":
                        return(
                            <ObjFieldValue onChange={(obj) => console.log("obj fieldValue onChange callback syas: ", JSON.stringify( obj ))}/>
                        ); 
                    break;
                }
            })()}
            </Center>
        )
    }
}