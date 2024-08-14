export type User = {
    user_id: number;
    username: string;
    email: string;
    password: string;
  };
  
export type Todo = {
    item_id: number;
    description: string;
    isDone: boolean;
    id_user?: number;
}

export type TodoListCollection = {
    collection_id: number;
    collection_name: string;
    id_user?: number;
    username?: string;
}