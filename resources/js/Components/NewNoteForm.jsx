import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function NewNoteForm(props){
    const [values, setValues] = useState({ // Form fields
        title: "",
        body: ""
    });

    // We will use function below to get
    // values from form inputs
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }


    function handleSubmit(e) {
        e.preventDefault();
        props.createNote(values.title, values.body);
        setValues({title: '', body: ''});
    }

    return (
        <form onSubmit={handleSubmit} className="py-4">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                    <TextInput
                        type="text"
                        id="title"
                        placeholder="Title"
                        autoComplete="off"
                        value={values.title}
                        onChange={handleChange}
                        className="me-2 mb-1"
                    />

                    <TextInput
                        type="text"
                        id="body"
                        placeholder="Body"
                        autoComplete="off"
                        value={values.body}
                        onChange={handleChange}
                        className="me-2"
                    />

                    <PrimaryButton type="submit">
                        Add
                    </PrimaryButton>

                </div>
            </div>
        </form>
)
}
