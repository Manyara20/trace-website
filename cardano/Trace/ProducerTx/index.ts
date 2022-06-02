import {
    Address,
    AssetName,
    BigNum,
    CoinSelectionStrategyCIP2,
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


export default async function makeProducerTx( metadata: TransactionMetadatum, addressHex: string,  utxosInput: string[] ): Promise<Transaction>
{
    const txBuilder : TransactionBuilder = await CardanoGlobalCtx.fetchTxBuilder();

    Debug.log(" ---------------------- making producer Tx ---------------------- ");

    const utxoList = TransactionUnspentOutputs.new();

    const TxUnspentOArray = utxosInput.map(
        utxoStr => TransactionUnspentOutput.from_bytes(
            Buffer.from( utxoStr, "hex" )
        )
    )

    throw Error("policy missing, can't continue")

    // check the producer NFT is present
    if( 
        !isCoinIncluded(
            TxUnspentOArray,
            ScriptHash.from_bech32( "insert policy here" ),
            AssetName.from_bytes(
                Buffer.from(
                    "insert ascii name",
                    "ascii"
                )
            )
        )
    )
    {
        // if not throws
        throw Error("producer identifier not included in the transaction")
    }
    
    TxUnspentOArray.forEach( utxo => {
        utxoList.add(
            utxo
        )
    });
    

    txBuilder.add_metadatum(
        BigNum.from_str( "3333" ),
        metadata
    );

    txBuilder.add_inputs_from( utxoList, CoinSelectionStrategyCIP2.RandomImprove );

    // return everything to the specified address since no outputs are specified
    txBuilder.add_change_if_needed(
        Address.from_bytes(
            Buffer.from( addressHex, "hex" )
        )
    );


    return txBuilder.build_tx();
}

function isCoinIncluded(
    utxosInput: TransactionUnspentOutput[],
    policy: ScriptHash,
    assetName: AssetName
): boolean
{
    let totInputValue: Value = utxosInput.map(
        (txOut) => txOut.output().amount()
    ).reduce(
        ( valA, valB ) => valA.checked_add( valB ),
        Value.zero()
    )

    const multiAssetVal = totInputValue.multiasset();
    
    if( multiAssetVal === undefined )
    {
        return false;
    }

    const assetsOfPolicy = multiAssetVal.get( policy );

    if( assetsOfPolicy === undefined )
    {
        return false;
    }

    const nOfAssetCoins = assetsOfPolicy.get( assetName );
    
    if( nOfAssetCoins === undefined || nOfAssetCoins.is_zero() )
    {
        return false;
    }

    return true;
}