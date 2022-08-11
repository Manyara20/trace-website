

import { Center, Input } from "@chakra-ui/react";
import React from "react";

import StringUtils from "../../../utils/Utils/StringUtils";
import { NewProducerDialogBtn, NewProducerDialogBtnProps } from "./NewProducerDialog";

export interface NewProducerEmailInputProps {
    onChange: ( newEmail?: string ) => void

    prompt: string
    goBackBtnProps: NewProducerDialogBtnProps
    goNextBtnProps: NewProducerDialogBtnProps
}

interface NewProducerEmailInputState {
    email: string | undefined
    disabled: boolean
}

export default class NewProducerEmailInput extends React.Component<NewProducerEmailInputProps,NewProducerEmailInputState>
{
    private _lastEdit: number;

    constructor( props: NewProducerEmailInputProps )
    {
        super( props );

        this.state = {
            email: undefined,
            disabled: true
        };

        this._setEmail_and_callChange = this._setEmail_and_callChange.bind(this);
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
                flexDirection: "column"
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

                    <Input
                    type="email"
                    style={{
                        width:"90%",
                        height: "6.5vh",
                        margin: "auto 5%",
    
                        fontSize: "5vh",
                        fontWeight: "bold",
                        
                        backgroundColor: "white",
                        color: "#00540c"
                    }}
                    isInvalid={!StringUtils.isEmail( this.state.email )}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this._setEmail_and_callChange(event.target.value) }
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

    private _setEmail_and_callChange( email: string )
    {
        this.setState({
            email: StringUtils.isEmail( email ) ? email : undefined,
            disabled: !StringUtils.isEmail( email )
        },
        () => {
            // call change only if the email si valid
            if( StringUtils.isEmail( email ) )
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
                    this.props.onChange( this.state.email )
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }
}
