
import { Center, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { NewProducerDialogBtnProps, NewProducerDialogBtn } from "./NewProducerDialog";


interface SocialInputProps
{
    social: SocialName
    onChange: ( socialHandle: string ) => void

    default: string | undefined
}

const SocialInput: React.FC<SocialInputProps> = ({
    social,
    onChange,
    default: def
}) => 
{
    return (
        <Center
        style={{
            width:"90%",
            height: "6.5vh",
            margin: "auto 5%",

            
            
            //color: "#095b15",

            position: "relative",

            marginBottom: "7vh"
        }}
        >
            <Text
            style={{
                position: "absolute",
                left: "3%",
                color: "#efe",
            }}
            >
                {social}:
            </Text>
            <Input 
            defaultValue={def}
            type="str"
            style={{
                fontSize: "5vh",
                fontWeight: "bold",
                backgroundColor: "white",
                color: "#00540c",

                position: "absolute",

                width: "75%",
                right: 0
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange(event.target.value) }
            >
            </Input>
        </Center>
    );
}

export interface NewProducerSocialInputValue {
    twitter?: string
    instagram?: string
    facebook?: string
    youtube?: string
}

export type SocialName = keyof NewProducerSocialInputValue

export interface NewProducerSocialInputProps {
    onChange: ( newStr: NewProducerSocialInputValue ) => void

    goBackBtnProps: NewProducerDialogBtnProps
    goNextBtnProps: NewProducerDialogBtnProps

    default: NewProducerSocialInputValue | undefined
}

interface NewProducerSocialInputState {
    socials: NewProducerSocialInputValue
}

export default class NewProducerSocialInput extends React.Component<NewProducerSocialInputProps,NewProducerSocialInputState>
{
    private _lastEdit: number;

    constructor( props: NewProducerSocialInputProps )
    {
        super( props );

        this.state = {
            socials: this.props.default ?? {}
        };

        this._setSocial_and_callChange = this._setSocial_and_callChange.bind(this);
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
                Buisness Profile on Socials:
            </Center>

            <VStack
            style={{
                width: "100%",
                height: "23%",

                fontSize: "max( 2.4vw, 3vh )",
                paddingTop: "min( 5vw, 2vh )",

                color: "#fff",
                textShadow: "0.2vh 0.2vh #00540c",

                marginTop: "5vh"
            }}
            className="
            no-dbg
            "
            >
                {(["facebook","instagram","twitter","youtube"] as SocialName[])
                .map( social =>
                    <SocialInput
                    default={this.props.default ? this.props.default[social] : ""}
                    onChange={( handle ) => this._setSocial_and_callChange({ [social]: handle })}
                    social={social}
                    />
                )}
                

            </VStack>

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
                }} />
                }
            </Center>

        </Center>
        );
    }

    private _setSocial_and_callChange( socials: Partial<NewProducerSocialInputValue> )
    {
        this.setState({
            socials: {
                ...this.state.socials,
                ...socials
            }
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
                    this.props.onChange( this.state.socials )
                }
            },
            510
        );

        this._lastEdit = Date.now();

        callChange();
    }
}
