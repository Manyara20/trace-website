

import { background, Center, Input } from "@chakra-ui/react";
import React from "react";

import StringUtils from "../../../utils/Utils/StringUtils";
import LinkFieldValue from "../app/producers/make-a-trace/MetadataForm/FieldValue/type-specific/LinkFieldValue";
import { NewProducerDialogBtn, NewProducerDialogBtnProps } from "./NewProducerDialog";

export interface NewProducerLinkInputProps {
    onChange: ( newLink?: string ) => void

    prompt: string
    goBackBtnProps: NewProducerDialogBtnProps
    goNextBtnProps: NewProducerDialogBtnProps

    default: string | undefined
}

interface NewProducerLinkInputState {
    link: string | undefined
    disabled: boolean
}

export default class NewProducerLinkInput extends React.Component<NewProducerLinkInputProps,NewProducerLinkInputState>
{
    private _lastEdit: number;

    constructor( props: NewProducerLinkInputProps )
    {
        super( props );

        this.state = {
            link: this.props.default,
            disabled: true
        };

        this._setLink_and_callChange = this._setLink_and_callChange.bind(this);
        this._callChange = this._callChange.bind(this);

        this._lastEdit = Date.now();
        this._callChange();
    }

    render(): React.ReactNode
    {
        return(
            <Center
            style={{
                height: "100%",
                maxHeight: "100vh",
                padding: "0 8vw",
                flexDirection: "column",
            }}
            >
                <Center
                style={{
                    width: "100%",
                    height: "20%",
                    minHeight: "fit-content",
    
                    paddingTop: "min( 5vw, 15vh )",
                    
                    fontSize: "max( 4vw, 4vh )",
    
                    color: "#fff",
                    textShadow: "0.33vh 0.33vh #00540c"
                }}
                className="
                no-dbg
                "
                >
                    {this.props.prompt}
                </Center>
    
                <Center
                style={{
                    width: "100%",
                    height: "20%",
    
                    fontSize: "max( 2.4vw, 3vh )",
                    paddingTop: "min( 5vw, 2vh )",
    
                    color: "#fff",
                    textShadow: "0.2vh 0.2vh #00540c",

                }}
                className="
                no-dbg
                "
                >

                    <LinkFieldValue
                        defaultValue={this.props.default}
                        removeable={false}
                        onChange={this._setLink_and_callChange}
                        inputStyle={{
                            fontSize: "3vh",
                            fontWeight: "bold",
                            
                            backgroundColor: "white",
                            color: "#00540c"
                        }}
                    />
    
                </Center>
    
                <Center
                style={{
                    width: "70%",
                    height: "30%",
                    justifyContent: "space-evenly",
                    alignContent: "space-evenly"
                }}
                className="no-dbg"
                >
                    { this.props.goBackBtnProps !== undefined && 
                    <NewProducerDialogBtn
                        color="gray"
                        {...this.props.goBackBtnProps} 
                    />
                    }
                    { this.props.goNextBtnProps !== undefined && 
                    <NewProducerDialogBtn {...{
                        ...this.props.goNextBtnProps,
                        disabled: this.state.disabled
                    }} />
                    }
                </Center>
    
            </Center>
        );
    }

    private _setLink_and_callChange( link: string )
    {
        this.setState({
            link: link,
            disabled: link === undefined || link.length <= link.split("//")[0].length + 2
        },
        () => {
            // call change only if the link is present
            if( !this.state.disabled )
                this._callChange();
        }
        )
    }

    private _callChange()
    {

        const callChange = () => setTimeout(
            () => {
                if( Date.now() - this._lastEdit < 500 )
                {
                    return;
                }
                else
                {
                    this.props.onChange( this.state.link )
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }
}
