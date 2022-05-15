import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack } from "@chakra-ui/react";
import React from "react";
import Wallet from "../../../../ownWallets";

import WalletsModal from "./WalletsModal";


export interface AppTopBarProps {
}

interface AppTopBarState {
    wallet: object | null
    Iwallet: object | null

    walletConncetionAction: "Connecting" | "Disconnecting" | ""

    walletInfos : WalletInfos
    isWalletModalOpen: boolean
}

interface WalletInfos
{
    cborBalance: string
}


/**
 * MUST be placed in a relative positioned parent
 */
class AppTopBar extends React.Component<AppTopBarProps, AppTopBarState>
{
    private _connectedWalletName?: string;

    constructor( props: AppTopBarProps )
    {
        super(props);

        this.state = {
            wallet: null,
            Iwallet: null,
            walletConncetionAction: "",
            isWalletModalOpen: false,
            walletInfos : {
                cborBalance: "",
            },
        }

        this.openWalletModal = this.openWalletModal.bind(this);
        this.closeWalletModal = this.closeWalletModal.bind(this);

        this.connectWallet = this.connectWallet.bind(this);
        this.disconnectWallet = this.disconnectWallet.bind(this);
        this.getConnectedWallet = this.getConnectedWallet.bind(this); 
    }

    componentDidMount()
    {
        
        this.getConnectedWallet();

        if( this._connectedWalletName !== undefined )
        {
            if( !Wallet.has( this._connectedWalletName ) )
            {
            }
            else Wallet.enable( this._connectedWalletName )
            .then( () => {

                const wallet = Wallet.get( this._connectedWalletName );

                const Iwallet = Wallet.getInterface( this._connectedWalletName )

                this.setState({
                    wallet: wallet,
                    Iwallet: Iwallet
                });

            });
        }

        this.setState({
            walletConncetionAction: ""
        })
    }

    render(): React.ReactNode
    {
        return (
            <Stack
                spacing={8}
                direction='row'
                
                align="center" justify="end"

                style={{
                    position: "absolute",
                    width: "100%",
                    height: "10%",
                    paddingRight: "3%",
                    top: 0,
                    left: 0
                }}
                
                className="
                placeholder-dbg-border
                "
                >
                    <WalletsModal
                        shouldBeOpen={this.state.isWalletModalOpen}
                        closeModal={this.closeWalletModal}
                        connectWallet={this.connectWallet}
                    />
                    {
                        this.state.wallet !== null ?
                        
                        <Popover>
                            <PopoverTrigger>
                                <Button
                                colorScheme='blue'
                                mr={6}
                                >
                                    {(this.state.Iwallet as any).name}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent mr={6}>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Button
                                    variant="outline"
                                    colorScheme='blue'
                                    style={{
                                        width:"100%"
                                    }}
                                    mr={6}
                                    onClick={this.disconnectWallet}
                                    >
                                        Disconnect
                                    </Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                        
                        :
                        <Button
                        isLoading={this.state.walletConncetionAction !== ""}
                        loadingText={this.state.walletConncetionAction}
                        colorScheme='blue'
                        variant='solid'
                        onClick={this.openWalletModal}
                        >
                            Connect wallet
                        </Button>
                    }

            </Stack>
        )
    }

    private openWalletModal()
    {
        this.setState({
            isWalletModalOpen: true
        })
    }
    
    private closeWalletModal()
    {
        this.setState({
            isWalletModalOpen: false
        })
    }

    private async connectWallet( wName: string )
    {
        this.setState({
            walletConncetionAction: "Connecting"
        })
        
        if( wName === "eternl")  { wName = Wallet.Names.CCVault };

        window.localStorage.setItem("CardanoTrace_user_connectedWallet", wName )
        
        Wallet.enable( wName ).then(
            async (_) => {

                const w = Wallet.get( wName );

                this.setState({
                    wallet: w,
                    walletInfos: {
                        cborBalance: await w.raw.getBalance()
                    },
                    walletConncetionAction: "",
                });
                
            }
        );

        this.setState({
            Iwallet: await Wallet.getInterface( wName )
        })
    }
    
    private disconnectWallet()
    {
        this.setState({
            walletConncetionAction: "Disconnecting"
        })

        if( typeof window === "undefined") return;

        window.localStorage.removeItem("CardanoTrace_user_connectedWallet");

        this.setState({
            wallet: null,
            Iwallet: null,
            walletConncetionAction: ""
        })
    }

    private getConnectedWallet()
    {
        if( typeof window === "undefined") return;

        this._connectedWalletName = window.localStorage.getItem("CardanoTrace_user_connectedWallet") ?? undefined
    }

}

export default AppTopBar;