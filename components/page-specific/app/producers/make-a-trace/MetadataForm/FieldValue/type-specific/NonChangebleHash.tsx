import React from "react";
import TypeUtils from "../../../../../../../../utils/TypeUtils";

export interface NonChangebleHashProps {
    hash: string
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
    }
    
    render(): React.ReactNode
    {

        return (
            null
        );
    }
}