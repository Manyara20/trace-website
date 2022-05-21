import { CloseIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";

interface RemotionButtonProps {
    onClick: () => void
    bgColor?: string
}

interface RemotionButtonState {

}

export default class  RemotionButton extends React.Component< RemotionButtonProps, RemotionButtonState >
{
    constructor( props: RemotionButtonProps )
    {
        super(props);

    }

    render(): ReactNode
    {

        return(
            <IconButton 
            aria-label="remotion-button"
            size="sm"

            colorScheme="red"
            variant="ghost"

            style={{
                marginLeft: 10,
            }}
         
            icon={<CloseIcon boxSize="8px" />}
            onClick={this.props.onClick}
            />
        )
    }
}