import React, { DetailedHTMLProps, HTMLAttributes } from "react";


interface SSSProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{

}

interface SSSState {

}

export default class ScreenSizeSection extends React.Component<SSSProps, SSSState>
{
    constructor(props: SSSProps)
    {
        super( props );
    }

    render()
    {


        return (
            <section 
            {...this.props}
            className="
            screen-dims
            no-overflowX
            placeholdre-dbg-border
            "
            />
        )
    }
}