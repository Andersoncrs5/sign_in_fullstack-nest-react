import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterDto from "../dtos/register.dto";
import api from "../axios/api";
import { AxiosResponse } from "axios";

export default function Register() {
    const [name, setName] = useState<string>('');
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

    async function goToLogin() {
        nav('/');
    }

    async function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user: RegisterDto = {
                name,
                email,
                password
            };

            const response: AxiosResponse<any, any> = await api.post('/users', user);
            
            if (response.status == 500 ) {
                alert('system unavailable try again later');
            }

            if (response.status == 409 ) {
                alert('Email is used!');
            }
            
            if (response.status == 404 ) {
                alert('Error registering user. Please try a login!');
            }

            if (response.status == 201) {
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("refreshToken", response.data.refresh_token);

                alert("Usuário cadastrado com sucesso!");
                clearForm();
                nav('/home')
            }
            
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-2 text-white w-50 p-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} className="form-control mt-1" type="text" name="name" id="name" />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className="form-control mt-1" type="email" name="email" id="email" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="form-control mt-1" type="password" name="password" id="password" />
                    </div>

                    <div className="mt-3">
                        <input className="btn btn-outline-primary" type="submit" value="SUBMIT" />
                        <button type="button" className="btn btn-outline-light ms-2" onClick={goToLogin}>BACK</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
