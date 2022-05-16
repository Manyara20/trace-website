import { AtSignIcon, AttachmentIcon, CalendarIcon, CheckIcon, ChevronDownIcon, EmailIcon, HamburgerIcon, InfoIcon, LinkIcon, PlusSquareIcon, TimeIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { PercentageIcon, RangeIcon } from "../../../../../../icons";


export type FieldValueType =
    "option"        |
    "number"        |
    "hour"          |
    "date"          |
    "range"         |
    "percentage"    |
    "mail"          |
    "link"          |
    "text"          |
    "list"          |
    "obj";

interface FieldValueTypeSelectorProps {
    onChoice: ( choice: FieldValueType ) => void
    hideStructuredValues?: boolean 
}

interface FieldValueTypeSelectorState {

}

export default class FieldValueTypeSelector extends React.Component<FieldValueTypeSelectorProps, FieldValueTypeSelectorState>
{
    constructor(props: FieldValueTypeSelectorProps)
    {
        super(props);
    }

    render(): React.ReactNode
    {
        
        return (
            <>
            <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Select value type
            </MenuButton>
            <MenuList>
                <MenuItem icon={<CheckIcon />} onClick={() => this.props.onChoice("option")} >
                    Option (Yes/No)
                </MenuItem>
                <MenuItem icon={<PlusSquareIcon />} onClick={() => this.props.onChoice("number")}  >
                    Number
                </MenuItem>
                <MenuItem icon={<TimeIcon />} onClick={() => this.props.onChoice("hour")}  >
                    Hour
                </MenuItem>
                <MenuItem icon={<CalendarIcon />} onClick={() => this.props.onChoice("date")}  >
                    Date
                </MenuItem>
                <MenuItem icon={<RangeIcon />} onClick={() => this.props.onChoice("range")} >Range</MenuItem>
                <MenuItem icon={<PercentageIcon />} onClick={() => this.props.onChoice("percentage")} >Percentage</MenuItem>
                <MenuItem icon={<AtSignIcon/>} onClick={() => this.props.onChoice("mail")}  >e-mail</MenuItem>
                <MenuItem icon={<LinkIcon/>}  onClick={() => this.props.onChoice("link")} >Link</MenuItem>
                <MenuItem icon={<InfoIcon />} onClick={() => this.props.onChoice("text")} >Text</MenuItem>
                {
                !this.props.hideStructuredValues && 
                (<>
                <MenuItem icon={<HamburgerIcon />} onClick={() => this.props.onChoice("list")} >List of Values</MenuItem>
                <MenuItem icon={<AttachmentIcon />} onClick={() => this.props.onChoice("obj")} >Labeled sub-fields</MenuItem>
                </>
                )}
            </MenuList>
            </Menu>
            </>
        )
    }
}