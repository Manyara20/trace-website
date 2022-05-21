// theme.js
import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    colors:{
        "d-green": {
            0:   "#efe",
            50:  "#d0ead5",
            100: "#b3d6ba",
            200: "#95c49d",
            300: "#74ad7e",
            400: "#2c6b36",
            500: "#1f682a",
            600: "#11601d",
            700: "#095b15",
            800: "#035b10",
            900: "#00540c"
        },
    },
    components: {
        Button: {
            variants: {
                "solid-shadow": (props: StyleFunctionProps) => {
                    // console.log(props);
                    return({
                        color: props.theme.colors[props.colorScheme]["0"],
                        bg: props.theme.colors[props.colorScheme]["500"],
                        boxShadow: '0 0 3px 0px '+ props.theme.colors[props.colorScheme]["900"],
                    })
                },
                "outline-shadow": (props: StyleFunctionProps) => {
                    // console.log(props);
                    return({
                        color: props.theme.colors[props.colorScheme]["700"],
                        bg: props.theme.colors[props.colorScheme]["0"]+"22",
                        border: "solid 2px " + props.theme.colors[props.colorScheme]["900"],
                        boxShadow: '0px 0px 3px 0px '+ props.theme.colors[props.colorScheme]["900"],
                    })
                },
                "no-border": (props: StyleFunctionProps) => {
                    return {
                        border: "solid 0px "+ props.theme.colors[props.colorScheme]["50"],
                        color: props.theme.colors[props.colorScheme]["700"]
                    }
                },
                "underLine": (props: StyleFunctionProps) => {
                    return {
                        borderBottom: "solid 3px "+ props.theme.colors[props.colorScheme]["500"],
                        borderRadius: 0,
                        color: props.theme.colors[props.colorScheme]["700"],
                    }
                }
            },
        },
        
    },
})

export default theme