import { Box, Button, Center, Stack, Tab, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import ScreenSizeSection from '../components/elements/ScreenSizeSeciton.ts'
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';

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
            no-dbg
            "
            >
                <div
                style={{
                    flex:13,
                    position: "relative"
                }}
                className="no-dbg"
                >

                    <div
                    style={{
                        width:  "70%",
                        height: "70%",
                        position: "relative"
                    }}
                    className="
                    no-dbg
                    centred-on-relative-parent
                    "
                    >
                        <div
                        style={{
                            height: "70%",
                            position: "relative",
                        }}
                        className="
                        no-dbg
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
                            no-dbg
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
                                no-dbg
                                "
                                />
                                <Image
                                layout="fill"
                                src="/trace/fingerprint/name_only_white.svg"
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
                            no-dbg
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
                                no-dbg
                                "
                                >

                                    <h3
                                    style={{
                                        fontSize: "3vh",
                                        textAlign: "center",
                                        color: "#efe",
                                    }}
                                    className="
                                    no-dbg
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
                                no-dbg
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
                         no-dbg
                        "

                        >

                            <Stack
                            direction='row'
                            spacing={4} 
                            align='center' justify="center" 
                            className="
                             no-dbg
                            centred-on-relative-parent
                            "
                            >

                                <Button
                                colorScheme='d-green'
                                variant='solid'
                                size="lg"

                                onClick={() => {
                                    /* // attempt to open single page on two clicks
                                    //@ts-ignore
                                    window.name = "_trace_home";
                                    //@ts-ignore
                                    const appWindow = window.launchApplication( window.location.origin + "/app/trace-it" , "_trace_app" );
                                    //@ts-ignore
                                    appWindow.launchApplication = appWindow.launchApplication ?? {};
                                    appWindow.launchApplication.winrefs = appWindow.launchApplication.winrefs ?? {};
                                    //@ts-ignore
                                    appWindow.launchApplication.winrefs["_trace_home"] = window; 
                                    */
                                    router.push("/app/trace-it");
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
                className="no-dbg min-screen-height "
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
                            src="/trace/fingerprint/fingerprint_only.svg"
                            />
                        </Box>
                    </Box>
                </div>

                {/*just for padding*/}
                <div
                style={{
                    flex:2,
                }}
                className="no-dbg min-screen-height "
                />
                {/*just for padding*/}


            </ScreenSizeSection>

            {/* ----------------------------------------------- ROADMAP ----------------------------------------------- */}

            <ScreenSizeSection
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                backgroundImage: "linear-gradient( 45deg, #7dc -60%, #28AB1F )"
            }}
            className="
            no-dbg
            "
            >

                <Center
                style={{
                    width: "100%", height: "100%"
                }}
                className="
                no-dbg
                "
                >
                    
                    <Center
                    style={{
                        width: "80%", height: "80%",
                        position: "relative"
                    }}
                    className="
                    no-dbg
                    "
                    >

                        <Image 
                        src="/trace/roadmap/white-bg.png"
                        layout="fill"
                        />

                    </Center>

                </Center>

            </ScreenSizeSection>

            {/* ----------------------------------------------- What is TRACE ----------------------------------------------- */}

            <ScreenSizeSection
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                backgroundImage: "linear-gradient( 135deg, #7dc -60%, #28AB1F )"
            }}
            className="
            no-dbg
            "
            >

                <Center
                style={{
                    width: "100%", height: "100%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column"
                }}
                className="
                no-dbg
                "
                >

                    <Center
                    style={{
                        width: "100%",
                        flex:1
                    }}
                    className='
                    no-dbg
                    '
                    >
                        <h1
                        style={{
                            color: "#fff",
                            fontSize: "4em",
                            fontWeight: "bold"
                        }}
                        className='
                        no-dbg
                        '
                        >
                            What is Trace
                        </h1>
                    </Center>
                    <Center
                    style={{
                        width: "100%",
                        flex: 4,
                        display: "flex",
                        flexDirection: "row"
                    }}
                    className='
                    no-dbg
                    '
                    >
                        <Center
                        style={{
                            height: "100%",
                            maxHeight: "80vh",
                            flex:5,
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.4em",
                            padding: "10px 10%",
                            overflowY: "auto"
                        }}
                        className='
                        no-dbg
                        '
                        >
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Enim nec dui nunc mattis enim ut tellus elementum sagittis. 
                            Libero justo laoreet sit amet cursus sit. 
                            Aliquet eget sit amet tellus cras adipiscing. 
                            Dolor sit amet consectetur adipiscing elit ut aliquam. 
                            Ultrices in iaculis nunc sed. 
                            Tristique nulla aliquet enim tortor at auctor. 
                            Condimentum vitae sapien pellentesque habitant. 
                            Nunc sed blandit libero volutpat sed cras. 
                            Vitae ultricies leo integer malesuada. 
                            Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. 
                            Enim tortor at auctor urna nunc id cursus metus. 
                            Tortor vitae purus faucibus ornare suspendisse sed nisi. 
                            Duis ultricies lacus sed turpis tincidunt id aliquet. 
                        </Center>
                        <Center
                        style={{
                            height: "100%",
                            flex: 3,
                            display: "flex",
                            flexDirection: "row"
                        }}
                        className='
                        no-dbg
                        '
                        >
                            
                        </Center>
                    </Center>

                </Center>

            </ScreenSizeSection>

            {/* ----------------------------------------------- FOR PRODUCERS ----------------------------------------------- */}

            <ScreenSizeSection
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                backgroundImage: "linear-gradient( 45deg, #7dc -60%, #28AB1F )"
            }}
            className="
            no-dbg
            "
            >

                <Center
                style={{
                    width: "100%", height: "100%", maxHeight: "100vh",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column"
                }}
                className="
                no-dbg
                "
                >

                    <Center
                    style={{
                        width: "100%",
                        flex:1
                    }}
                    className='
                    no-dbg
                    '
                    >
                        <h1
                        style={{
                            color: "#fff",
                            fontSize: "4em",
                            fontWeight: "bold"
                        }}
                        id="trace-producer"
                        className='
                        no-dbg
                        '
                        >
                            For Producers
                        </h1>
                    </Center>
                    <Center
                    style={{
                        width: "100%",
                        flex: 4,
                        display: "flex",
                        flexDirection: "row"
                    }}
                    className='
                    no-dbg
                    '
                    >
                        <Center
                        style={{
                            height: "100%",
                            maxHeight: "80vh",
                            flex:5,
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.3em",
                            padding: "10px 5% 10px 10%",
                            overflowY: "auto"
                        }}
                        className='
                        no-dbg
                        '
                        >
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Enim nec dui nunc mattis enim ut tellus elementum sagittis. 
                            Libero justo laoreet sit amet cursus sit. 
                            Aliquet eget sit amet tellus cras adipiscing. 
                            Dolor sit amet consectetur adipiscing elit ut aliquam. 
                            Ultrices in iaculis nunc sed. 
                            Tristique nulla aliquet enim tortor at auctor. 
                            Condimentum vitae sapien pellentesque habitant. 
                            Nunc sed blandit libero volutpat sed cras. 
                            Vitae ultricies leo integer malesuada. 
                            Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. 
                            Enim tortor at auctor urna nunc id cursus metus. 
                            Tortor vitae purus faucibus ornare suspendisse sed nisi. 
                            Duis ultricies lacus sed turpis tincidunt id aliquet. 
                        </Center>
                        <Center
                        style={{
                            height: "100%",
                            flex: 5,
                            display: "flex",
                            flexDirection: "row"
                        }}
                        className='
                        no-dbg
                        '
                        >
                            <Button
                            fontSize='3xl'
                            style={{
                                width: "60%", minWidth: "fit-content",
                                height: "25%", minHeight: "fit-content",
                                borderRadius: "12px"
                            }}
                            onClick={() => {
                                router.push("/new-producer");
                            }}
                            >
                                Become a <br></br>
                                Trace Producer <br></br>
                                Now
                            </Button>
                        </Center>
                    </Center>

                </Center>

            </ScreenSizeSection>

            {/* ----------------------------------------------- TEAM ----------------------------------------------- */}
            {/*
            <ScreenSizeSection
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                backgroundImage: "linear-gradient( 135deg, #7dc -60%, #28AB1F )"
            }}
            className="
            no-dbg
            "
            >

            </ScreenSizeSection>
            //*/
            }
            {/*<ScreenSizeSection></ScreenSizeSection>*/}
        </div>
    )
}

export default Home
