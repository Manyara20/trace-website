import { Button, Center, Stack, StackDivider } from "@chakra-ui/react";
import React from "react";
import FieldValue from "..";
import FieldName from "../../FieldName";
import IFieldValueProps from "../IFieldValueProps";

import { createStandaloneToast } from '@chakra-ui/toast'
import theme from "../../../../../../../../chakra/theme";

const { ToastContainer, toast: makeToast } = createStandaloneToast(theme)


export enum ObjFieldChangeReason {
    newField   = 0,
    fieldNameEdited = 1,
    fieldValueChanged = 2
}

interface ObjFieldValueProps extends IFieldValueProps
{
    onChange: (newObj: object, what ?: ObjFieldChangeReason) => void
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
                <Button onClick={() => {
                    console.log( "Add a filed button says", this._value);

                    if(Object.keys(this._value).includes("field"))
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

                    Object.defineProperty(
                        this._value, "field",
                        {
                            value: {},
                            enumerable: true,
                            configurable: true
                        }
                    );

                    this.props.onChange( this._value, ObjFieldChangeReason.fieldNameEdited )

                    
                    console.log("setState 1")
                    this.setState({
                        addedFields: [...this.state.addedFields, (
                            <Center key={"field_" +(this.state.addedFields.length + 1).toString()}>
                            <FieldName editable
                                canEditTo={(newName, oldName) => {
                                    /**  IMPORTANT
                                     * prevent useless side effects
                                     */
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

                                    if( Object.keys(this._value).includes(newName) ) throw Error("can't have two fileds with the same name");

                                    // coping is needed since when deleting we migth drop some nested values
                                    /**
                                    due to how the object is constructed we are sure everything here is json-serializable
                                    */
                                    const prevCopy = JSON.parse(
                                        JSON.stringify(
                                            (this._value as any)[prevName] || {}
                                            )
                                        );
                                    
                                    // remove old
                                    delete (this._value as any)[prevName];
                                    
                                    // create new using copy
                                    Object.defineProperty(
                                        this._value, newName,
                                        {
                                            value: prevCopy,
                                            enumerable: true,
                                            configurable: true
                                        }
                                    );

                                    this.props.onChange( this._value, ObjFieldChangeReason.fieldNameEdited )
                                }} 
                                defaultValue="field" 
                            />
                            <FieldValue />
                            </Center>
                        )]
                    })

                }}>
                    Add a field
                </Button>
            </Stack>
        );
    }
}

