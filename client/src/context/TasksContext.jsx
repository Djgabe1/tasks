
import { createContext, useContext, useState } from "react";
import {createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest} from "../api/tasks";

const TasksContext = createContext();

export const useTasks = () => {
    const context = useContext(TasksContext); 
    if(!context){
        throw new Error("useTasks must be used within a TaskProvider")
    }
    return context;
}

export function TaskProvider({children}){
   
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
        setTasks(res.data);
        console.log("res", res);
        } catch (error) {
            console.log("Error fetching tasks:", error);
           setTasks([]);
        }
    }

    
    const createTasks = async (tasks)=>{
        const res = await createTaskRequest(tasks);
        console.log("res", res);
        
    }
    const deleteTasks = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    }

    const getTask = async (id) => {
        try{
            const res = await getTaskRequest(id);
            return res.data;
        }catch(error){
            console.log("Error fetching task:", error);
        }
    }
    const updateTask = async (id, task) =>{
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.log("Error updating task:", error);
            
        }
    }
    return(
        <TasksContext.Provider value={{
            tasks,
            createTasks,
            getTasks,
            getTask,
            deleteTasks,
            updateTask
        }}>
            {children}
        </TasksContext.Provider>
    )
}