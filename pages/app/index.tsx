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
  } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import ScreenSizeSection from "../../components/elements/ScreenSizeSeciton.ts"
import { NextRouter, useRouter } from "next/router"


const Application: NextPage = () => {

    const router : NextRouter = useRouter();


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

            <WalletsModal/>


            <ScreenSizeSection
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                backgroundImage: "linear-gradient( -135deg, #fff -160%, #28AB1F )"
            }}
            className="placeholder-dbg-border"
            >
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


function WalletsModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ walletToastShouldFire, setwalletToastShouldFire ] = useState(false);
    
    useEffect(() => {
        onOpen();
        setwalletToastShouldFire(true)
    }, [])
  
    const noWallletsToast = useToast();

    useEffect(() => {
        console.log("use effect");

        if( walletToastShouldFire ) {
            noWallletsToast({
                title: 'Wallet connection not yet implemented',
                description: "Wallet connection is being implemented, you can follow us on twitter to stay updated. Thank you for you patience!",
                status: 'error',
                duration: null,
                isClosable: true
            })
        }
        
    }, [walletToastShouldFire]);

    return (
      <>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Connect your wallet</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              No wallet found :(
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }