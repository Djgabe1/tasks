import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard";


function TasksPage() {
  const {getTasks, tasks}= useTasks();

  useEffect(()=>{
    getTasks();
  }
  ,[]);

  if (tasks.length === 0) {
    return (
      <div className="flex h-[calc(100vh)] items-center justify-center">
        <h1 className="text-2xl text-black">No tasks found</h1>
      </div>
    );
  }
  
  return (
    <div className=" flex h-[calc(100vh)] items-center justify-center max-w-7xl mx-auto ">
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-2">
      {
      tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
        
      ))
    }
    </div>
    </div>
  )
}

export default TasksPage
