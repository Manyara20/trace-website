import { Box, Switch } from "@chakra-ui/react";
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
                                    <></>
                                );
                            break;
                            case "hour":
                                return(
                                    <></>
                                );
                            break;
                            case "date":
                                return(
                                    <></>
                                );
                            break;
                            case "range":
                                return(
                                    <></>
                                );
                            break;
                            case "percentage":
                                return(
                                    <></>
                                );
                            break;
                            case "mail":
                                return(
                                    <></>
                                );
                            break;
                            case "link":
                                return(
                                    <></>
                                );
                            break;
                            case "text":
                                return(
                                    <></>
                                );
                            break;
                            case "list":
                                return(
                                    <></>
                                );
                            break;
                            case "obj":
                                return(
                                    <></>
                                );
                            break;
                        }
                    })()
                }
            </Box>
        );
    }
}

