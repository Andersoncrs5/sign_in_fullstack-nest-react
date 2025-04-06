import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDto from "../dtos/login.dto";
import api from "../axios/api";
import { AxiosResponse } from "axios";

export default function LoginPag() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const nav = useNavigate();

    useEffect(() => {
        isLogged();
    }, []);

    async function isLogged() {
        const token: string | null = localStorage.getItem('token');

        if (token != null ) {
            nav('/home');
        }
    }

    function goToRegiter(){
        nav('/register');
    }

    async function clearForm() {
        setEmail('');
        setPassword('');
    }

    async function handleSubmit(e: React.FormEvent) {
        try {
            e.preventDefault();

            const user: LoginDto = {
                email,
                password
            }

            const response: AxiosResponse<any, any> = await api.post('users/login', user)

            console.log(response);

            if (response.status == 200) {
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("refreshToken", response.data.refresh_token);
            }

            alert("Welcome again!");
            clearForm();
            nav('/home')
        } catch (e) {
            console.error(e);
            alert('Error the make login')
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-2 text-white w-50 p-5 " >
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value) } className="form-control mt-1 " type="email" name="email" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value) } className="form-control mt-1 " type="password" name="password" id="" />
                    </div>
                    <div className="mt-1" >
                        <input className="btn btn-outline-primary" type="submit" value="SUBMIT" />
                        <button className="btn btn-outline-light ms-2" onClick={() => goToRegiter() } > Register </button>
                    </div>
                </form>
            </div>
        </div>
    );
}