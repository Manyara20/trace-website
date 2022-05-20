import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button, DrawerFooter } from "@chakra-ui/react";
import React from "react";
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
                            onClick={() => {
                                alert( 
                                    JSON.stringify(
                                        this.metadataFormRef.current?.getMetadata(),
                                        undefined,
                                        2
                                    )
                                );
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