import {
    Box,
    Divider, Input, Stack, Text,
  } from '@chakra-ui/react'
import { NextRouter, withRouter } from "next/router"
import React from "react";
import { ReactNode } from "react"


interface ApplicationProps {
    router: NextRouter
}

interface ApplicationState {
    quadrantSize: string
}

class Application extends React.Component<ApplicationProps, ApplicationState>
{
    private _traceOuterBoxRef : React.RefObject<any> = React.createRef<any>();

    constructor(props: ApplicationProps)
    {
        super(props);

        this.state = {
            quadrantSize: "min( 35vw, 46vh )"
        }
    }

    componentDidMount()
    {
        this._traceOuterBoxRef.current.addEventListener("mouseenter", () => {
            this.setState({
                quadrantSize: "min( 33vw, 43vh )"
            })
        })

        this._traceOuterBoxRef.current.addEventListener("mouseleave", () => {
            this.setState({
                quadrantSize: "min( 35vw, 46vh )"
            })
        })
    }

    render(): ReactNode {
        
        /*
        in case of app page longer than the screen height use this as page container
        <div className="
            fixed-screen-width
            min-screen-height
            "
        >
        */
        return (
            <Stack
            spacing="3vh"
            style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center",
                height:"100%",
            }}
            className="
            placeholder-dbg-border
            "
            >
                <Input placeholder='search for a transaction'
                size="lg"
                variant='filled'
                colorScheme="gray"
                style={{
                    width: "60%"
                }}
                />

                <Divider variant="solid" width="80%" colorScheme="d-green.900" />
                
                <Box
                ref={this._traceOuterBoxRef}
                style={{
                    backgroundColor: "#fff",
                    width:  "min( 40vw, 57vh )",
                    height: "min( 40vw, 57vh )",

                    borderRadius: 25,

                    display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "center",
                }}
                >
                    <Box
                    style={{
                        position: "relative",

                        backgroundColor: "#fff0",
                        width:  this.state.quadrantSize,
                        height: this.state.quadrantSize,

                        borderRadius: 17,

                        display: "flex", flexDirection: "column",
                        justifyContent: "center", alignItems: "center",
                    }}
                    >
                        <Box
                        style={{
                            position: "absolute",

                            top: 0, left: 0,
                            width:  "14%",
                            height: "14%",

                            borderTopLeftRadius: 6,

                            borderTop:  "solid 5px #2c6b36",
                            borderLeft: "solid 5px #2c6b36",
                        }} 
                        />
                        <Box
                        style={{
                            position: "absolute",

                            top: 0, right: 0,
                            width:  "14%",
                            height: "14%",

                            borderTopRightRadius: 6,

                            borderTop:  "solid 5px #2c6b36",
                            borderRight: "solid 5px #2c6b36",
                        }} 
                        />
                        <Box
                        style={{
                            position: "absolute",

                            bottom: 0, left: 0,
                            width:  "14%",
                            height: "14%",

                            borderBottomLeftRadius: 6,

                            borderBottom:  "solid 5px #2c6b36",
                            borderLeft: "solid 5px #2c6b36",
                        }} 
                        />
                        <Box
                        style={{
                            position: "absolute",
                            bottom: 0, right: 0,
                            width:  "14%",
                            height: "14%",

                            borderBottomRightRadius: 6,

                            borderBottom:  "solid 5px #2c6b36",
                            borderRight: "solid 5px #2c6b36",
                        }} 
                        />
                        <Text>
                            Trace it
                        </Text>
                    </Box>
                </Box>
            </Stack>
        )
    }

}

export default withRouter(Application);


