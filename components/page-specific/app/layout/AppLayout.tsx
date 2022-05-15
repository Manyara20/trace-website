import React, { ReactElement } from "react";
import ScreenSizeSection from "../../../elements/ScreenSizeSeciton.ts";
import AppTopBar from "../AppTopBar";


export interface AppLayoutProps {
    children?: ReactElement 
}

interface AppLayoutState {

}

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState>
{
    constructor(props: AppLayoutProps)
    {
        super(props);
    }

    render(): React.ReactNode
    {
        return (
            <ScreenSizeSection
            style={{
                position: "relative",
                backgroundImage: "linear-gradient( 165deg, #7dc -50%, #28AB1F 150% )"
            }}
            className="
            placeholder-dbg-border
            "
            >

                <AppTopBar />

                {this.props.children}

            </ScreenSizeSection>
        )    
    }
}

export default AppLayout;