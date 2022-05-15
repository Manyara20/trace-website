import {
    Button,
  } from '@chakra-ui/react'
import Router, { NextRouter, withRouter } from "next/router"
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
    }

    componentDidMount()
    {
        this.props.router.replace("/app/trace-it")
    }

    render(): ReactNode
    {
        return null;
    }

}

export default withRouter(Application);


