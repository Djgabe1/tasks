import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';


function RegisterPage() {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const {signup, isAuthenticated, errors:registerErrors} = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        if (isAuthenticated) navigate('/tasks');
    }, [isAuthenticated, navigate]);
    
    const onSubmit = handleSubmit(async(values) =>{
        signup(values);
        
    })
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        {
            
            registerErrors.map((error, i)=>(
                <div className='bg-red-500 p-2 text-white'  key={i}>
                    {error}
                </div>
            ))
        }
        <h1 className="text-2xl font-bold">Register</h1>
            <form onSubmit={onSubmit} >
                <input type="text" {... register("username", {required: true})} 
                    className='w-full bg-zinc-600 text-white px-4 py-2 rounded-b-md my-2'
                    placeholder='Username'
                />
                {errors.username && <p className='text-red-500'>Username is required</p>}
                <input type="email" {... register("email", {required: true})} 
                    className='w-full bg-zinc-600 text-white px-4 py-2 rounded-b-md my-2'
                    placeholder='Email'
                />
                 {errors.email && <p className='text-red-500'>email is required</p>}
                <input type="password" {... register("password", {required:true})} 
                    className='w-full bg-zinc-600 text-white px-4 py-2 rounded-b-md my-2'
                    placeholder='Password'
                />
                 {errors.password && <p className='text-red-500'>Password is required</p>}
                <button type='submit' className='rounded-md bg-teal-800 text-write px-3 py-2'>Register</button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Alredy have an account?{" "} <Link to="/login" className="text-sky-500">Login</Link>
            </p>
        </div>
        </div>
    )
}

export default RegisterPage
