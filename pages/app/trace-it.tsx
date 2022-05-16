import {
    Box,
    Button, Divider, Input, Stack,
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
            <Stack
            spacing="3vh"
            style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center",
                height:"100%",
            }}
            className="
            placeholder-dbg-border
            "
            >
                <Input placeholder='search for a transaction'
                size="lg"
                variant='filled'
                colorScheme="gray"
                style={{
                    width: "60%"
                }}
                />
                <Divider variant="solid" width="80%" colorScheme="d-green.900" />
            </Stack>
        )
    }

}

export default withRouter(Application);


