import React from "react";
import Debug from "../../../../../../utils/Debug";
import ObjFieldValue from "./FieldValue/type-specific/ObjFieldValue";


interface MetadataFormProps {

}

interface MetadataFormState {
    addedFields: JSX.Element[]
}

export default class MetadataForm extends React.Component<MetadataFormProps, MetadataFormState>
{
    constructor( props: MetadataFormProps)
    {
        super(props);

        this.state = {
            addedFields: []
        }
    }


    render(): React.ReactNode
    {
        
        return (
            
                <ObjFieldValue
                fixedFieds={[
                    {
                        fieldName: {
                            name: "producer",
                            tag: "required"
                        }
                    },
                    {
                        fieldName: {
                            name: "product",
                            tag: "required"
                        }
                    },
                ]}
                onChange={Debug.log}
                />
        );
    }
}

