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
                backgroundImage: "linear-gradient( 135deg, #7dc -60%, #28AB1F )"
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

                            <Box
                            style={{
                                position: "relative",

                                top: "-15%",
                                left: "-10%",

                                height: "130%",
                                width: "120%",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            className="
                            placeholder-dbg-border
                            "
                            >
                                <Box
                                style={{
                                    position: "absolute",
    
                                    top: "35%",

                                    borderRadius: 100000,
                                    backgroundColor: "#035b10",

                                    boxShadow: "0 0 40px -10px #00540c",

                                    height: "26%",
                                    width: "100%",
    
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                className="
                                placeholder-dbg-border
                                "
                                />
                                <Image
                                layout="fill"
                                src="/trace/name_only_white.svg"
                                />
                            </Box>

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
                                    const appWindow = window.launchApplication( window.location.origin + "/app/trace-it" , "_trace_app" );


                                    //@ts-ignore
                                    appWindow.launchApplication = appWindow.launchApplication ?? {};

                                    appWindow.launchApplication.winrefs = appWindow.launchApplication.winrefs ?? {};
                                    //@ts-ignore
                                    appWindow.launchApplication.winrefs["_trace_home"] = window; 

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

                        borderRadius: "50%",

                        height: "min( 55vw, 55vh )",
                        width:  "min( 55vw, 55vh )",
                        
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        boxShadow: "0 0 40px -5px #00540c"
                    }}
                    >
                        <Box
                        style={{

                            position: "relative",
    
                            height: "min( 40vw, 40vh )",
                            width:  "min( 40vw, 40vh )",
                            
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
    
                        }}
                        >
                            <Image
                            layout="fill"
                            src="/trace/fingerprint_only.svg"
                            />
                        </Box>
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
