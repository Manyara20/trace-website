import { ChevronDownIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, Center, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import IFieldValueProps from "../IFieldValueProps";


export enum LinkFieldValueProtocol {
    http  = "http://",
    https = "https://",
    ipfs  = "ipfs://"
}

const protocols : LinkFieldValueProtocol[] = [
    LinkFieldValueProtocol.http,
    LinkFieldValueProtocol.https,
    LinkFieldValueProtocol.ipfs,
];

export interface LinkFieldValueProps extends IFieldValueProps {
    defaultValue?: string
}

interface LinkFieldValueState {
    protocol: LinkFieldValueProtocol
}

export default class LinkFieldValue extends React.Component< LinkFieldValueProps, LinkFieldValueState >
{
    private _lastEdit: number;
    private _noProtocolLink: string = "";

    constructor( props: LinkFieldValueProps )
    {
        super( props );

        this.state = {
            protocol: LinkFieldValue.extractProtocol( this.props.defaultValue ?? "" ) || LinkFieldValueProtocol.https
        }

        this._setProtocol_and_callChange = this._setProtocol_and_callChange.bind(this);
        this._setLink_and_callChange = this._setLink_and_callChange.bind(this);
        this._callChange = this._callChange.bind(this);

        this._lastEdit = Date.now();
        this._callChange();
    }

    render(): React.ReactNode
    {
        return(
            <InputGroup>
                <InputLeftAddon children={
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {this.state.protocol}
                        </MenuButton>
                        <MenuList>
                            {
                                protocols.map( p => {
                                    return (
                                        <ProtocolMenuItem
                                        protocol={p}
                                        onClick={this._setProtocol_and_callChange}
                                        />
                                    );
                                })
                            }
                        </MenuList>
                    </Menu>
                    } />
                <Input type="url"
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) =>
                        this._setLink_and_callChange(event.target.value)
                }
                />
            </InputGroup>
        );
    }

    private _callChange()
    {

        const callChange = () => setTimeout(
            () => {
                if( Date.now() - this._lastEdit < 500 )
                {
                    return;
                }
                else
                {
                    this.props.onChange( this.state.protocol + this._noProtocolLink )
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }

    private _setProtocol_and_callChange( protocol: LinkFieldValueProtocol )
    {
        this.setState({
            protocol: protocol
        },
        () => this._callChange()
        )
    }

    private _setLink_and_callChange( noProtocolLink: string )
    {
        this._noProtocolLink = noProtocolLink.trimStart();

        this._callChange();
    }

    public static isSupportedProtocol( link: string ): boolean
    {
        return(
            link.startsWith( "http://") ||
            link.startsWith( "https://") ||
            link.startsWith( "ipfs://")
        );
    }

    private static extractProtocol( link: string ) : (LinkFieldValueProtocol | undefined)
    {

        if( link.startsWith( "https://") ) return LinkFieldValueProtocol.https;
        if( link.startsWith( "http://") ) return LinkFieldValueProtocol.http;
        if( link.startsWith( "ipfs://") ) return LinkFieldValueProtocol.ipfs;
    }
}




interface ProtocolMenuItemProps {
    protocol: LinkFieldValueProtocol
    onClick: (thisProtocol : LinkFieldValueProtocol) => void
}

function ProtocolMenuItem({protocol, onClick}: ProtocolMenuItemProps)
{
    return (
        <MenuItem 
        onClick={() => onClick( protocol ) }

        margin="auto"
        >
            {protocol}
        </MenuItem>
    );
}