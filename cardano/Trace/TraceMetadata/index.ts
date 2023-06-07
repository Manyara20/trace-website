import { BigNum, Int, MetadataList, MetadataMap, TransactionMetadatum } from "@emurgo/cardano-serialization-lib-asmjs";
import Debug from "../../../utils/Debug";
import Utils from "../../../utils/Utils"



export class TraceMetadata
{
    private constructor () {};

    public static isValidTraceFormat( JsonMetadata: TraceMetadata.Format )
    {
        if( !Utils.Object.isObject(JsonMetadata) )
        {
            Debug.warn( "trace format: not an object\n\n" , JSON.stringify( JsonMetadata, undefined, 2 ) );
            return false;
        }

        const oKeys = Object.keys( JsonMetadata );

        if(
            !oKeys.includes( "producer" ) ||
            !oKeys.includes( "product" )
        )
        {
            Debug.warn( "trace format: no required keys\n\n" , JSON.stringify( JsonMetadata, undefined, 2 ) );
            return false;
        }

        const hasIdentifierKey = (obj: any): boolean => Utils.Object.hasKeys( obj, "identifier" );

        if(
            !hasIdentifierKey( JsonMetadata.producer ) ||
            !hasIdentifierKey( JsonMetadata.product )
        )
        {
            Debug.warn( "trace format: no identifier field\n\n" , JSON.stringify( JsonMetadata, undefined, 2 ) );
            return false;
        }
        
        return true;
    }

    public static jsObjToMetadata( jsObj: TraceMetadata.Format ) : TransactionMetadatum
    {
        if( !TraceMetadata.isValidTraceFormat( jsObj ) )
        {
            throw Error(
                "the passed js object does not respect the trace metadata format: " + JSON.stringify( jsObj )
            );
        }

        return TraceMetadata._toTraceMetadata( jsObj );
    }

    private static _toTraceMetadata( jsVal: any ): TransactionMetadatum
    {
        if(typeof jsVal === "string")
        {
            return TransactionMetadatum.new_text( jsVal );
        }

        if(
            typeof jsVal === "number" ||
            typeof jsVal === "bigint"
        )
        {
            if( typeof jsVal === "number" && Math.round(jsVal) !== jsVal )
            {
                throw Error(
                    "cardano metadatas do not support decimal values, input was: " + jsVal.toString()
                );
            }

            if(
                // is signed int
                ( typeof jsVal === "number" && Math.abs( jsVal ) <= (Math.pow(2, 32) - 1) )  ||
                ( typeof jsVal === "bigint" && 
                    ( 
                        jsVal <= BigInt( (Math.pow(2, 32) - 1) ) && 
                        jsVal >= BigInt( - (Math.pow(2, 32) - 1) ) 
                    )
                )
            )
            {
                return TransactionMetadatum.new_int( 
                    Int.new_i32(
                        Number( jsVal )
                    )
                );
            }

            if( jsVal < 0 )
            {
                const positiveJsVal : number | bigint = -jsVal;

                return TransactionMetadatum.new_int( 
                    Int.new_negative(
                        BigNum.from_str( positiveJsVal.toString() )
                    )
                );
            }

            return TransactionMetadatum.new_int( 
                Int.new(
                    BigNum.from_str( jsVal.toString() )
                )
            );

        }

        if( typeof jsVal === "object" && jsVal !== null )
        {
            if( Array.isArray(jsVal) )
            {
                const metadataList = MetadataList.new();

                for( let i = 0; i < jsVal.length; i++)
                {
                    metadataList.add( TraceMetadata._toTraceMetadata( jsVal[i] ) )
                }

                return TransactionMetadatum.new_list( metadataList );
            }

            const oKeys = Object.keys( jsVal );
            const metadataMap = MetadataMap.new();

            for(let i = 0; i < oKeys.length; i++)
            {
                metadataMap.insert_str(
                    oKeys[i],
                    TraceMetadata._toTraceMetadata(
                        jsVal[ oKeys[i] ]
                    )
                )
            }

            Debug.log("metadata construction successfull; number of top-level params is equal? ", metadataMap.len() === oKeys.length )
            return TransactionMetadatum.new_map( metadataMap );
        }

        throw Error(
            "unespected value to create metadata: " + JSON.stringify( jsVal )
        )
    }

}

export namespace TraceMetadata {

    export type Format = {
        producer: {
    
            identifier: string,
            
            contacts?: {
                email?: string
            
                [otherFieldKey: string] : any
            }
    
            [otherFieldKey: string] : any
        },
        product : {
    
            identifier : string,
            
            name?: string,
            image?: string,
            description?: string,
    
            [otherFieldKey: string] : any
        },
    
        [otherFieldKey: string] : any
    }

}

export default TraceMetadata;