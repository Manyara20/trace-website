import {
    Address,
    AssetName,
    BigNum,
    CoinSelectionStrategyCIP2,
    Int,
    MetadataList,
    MetadataMap,
    ScriptHash,
    Transaction,
    TransactionBuilder, 
    TransactionMetadatum, 
    TransactionUnspentOutput,
    TransactionUnspentOutputs,
    Value
} from "@emurgo/cardano-serialization-lib-asmjs";

import { Buffer } from "buffer";
import Debug from "../../../utils/Debug";

import CardanoGlobalCtx from "../../CardanoGlobalCtx";


interface MetadataProps721 {
    name: string,
    image: string,

    mediaType?: `image/${string}`
    description?: string | string[];

    [ otherPropKey: string ]: any
}

export default async function makeMintTx( asset_name: string, nftProps: MetadataProps721, outputAddrHex: string, utxosInput: string[] ): Promise<Transaction>
{
    const txBuilder : TransactionBuilder = await CardanoGlobalCtx.fetchTxBuilder();

    Debug.log(" ---------------------- making producer Tx ---------------------- ");

    const utxoList = TransactionUnspentOutputs.new();

    const TxUnspentOArray = utxosInput.map(
        utxoStr => TransactionUnspentOutput.from_bytes(
            Buffer.from( utxoStr, "hex" )
        )
    )

    TxUnspentOArray.forEach( utxo => {
        utxoList.add(
            utxo
        )
    });
    
    txBuilder.add_metadatum(
        BigNum.from_str( "721" ),
        toTxMetadaum({
            polycy_id_to_add_here: {
                [asset_name]: nftProps
            }
        })
    );


    txBuilder.add_inputs_from( utxoList, CoinSelectionStrategyCIP2.RandomImprove );

    // return everything to the specified address since no outputs are specified
    txBuilder.add_change_if_needed(
        Address.from_bytes(
            Buffer.from( outputAddrHex, "hex" )
        )
    );

    return txBuilder.build_tx();
}


function toTxMetadaum( any: any ): TransactionMetadatum
{
    if( typeof any === "number" || typeof any === "bigint" )
    {
        if( typeof any === "number" )
        {
            const _n = Math.round( any );
            if( (_n | 0) === _n )
                return TransactionMetadatum.new_int( 
                    Int.new_i32( _n )
                );
            
            any = BigInt( _n );
        }

        return TransactionMetadatum.new_int(
            any < BigInt( 0 ) ?
            Int.new_negative(
                BigNum.from_str( (-any).toString() )
            ) :
            Int.new(
                BigNum.from_str( any.toString() )
            )
        );
    }

    if( typeof any === "string" )
    {
        return TransactionMetadatum.new_text( any );
    }
    
    if( Array.isArray( any ) )
    {
        const list = MetadataList.new();

        any.forEach( el => list.add( toTxMetadaum( el ) ) );

        return TransactionMetadatum.new_list( list );
    }
    
    if( typeof any === "object" )
    {
        const map = MetadataMap.new();
    
        for( const oKey in any )
        {
            map.insert_str(
                oKey,
                toTxMetadaum( any[ oKey ] )
            );
        }
    
        return TransactionMetadatum.new_map( map );
    }

    return TransactionMetadatum.new_text("");
}

function make721metadataValue( policy_id: string, asset_name: string, props721: MetadataProps721 )
{
    const keyAssetName = MetadataMap.new();
    keyAssetName.insert_str(
        asset_name,
        toTxMetadaum( props721 )
    );

    const keyPolicy = MetadataMap.new();
    keyPolicy.insert_str(
        policy_id,
        TransactionMetadatum.new_map( keyAssetName )
    )

    const tMetadatum = TransactionMetadatum.new_map( keyPolicy );
}

