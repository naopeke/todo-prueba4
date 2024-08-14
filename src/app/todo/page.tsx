import { TodoListCollection } from '../lib/definitions';
import TodoCollection from '../ui/TodoCollection';
import styles from '../ui/home.module.css';
import Image from "next/image"; 


export default function TodoPage() {

  return (
    <div className={`flex min-h-screen flex-col items-center p-24`}>
      <h1 className="m-3 font-extrabold">Todo List Collection</h1>
       <TodoCollection />
    </div>
  );
}