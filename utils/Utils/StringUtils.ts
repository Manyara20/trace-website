

export default class StringUtils
{
    private constructor () {};

    public static isHex( str: string ): boolean
    {
        if( typeof str !== "string" )
        {
            return false;
        }

        const hexChars = "0123456789abcdef";

        return str.split("").every( strCh => hexChars.includes(strCh) )
    }

    public static isEmail( email: string | undefined ) : boolean
    {
        if( email === undefined ) return false;
        // ^                -> from start
        // [A-Z0-9._%+-]+   -> at least one letter / number / allowed email char
        // @                -> @
        // [A-Z0-9.-]+      -> at least one letter / number / allowed domain-name char
        // \.               -> .
        // [A-Z]{2,4}       -> 2 to 4 letter domain
        // $                -> end of string
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( email )
    }

    public static isGenericUrl( url: string | undefined ) : boolean
    {
        if( url === undefined ) return false;

        return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test( url );
    }
}