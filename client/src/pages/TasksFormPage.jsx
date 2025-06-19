import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { get } from "mongoose";

function TasksFormPage() {
  const {register, handleSubmit, setValue }= useForm();
  const {createTasks, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if(params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
    }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data)=>{
    if(params.id){
      updateTask(params.id, data);
      // console.log("update", data);
    }else{
      createTasks(data);
    }
    navigate('/tasks');
  })
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h1 className="text-sky-500">NEW TASK</h1>
      <form onSubmit={onSubmit}>
        <input type="text" 
        placeholder="Title"
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-b-md my-2"
          autoFocus
        />
        <textarea rows={3} 
        placeholder="Description"
        {...register("description")}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-b-md my-2"
        ></textarea>
        <button type="submit" className='rounded-md bg-teal-800 text-write px-3 py-2'>Save</button>
      </form>
    </div>
    </div>
  )
}

export default TasksFormPage
