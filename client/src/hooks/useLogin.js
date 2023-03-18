import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Axios from "axios";

export const useLogin = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await Axios.post('http://localhost:4000/api/user/login', {email, password});
            const data = response.data;

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(data))

            // update the auth context
            dispatch({type: 'LOGIN', payload: data})

            // update loading state
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            setError(error.response?.data?.error || 'Something went wrong.')
        }
    }

    return { login, isLoading, error } 
}