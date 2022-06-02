import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button, DrawerFooter } from "@chakra-ui/react";
import React from "react";
import CardanoGlobalCtx from "../../../../../cardano/CardanoGlobalCtx";
import makeProducerTx from "../../../../../cardano/Trace/ProducerTx";
import Trace, { TraceMetadata } from "../../../../../cardano/Trace/TraceMetadata";
import Debug from "../../../../../utils/Debug";
import Utils from "../../../../../utils/Utils";
import MetadataForm from "./MetadataForm";


interface MetadataDarawerProps {
    close: () => void
    shoudBeOpen: boolean
}

interface MetadataDarawerState {

}

class MetadataDrawer extends React.Component<MetadataDarawerProps, MetadataDarawerState>
{
    private metadataFormRef: React.RefObject<MetadataForm> = React.createRef<MetadataForm>();

    constructor(props: MetadataDarawerProps)
    {
        super(props);
    }

    render(): React.ReactNode
    {
        return(
            <Drawer
                onClose={this.props.close}
                isOpen={this.props.shoudBeOpen}
                size="full"
            >
                <DrawerOverlay />

                <DrawerContent>
                
                    <DrawerCloseButton />

                    <DrawerHeader>Add product informations</DrawerHeader>
                    
                    <DrawerBody>
                        <MetadataForm ref={this.metadataFormRef} />
                    </DrawerBody>
                    
                    <DrawerFooter>

                        <Button
                            variant="solid-shadow"
                            colorScheme='d-green'
                            onClick={async () => {
                                const meta =
                                    // refs migth be undefined, make sure there is one
                                    this.metadataFormRef.current &&
                                    // get cardano metadata from object
                                    TraceMetadata.jsObjToMetadata(
                                        Utils.Object.copySerializable(
                                            this.metadataFormRef.current.getMetadata()
                                        )
                                    );
                                
                                if( !meta )
                                {
                                    throw Error("unable to get metadata, probably a problem with React component refernces");
                                }
                                
                                const wallet = CardanoGlobalCtx.getWalletIfAny();

                                if( wallet === undefined )
                                {
                                    throw Error("no wallet setted so far");
                                }

                                let walletAddresses : string[] = await wallet.getUsedAddresses();
                                if( walletAddresses.length <= 0 )
                                {
                                    walletAddresses = await wallet.getUnusedAddresses();
                                }

                                Debug.log(
                                    "Metadata Drawer button, going to make producer tx"
                                );

                                const producerTx = await makeProducerTx(
                                    meta,
                                    walletAddresses[0],
                                    await wallet.getUtxos()
                                );

                                Debug.log(
                                    "Metadata Drawer button, made producer tx"
                                );

                                await CardanoGlobalCtx.submitTransactionWith(
                                    await CardanoGlobalCtx.signTransactionWith(
                                        producerTx
                                    )
                                )
                            }}
                        >
                            Send
                        </Button>

                    </DrawerFooter>

                </DrawerContent>

            </Drawer>
        );
    }
}

export default MetadataDrawer;