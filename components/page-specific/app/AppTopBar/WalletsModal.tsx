import Image from "next/image"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Heading,
    Stack,
    StackDivider,
    Center,
    ModalFooter,
    Button
} from "@chakra-ui/react";
import { useState } from "react";
import Wallet from "../../../../ownWallets";


export interface WalletsModalProps {
    shouldBeOpen: boolean,
    closeModal: () => void,
    
    /*
    takes the name of the selected wallet as input and then
    */
    connectWallet: ( walletName : string ) => Promise<void>
}

export default function WalletsModal({shouldBeOpen , closeModal, connectWallet } : WalletsModalProps)
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

    function closeModalAndClearState()
    {
        setSelectedWallet("");
        closeModal();
    }

    return (
      <>
        <Modal
        isCentered
        isOpen={shouldBeOpen} onClose={closeModalAndClearState}
        
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

                onClick={closeModalAndClearState}
                >
                    Close
                </Button>

                <Button
                disabled={ selectedWalletN === "" }
                colorScheme='green'
                mr={3} //margin-rigth

                onClick={() => {
                    connectWallet( selectedWalletN );

                    closeModalAndClearState();
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