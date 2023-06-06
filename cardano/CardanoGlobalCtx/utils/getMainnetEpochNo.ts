
export default function getMainnetEpochNo(): number
{
    return Math.floor(
        (
            Date.now() -
            Date.UTC(2017,8,23,21,44,51,0) // cardano mainnet start
        ) // slot * 1000                |
        / // divided by 86_400_000      | -> days from mainnet
        (
            864e5 // milliseconds in Day
            *
            5 // days in Epoch
        )
    )
}