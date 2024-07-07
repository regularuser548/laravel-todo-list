export default function Note(props){
    return (
    <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <p className="font-bold">{props.title}</p>
                <p className="pt-2">{props.description}</p>
                <div className="pt-2 text-gray-400 text-sm">
                    <span>{"Created: " + new Date(props.created_at).toLocaleDateString() + " "}</span>
                    <span>{"Updated: " + new Date(props.updated_at).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    </div>
)
}
