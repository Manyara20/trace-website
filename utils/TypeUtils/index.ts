import Object from "./Object";

export default class TypeUtils
{
    private constructor () {};

    public static Object = Object;

    public static isHexString( str: string ): boolean
    {
        if( typeof str !== "string" )
        {
            return false;
        }

        const hexChars = "0123456789abcdef";

        return str.split("").every( strCh => hexChars.includes(strCh) )
    }

    public static copySerializable( anySerializable: any )
    {
        return (
            anySerializable === undefined ? undefined :
            JSON.parse(
                JSON.stringify(
                    anySerializable
                )
            )
        );
    }
}