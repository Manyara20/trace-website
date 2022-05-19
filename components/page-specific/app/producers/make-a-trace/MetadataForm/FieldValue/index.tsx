import {
    Center,
    Input
} from "@chakra-ui/react";
import React from "react";
import Debug from "../../../../../../../utils/Debug";
import ReadableSwitch from "../../../../../../elements/ReadableSwitch";
import FieldValueTypeSelector, { FieldValueType } from "./FieldValueTypeSelector";
import IFieldValueProps from "./IFieldValueProps";
import HourFieldValue from "./type-specific/HourFieldValue";
import NumFieldValue from "./type-specific/NumFieldValue";
import ObjFieldValue from "./type-specific/ObjFieldValue";
import PercentageFieldValue from "./type-specific/PercentaceFieldValue";
import RangeFieldValue from "./type-specific/RangeFieldValue";
import TextFieldValue from "./type-specific/TextFieldValue";


export interface DefaultValueDescriptor {
    valueType: FieldValueType
    base_fieldValueProps: IFieldValueProps
    other_fieldValueProps?: object
}

export interface FieldValueProps {
    /**
     * 
     * @param {FieldValueType} chosenValueType: input that will be substituted with
     * 
     * @returns the ```onChange``` callback to pass to the specific FieldValue
     */
    get_onChange_fromChoice: ( chosenValueType: FieldValueType ) => (( any: any ) => void )
}


export interface FieldValueProps_NonOptional {
    /**
     * 
     * @param {FieldValueType} chosenValueType: input that will be substituted with
     * 
     * @returns the ```onChange``` callback to pass to the specific FieldValue
     */
    get_onChange_fromChoice: ( chosenValueType: FieldValueType ) => (( any: any ) => void )
    
    // defaultValue : DefaultValueDescriptor
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
                            <ReadableSwitch onChange={this.getOnChange()}/>
                        );
                    break;
                    case "number":
                        return (<NumFieldValue onChange={this.getOnChange()}/>);
                    break;
                    case "hour":
                        return <HourFieldValue onChange={this.getOnChange()} />
                    break;
                    case "date":
                        return(
                            <Input type="date" errr onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                                evt.currentTarget.valueAsDate
                            }}/>
                        );
                    break;
                    case "range":
                        return <RangeFieldValue onChange={this.getOnChange()} boundaries={[0,100]}/>
                    break;
                    case "percentage":
                        return <PercentageFieldValue onChange={this.getOnChange()} />
                    break;
                    case "mail":
                        return(
                            <Input type="email" err onChange={(event: React.ChangeEvent<HTMLInputElement>) => Debug.log(event.target.value)}/>
                        );
                    break;
                    case "link":
                        return(
                            <Input type="url" err onChange={(event: React.ChangeEvent<HTMLInputElement>) => Debug.log(event.target.value)}/>
                        );
                    break;
                    case "text":
                        return <TextFieldValue onChange={this.getOnChange()} />
                    break;
                    case "list":
                        return (
                            <FieldValueTypeSelector err
                            hideHeavyData 
                            onChoice={function (choice: FieldValueType): void {
                                throw new Error("Function not implemented.");
                            } }
                            />
                        );
                    break;
                    case "obj":
                        return(
                            <ObjFieldValue onChange={this.getOnChange()}/>
                        ); 
                    break;
                }
            })()}
            </Center>
        )
    }

    private getOnChange()
    {
        if (! this.state.chosenField ) return (() => {});

        return this.props.get_onChange_fromChoice(this.state.chosenField)
    }
}