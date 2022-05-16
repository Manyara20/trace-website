import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import React from "react";
import MetadataFieldCreator from "./MetadataFieldCreator";


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
                    <MetadataFieldCreator/>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        );
    }
}

export default MetadataDrawer;