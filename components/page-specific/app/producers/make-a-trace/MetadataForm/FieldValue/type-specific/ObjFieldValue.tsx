import { Button, Center, Stack, StackDivider } from "@chakra-ui/react";
import React from "react";
import FieldValue, { FieldValueProps_NonOptional } from "..";
import FieldName, { FieldNameProps } from "../../FieldName";
import IFieldValueProps from "../IFieldValueProps";

import { createStandaloneToast } from '@chakra-ui/toast'
import theme from "../../../../../../../../chakra/theme";
import NumFieldValue from "./NumFieldValue";

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

    private _keyValue_pairTracker: { id: number, keyName: string, val: any }[] = []

    constructor( props: ObjFieldValueProps)
    {
        super(props);


        this.state = {
            addedFields: []
        }

        // update any parent
        this.props.onChange( JSON.parse( JSON.stringify(this._value) ) , ObjFieldChangeReason.creation )


        this._defineProperty_and_callChange = this._defineProperty_and_callChange.bind(this);
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
                <Center key={"field_" +(this.state.addedFields.length + 1).toString()}>
                    <FieldName
                    
                    editable={isNameEditable}

                    defaultValue={fieldName}

                    canEditTo={(newName, oldName) =>
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
                    }}

                    onNameEdit={( newName , prevName = "") => {

                        // should never be true
                        if( Object.keys(this._value).includes(newName) ) throw Error("can't have two fileds with the same name");

                        // coping is needed since when deleting we migth drop some nested values
                        // due to how the object is constructed we are sure everything here is json-serializable
                        const prevCopy = JSON.parse(
                            JSON.stringify(
                                (this._value as any)[prevName] || {}
                            )
                        );
                        
                        // remove old
                        delete (this._value as any)[prevName];
                        
                        // create new using copy
                        this._defineProperty_and_callChange( newName, prevCopy, ObjFieldChangeReason.fieldNameEdited )
                    }}
                    />

                    {
                        (() => {

                            if( fieldValue === undefined )
                            {
                                return (<FieldValue
                                    get_onChange_fromChoice={() => {}}/>
                                ); 
                            }

                            if( typeof fieldValue === "number")
                            {
                                return (
                                <NumFieldValue
                                onChange={(n: number) => {

                                }}

                                defaultValue={fieldValue}
                                />)
                            }

                        })()
                    }

                </Center>
            )]
        })

    }
}

