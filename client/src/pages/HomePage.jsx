import React from 'react'
import { Link } from 'react-router'
import '../css/Homepage.css'

function HomePage() {
  return (
    <div className=' flex h-[calc(100vh-100px)] items-center justify-center '>
    <div className='flex flex-col items-center justify-center text-center'>
      <h1 className='text-5xl text-black font-semibold'>TASKS ORGANIZER</h1>
      <h2 className='text-3xl text-black font-semibold'>Organize your day, Organize your life</h2>
       <div className="mt-6 flex items-center justify-center gap-x-6 rounded-md">
        <button type="button" className="rounded-md bg-teal-800 px-10 py-4 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Link to="/login">Login</Link>
        </button>
        <button
          type="submit"
          className="rounded-md bg-teal-800 px-11 py-4 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Link to="/register">Register</Link>
        </button>
      </div>
      
    </div>
        
    </div>
  )
}

export default HomePage
