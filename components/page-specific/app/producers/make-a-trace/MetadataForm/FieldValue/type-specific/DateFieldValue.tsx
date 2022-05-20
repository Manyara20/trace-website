import { HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import IFieldValueProps from "../IFieldValueProps";
import NumFieldValue from "./NumFieldValue";

export namespace DateStruct {

    export enum Month {
        January = 1,
        February = 2,
        March = 3,
        April = 4,
        May = 5,
        June = 6,
        July = 7,
        August = 8,
        September = 9,
        October = 10,
        November = 11,
        December = 12
    };
    
}

export interface DateStruct {
    day: number
    month: DateStruct.Month
    year: number
}


export interface DateFieldValueProps extends IFieldValueProps {
    defaultValue?: DateStruct
}

interface DateFieldValueState {
    maxDayInMonth: number
}

export default class DateFieldValue extends React.Component< DateFieldValueProps, DateFieldValueState >
{
    private _date : DateStruct
    private _lastChange: number = Date.now();

    constructor( props: DateFieldValueProps )
    {
        super(props);

        const now = new Date();

        this._date = {
            day: now.getDate(),
            month: now.getMonth() + 1,
            year: now.getFullYear()
        }

        if( this.props.defaultValue )
        {
            this._date = {
                day: 
                    Math.round( this.props.defaultValue.day ) === this.props.defaultValue.day   &&
                    this.props.defaultValue.day > 0                                             && 
                    this.props.defaultValue.day >  this._getMaxDay( this.props.defaultValue.month, this.props.defaultValue.year ) ?
                    this.props.defaultValue.day:
                    this._date.day,
                month:
                    Math.round( this.props.defaultValue.month ) === this.props.defaultValue.month && 
                    this.props.defaultValue.month >= 1 && this.props.defaultValue.month <= 12 ?
                    this.props.defaultValue.month :
                    this._date.month,
                year: 
                    Math.round( this.props.defaultValue.year ) === this.props.defaultValue.year &&
                    this.props.defaultValue.year >= 0 ?
                    this.props.defaultValue.year :
                    this._date.year
            };
        }

        this.state = {
            maxDayInMonth: this._getMaxDay()
        };

        this.props.onChange( this._date );


        this._setDay = this._setDay.bind(this);
        this._setMonth = this._setMonth.bind(this);
        this._setYear = this._setYear.bind(this);

        this._callChange = this._callChange.bind(this); 
    }

    render(): ReactNode
    {
        return (
            <Stack >
                <HStack>
                    <Text>day:</Text>
                    <NumFieldValue defaultValue={this._date.day} onChange={this._setDay} min={1} max={this._getMaxDay()} />
                </HStack>
                <HStack>
                    <Text>month:</Text>
                    <NumFieldValue defaultValue={this._date.month} onChange={this._setMonth} min={1} max={12} />
                </HStack>
                <HStack>
                    <Text>year:</Text>
                    <NumFieldValue defaultValue={this._date.year} onChange={this._setYear} min={0} />
                </HStack>
            </Stack>
        );  
    }

    private _getMaxDay( month?: DateStruct.Month, year?: number ): number
    {
        const _month = month ?? this._date.month;
        const _year = year ?? this._date.year;

        if(
            _month === DateStruct.Month.February 
        )
        {
            if( ( _year % 4 ) === 0 )
            {
                return 29;
            }

            return 28;
        }

        if( // January is 1; then increasing
            (( _month % 2 ) === 1 &&
            ( _month <= 7 ))
            ||
            ( ( _month % 2 ) === 0 &&
            ( _month > 7 ))
        )
        {
            return 31;
        }

        return 30;
    }

    private _setDay( n : number )
    {
        this._date.day = n;

        this._callChange();
    }

    private _setMonth( n : DateStruct.Month )
    {
        this._date.month = n;

        this._callChange();
    }

    private _setYear( n : number )
    {
        this._date.year = n;

        this._callChange();
    }

    private _callChange()
    {
        const callChange = () => setTimeout( () => {

            if( Date.now() - this._lastChange < 500 )
            {
                return;
            }
            else
            {
                this.props.onChange( this._date );
            }
        }, 500 );

        this._lastChange = Date.now();
        callChange();
    }
}