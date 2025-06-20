/* eslint-disable react-refresh/only-export-components */

import { useContext, useEffect, useState} from 'react';
//Import api
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

import { createContext } from "react";

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}
export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading]= useState(true)

    const signup = async (user) =>{
        try {
            const res = await registerRequest(user)
            setUser(res.data) 
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data)
        }
    }
    const signin = async (user) =>{
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
            console.log(res);
            
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            console.log(error);
            setErrors([error.response.data.message])
        }
    }
    const logout = () =>{
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    }


    useEffect(()=>{
        if(errors.length > 0){
           const timer =  setTimeout(()=>{
                setErrors([])
            },5000)
            return() => clearTimeout(timer)
        }
    },[errors])

    useEffect(()=>{
        async function checkLogin( ){
        const cookies = Cookies.get()
        console.log(cookies);
        if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
        }
        
        try {
            const res= await verityTokenRequest(cookies.token);          
            if (!res.data){
                setIsAuthenticated(false);
                setLoading(false);
                
                return; 
            }

            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false);
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false);
            console.log(error);
            
        }
        }
        checkLogin();
    }, [])


    return(
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            isAuthenticated,
            errors,
            loading
        }}>

            {children}
        </AuthContext.Provider>
    )
}
