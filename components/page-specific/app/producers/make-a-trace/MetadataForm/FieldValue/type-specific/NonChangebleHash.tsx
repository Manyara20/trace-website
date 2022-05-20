import { Input, Text } from "@chakra-ui/react";
import React from "react";
import TypeUtils from "../../../../../../../../utils/TypeUtils";

export interface NonChangebleHashProps {
    hash: string
    onMount?: (hash: string) => void
}

interface NonChangebleHashState {

}

export default class NonChangebleHash extends React.Component< NonChangebleHashProps, NonChangebleHashState >
{
    constructor(props: NonChangebleHashProps)
    {
        super(props);

        if( !TypeUtils.isHexString(props.hash) )
        {
            throw Error("trying to construct a NonChangebleHash component without an hexadecimal string as hash; input was: " + this.props.hash )
        }
        
        this.state = {

        };

        this.props.onMount && this.props.onMount( this.props.hash );
    }
    
    render(): React.ReactNode
    {

        return (
            <Input
            isDisabled
            defaultValue={this.props.hash} 
            />
        );
    }
}