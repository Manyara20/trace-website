import {
    Button,
  } from '@chakra-ui/react'
import { NextRouter, withRouter } from "next/router"
import React from "react";
import { ReactNode } from "react"

import ScreenSizeSection from "../../components/elements/ScreenSizeSeciton.ts"

import AppTopBar from "../../components/page-specific/app/AppTopBar";

interface ApplicationProps {
    router: NextRouter
}

interface ApplicationState {

}

class Application  extends React.Component<ApplicationProps, ApplicationState>
{
    constructor(props: ApplicationProps)
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
    }

    
    render(): ReactNode {
        
        return (
            <div className="
            fixed-screen-width
            min-screen-height
            "
            >

                <ScreenSizeSection
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    backgroundImage: "linear-gradient( 165deg, #7dc -50%, #28AB1F 150% )"
                }}
                className="
                dbg-border
                "
                >

                    <AppTopBar />


                    <Button 
                    colorScheme='blue'
                    variant='solid'
                    onClick={() => {
                        this.props.router.back()
                    }}
                    className="
                    centred-on-relative-parent 
                    "
                    >
                        Go back Home
                    </Button>

                </ScreenSizeSection>
            
            </div>
        )
    }


}


export default withRouter(Application);


