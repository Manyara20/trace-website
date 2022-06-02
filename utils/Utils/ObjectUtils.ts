import JSObj from "./workarounds/JSObj";

export default class ObjectUtils
{
    private constructor () {};

    private static _isGeneralObject( obj: any ): boolean
    {
        return (
            typeof obj === "object" &&
            !Array.isArray( obj )
        )
    }

    public static isObject( obj: any ): boolean
    {
        return ObjectUtils._isGeneralObject( obj ) && obj !== null;
    }

    public static isNull( obj: any ): boolean
    {
        return obj === null;
    }

    public static hasKeys( obj: any, ...keys: string[] )
    {
        if( keys.length === 0 ) return true;

        const oKeys = Object.keys( obj );

        return keys.every( k => oKeys.includes( k ) )
    }

    public static hasUniqueKeys( obj: any, ...keys: string[] )
    {
        if( keys.length === 0 ) return true;

        const oKeys = Object.keys( obj );

        if( oKeys.length === keys.length ) return false;

        return keys.every( k => oKeys.includes( k ) )
    }


    public static hasUndefinedValues( obj: any ): boolean
    {
        if( obj === undefined ) return true;

        if(
            typeof obj === "object"
        )
        {
            if( Array.isArray(obj) )
            {
                return obj.some( ObjectUtils.hasUndefinedValues );
            }

            const oKeys = JSObj.keys( obj );

            return oKeys.some( k => ObjectUtils.hasUndefinedValues( obj[k] ) );
        }

        return false;
    }

    public static copySerializable( anySerializable: any ): any
    {
        if( !ObjectUtils.isJsonSerializable(anySerializable, {areUndefinedSerializables: true}) )
            throw Error( JSON.stringify(anySerializable) + " is not serilaizable" );
        
        return ObjectUtils.unchekedCopySerializable( anySerializable );
    }

    public static unchekedCopySerializable( anySerializable: any ): any
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

    public static isJsonSerializable(
        obj: any,
        options: {
            areUndefinedSerializables: boolean
        } = {
            areUndefinedSerializables: false
        }
    ): boolean
    {
        if( typeof obj === "undefined" ) return options.areUndefinedSerializables;

        if(
            typeof obj === "function" ||
            typeof obj === "symbol"
        ) return false;


        if( typeof obj === "object" )
        {
            if(Array.isArray( obj ))
            {
                return obj.every( ( arrElem: any ) => ObjectUtils.isJsonSerializable( arrElem, options ) );
            }

            const oKeys = JSObj.keys( obj );

            return oKeys.every( (key : string) => {
                return ObjectUtils.isJsonSerializable( obj[key] )
            });
        }

        // numbers, strings, bigints, etc..
        return true;
    }
}