import axios from './axios';

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest= user => axios.post(`/login`, user)

export const verityTokenRequest = () => axios.get('/verify ')