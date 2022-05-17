import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
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
                <DrawerHeader>Add the product informations</DrawerHeader>
                <DrawerBody>
                    <MetadataForm/>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        );
    }
}

export default MetadataDrawer;