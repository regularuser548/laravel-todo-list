import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Note from "@/Components/Note.jsx";
import {useState} from "react";

export default function MainPage({ auth, notes }) {

    const [notesList, setNotesList] = useState(notes);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Notes" />

                { notes && notes.map( (item) => (
                    <Note key={item.id} id={item.id}
                          title={item.title}
                          body={item.body}
                          created_at={item.created_at}
                          updated_at={item.updated_at}
                    ></Note>
                )) }

            </AuthenticatedLayout>
        </>
    );
}
