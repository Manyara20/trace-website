import { Button, Center } from "@chakra-ui/react";

export interface NewProducerDialogBtnProps
{
    text: string
    onClick: () => void,
    color?: "gray" | "d-green",
    disabled?: boolean
}

export const NewProducerDialogBtn: React.FC<NewProducerDialogBtnProps> = ({
    text,
    onClick,
    color,
    disabled
}: NewProducerDialogBtnProps ) => 
{
    
    return (
        <Button
        disabled={ disabled === undefined ? false : disabled }
        colorScheme={ color ?? 'd-green'}
        variant='solid'
        style={{
            width: "30%", minWidth: "fit-content",
            height: "30%",
            fontSize: "max( 1.5vw, 2vh )",
            borderRadius: "3.8vh",
        }}
        onClick={onClick}
        >
            {text}
        </Button>
    );
}

interface NewProducerDialogProps
{
    text: string
    description?: string | string[]
    goBackBtnProps?: NewProducerDialogBtnProps
    goNextBtnProps?: NewProducerDialogBtnProps
} 

const NewProducerDialog: React.FC<NewProducerDialogProps> = ({
    text,
    description,
    goBackBtnProps,
    goNextBtnProps
}: NewProducerDialogProps ) => 
{
    
    return (
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
                height: "50%",
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
                {text}
            </Center>

            {
            description !== undefined && 

            <Center
            style={{
                width: "100%",
                height: "20%",

                fontSize: "max( 2.2vw, 3vh )",
                paddingTop: "min( 5vw, 2vh )",

                color: "#fff",
                textShadow: "0.2vh 0.2vh #00540c",

                flexDirection: "column"
            }}
            className="
            no-dbg
            "
            >
                {typeof description === "string" ?
                description:
                description.map( str => {
                   return(
                        <p>{str}</p>
                   );
                })}
            </Center>
            }

            <Center
            style={{
                width: "70%",
                height: "30%",
                justifyContent: "space-evenly",
                alignContent: "space-evenly"
            }}
            className="no-dbg"
            >
                { goBackBtnProps !== undefined && 
                <NewProducerDialogBtn
                    color="gray"
                    {...goBackBtnProps} 
                />
                }
                { goNextBtnProps !== undefined && <NewProducerDialogBtn {...goNextBtnProps} />}
            </Center>

        </Center>
    );
}


export default NewProducerDialog;