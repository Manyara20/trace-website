import { Center } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import { text } from "stream/consumers";
import { NewProducerDialogBtn, NewProducerDialogBtnProps } from "./NewProducerDialog";

export interface NewProducerInputLayoutProps
{
// to do? 
}

export interface NewProducerInputLayoutState
{
// to do?
}

export default class NewProducerInputLayout extends React.Component< NewProducerInputLayoutProps, NewProducerInputLayoutState >
{
    constructor( props: NewProducerInputLayoutProps )
    {
        super(props);
    }

    render()
    {
        return(
            <Center
            style={{
                height: "100%",
                maxHeight: "100vh",
                padding: "0 8vw",
                flexDirection: "column"
            }}
            >
                <Center
                style={{
                    width: "100%",
                    height: "20%",
                    minHeight: "fit-content",

                    paddingTop: "min( 5vw, 15vh )",
                    
                    fontSize: "max( 4vw, 4vh )",

                    color: "#fff",
                    textShadow: "0.33vh 0.33vh #00540c"
                }}
                className="
                no-dbg
                "
                >
                    {this.props.prompt}
                </Center>

                <Center
                style={{
                    width: "100%",
                    height: "20%",

                    fontSize: "max( 2.4vw, 3vh )",
                    paddingTop: "min( 5vw, 2vh )",

                    color: "#fff",
                    textShadow: "0.2vh 0.2vh #00540c",
                }}
                className="
                no-dbg
                "
                >
                    {this.props.withInputComponent}
                </Center>

                <Center
                style={{
                    width: "70%",
                    height: "30%",
                    justifyContent: "space-evenly",
                    alignContent: "space-evenly"
                }}
                className="no-dbg"
                >
                    { this.props.goBackBtnProps !== undefined && 
                    <NewProducerDialogBtn
                        color="gray"
                        {...this.props.goBackBtnProps} 
                    />
                    }
                    { this.props.goNextBtnProps !== undefined && <NewProducerDialogBtn {...this.props.goNextBtnProps} />}
                </Center>

            </Center>
        ); 
    }
}