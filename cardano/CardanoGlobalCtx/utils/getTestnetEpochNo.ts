
export default function getTestnetEpochNo(): number
{
    return Math.floor(
        (
            Date.now() -
            Date.UTC(2019,7,24,20,20,16,0) // cardano testnet start
        ) // slot * 1000                |
        / // divided by 86_400_000      | -> days form mainnet
        (
            864e5 // milliseconds in Day
            *
            5 // days in Epoch
        ) 
    ) + 6 // WHY?
}