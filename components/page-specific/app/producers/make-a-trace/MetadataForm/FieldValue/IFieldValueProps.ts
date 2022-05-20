

export default interface IFieldValueProps {
    removeable?: boolean
    onRemotion?: () => void
    onChange: (newValue: any) => void,
    defaultValue?: any
}