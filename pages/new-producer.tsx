import { Button, Center } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import ScreenSizeSection from "../components/elements/ScreenSizeSeciton.ts";
import NewProducerDialog from "../components/page-specific/new-producer/NewProducerDialog";
import NewProducerEmailInput from "../components/page-specific/new-producer/NewProducerEmailInput";
import NewProducerInputLayout from "../components/page-specific/new-producer/NewProducerInputLayout";
import NewProducerLinkInput from "../components/page-specific/new-producer/NewProducerLinkInput";
import NewProducerSocialInput, { NewProducerSocialInputValue } from "../components/page-specific/new-producer/NewProducerSocialsInput";
import NewProducerStrInput from "../components/page-specific/new-producer/NewProducerStrInput";
import h1TextCss from "../styles/h1TextCss";
import Debug from "../utils/Debug";
import StringUtils from "../utils/Utils/StringUtils";


export interface NewProducerPageProps {
    router: NextRouter
}

export interface NewProducerBusinessInfos
{
    name?: string
    email?: string
    socials?: NewProducerSocialInputValue
    website?: string
    logoLink?: string
}

export interface NewProducerPageState {
    index: number
    prevIdx: number
    nextIdx: number
    BusinessInfos: NewProducerBusinessInfos

}

class NewProducerPage extends React.Component<NewProducerPageProps, NewProducerPageState>
{
    constructor( props: NewProducerPageProps )
    {
        super( props );

        this.state = {
            index: 0,
            prevIdx: 0,
            nextIdx: 0,
            BusinessInfos: {}
        };

        this._getDialogs = this._getDialogs.bind(this);

        this._changeIndexTo = this._changeIndexTo.bind(this);
        this._updateBusinessInfos = this._updateBusinessInfos.bind(this);
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
                                this._getDialogs( this.state.index )
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

    private _updateBusinessInfos( newInfos: Partial<NewProducerBusinessInfos>, callback?: () => void ): void
    {
        this.setState(
            {
                BusinessInfos: {
                    ...this.state.BusinessInfos,
                    ...newInfos   
                }
            },
            callback
        );
    }

    private _getDialogs( index: number ) {
        return [
        <NewProducerDialog
            text="A little birdie told us you want to integrate Blockchain technology into your products."
            description="This process will take up to 10 minutes, sit back and relax!"
            goBackBtnProps={{
                text: "Nope, wrong person",
                onClick: () => {
                    this.props.router.push("/#trace-producer")
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
            text="We are going to make an NFT in order to identify your business."
            description={[
                "Make sure you read the documentation in order to understand how this will be used.",
                "Once you have your NFT you are responsable for it!"
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
            text="Before we start."
            description="There are two important things to keep in mind during the entire process:"
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
            text="1) The Blockchain is public!"
            description="This means all the information you share in this process can be accessed by everyone in the world"
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
            text="The Blockchain is persistent!"
            description="This means there is no way to delete the information you share once registered."
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
        <NewProducerStrInput default={this.state.BusinessInfos.name}
        prompt="What is the name of your business?"
        onChange={( newName?: string ) => {
                this._updateBusinessInfos({
                    name: newName
                },
                () => Debug.log(
                    "this.state.BusinessInfos updated to", this.state.BusinessInfos, this.state.BusinessInfos.name === undefined || this.state.BusinessInfos.name === ""
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
                if( this.state.BusinessInfos.name === undefined || this.state.BusinessInfos.name === "" ) return;
                this._changeIndexTo( this.state.index + 1 )
            },
            text: "Confirm",
            disabled: this.state.BusinessInfos.name === undefined || this.state.BusinessInfos.name === ""
        }}
        />,
        <NewProducerEmailInput default={this.state.BusinessInfos.email}
        prompt="Contact email:"
        onChange={( newEmail: string | undefined ) => {
                this._updateBusinessInfos({
                    email: newEmail
                },
                () => Debug.log(
                    "this.state.BusinessInfos updated to", this.state.BusinessInfos
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
                if( !StringUtils.isEmail( this.state.BusinessInfos.email ) ) return;
                this._changeIndexTo( this.state.index + 1 )
            },
            text: "Confirm",
            disabled: !StringUtils.isEmail( this.state.BusinessInfos.email )
        }}
        />,
        <NewProducerDialog
            text="Optional information"
            description="What follows is not needed to identify your business but will help the consumer know more about you!"
            goBackBtnProps={{
                text: "Wait let me check my Email",
                onClick: () => {
                    this._changeIndexTo( this.state.index - 1 )
                }
            }}
            goNextBtnProps={{
                text: "Sure! let's see",
                onClick: () => {
                    this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />,
        <NewProducerSocialInput
        default={this.state.BusinessInfos.socials}
        onChange={
            ( socials ) => this._updateBusinessInfos({
                socials
            },
            () => Debug.log( this.state.BusinessInfos ))
        }
        goBackBtnProps={{
            text: "Go Back",
            onClick: () => {
                this._changeIndexTo( this.state.index - 1 )
            }
        }}
        goNextBtnProps={{
            text: "Continue",
            onClick: () => {
                this._changeIndexTo( this.state.index + 1 )
            }
        }}
        />,
        <NewProducerLinkInput
            prompt="Website"
            default={this.state.BusinessInfos.website}
            onChange={( website ) =>
                this._updateBusinessInfos({website},
                    () => Debug.log(
                        "this.state.BusinessInfos updated to", this.state.BusinessInfos
                    )
                )}
            goBackBtnProps={{
                text: "Go Back",
                onClick: () => {
                    this._changeIndexTo( this.state.index - 1 )
                }
            }}
            goNextBtnProps={{
                text: "Continue",
                onClick: () => {
                    this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />,
        <NewProducerLinkInput
            prompt="Logo of your business"
            default={this.state.BusinessInfos.logoLink}
            onChange={( logoLink ) =>
                this._updateBusinessInfos({logoLink},
                    () => Debug.log(
                        "this.state.BusinessInfos updated to", this.state.BusinessInfos
                    )
                )}
            goBackBtnProps={{
                text: "Go Back",
                onClick: () => {
                    this._changeIndexTo( this.state.index - 1 )
                }
            }}
            goNextBtnProps={{
                text: "Continue",
                onClick: () => {
                    // this._changeIndexTo( this.state.index + 1 )
                }
            }}
        />
    ][index];};
}

export default withRouter(NewProducerPage);