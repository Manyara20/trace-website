import React from "react";
import Debug from "../../../../../../utils/Debug";
import TypeUtils from "../../../../../../utils/TypeUtils";
import ObjFieldValue from "./FieldValue/type-specific/ObjFieldValue";


export interface MetadataFormProps {

}

interface MetadataFormState {
    addedFields: JSX.Element[]
}

export default class MetadataForm extends React.Component<MetadataFormProps, MetadataFormState>
{
    private _metadata: any = {};

    public getMetadata()
    {
        return (
            TypeUtils.copySerializable( this._metadata )
        );
    }

    constructor( props: MetadataFormProps)
    {
        super(props);

        this._metadata = {};

        this.state = {
            addedFields: []
        }
    }


    render(): React.ReactNode
    {
        
        return (
            
            <ObjFieldValue
            onChange={(obj) => {
                this._metadata = obj;
                Debug.log("actual metadata:\n\n" + JSON.stringify( obj, undefined, 2 ));
            }}
            fixedFieds={[
                {
                    fieldName: {
                        name: "producer",
                        tag: "required"
                    },
                    objValue: {
                        value: [
                            {
                                fieldName: {
                                    name: "Trace producer identifier (NFT policy)",
                                    tag: "required"
                                },
                                stringValue: {
                                    value: "deadbeef"
                                }
                            }
                        ]
                    }
                },

                {
                    fieldName: {
                        name: "product",
                        tag: "required"
                    },
                    objValue: {
                        value: [
                            {
                                fieldName: {
                                    name: "identifier",
                                    tag: "required"
                                }
                            },
                            {
                                fieldName: {
                                    name: "image",
                                    tag: "suggested"
                                },
                                stringValue: {
                                    value: "https://"
                                }
                            }
                        ]
                    }
                },

            ]}
            />
        );
    }
}

