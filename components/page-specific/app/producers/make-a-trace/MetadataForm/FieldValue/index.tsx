import {
    Center,
    Input
} from "@chakra-ui/react";
import React from "react";
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
    get_onChange_fromChoice ?: ( chosenValueType: FieldValueType ) => (( any: any ) => void )
    defaultValue ?: DefaultValueDescriptor
}


export interface FieldValueProps_NonOptional {
    /**
     * 
     * @param {FieldValueType} chosenValueType: input that will be substituted with
     * 
     * @returns the ```onChange``` callback to pass to the specific FieldValue
     */
    // get_onChange_fromChoice ?: ( chosenValueType: FieldValueType ) => (( any: any ) => void )
    
    defaultValue : DefaultValueDescriptor
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
            chosenField: this.props.defaultValue?.valueType
        }
    }

    render(): React.ReactNode
    {
        if( this.props.defaultValue )
        {
            return (
                <Center>
                {    
                (() => {
                    const def = this.props.defaultValue;

                    switch( def.valueType )
                    {
                        case "option":
                            return(
                                <ReadableSwitch {...{
                                    ...def.other_fieldValueProps,
                                    ...def.base_fieldValueProps,
                                }}/>
                            );
                        break;
                        case "number":
                            return (<NumFieldValue {...{
                                ...def.other_fieldValueProps,
                                ...def.base_fieldValueProps,
                            }} />);
                        break;
                        case "hour":
                            return <HourFieldValue {...{
                                ...def.other_fieldValueProps,
                                ...def.base_fieldValueProps,
                            }} />
                        break;
                        case "date":
                            return(
                                <Input type="date"  {...{
                                    ...def.other_fieldValueProps,
                                    ...def.base_fieldValueProps,
                                }} />
                            );
                        break;
                        case "range":
                            return <RangeFieldValue {...{
                                boundaries: [0,100],
                                ...def.other_fieldValueProps,
                                ...def.base_fieldValueProps,
                            }} />
                        break;
                        case "percentage":
                            return <PercentageFieldValue  {...{
                                    ...def.other_fieldValueProps,
                                    ...def.base_fieldValueProps,
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
                            return <TextFieldValue {...{
                                ...def.other_fieldValueProps,
                                ...def.base_fieldValueProps,
                            }} />
                        break;
                        case "list":
                            return (
                                <FieldValueTypeSelector
                                hideHeavyData 
                                {...{
                                    ...def.other_fieldValueProps,
                                    ...def.base_fieldValueProps,
                                }}
                                />
                            );
                        break;
                        case "obj":
                            return(
                                <ObjFieldValue {...{
                                    ...def.other_fieldValueProps,
                                    ...def.base_fieldValueProps,
                                }}
                                />
                            ); 
                        break;
                    }
                })()}
                </Center>
            );
        }


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