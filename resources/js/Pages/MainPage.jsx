import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Note from "@/Components/Note.jsx";

export default function MainPage({ auth, notes }) {
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Notes" />

                { notes && notes.map( (item) => (
                    <Note key={item.id} title={item.title}
                          description={item.description}
                          created_at={item.created_at}
                          updated_at={item.updated_at}
                    ></Note>
                )) }

            </AuthenticatedLayout>
        </>
    );
}
