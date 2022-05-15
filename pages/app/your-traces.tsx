import {
    Button,
  } from '@chakra-ui/react'
import { NextRouter, withRouter } from "next/router"
import React, { ReactElement } from "react";
import { ReactNode } from "react"

import ScreenSizeSection from "../../components/elements/ScreenSizeSeciton.ts"

import AppTopBar from "../../components/page-specific/app/AppTopBar";
import AppLayout from '../../components/page-specific/app/layout/AppLayout';

interface ApplicationProps {
    router: NextRouter
}

interface ApplicationState {

}

class Application extends React.Component<ApplicationProps, ApplicationState>
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
        
        /*
        in case of app page longer than the screen height use this as page container
        <div className="
            fixed-screen-width
            min-screen-height
            "
        >
        */
        return (
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
                Your traces
            </Button>
        )
    }

}

export default withRouter(Application);


