import {useTasks} from '../context/TasksContext';
import {Link} from 'react-router';

function TaskCard({task}) {
   const {deleteTasks} = useTasks();

  return (
    <div className="bg-zinc-800 p-10 rounded-md mb-2">
    <header className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold text-indigo-300 my-3">{task.title}</h2>
      <div className='flex gap-x-2 items-center'>
        <button onClick={()=>{
          deleteTasks(task._id);
        }} className='rounded-md bg-red-600 text-write px-3 py-2'>Delete</button>
        <button className='rounded-md bg-indigo-800 text-write px-3 py-2'>
          <Link to={`/tasks/${task._id}`}>
          Edit
          </Link>
        </button>
      </div>
    </header>
      <p className="text-gray-100 my-3">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  )
}

export default TaskCard
