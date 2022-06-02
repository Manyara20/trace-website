import { BigNum, LinearFee, Transaction, TransactionBuilder, TransactionBuilderConfig, TransactionBuilderConfigBuilder, TransactionWitnessSet } from "@emurgo/cardano-serialization-lib-asmjs";
import Debug from "../../utils/Debug";
import IProtocolParameters from "./IProtocolParameters";
import getMainnetEpochNo from "./utils/getMainnetEpochNo";
import getTestnetEpochNo from "./utils/getTestnetEpochNo";

export interface Cip30Wallet
{
    signTx: ( txCBOR: string ) => Promise<string>,
    submitTx: ( signedTxCBOR : string ) => Promise<string>
    getUsedAddresses: () => Promise<string[]>
    getUnusedAddresses: () => Promise<string[]>
    getUtxos: () => Promise<string[]>
}

export default class CardanoGlobalCtx
{

    private static async _blockfrostReqest( endpoint: string , testnet: boolean = false ): Promise<any>
    {
        endpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
        return await fetch(
            `https://cardano-${ testnet ? "testnet" : "mainnet"}.blockfrost.io/api/v0${endpoint}`,
            {
                headers: {
                    project_id: ( testnet ? process.env.BLOCKFROST_KEY_TESTNET : process.env.BLOCKFROST_KEY ) ?? "NO KEY FOUND"
                }
            }).then( res => res.json() );
    }

    private static async _koiosRequest( endpoint: string , testnet: boolean = false , query: string | undefined = undefined): Promise<any>
    {
        endpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
        query = query === undefined ? "" : query.startsWith("?") ? query : "?" + query;

        if( testnet )
        {
            return await fetch(
                `https://testnet.koios.rest/api/v0${endpoint}${query}`
            ).then( res => res.json() )
        }

        return await fetch(
            `https://api.koios.rest/api/v0${endpoint}${query}`
        ).then( res => res.json() );
    }

    private constructor() {};

    private static _protocolParams : IProtocolParameters | undefined
    private static async _fetchProtocolParams( testnet: boolean = false ): Promise<IProtocolParameters>
    {
        Debug.log("fetching protocol parameters")
        return await CardanoGlobalCtx._koiosRequest(`/epoch_params?_epoch_no=${( testnet ? getTestnetEpochNo() : getMainnetEpochNo() ).toString()}` , testnet )
            .then( koiosArray => {
                if( koiosArray.length === 0 ) return Promise.reject();
                return koiosArray[0]
            })
            .catch(
                _koiosDidntWork => CardanoGlobalCtx._blockfrostReqest( "/epochs/latest/parameters", testnet )
            )
    }

    private static _txBuilderConfig: TransactionBuilderConfig | undefined;
    private static async _fetch_txBuilderConfig( testnet: boolean = false ): Promise<TransactionBuilderConfig>
    {
        Debug.log(
            " in ```Cardano.GlobalCtx_fetch_txBuilderConfig```, current CardanoGlobalCtx._protocolParams: ", CardanoGlobalCtx._protocolParams
        )
        if( CardanoGlobalCtx._protocolParams === undefined )
        {
            CardanoGlobalCtx._protocolParams = await CardanoGlobalCtx._fetchProtocolParams( testnet );
        }

        Debug.log(
            "CardanoGlobalCtx._protocolParams after check: ", CardanoGlobalCtx._protocolParams
        )

        const pp = CardanoGlobalCtx._protocolParams;

        return TransactionBuilderConfigBuilder.new()
            .coins_per_utxo_word(
                BigNum.from_str(
                    pp.coins_per_utxo_word.toString()
                )
            )
            .fee_algo(
                LinearFee.new(
                    BigNum.from_str( pp.min_fee_a.toString() ),
                    BigNum.from_str( pp.min_fee_b.toString() )
                )
            )
            .key_deposit(
                BigNum.from_str(
                    pp.key_deposit.toString()
                )
            )
            .max_tx_size( pp.max_tx_size )
            .max_value_size( typeof pp.max_val_size === "string" ? parseFloat( pp.max_val_size ) : pp.max_val_size )
            .pool_deposit(
                BigNum.from_str(
                    pp.pool_deposit.toString()
                )
            )
            .prefer_pure_change( true )
            .build();
    }

    
    // no fixed tx builder
    public static async fetchTxBuilder( testnet: boolean = false ): Promise<TransactionBuilder>
    {
        if( CardanoGlobalCtx._txBuilderConfig === undefined )
        {
            CardanoGlobalCtx._txBuilderConfig = await CardanoGlobalCtx._fetch_txBuilderConfig( testnet );
        }

        return CardanoGlobalCtx.newTxBuilder() ?? TransactionBuilder.new( CardanoGlobalCtx._txBuilderConfig );
    }

    public static newTxBuilder(): (TransactionBuilder | undefined)
    {
        if( CardanoGlobalCtx._txBuilderConfig === undefined) return undefined;

        return TransactionBuilder.new( CardanoGlobalCtx._txBuilderConfig )
    }

    private static wallet: Cip30Wallet | undefined = undefined;
    public static setCip30Wallet( wallet: Cip30Wallet | undefined ): void
    {
        CardanoGlobalCtx.wallet = Object.freeze( wallet );
        Debug.log("setted wallet: ", CardanoGlobalCtx.wallet );
    }

    public static getWalletIfAny() : Cip30Wallet | undefined
    {
        return CardanoGlobalCtx.wallet;
    }

    public static async signTransactionWith( txToSign: Transaction, signTxFn?: ( txCBOR: string ) => Promise<string> ): Promise<Transaction>
    {
        signTxFn = signTxFn ?? CardanoGlobalCtx.wallet?.signTx;

        if( signTxFn === undefined )
        {
            throw Error("no function to sign the transaction with was provided");
        }

        return Transaction.new(
            txToSign.body(),
            TransactionWitnessSet.from_bytes(
                Buffer.from(
                    await signTxFn(
                        Buffer.from(
                            txToSign.to_bytes()
                        ).toString("hex")
                    )
                )
            ),
            txToSign.auxiliary_data()
        )
    }

    /**
     * 
     * @param submitTxFn 
     * @param signedTx 
     * @returns {Promise<TxHash>} where ```TxHash``` is a string
     */
    public static async submitTransactionWith( signedTx: Transaction, submitTxFn?: (signedTxCBOR : string ) => Promise<string> ): Promise<string>
    {
        submitTxFn = submitTxFn ?? CardanoGlobalCtx.wallet?.submitTx;

        if( submitTxFn === undefined )
        {
            throw Error("can't find a function to submit the transaction with");
        }

        return await submitTxFn(
            Buffer.from(
                signedTx.to_bytes()
            ).toString("hex")
        );
    }
}