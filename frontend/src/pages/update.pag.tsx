import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import RegisterDto from "../dtos/register.dto";

export default function Update() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const nav = useNavigate();

    useEffect(() => {
        getUser();
        isLogged();
    }, []);

    async function isLogged() {
        const token: string | null = localStorage.getItem("token");

        if (token == null) {
            nav('/');
        }
    }

    async function getUser() {
        try {
            const response = await api.get('users/me'); 

            if (response.status == 200) {
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
            }

        } catch (error: any) {
            console.error("Erro:", error);
            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }
            nav('/home');
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user: RegisterDto = {
                name,
                email,
                password
            };

            const response = await api.put('users', user);

            if (response.status == 500 ) {
                alert('system unavailable try again later');
            }

            if (response.status == 400 ) {
                alert('Error data not passed!');
            }

            if (response.status == 200) {
                nav('/home')
            }

            alert('Error the make update');
        } catch (err) {
            console.error(err);
            alert('Error the make update');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-2 text-white w-50 p-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control mt-1"
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control mt-1"
                            type="password"
                            name="password"
                            id="password"
                        />
                    </div>

                    <div className="mt-4">
                        <input className="btn btn-outline-primary" type="submit" value="SUBMIT" />
                    </div>
                </form>
            </div>
        </div>
    );
}