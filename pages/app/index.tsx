import { NextPage } from "next"
import Head from "next/head"

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
  } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import ScreenSizeSection from "../../components/elements/ScreenSizeSeciton.ts"
import { NextRouter, useRouter } from "next/router"


const Application: NextPage = () =>
{
    const router : NextRouter = useRouter();
    
    const { isOpen, onOpen: openWalletsModal , onClose } = useDisclosure({defaultIsOpen: false})
    const noWallletsToast = useToast();

    const [ walletToastShouldFire, setWalletToastShouldFire ] = useState(false);
    

    useEffect(() => {
        console.log("use effect");

        if( walletToastShouldFire )
        {
            
            noWallletsToast({
                title: 'Wallet connection not yet implemented',
                description: "Wallet connection is being implemented, you can follow us on twitter to stay updated. Thank you for you patience!",
                status: 'error',
                duration: null,
                isClosable: true
            })

            setWalletToastShouldFire( false );
        }

        
    }, [walletToastShouldFire]);

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

            <WalletsModal shouldBeOpen={isOpen} onClose={onClose} />

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
                

                    <Button 
                    colorScheme='blue'
                    variant='solid'
                    onClick={() => {
                        setWalletToastShouldFire(true);
                        openWalletsModal();
                    }}
                    >
                        Connect wallet
                    </Button>

                </Stack>


                <Button 
                colorScheme='blue'
                variant='solid'
                onClick={() => {
                    router.back()
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

export default Application;

interface WalletsModalProps {
  shouldBeOpen: boolean,
  onClose: () => void
}

function WalletsModal({shouldBeOpen , onClose } : WalletsModalProps) {


    return (
      <>
        <Modal blockScrollOnMount={false} isOpen={shouldBeOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            
            <ModalHeader>Connect your wallet</ModalHeader>
            
            <ModalCloseButton />
            
            <ModalBody>
              No wallet found :(
            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
  }