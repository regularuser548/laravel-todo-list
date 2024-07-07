import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextArea from "@/Components/TextArea.jsx";

export default function Create({auth}) {
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

    // This function will send our form data to
    // store function of NoteContoller
    function handleSubmit(e) {
        e.preventDefault()
        router.post('/create', values)
    }

    return (
        <>
            <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Note</h2>}>
                <div className="flex justify-center items-center py-12">
                    <form onSubmit={handleSubmit} className="bg-gray-800 rounded p-4 md:w-3/4 w-full">
                        {/* Pay attention how we create here input fields */}
                        <InputLabel htmlFor="title">Title:</InputLabel>
                        <TextInput className="w-full mb-2" id="title" value={values.title} onChange={handleChange} />

                        <InputLabel htmlFor="body">Body:</InputLabel>
                        <TextArea className="w-full mb-2" rows="12" id="body" value={values.body} onChange={handleChange}></TextArea>
                        <PrimaryButton type="submit">Create</PrimaryButton>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
