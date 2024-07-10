import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Note from "@/Components/Note.jsx";
import {useState} from "react";

export default function MainPage({ auth, notes }) {

    const [notesList, setNotesList] = useState(notes);

    function deleteNote(id){
        axios.delete(`/delete/${id}`)
            .then(function (response) {
                setNotesList(notesList.filter(e => e.id !== id));
            }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Notes" />

                { notesList && notesList.map( (item) => (
                    <Note key={item.id} id={item.id}
                          title={item.title}
                          body={item.body}
                          created_at={item.created_at}
                          updated_at={item.updated_at}
                          on_delete={deleteNote}
                    ></Note>
                )) }

            </AuthenticatedLayout>
        </>
    );
}
