import { Box, Button, Stack, Tab, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import ScreenSizeSection from '../components/elements/ScreenSizeSeciton.ts'
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';

import app_constants from '../app_constants';
import TabsScript from '../components/page-specific/TabsScript';


const Home: NextPage = () => {

    const router : NextRouter = useRouter();

    const noDocsToast = useToast();

    return (
        <div className="
        fixed-screen-width
        min-screen-height
        "
        >
            <TabsScript />
            <ScreenSizeSection
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                backgroundImage: "linear-gradient( -135deg, #7dc -60%, #28AB1F )"
            }}
            className="
            placeholder-dbg-border
            "
            >
                <div
                style={{
                    flex:13,
                    position: "relative"
                }}
                className="placeholder-dbg-border"
                >

                    <div
                    style={{
                        width:  "70%",
                        height: "70%",
                        position: "relative"
                    }}
                    className="
                    placeholder-dbg-border
                    centred-on-relative-parent
                    "
                    >
                        <div
                        style={{
                            height: "70%",
                            position: "relative",
                        }}
                        className="
                        placeholder-dbg-border
                        "
                        >

                            <h1
                            style={{
                                height: "80%",
                                fontSize: "8em",
                                textAlign: "center",
                                color: "#efe",

                                fontWeight: "bold",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            className="
                            placeholder-dbg-border
                            "
                            >
                                Trace
                            </h1>

                            <div
                            style={{
                                height: "20%",
                                width:"40%",
                                position: "absolute",
                                right:0,
                                top: "65%",
                            }}
                            className="
                            placeholder-dbg-border
                            "
                            >
                                <div
                                style={{
                                    height: "50%",
                                    position: 'absolute',
                                    paddingBottom: 0,
                                    marginBottom:  0
                                }}
                                className="
                                placeholder-dbg-border
                                "
                                >

                                    <h3
                                    style={{
                                        fontSize: "3vh",
                                        textAlign: "center",
                                        color: "#efe",
                                    }}
                                    className="
                                    placeholder-dbg-border
                                    "
                                    >
                                        Built on
                                    </h3>

                                </div>

                                <div
                                style={{
                                    height: "50%",
                                    width: "70%",
                                    bottom:0,
                                    position: "absolute"
                                }}
                                className="
                                placeholder-dbg-border
                                "
                                >
                                    <Image
                                    layout='fill'
                                    src="/logos/cardano/Cardano-RGB_Logo-Full-Blue.svg"
                                    />
                                </div>
                            </div>


                        </div>


                        <div
                        style={{
                            position: "relative",
                            height: "30%",
                        }}
                        className="
                         placeholder-dbg-border
                        "

                        >

                            <Stack
                            direction='row'
                            spacing={4} 
                            align='center' justify="center" 
                            className="
                             placeholder-dbg-border
                            centred-on-relative-parent
                            "
                            >

                                <Button
                                colorScheme='d-green'
                                variant='solid'
                                size="lg"

                                onClick={() => {
                                    //@ts-ignore
                                    window.name = "_trace_home";
                                    //@ts-ignore
                                    const appWindow = window.launchApplication( app_constants.dbg_trace_url+ "app/trace-it" , "_trace_app" );

                                    try {
                                        //@ts-ignore
                                        appWindow.launchApplication = {};
                                        //@ts-ignore
                                        appWindow.launchApplication.winrefs["_trace_home"] = window; 
                                    }
                                    catch
                                    {
                                        // ignore errors
                                    }

                                    //router.push("/app/trace-it")
                                }}
                                >
                                    App
                                </Button>

                                <Button colorScheme="gray" variant="solid"
                                size="lg"
                                onClick={() =>
                                    noDocsToast({
                                      title: 'Documentation is being written',
                                      description: "We are currently writing the documentation, follow us on twitter to stay updated",
                                      status: 'warning',
                                      duration: 4500,
                                      isClosable: true,
                                    })
                                  }
                                >
                                    Docs
                                </Button>
                            </Stack>
                        </div>
                        
                    </div>

                    
                </div>

                <div
                style={{
                    flex:6,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                className="placeholder-dbg-border min-screen-height "
                >
                    
                    <Box
                    style={{
                        position: "relative",

                        backgroundColor: "#fff",

                        //border: "3px dashed black",
                        borderRadius: "50%",

                        height: "min( 55vw, 55vh )",
                        width:  "min( 55vw, 55vh )",
                        
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        boxShadow: "0 0 40px -5px #00540c"
                    }}
                    >
                        <Image
                        layout="fill"
                        src="/trace/trace_03_fingerprint_only.svg"
                        />
                    </Box>
                </div>

                {/*just for padding*/}
                <div
                style={{
                    flex:2,
                }}
                className="placeholder-dbg-border min-screen-height "
                />
                {/*just for padding*/}


            </ScreenSizeSection>
            {/*<ScreenSizeSection></ScreenSizeSection>*/}
        </div>
    )
}

export default Home
