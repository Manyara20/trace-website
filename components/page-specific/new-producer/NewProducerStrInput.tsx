
import { Center, Input } from "@chakra-ui/react";
import React from "react";
import { NewProducerDialogBtnProps, NewProducerDialogBtn } from "./NewProducerDialog";

export interface NewProducerStrInputProps {
    onChange: ( newStr: string | undefined ) => void

    prompt: string
    goBackBtnProps: NewProducerDialogBtnProps
    goNextBtnProps: NewProducerDialogBtnProps

    default: string | undefined
}

interface NewProducerStrInputState {
    str: string | undefined
    disabled: boolean
}

export default class NewProducerStrInput extends React.Component<NewProducerStrInputProps,NewProducerStrInputState>
{
    private _lastEdit: number;

    constructor( props: NewProducerStrInputProps )
    {
        super( props );

        this.state ={
            str: this.props.default,
            disabled: this.props.default === undefined || this.props.default === ""
        };

        this._setStr_and_callChange = this._setStr_and_callChange.bind(this);
        this._callChange = this._callChange.bind(this);

        this._lastEdit = Date.now();
        this._callChange();
    }

    render(): React.ReactNode
    {

        console.log("default input: " + this.props.default)
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
                defaultValue={this.props.default}
                type="str"
                style={{
                    width:"90%",
                    height: "6.5vh",
                    margin: "auto 5%",

                    fontSize: "5vh",
                    fontWeight: "bold",
                    
                    backgroundColor: "white",
                    color: "#00540c"
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this._setStr_and_callChange(event.target.value) }
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

    private _setStr_and_callChange( str: string )
    {
        this.setState({
            str: str,
            disabled: str === undefined || str === ""
        },
        // call change only after the state is changed
        this._callChange
        );
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
                    this.props.onChange( this.state.str )
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }
}
