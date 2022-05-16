import { NextRouter, withRouter } from "next/router"
import React from "react";
import { ReactNode } from "react"

interface ProducersProps {
    router: NextRouter
}

interface ProducersState {

}

class Producers extends React.Component<ProducersProps, ProducersState>
{
    constructor(props: ProducersProps)
    {
        super(props);
    }

    componentDidMount()
    {
        this.props.router.replace("/app/producers/make-a-trace")
    }

    render(): ReactNode
    {
        return null;
    }

}

export default withRouter(Producers);


