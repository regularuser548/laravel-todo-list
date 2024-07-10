import SecondaryButton from "@/Components/SecondaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useState} from "react";
import TextArea from "@/Components/TextArea.jsx";

export default function Note(props){

    const [isEditMode, setEditMode] = useState(false);

    const [title, setTitle] = useState(props.title);
    const [oldTitle, setOldTitle] = useState('');

    const [body, setBody] = useState(props.body);
    const [oldBody, setOldBody] = useState('');



    function Save(){
        setEditMode(false);

        setOldTitle('');
        setOldBody('');

        axios.put(`/update/${props.id}`, {
            title: title,
            body: body
        }).catch(function (error) {
                console.log(error);
            });

        //TODO change update date

    }

    function Cancel(){
        setEditMode(false);

        setTitle(oldTitle);
        setBody(oldBody);

        setOldTitle('');
        setOldBody('');
    }

    function EnableEditMode(){
        setEditMode(true);

        setOldTitle(title);
        setOldBody(body);

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

                <p className="font-bold">{isEditMode ? <TextInput className="font-bold" id="title" value={title}
                                                                  onChange={(e) => setTitle(e.target.value)}></TextInput> : title}</p>
                <p className="font-bold">{isEditMode ?
                    <TextArea className="font-bold" id="body" value={body} onChange={(e) => setBody(e.target.value)}></TextArea> : body}</p>

                <div className="pt-2 text-gray-400 text-sm">
                    <span>{"Created: " + new Date(props.created_at).toLocaleDateString() + " "}</span>
                    <span>{"Updated: " + new Date(props.updated_at).toLocaleDateString()}</span>
                </div>

            </div>
        </div>
    </div>
    )
}
