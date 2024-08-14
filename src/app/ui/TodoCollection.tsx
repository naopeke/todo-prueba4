"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TodoListCollection } from "../lib/definitions";
import TodoCollectionItem from "./TodoCollectionItem";
import { getCollections, postCollection, deleteCollection, putCollection } from "../lib/actions";
import { useSession } from "next-auth/react";

export default function TodoCollection() {
  const [todos, setTodos] = useState<TodoListCollection[]>([]); // fetch
  const [newTodo, setNewTodo] = useState(""); // add
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log('session', session);
  console.log('status', status);

  useEffect(() => {
    const fetchPrevTodos = async () => {
        if (session?.user?.id) {
      try {
        const user_id = Number(session.user.id);
        const data = await getCollections(user_id);
        setTodos(data);
        console.log('session', session);
        console.log('status', status);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }}
    };
    fetchPrevTodos();
  }, []);


  const addCollection = async () => {
    if (!newTodo.trim() || !session?.user?.id) return;
    const user_id = Number(session.user.id);

    try {
      const formData = new FormData();
      formData.append("description", newTodo);
      const data = await postCollection(formData, user_id);
      const updatedData = await getCollections(user_id);
      setTodos(updatedData);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding", err);
    }
  };

  const removeCollection = async (collection_id: number) => {
    if (!session?.user?.id) return;
    const user_id = Number(session.user.id);

    try {
      await deleteCollection(collection_id);
      const updatedData = await getCollections(user_id);
      setTodos(updatedData);
    } catch (err) {
      console.error("Error removing", err);
    }
  };

  const updateCollection = async (collection_id: number, collection_name: string) => {
    if (!session?.user?.id) return;
    const user_id = Number(session.user.id);
    try {
      await putCollection(collection_id, collection_name);
      const updatedData = await getCollections(user_id);
      setTodos(updatedData);
    } catch (err) {
      console.error("Error updating", err);
    }
  };

  const redirect = (collection_id: number)=>{
    router.push(`/todo/${collection_id}`);
  }


  return (
    <div>
      <div>
        <input
          type="text"
          className="shadow-md rounded-md p-2"
          placeholder="Make your new Todo List"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          className="m-3 p-2 shadow-md bg-pink-400 rounded-full"
          onClick={addCollection}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div>
            <ul>
                {todos.map((collection: TodoListCollection) => (
                    <li key={collection.collection_id} 
                        className="p-2 shadow-md rounded-md"
                    >
                        <TodoCollectionItem
                            collection_id={collection.collection_id}
                            collection_name={collection.collection_name}
                            onEdit={updateCollection}
                            onRemove={()=> removeCollection(collection.collection_id)}
                            onRedirect={redirect}
                        />
                    </li>
                ))}
            </ul>
            </div>
    </div>
  );
}