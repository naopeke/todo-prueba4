import TodoList from "../../ui/TodoList";


export default function TodoPage() {
  return (
    <div className={`flex min-h-screen flex-col items-center p-24`}>
      <h1 className="m-3 font-extrabold">Todo</h1>
       <TodoList></TodoList>
    </div>
  );
}