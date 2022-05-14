import React from "react";


interface CircleDivProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    radius: number
}

interface CircleDivState {

}

export default class CircleDiv extends React.Component<CircleDivProps,CircleDivState>
{
    constructor(props: CircleDivProps)
    {
        super(props);
    }

    render(): React.ReactNode
    {
        
        return(
            <div
            {
                ...(() => {
                    const propsShallowCpy: any = {...this.props}
                    
                    delete propsShallowCpy.radius;

                    return propsShallowCpy;
                })()
            }

            style={{
                ...this.props.style,

                height: this.props.radius / 2,
                width:  this.props.radius / 2,

                borderRadius: "50%"
            }}
            >

            </div>
        )
    }
}