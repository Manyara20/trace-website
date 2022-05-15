import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import Wallet from "../../../../ownWallets";

import WalletsModal from "./WalletsModal";


export interface AppTopBarProps {

}

interface AppTopBarState {
    wallet: object | null
    Iwallet: object | null

    connectingWallet: boolean 

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
    constructor( props: AppTopBarProps )
    {
        super(props);

        this.state = {
            wallet: null,
            Iwallet: null,
            connectingWallet: false,
            isWalletModalOpen: false,
            walletInfos : {
                cborBalance: "",
            },
        }

        this.openWalletModal = this.openWalletModal.bind(this);
        this.closeWalletModal = this.closeWalletModal.bind(this);
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
                dbg-border
                "
                >
                    <WalletsModal
                        shouldBeOpen={this.state.isWalletModalOpen}
                        closeModal={this.closeWalletModal}
                        connectWallet={async (str) => {

                            this.setState({
                                connectingWallet: true
                            })
                            
                            if( str === "eternl")  { str = Wallet.Names.CCVault };
                            
                            Wallet.enable( str ).then(
                                async (_) => {

                                    const w = Wallet.get( str );
                
                                    this.setState({
                                        wallet: w,
                                        walletInfos: {
                                            cborBalance: await w.raw.getBalance()
                                        },
                                        connectingWallet: false,
                                    });
                                    
                                }
                            );

                            this.setState({
                                Iwallet: await Wallet.getInterface( str )
                            })
                        }}
                        />
                    {
                        this.state.wallet !== null ?
                        
                        <Button
                        colorScheme='blue'
                        mr={6}
                        >{(this.state.Iwallet as any).name}</Button>
                        :
                        <Button
                        isLoading={this.state.connectingWallet}
                        loadingText="Connecting"
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

}

export default AppTopBar;