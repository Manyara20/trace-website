import Head from "next/head"

import Image from "next/image";

// for wallet connection
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    Stack,
    VStack,
    StackDivider,
    Box,
    Heading,
    Center,
    ButtonGroup,
  } from '@chakra-ui/react'
  import { NextRouter, useRouter, withRouter } from "next/router"
  import React from "react";
  import { ReactNode, useState } from "react"
  
  import ScreenSizeSection from "../../components/elements/ScreenSizeSeciton.ts"
  
  import Wallet from "../../ownWallets"

interface ApplicationProps {
    router: NextRouter
}

interface ApplicationState {
    wallet: object | null
    Iwallet: object | null

    connectingWallet: boolean 

    walletInfos : WalletInfos
    isWalletModalOpen: boolean
}

interface WalletInfos
{
    cborBalance: string
}

class Application  extends React.Component<ApplicationProps, ApplicationState>
{
    constructor(props: ApplicationProps)
    {
        super(props);

        this.state = {
            wallet: null,
            Iwallet: null,
            connectingWallet: false,
            isWalletModalOpen: false,
            walletInfos : {
                cborBalance: "",
            },
        }

        this.openWalletModal = this.openWalletModal.bind(this);
        this.closeWalletModal = this.closeWalletModal.bind(this);
    }

    
    render(): ReactNode {
        
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

                <WalletsModal
                shouldBeOpen={this.state.isWalletModalOpen}
                closeModal={this.closeWalletModal}
                connectWallet={async (str) => {

                    this.setState({
                        connectingWallet: true
                    })
                    
                    console.log(str);

                    if( str === "eternl")  { str = Wallet.Names.CCVault };
                    
                    Wallet.enable( str ).then(
                        async (_) => {

                            const w = Wallet.get( str );
        
                            this.setState({
                                wallet: w,
                                walletInfos: {
                                    cborBalance: await w.raw.getBalance()
                                },
                                connectingWallet: false,
                            });
                            
                        }
                    );

                    this.setState({
                        Iwallet: await Wallet.getInterface( str )
                    })
                }}
                />

                <ScreenSizeSection
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    backgroundImage: "linear-gradient( 165deg, #7dc -50%, #28AB1F 150% )"
                }}
                className="
                dbg-border
                "
                >

                    <Stack
                    spacing={8}
                    direction='row'
                    
                    align="center" justify="end"

                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "10%",
                        paddingRight: "3%",
                    }}
                    className="
                    placeholder-dbg-border
                    "
                    >
                    
                        {
                            this.state.wallet !== null ?
                            <ButtonGroup 
                            colorScheme='blue'
                            spacing='6'
                            >
                                <Button>{(this.state.Iwallet as any).name}</Button>
                            </ButtonGroup>
                            :
                            <Button
                            isLoading={this.state.connectingWallet}
                            loadingText="Connecting"
                            colorScheme='blue'
                            variant='solid'
                            onClick={this.openWalletModal}
                            >
                                Connect wallet
                            </Button>
                        }

                    </Stack>


                    <Button 
                    colorScheme='blue'
                    variant='solid'
                    onClick={() => {
                        this.props.router.back()
                    }}
                    className="
                    centred-on-relative-parent 
                    "
                    >
                        Go back Home
                    </Button>

                </ScreenSizeSection>
            
            </div>
        )
    }


    private openWalletModal()
    {
        this.setState({
            isWalletModalOpen: true
        })
    }
    
    private closeWalletModal()
    {
        this.setState({
            isWalletModalOpen: false
        })
    }


}


export default withRouter(Application);



interface WalletsModalProps {
    shouldBeOpen: boolean,
    closeModal: () => void,
    
    /*
    takes the name of the selected wallet as input and then
    */
    connectWallet: ( walletName : string ) => Promise<void>
}

function WalletsModal({shouldBeOpen , closeModal, connectWallet } : WalletsModalProps)
{

    if( typeof window === "undefined" ) return null;


    const wInterfaces = Wallet.stringNames.map( wName => {
        if( Wallet.has(wName) )
        {
            return Wallet.getInterface( wName );
        }
        return undefined;
    })
    .filter( maybeIWallet => maybeIWallet != undefined );


    const [ selectedWalletN , setSelectedWallet ] = useState<string>("")

    function closeModalAncClearState()
    {
        setSelectedWallet("");
        closeModal();
    }

    return (
      <>
        <Modal
        isCentered
        isOpen={shouldBeOpen} onClose={closeModalAncClearState}
        
        closeOnOverlayClick={false} 
        blockScrollOnMount={false}
        scrollBehavior="inside"
        size="xl"

        >

          <ModalOverlay
                bg='blackAlpha.200'
                backdropFilter='blur(3px)'
          />

          <ModalContent>
            
            <ModalHeader>Connect your wallet</ModalHeader>
            
            <ModalCloseButton />
            
            <ModalBody>
                {
                    wInterfaces.length == 0 ? <Heading fontSize="xl">No wallet was found :(</Heading> :
                    <Stack
                    direction="column"
                    divider={<StackDivider borderColor='gray' />}
                    spacing={6}
                    align='stretch'
                    >
                        {wInterfaces.map( Iwallet =>
                        {
                            if(Iwallet.icon == "" ) return null;

                            return (
                                <Stack
                                direction="row"
                                spacing={8}

                                key={Iwallet.name+"_card"}

                                
                                >
                                    <Center
                                    as="button"
                                    width="100%"
                                    style={{
                                        position: "relative",
                                        height: "calc( min( 12vw, 12vh) + 18px )",
                                        borderRadius: 18,
                                        border: ( Iwallet.name === selectedWalletN ? "#49B94Faa" : "#aaaa") + " 4px solid",
                                        margin: "0 15%",
                                        backgroundColor: Iwallet.name === selectedWalletN ? "#49B94F22" : ""
                                    }}
                                    className="
                                    "
                                    onClick={() => {
                                        setSelectedWallet( Iwallet.name )
                                    }}
                                    >
                                        <div
                                        style={{
                                            width:
                                                "min( 10vw, 10vh)",
                                            height:
                                                Iwallet.name === Wallet.Names.Typhon ? "min( 7vw, 7vh)": 
                                                "min( 10vw, 10vh)",
                                            position: "absolute",
                                            left: "2vw"
                                        }}
                                        className="
                                        "
                                        >
                                            <Image
                                            layout="fill"
                                            src={
                                                Iwallet.name === Wallet.Names.Typhon ? "/logos/cardano/typhon.svg" : 
                                                Iwallet.icon
                                            }
                                            />
                                        </div>
                                        <Center
                                        className="
                                        "
                                        >
                                            <Heading 
                                            fontSize="xl"
                                            style={{
                                                position: "absolute",
                                                right: "2vw"
                                            }}
                                            >
                                                {Iwallet.name[0].toUpperCase() + Iwallet.name.slice(1)}
                                            </Heading>
                                        </Center>
                                    </Center>
                                </Stack>
                            );
                        })}
                    </Stack>
                }
            </ModalBody>


            <ModalFooter>

                <Button
                colorScheme="green"
                variant="outline"
                mr={5} //margin-rigth

                onClick={closeModalAncClearState}
                >
                    Close
                </Button>

                <Button
                disabled={ selectedWalletN === "" }
                colorScheme='green'
                mr={3} //margin-rigth

                onClick={() => {
                    connectWallet( selectedWalletN );

                    closeModalAncClearState();
                }}
                >
                    Connect
                </Button>

            </ModalFooter>

          </ModalContent>
        </Modal>
      </>
    )
  }