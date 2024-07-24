import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Note from "@/Components/Note.jsx";
import {useState} from "react";
import NewNoteForm from "@/Components/NewNoteForm.jsx";

export default function MainPage({ auth, notes }) {

    const [notesList, setNotesList] = useState(notes);



    function deleteNote(id){
        axios.delete(`api/notes/${id}`)
            .then(function (response) {
                setNotesList(notesList.filter(e => e.id !== id));
            }).catch(function (error) {
            console.log(error);
        });
    }

    function editNote(id, title, body){
        axios.put(`api/notes/${id}`, {
            title: title,
            body: body
        }).then(function (response) {
            setNotesList(notesList.map(note => {
               if (note.id === id) {
                   note.title = title;
                   note.body = body;
                   note.updated_at = new Date().toLocaleDateString();
                   return note;
               }
               else
                   return note;
            }));
        }).catch(function (error) {
            console.log(error);
        });
    }

    function createNote(title, body){
        axios.post(`api/notes`, {
            title: title,
            body: body
        }).then(function (response) {
            setNotesList( [
                ...notesList,
                {   id: response.data.id,
                    title: title,
                    body: body,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at
                }
            ])
            }).catch(function (error) {
            console.log(error);
        });
        }


    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Notes" />

                <NewNoteForm createNote={createNote}></NewNoteForm>

                { notesList && notesList.map( (item) => (
                    <Note key={item.id} id={item.id}
                          title={item.title}
                          body={item.body}
                          created_at={item.created_at}
                          updated_at={item.updated_at}

                          on_delete={deleteNote}
                          on_edit={editNote}
                    ></Note>
                )) }

            </AuthenticatedLayout>
        </>
    )
}
