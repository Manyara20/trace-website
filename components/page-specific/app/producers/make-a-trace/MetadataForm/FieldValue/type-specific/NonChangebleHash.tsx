import { Input, Text } from "@chakra-ui/react";
import React from "react";
import Utils from "../../../../../../../../utils/Utils";

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

        if( !Utils.isHexString(props.hash) )
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
            style={{
                width:"90%",
                margin: "auto 5%",
            }}
            defaultValue={this.props.hash} 
            />
        );
    }
}