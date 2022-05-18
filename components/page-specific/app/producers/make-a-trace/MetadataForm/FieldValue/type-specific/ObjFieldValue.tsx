import { Button, Center, Stack, StackDivider } from "@chakra-ui/react";
import React from "react";
import FieldValue, { FieldValueProps_NonOptional } from "..";
import FieldName, { FieldNameProps } from "../../FieldName";
import IFieldValueProps from "../IFieldValueProps";

import { createStandaloneToast } from '@chakra-ui/toast'
import theme from "../../../../../../../../chakra/theme";
import NumFieldValue from "./NumFieldValue";
import Debug from "../../../../../../../../utils/Debug";
import ReadableSwitch from "../../../../../../../elements/ReadableSwitch";

const { ToastContainer, toast: makeToast } = createStandaloneToast(theme)


export enum ObjFieldChangeReason {
    creation = 0,
    newField   = 1,
    fieldNameEdited = 2,
    fieldValueChanged = 3
}


export interface ObjFieldValueProps extends IFieldValueProps
{
    onChange: (newObj: object, what ?: ObjFieldChangeReason) => void
    defaultValue?: undefined // IFieldValueProps override
}

interface ObjFieldValueState
{
    addedFields: JSX.Element[]
}

export default class ObjFieldValue extends React.Component<ObjFieldValueProps, ObjFieldValueState>
{

    private _value: object = {};

    constructor( props: ObjFieldValueProps)
    {
        super(props);


        this.state = {
            addedFields: []
        }

        // update any parent
        this.props.onChange( JSON.parse( JSON.stringify(this._value) ) , ObjFieldChangeReason.creation )


        this._defineProperty_and_callChange = this._defineProperty_and_callChange.bind(this);
        
        this._checkNewFieldName = this._checkNewFieldName.bind(this);
        this._replacePropertyName_and_callChange = this._replacePropertyName_and_callChange.bind(this);

        this._addField = this._addField.bind(this);
        
    }


    render(): React.ReactNode
    {
        
        return (
            <Stack

            divider={<StackDivider borderColor='gray.200' />}

            style={{
                display: "flex",

                padding: "1vh 0",

                width: "92%", minWidth: "fit-content",
                margin: "auto",

                border: "#999a 1px solid", borderRadius: 12
            }}

            className="
            placeholder-dbg-border
            "
            >
                <ToastContainer />
                {this.state.addedFields}
                <Center>
                    <Button onClick={() => this._addField()} >
                        Add a field
                    </Button>
                </Center>
            </Stack>
        );
    }


    private _defineProperty_and_callChange( name: string, value: any, changeReason: ObjFieldChangeReason ) 
    {
        Object.defineProperty(
            this._value, name,
            {
                value: value,
                enumerable: true,
                configurable: true
            }
        );

        this.props.onChange(
            JSON.parse(
                JSON.stringify(
                    this._value
                )
            ),
            changeReason
        );

    }

    private _replacePropertyName_and_callChange( oldName: string | undefined , newName: string )
    {
        // should never be true since onNameEdit has been called before and checked for the same fcondition,
        // however it's a different function, so better safe than sorry
        if( Object.keys(this._value).includes(newName) ) throw Error("can't have two fileds with the same name");

        let prevCopy: any;
        // coping is needed since when deleting we migth drop some nested values
        if( oldName !== undefined )
        {
            const prevShallowCopy = (this._value as any)[oldName] 
    
            if( prevShallowCopy === undefined ) throw Error("trying to replace non exsisting property");
    
            // due to how the object is constructed we are sure everything here is json-serializable
            prevCopy = JSON.parse(
                JSON.stringify(
                    prevShallowCopy
                )
            );
            
            // remove old
            delete (this._value as any)[oldName];
        }
        
        // create new Field using copied object
        this._defineProperty_and_callChange( newName, prevCopy, ObjFieldChangeReason.fieldNameEdited )
    }

    private _checkNewFieldName (newName: string, oldName?: string | undefined) : boolean
    {
        // IMPORTANT
        // prevents useless side effects
        if( newName == oldName ) return true;

        if(Object.keys(this._value).includes(newName))
        {
            makeToast({
                title: "Fields can't have the same name",
                description: "there is already a field called \""+ newName +"\"; make sure that name is not already present! " ,
                status: 'warning',
                variant: "subtle",
                duration: 4500,
                isClosable: true,
            });
            return false;
        }

        if( newName.split("").includes("_") )
        {
            makeToast({
                title: "Underscores are not allowed :(",
                description: "there is an underscore ( _ ) int the name \""+ newName +"\"; please try any other ",
                status: 'warning',
                variant: "subtle",
                duration: 4500,
                isClosable: true,
            });
            return false;
        }

        return true;
    }

    private _addField(
        fieldName : string = "field",
        fieldValue : any = undefined,
        isNameEditable: boolean = true,
        nameTag: "required" | "suggested" | undefined = undefined
    )
    {

        if(Object.keys(this._value).includes(fieldName))
        {
            makeToast({
                title: "Fields can't have the same name",
                description: "trying to add a new field will create one called \"field\"; make sure that name is not already present! " ,
                status: 'warning',
                variant: "subtle",
                duration: 4500,
                isClosable: true,
            })
            return;
        }

        this._defineProperty_and_callChange( fieldName, {}, ObjFieldChangeReason.newField )
        
        this.setState({
            addedFields: [...this.state.addedFields, (
                <FieldAndValuePair

                    onChange={(newValue) => {
                        if (!Object.keys(this._value).includes(newValue.fieldName)) {
                            throw Error(
                                "unable to find " + newValue.fieldName + "in the value" + JSON.stringify(this._value) +
                                "\n\n note that field names changes should be handled in the \"fieldNameProps.onNameEdit\" property callback"
                            );
                        }

                        (this._value as any)[newValue.fieldName] = newValue.value;


                        this.props.onChange(
                            JSON.parse(
                                JSON.stringify(
                                    this._value
                                )
                            ),
                            ObjFieldChangeReason.fieldValueChanged
                        );
                    } }

                    key={"field_" + (this.state.addedFields.length + 1).toString()}

                    fieldNameProps={{
                        editable: isNameEditable,
                        defaultValue: fieldName,

                        canEditTo: this._checkNewFieldName,
                        onNameEdit: (newName: string, oldName?: string) => {

                            this._replacePropertyName_and_callChange(oldName, newName);

                            Debug.log(
                                "field name has been edited, newName: ", newName, "oldName", oldName
                            );
                        }
                    }} valueProps={undefined}
                />
            )]
        })

    }
}


interface FieldAndValue_onChangeInput {
    fieldName: string
    value: any
}

interface FieldAndValue_ValueProps {
    defaultValue?: any | undefined
}

interface FieldAndValuePairProps extends IFieldValueProps {
    onChange: ( newValue: FieldAndValue_onChangeInput ) => void

    fieldNameProps: FieldNameProps
    valueProps: FieldAndValue_ValueProps
}

interface FieldAndValuePairState {

}

class FieldAndValuePair extends React.Component<FieldAndValuePairProps, FieldAndValuePairState>
{
    private _filedName: string;
    private _value: any;

    constructor(props: FieldAndValuePairProps)
    {
        super( props );

        this._filedName = this.props.fieldNameProps.defaultValue

        this.state = {

        }

        this._callChange = this._callChange.bind(this);
        this._changeValue_and_callChange = this._changeValue_and_callChange.bind(this);
    }

    render(): React.ReactNode
    {
        
        return (
            <>
            <FieldName

            editable={this.props.fieldNameProps.editable}
            defaultValue={this.props.fieldNameProps.defaultValue}

            canEditTo={this.props.fieldNameProps.canEditTo}
            onNameEdit={(newName: string, prevName?: string | undefined ) => {

                this._filedName = newName;

                this.props.fieldNameProps.onNameEdit && this.props.fieldNameProps.onNameEdit( newName, prevName );

                this._callChange();
            }}

            />
            {
                (() => {
                    if( this.props.valueProps.defaultValue === undefined )
                    {

                    }
                    else {
                        switch( typeof this.props.valueProps.defaultValue )
                        {
                            case "bigint":
                            case "number":
                                throw Error("couldn't determine a field value for the default value passed");
                            break;

                            case "boolean":
                                return <ReadableSwitch
                                defaultValue={this.props.valueProps.defaultValue}
                                onChange={this._changeValue_and_callChange}
                                />
                            break;
                            case "object":

                                if(
                                    Array.isArray( this.props.valueProps.defaultValue )
                                )
                                {

                                }
                                else
                                {
                                    
                                }

                                throw Error("couldn't determine a field value for the default value passed");

                            break;
                            case "string":
                        
                                throw Error("couldn't determine a field value for the default value passed");

                            break;

                            case "symbol":
                            case "undefined":
                            case "function":
                            default:
                                throw Error("couldn't determine a field value for the default value passed");
                        }
                    }
                })()
            }
            </>
        )
    }

    private _callChange(): void
    {
        this.props.onChange({
            fieldName: this._filedName,
            value: this._value
        });
    }

    private _changeValue_and_callChange( newValue: any ): void
    {
        this._value;

        this._callChange();
    }

}