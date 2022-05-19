import { Button, Center, Stack, StackDivider } from "@chakra-ui/react";
import React from "react";
import FieldValue, { FieldValueProps_NonOptional } from "..";
import FieldName, { FieldNameProps, FieldNameTag } from "../../FieldName";
import IFieldValueProps from "../IFieldValueProps";

import { createStandaloneToast } from '@chakra-ui/toast'
import theme from "../../../../../../../../chakra/theme";
import NumFieldValue from "./NumFieldValue";
import Debug from "../../../../../../../../utils/Debug";
import ReadableSwitch from "../../../../../../../elements/ReadableSwitch";
import TypeUtils from "../../../../../../../../utils/TypeUtils";
import NonChangebleHash from "./NonChangebleHash";
import TextFieldValue from "./TextFieldValue";

const { ToastContainer, toast: makeToast } = createStandaloneToast(theme)


export enum ObjFieldChangeReason {
    creation = 0,
    newField   = 1,
    fieldNameEdited = 2,
    fieldValueChanged = 3
}

export interface FixedFieldDescriptor {
    fieldName: {
        name: string,
        /**
         * {suggested} `implies` removeable
         */
        tag: FieldNameTag
    }
    objValue?: {
        value: FixedFieldDescriptor[]
    }
    stringValue?: {
        value: string
    }
}

export interface ObjFieldValueProps extends IFieldValueProps
{
    onChange: (newObj: object, what ?: ObjFieldChangeReason) => void
    defaultValue?: undefined // IFieldValueProps override

    fixedFieds?: FixedFieldDescriptor[]
}

interface ObjFieldValueState
{
    addedFields: JSX.Element[]
}

export default class ObjFieldValue extends React.Component<ObjFieldValueProps, ObjFieldValueState>
{
    private _value: object = {};
    private _isStateWriteable: boolean = true;

    constructor( props: ObjFieldValueProps)
    {
        super(props);


        this.state = {
            addedFields: []
        }

        this._addField = this._addField.bind(this);
        
        this._defineProperty_and_callChange = this._defineProperty_and_callChange.bind(this);
        this._replacePropertyName_and_callChange = this._replacePropertyName_and_callChange.bind(this);
        
        this._checkNewFieldName = this._checkNewFieldName.bind(this);

        this._hasAnyUndefinedValue = this._hasAnyUndefinedValue.bind(this);
    }

    componentDidMount()
    {

        if( this.props.fixedFieds )
        {
            for( let fieldDescriptor of this.props.fixedFieds )
            {
                const ensureFieldAdded = () => setTimeout( () => {

                    if( this._isStateWriteable )
                    {
                        this._addField(
                            fieldDescriptor.fieldName.name,
                            // undefined,
                            fieldDescriptor.objValue?.value,
                            false, // editable name
                            fieldDescriptor.fieldName.tag
                        )
                    }
                    else
                    {
                        ensureFieldAdded();
                    }

                }, 50 );

                ensureFieldAdded();
            }
        }
        
        // update any parent
        this.props.onChange( TypeUtils.copySerializable( this._value ) , ObjFieldChangeReason.creation )
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

    private _addField(
        fieldName : string = "field",
        fieldValue : any = undefined,
        isNameEditable: boolean = true,
        nameTag: FieldNameTag = undefined
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

        this._defineProperty_and_callChange( fieldName, fieldValue, ObjFieldChangeReason.newField )
        
        this._isStateWriteable = false;
        this.setState({
            addedFields: [...this.state.addedFields, (
                <FieldAndValuePair
                
                key={"field_" + (this.state.addedFields.length + 1).toString()}

                valueProps={{
                    defaultValue: fieldValue
                }}

                onChange={(newValue) => {
                    if (!Object.keys(this._value).includes(newValue.fieldName)) {
                        throw Error(
                            "unable to find " + newValue.fieldName + "in the value" + JSON.stringify(this._value) +
                            "\n\n note that field names changes should be handled in the \"fieldNameProps.onNameEdit\" property callback"
                        );
                    }

                    (this._value as any)[newValue.fieldName] = newValue.value;


                    this.props.onChange(
                        TypeUtils.copySerializable(this._value),
                        ObjFieldChangeReason.fieldValueChanged
                    );
                } }


                fieldNameProps={{

                    tag: nameTag,
                    editable: isNameEditable,
                    defaultValue: fieldName,

                    canEditTo: this._checkNewFieldName,
                    onNameEdit: (newName: string, oldName?: string) => {

                        this._replacePropertyName_and_callChange(oldName, newName);
                    }
                }} 
                />
            )]
        }, () => {
            this._isStateWriteable = true;
        })

    }

    private _defineProperty_and_callChange( name: string, value: any, changeReason: ObjFieldChangeReason ) 
    {
        Object.defineProperty(
            this._value, name,
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        );

        this.props.onChange(
            TypeUtils.copySerializable(this._value),
            changeReason
        );

        Debug.warn( "is there any undefined? ", this._hasAnyUndefinedValue() )
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
    
            // actually ok
            // if( prevShallowCopy === undefined ) throw Error("trying to replace non exsisting property");
    
            // due to how the object is constructed we are sure everything here is json-serializable
            prevCopy = TypeUtils.copySerializable( prevShallowCopy );
            
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

    private _hasAnyUndefinedValue(): boolean
    {
        const keys = Object.keys( this._value );

        return keys.some( k => (this._value as any)[k] === undefined );
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

/**
 * this class component is needed since when updating any value
 * we can not relly determinate which is the field to update;
 * 
 * this way ```FieldAndValuePair``` acts as a proxy and the ```onChange``` callback
 * provvides both the fieldName and the respective value;
 * 
 * the ```onChange``` callback is fired every time either the ```filedName``` or the ```value``` do change
 * 
 * the ```onChange``` is the only place where you can track any value change
 * 
 * any ```fieldName``` change can be tracked by using the ```fieldNameProps.onNameEdit``` callback for more controll
 * 
 * the ```fieldNameProps.onNameEdit``` is called before the ```onChange``` callback
 */ 
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

            tag={this.props.fieldNameProps.tag}

            editable={this.props.fieldNameProps.editable}
            defaultValue={this.props.fieldNameProps.defaultValue}

            canEditTo={this.props.fieldNameProps.canEditTo}
            onNameEdit={(newName: string, prevName?: string | undefined ) => {

                this._filedName = newName;

                //  the ```fieldNameProps.onNameEdit``` is called before the ```onChange``` callback
                this.props.fieldNameProps.onNameEdit && this.props.fieldNameProps.onNameEdit( newName, prevName );

                // ```onChange``` callback with tracked values
                this._callChange();
            }}

            />
            {
                (() => {

                    const defaultValValue = this.props.valueProps.defaultValue;

                    if( defaultValValue === undefined )
                    {
                        return ( <FieldValue
                        get_onChange_fromChoice={(_whateverChoice) => this._changeValue_and_callChange} 
                        /> );
                    }
                    else {
                        switch( typeof defaultValValue )
                        {
                            case "bigint":
                            case "number":
                                Debug.log("rendering NumField as value")
                                return (<NumFieldValue 
                                    defaultValue={
                                        Number( defaultValValue )
                                    }
                                    onChange={this._changeValue_and_callChange}/>);
                            break;

                            case "boolean":
                                return <ReadableSwitch
                                defaultValue={defaultValValue}
                                onChange={this._changeValue_and_callChange}
                                />
                            break;
                            case "object":

                                if(
                                    Array.isArray( defaultValValue )
                                )
                                {
                                    return (
                                        <ObjFieldValue
    
                                        fixedFieds={defaultValValue}
                                        
                                        onChange={(newObj: object, what?: ObjFieldChangeReason | undefined): void  => {
                                            this._changeValue_and_callChange( newObj );
                                        }}
                                        
                                        />
                                    )
                                }
                                else
                                {
                                }

                                throw Error(
                                    "couldn't determine a field value for the default value passed; default value: " +
                                    JSON.stringify( defaultValValue , undefined, 2 )
                                );

                            break;
                            case "string":

                                if( TypeUtils.isHexString(
                                    defaultValValue
                                ))
                                {
                                    return <NonChangebleHash hash={defaultValValue} />
                                }
                                else
                                {
                                    return <TextFieldValue
                                    defaultValue={defaultValValue}
                                    onChange={ this._changeValue_and_callChange }
                                    />
                                }
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
        this._value = newValue ;

        Debug.log("FieldAndValuePair._changeValue_and_callChange ");
        this._callChange();
    }

}