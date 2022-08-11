import { Button, Center } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ScreenSizeSection from "../components/elements/ScreenSizeSeciton.ts";
import NewProducerDialog from "../components/page-specific/new-producer/NewProducerDialog";
import NewProducerEmailInput from "../components/page-specific/new-producer/NewProducerEmailInput";
import NewProducerInputLayout from "../components/page-specific/new-producer/NewProducerInputLayout";
import NewProducerStrInput from "../components/page-specific/new-producer/NewProducerStrInput";
import h1TextCss from "../styles/h1TextCss";
import Debug from "../utils/Debug";
import ObjectUtils from "../utils/Utils/ObjectUtils";
import StringUtils from "../utils/Utils/StringUtils";


export interface NewProducerPageProps {
    
}

export interface NewProducerBuisnessInfos
{
    name?: string
    email?: string
}

export interface NewProducerPageState {
    index: number
    prevIdx: number
    nextIdx: number
    pBuisnessInfos: NewProducerBuisnessInfos

}

export default class NewProducerPage extends React.Component<NewProducerPageProps, NewProducerPageState>
{
    constructor( props: NewProducerPageProps )
    {
        super( props );

        this.state = {
            index: 0,
            prevIdx: 0,
            nextIdx: 0,
            pBuisnessInfos: {}
        };

        this._getDialogs = this._getDialogs.bind(this);
        this.dialogs = this._getDialogs();

        this._changeIndexTo = this._changeIndexTo.bind(this);
        this._updateBuisnessInfos = this._updateBuisnessInfos.bind(this);
    }

    render() 
    {
        return(
            <ScreenSizeSection
            style={{
                position: "relative",
                backgroundImage: "linear-gradient( 165deg, #7dc -50%, #28AB1F 150% )",
                display: "flex",
                flexDirection: "column",
                ...h1TextCss,
                overflow: "hidden",
            }}
            className="
                no-dbg
            "
            >

                <AnimatePresence 
                exitBeforeEnter // !IMPORTANT
                >
                    <motion.div
                        className="
                            no-dbg
                        "
                        // re-render on change
                        key={this.state.index}

                        initial={{ y: 40 * ( this.state.prevIdx > this.state.index ? -1 : 1 ), opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40 * ( this.state.nextIdx > this.state.index ? -1 : 1 ), opacity: 0 }}

                        transition={{ duration: 0.4 }}

                        style={{
                            flex: 3,
                            ...h1TextCss,
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            position: "relative",
                            zIndex: 0,
                        }}
                        >
                            {
                                this.dialogs[ this.state.index ]
                            }
                    </motion.div>
                    
                </AnimatePresence>

            </ScreenSizeSection>
        );
    }

    private _changeIndexTo( newIndex: number )
    {
        this.setState({
                // update fore exit animation
                nextIdx: newIndex
            },
            () => this.setState({
                    index: newIndex,
                    // 'index' didn't canged in the previous 'setState'
                    // so 'this.state.index' here points to the 'old index'
                    prevIdx: this.state.index
                },
                () => {} // this.props.onValueChange && this.props.onValueChange(newVal) 
            )
        );
    }

    private _updateBuisnessInfos( newInfos: Partial<NewProducerBuisnessInfos>, callback?: () => void ): void
    {
        this.setState(
            {
                pBuisnessInfos: {
                    ...this.state.pBuisnessInfos,
                    ...newInfos   
                }
            },
            callback
        );
    }

    private dialogs: JSX.Element[];
    private _getDialogs() {
        return [
        <NewProducerDialog
            text="A little birdie told me you want to integrate Blockchain technology with your products"
            description="This process will take up to 10 minutes, be sure to sit back and relax"
            goBackBtnProps={{
                text: "Nope, wrong person",
                onClick: () => {
                    typeof window !== "undefined" && window?.history.back()
                }
            }}
            goNextBtnProps={{
                text: "Yes, that's me!",
                onClick: () => {
                    this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />,
        <NewProducerDialog
            text="We are going to make an NFT in order to identify your buisness"
            description={[
                "Make sure you had a look at the documentation in order to understand how this will be used",
                "once you have your NFT you are responsable for it"
            ]}
            goBackBtnProps={{
                text: "Humm, I'll pass",
                onClick: () => {
                    this._changeIndexTo( this.state.index - 1 )
                }
            }}
            goNextBtnProps={{
                text: "Can't wait",
                onClick: () => {
                    this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />,
        <NewProducerDialog
            text="Before we start"
            description="there are two an important things you should keep in mind during the entire process"
            goBackBtnProps={{
                text: "Wait, how did I get here",
                onClick: () => {
                    this._changeIndexTo( this.state.index - 1 )
                }
            }}
            goNextBtnProps={{
                text: "Tell me everything",
                onClick: () => {
                    this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />,
        <NewProducerDialog
            text="The Blockchain si public"
            description="this means all the informations you'll share in this process can be accessed by everyone in the world"
            goBackBtnProps={{
                text: "I'm not ok with that",
                onClick: () => {
                    this._changeIndexTo( this.state.index - 1 )
                }
            }}
            goNextBtnProps={{
                text: "It's fine with me",
                onClick: () => {
                    this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />,
        <NewProducerDialog
            text="The Blockchain is persistent"
            description="this means there is no way to delete the informations you'll share once registered"
            goBackBtnProps={{
                text: "I'm not ok with that",
                onClick: () => {
                    this._changeIndexTo( this.state.index - 1 )
                }
            }}
            goNextBtnProps={{
                text: "It's fine with me",
                onClick: () => {
                    this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />,
        <NewProducerStrInput
        prompt="What is the name of your buisness?"
        onChange={( newName?: string ) => {
                this._updateBuisnessInfos({
                    name: newName
                },
                () => Debug.log(
                    "this.state.pBuisnessInfos updated to", this.state.pBuisnessInfos, this.state.pBuisnessInfos.name === undefined || this.state.pBuisnessInfos.name === ""
                )
            );
        }}
        goBackBtnProps={{
            onClick: () => {
                this._changeIndexTo( this.state.index - 1 )
            },
            text: "Go Back"
        }}
        goNextBtnProps={{
            onClick: () => {
                if( this.state.pBuisnessInfos.name === undefined || this.state.pBuisnessInfos.name === "" ) return;
                this._changeIndexTo( this.state.index + 1 )
            },
            text: "Confirm",
            disabled: this.state.pBuisnessInfos.name === undefined || this.state.pBuisnessInfos.name === ""
        }}
        />,
        <NewProducerEmailInput 
        prompt="buisness' contact email:"
        onChange={( newEmail: string | undefined ) => {
                this._updateBuisnessInfos({
                    email: newEmail
                },
                () => Debug.log(
                    "this.state.pBuisnessInfos updated to", this.state.pBuisnessInfos, this.state.pBuisnessInfos.name === undefined || this.state.pBuisnessInfos.name === ""
                )
            );
        }}
        goBackBtnProps={{
            onClick: () => {
                this._changeIndexTo( this.state.index - 1 )
            },
            text: "Go Back"
        }}
        goNextBtnProps={{
            onClick: () => {
                if( !StringUtils.isEmail( this.state.pBuisnessInfos.email ) ) return;
                this._changeIndexTo( this.state.index + 1 )
            },
            text: "Confirm",
            disabled: !StringUtils.isEmail( this.state.pBuisnessInfos.email )
        }}
        />,
    ];};
}
