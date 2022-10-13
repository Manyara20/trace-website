import { Box, Button, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack } from "@chakra-ui/react";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import Wallet from "../../../../ownWallets";

import WalletsModal from "./WalletsModal";

import Image from "next/image";
import CardanoGlobalCtx from "../../../../cardano/CardanoGlobalCtx";
import Debug from "../../../../utils/Debug";

export interface AppTopBarProps {
    router: NextRouter
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
    addr: string;
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
                addr: ""
            },
        }

        this.openWalletModal = this.openWalletModal.bind(this);
        this.closeWalletModal = this.closeWalletModal.bind(this);

        this.connectWallet = this.connectWallet.bind(this);
        this.disconnectWallet = this.disconnectWallet.bind(this);
        this.getConnectedWallet = this.getConnectedWallet.bind(this); 

        this.isGeneralUserZone  = this.isGeneralUserZone.bind(this);
        this.isProducerZone     = this.isProducerZone.bind(this)

        this.WalletStuff = this.WalletStuff.bind(this);
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
            .then( () => this.connectWallet( this._connectedWalletName ?? "wallet is not undefined but we are in an async unction, so potentially it could be" ) )
            .catch( (refusedConnection) => {
                // remove form local storage
                this.disconnectWallet();
            });
        }

        this.setState({
            walletConncetionAction: ""
        })
    }

    render(): React.ReactNode
    {

        const buttonStyleForPath = (
            buttonPath: string,
            caseTrue: string = "underLine",
            caseFalse: string = "no-border"
        ) => {
            return this.props.router.pathname.startsWith( buttonPath ) ?  caseTrue : caseFalse;
        };

        return (
            <Box
                
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "10%", // 10vh
                    paddingRight: "3%",
                    top: 0,
                    left: 0,
                }}
                
                className="
                placeholder-dbg-border
                "
            >

                <Box
                style={{
                    position: "relative",

                    top: "-15%",

                    height: "120%",
                    width: "20%",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    cursor: "pointer",
                }}
                onClick={() =>{
                    /*
                    window.name = "_trace_app"                    
                    
                    //@ts-ignore
                    window.launchApplication( window.location.origin  , "_trace_home" )
                    */
                    this.props.router.replace("/")
                }}

                className="
                placeholder-dbg-border
                "
                >

                    <Box
                    style={{
                        position: "absolute",

                        top: "35%",

                        borderRadius: 100000,
                        backgroundColor: "#035b10",

                        boxShadow: "0 0 40px -10px #00540c",

                        height: "26%",
                        width: "60%",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    className="
                    placeholder-dbg-border
                    "
                    />
                    <Image
                    layout="fill"
                    src="/trace/fingerprint/name_only_white.svg"
                    />

                </Box>

                <Stack
                    spacing="3vw"
                    direction='row'

                    justify="center" align="center"
                    
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX( -50% )",
                        height: "110%",
                        top: "-1vh",
                        width:"40%",
                        minWidth: "fit-content",
                        backgroundColor: "#efe",
                        borderRadius: "0 0 12px 12px"
                    }}

                    className="
                    placeholder-dbg-border
                    "
                >

                
                    <Button
                    variant={buttonStyleForPath("/app/trace-it")}
                    colorScheme="d-green"
                    onClick={() => {
                        if( this.props.router.pathname !== "/app/trace-it" )
                            this.props.router.replace("/app/trace-it")
                    }}
                    >
                        Trace it
                    </Button>

                    <Button
                    variant={buttonStyleForPath("/app/your-traces")}
                    colorScheme="d-green"
                    onClick={() => {
                        if( this.props.router.pathname !== "/app/your-traces" )
                            this.props.router.replace("/app/your-traces")
                    }}
                    >
                        Your traces
                    </Button>

                    <Button
                    variant={ buttonStyleForPath("/app/producers", "solid", "outline") + "-shadow" }
                    colorScheme="d-green"
                    onClick={() => {
                        if( !this.props.router.pathname.startsWith( "/app/producers" ) )
                            this.props.router.replace("/app/producers/make-a-trace")
                    }}
                    >
                        Producer zone
                    </Button>

                </Stack>

                <this.WalletStuff />    

            </Box>
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
            async (_void) => {

                const w = Wallet.get( wName );

                CardanoGlobalCtx.setCip30Wallet( w.raw );
                Debug.log("CardanoGlobalCtx.setCip30Wallet( w.raw ); was called in the AppTopBar component")

                let addrResult;
                if( w.raw.getAddress )
                {
                    addrResult = await w.raw.getAddress();
                }
                else if( w.raw.getUsedAddresses )
                {
                    addrResult = (await w.raw.getUsedAddresses())[0];
                    if( addrResult === undefined )
                        addrResult = (await w.raw.getUnusedAddresses())[0]
                }

                const addr = typeof addrResult === "object" ? addrResult.data : addrResult; 

                this.setState({
                    wallet: w,
                    Iwallet: await Wallet.getInterface( wName ),
                    walletInfos: {
                        cborBalance: await w.raw.getBalance(),
                        addr: addr 
                    },
                    walletConncetionAction: "",
                });
                
            }
        );
    }
    
    private disconnectWallet()
    {
        this.setState({
            walletConncetionAction: "Disconnecting"
        })

        if( typeof window === "undefined") return;

        window.localStorage.removeItem("CardanoTrace_user_connectedWallet");
        CardanoGlobalCtx.setCip30Wallet( undefined );

        this.setState({
            wallet: null,
            Iwallet: null,
            walletConncetionAction: ""
        })
    }

    private getConnectedWallet()
    {
        if( typeof window === "undefined") return;

        this._connectedWalletName = window.localStorage.getItem("CardanoTrace_user_connectedWallet") ?? undefined;
    }

    
    private isGeneralUserZone(): boolean
    {
        const { pathname } = this.props.router;

        return (
            pathname.startsWith( "/app/trace-it" )      ||
            pathname.startsWith( "/app/your-traces" )
        )
    }

    private isProducerZone() : boolean
    {
        const { pathname } = this.props.router;

        return(
            pathname.startsWith( "/app/producers")
        )
    }


    private WalletStuff()
    {
        const addr = this.state.walletInfos.addr;

        return(

            <>
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
                        colorScheme='d-green'
                        position="absolute"
                        top="1.5vh"
                        right="2vw"
                        mr={6}
                        >
                            {(this.state.Iwallet as any).name + `  |  ${addr.slice( 0, 8 )}...${addr.slice( addr.length - 5 )}`/* + address */} 
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent mr={6}>
                        <PopoverArrow />
                        <PopoverBody>
                            <Button
                            variant="outline"
                            colorScheme='d-green'
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
                colorScheme='d-green'
                position="absolute"
                top="1.5vh"
                right="2vw"
                mr={6}
                variant='solid'
                onClick={this.openWalletModal}
                >
                    Connect wallet
                </Button>
            }
            </>
        )
    }
}

export default withRouter(AppTopBar);