import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

function LoginPage() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signin, isAuthenticated , errors:signinErrors} = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        if (isAuthenticated) navigate('/tasks')
    },[isAuthenticated, navigate])

    const onSubmit = handleSubmit(async data =>{
        signin(data)
        //console.log(data);
        
    })
    
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        {
            
            signinErrors.map((error, i)=>(
                <div className='bg-red-500 p-2 text-white text-center'  key={i}>
                    {error}
                </div>
            ))
        }
            <h1 className="text-2xl font-bold">Login</h1>
           <form onSubmit={onSubmit} >
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
                <button type='submit' className='rounded-md bg-teal-800 text-write px-3 py-2'>Login</button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
            </p>
        </div>
        </div>
    )
}

export default LoginPage

