
export default class Debug
{
    private static _isDebugging: boolean = true;

    private constructor() {};

    public static log( ...any: any ): void
    {
        if(Debug._isDebugging)
        {
            console.log(...any);
        }
    }

    public static warn( ...any: any ): void
    {
        if(Debug._isDebugging)
        {
            console.warn(...any);
        }
    }

    public static err( ...any: any ): void
    {
        if(Debug._isDebugging)
        {
            console.error(...any);
        }
    }
    // alias
    public static error = Debug.err;
}