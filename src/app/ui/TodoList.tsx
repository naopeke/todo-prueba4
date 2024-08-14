"use client"

import { useState, useEffect } from "react";
import { Todo } from "../lib/definitions"; 
import TodoItem from "./TodoItem";
import { getTodos, postTodo, deleteTodo, putTodo, doneTodo } from "../lib/actions";

export default function TodoList(){

    const [ todos, setTodos ] = useState<Todo[]>([]); // fetch
    const [ newTodo, setNewTodo ] = useState(''); //add

    useEffect(()=>{
        const fetchPrevTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };
        fetchPrevTodos();
    }, []);

    const addTodo = async() =>{
        if (!newTodo.trim()) return;
        try {
            const formData = new FormData();
            formData.append('description', newTodo)
            const data = await postTodo(formData);
            console.log('data in front', data[0].item_id);
            const updatedData = await getTodos();
            setTodos(updatedData);
            setNewTodo('');
        } catch (err){
            console.error('Error adding', err);
        }
    }

    const removeTodo = async(item_id: number) =>{
        try {
            const data = await deleteTodo(item_id);
            console.log('data after removing front', data);
            const updatedData = await getTodos();
            setTodos(updatedData);
        } catch (err){
            console.error('Error removing', err);
        }
    }

    const updateTodo = async(item_id: number, description: string) =>{
        try {
            const data = await putTodo(item_id, description);
            console.log('data after editing front', data);
            const updatedData = await getTodos();
            setTodos(updatedData);
        } catch (err){
            console.error('Error removing', err);
        }
    }
    
    return (
        <div>
            <div>
                <input 
                    type="text" 
                    className="shadow-md rounded-md p-2" 
                    placeholder="Text your task"
                    value={newTodo}
                    onChange ={(event)=> setNewTodo(event.target.value)}
                />
                <button 
                    className="m-3 p-2 shadow-md bg-pink-400 rounded-full"
                    onClick={addTodo}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="size-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>


              </button>
            </div>

            <div>
            <ul>
                {todos.map((todo: Todo) => (
                    <li key={todo.item_id} 
                        className="p-2 shadow-md rounded-md"
                    >
                        <TodoItem
                            item_id={todo.item_id}
                            description={todo.description}
                            isDone={todo.isDone}
                            onEdit={updateTodo}
                            onRemove={()=> removeTodo(todo.item_id)}
                        />
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}