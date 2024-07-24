import SecondaryButton from "@/Components/SecondaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useState} from "react";
import TextArea from "@/Components/TextArea.jsx";

export default function Note(props){

    const [isEditMode, setEditMode] = useState(false);

    const [newValues, setNewValues] = useState({
        title: props.title,
        body: props.body
    });

    function Save(){
        setEditMode(false);
        props.on_edit(props.id, newValues.title, newValues.body);

    }

    function Cancel(){
        setEditMode(false);

        const title = props.title;
        const body = props.body;
        setNewValues({
            title,
            body
        })
    }

    function EnableEditMode(){
        setEditMode(true);
    }

    function handleTextChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setNewValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
    <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                {isEditMode ?
                    <div className="float-right">
                        <SecondaryButton className="me-2" type="button" onClick={Save}>Save</SecondaryButton>
                        <SecondaryButton type="button" onClick={Cancel}>Cancel</SecondaryButton>
                    </div>
                    :
                    <div className="float-right">
                        <SecondaryButton className="me-2" type="button" onClick={EnableEditMode}>Edit</SecondaryButton>
                        <SecondaryButton type="button" onClick={() => props.on_delete(props.id)}>Delete</SecondaryButton>
                    </div>
                }

                <p className="font-bold">{isEditMode ? <TextInput className="font-bold mb-2" id="title" value={newValues.title}
                                                                  onChange={handleTextChange}></TextInput> : props.title}
                </p>
                <p className="font-bold">{isEditMode ?
                    <TextArea className="font-bold" id="body" value={newValues.body} onChange={handleTextChange}>
                    </TextArea> : props.body}
                </p>

                <div className="pt-2 text-gray-400 text-sm">
                    <span>{"Created: " + new Date(props.created_at).toLocaleDateString() + " "}</span>
                    <span>{"Updated: " + new Date(props.updated_at).toLocaleDateString()}</span>
                </div>

            </div>
        </div>
    </div>
    )
}
