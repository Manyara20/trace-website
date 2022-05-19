

export default class Object
{
    private constructor () {};

    public static isObject( obj: any ): boolean
    {
        return (
            typeof obj === "object" &&
            !Array.isArray( obj )
        )
    }
}