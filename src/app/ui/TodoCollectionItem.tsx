"use client"

import { useState } from "react"

type TodoCollectionItemProps = {
    collection_id: number;
    collection_name: string;
    onEdit: (collection_id: number, collection_name: string) => void;
    onRemove: (collection_id: number) => void;
    onRedirect: (collection_id: number) => void;
}

export default function TodoCollectionItem ({collection_id, collection_name, onEdit, onRemove, onRedirect}: TodoCollectionItemProps){

    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(collection_name);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleEditSave = () => {
        onEdit(collection_id, editedTodo);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <div className="flex justify-between">
                    <input 
                        type="text"
                        value={editedTodo}
                        onChange={(e)=> setEditedTodo(e.target.value)}
                        className="border p-1"
                    />
                    <button
                        className="p-2 rounded-md bg-lime-600"
                        onClick={handleEditSave}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="size-6">
                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                        </svg>

                    </button>
                </div>
            ): (
                <div className="flex justify-between">
                    <div>
                        <input 
                            type="checkbox"
                            className="m-2"
                        />
                        <span>
                            {collection_name}
                        </span>
                    </div>
                    <div>
                        <button
                            className="p-2 mr-1 rounded-full bg-pink-500"
                            onClick={handleEdit}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="size-6">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>


                        </button>
                        <button 
                            className="p-2 rounded-full bg-pink-500"
                            onClick={()=>onRemove(collection_id)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="size-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                        </button>
                        <button
                            className="p-2 rounded-full bg-pink-500"
                            onClick={()=>onRedirect(collection_id)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="size-6">
                        <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                </div>
            )
            }
        </div>
    )
}