import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";
import MetadataDrawer from "../../../components/page-specific/app/producers/make-a-trace/MetadataDrawer";


export interface MakeATracePageProps {

}

const MakeATracePage: React.FC<MakeATracePageProps> = ({} : MakeATracePageProps) =>
{
    const { 
        onOpen: openMetadataDrawer, 
        onClose: closeMetadataDrawer, 
        isOpen: isMetadataDrawerOpen
    } = useDisclosure({defaultIsOpen: false});

    return(
        <Box
        style={{
            display: "flex", flexDirection: "row",
            justifyContent: "center", alignItems: "center",
            height:"100%",
        }}
        className="
        placeholdr-dbg-border
        "
        >
            <Button
            variant="solid-shadow"
            colorScheme="d-green"
            onClick={openMetadataDrawer}
            >
                Create new
                <AddIcon ml="0.6vw" />
            </Button>
            <MetadataDrawer
            close={closeMetadataDrawer}
            shoudBeOpen={isMetadataDrawerOpen}
            />
        </Box>
    );
}

export default MakeATracePage;