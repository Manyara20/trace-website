import { Button, Stack, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import ScreenSizeSection from '../components/elements/ScreenSizeSeciton.ts'
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';

const Home: NextPage = () => {

    const router : NextRouter = useRouter();

    const noDocsToast = useToast();

    return (
        <div className="
        fixed-screen-width
        min-screen-height
        "
        >
            <Head>
                <title>Trace</title>
                <meta name="description" content="decentralized product tracing service on the Cardano blockchain" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ScreenSizeSection
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                backgroundImage: "linear-gradient( -135deg, #7dc -60%, #28AB1F )"
            }}
            className="placeholder-dbg-border"
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
                                colorScheme='blue'
                                variant='solid'
                                onClick={() => {
                                    router.push("/app")
                                }}
                                size="lg"
                                >
                                    App
                                </Button>
                                {/*<Button
                                    colorScheme='gray'
                                    color="#fff"
                                    _hover={{ color: "#4b4b4b" , bg: "#EDF2F7"}}
                                    variant='outline'
                                    onClick={() => {
                                        // router.push("/app")
                                    }}
                                    >
                                        Docs
                                </Button>*/}
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
                    <div
                    style={{
                        border: "3px dashed black",
                        borderRadius: "50%",

                        height: "min( 50vw, 50vh )",
                        width:  "min( 50vw, 50vh )",
                        
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    className="placeholder-dbg-border"
                    >
                        logo here
                    </div>
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
