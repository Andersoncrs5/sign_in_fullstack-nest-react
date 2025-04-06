import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import User from "../dtos/user.dto";
import { AxiosResponse } from "axios";

export default function Profile() {
    const nav = useNavigate();
    const [user, setUser] = useState<User | null>(null);

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
            setUser(response.data);
        } catch (error: any) {
            console.error("Erro:", error);
            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }
        }
    }

    function update() {
        nav('/update');
    }

    function back() {
        nav('/home');
    }

    async function deleteUser() {
        try {
            const response: AxiosResponse<any, any> = await api.delete('users');
            
            if (response.status === 200){
                localStorage.clear();
                nav('/');
            } else {
                alert('Erro ao deletar usuário.');
            }
        } catch (error) {
            alert('Erro no servidor! Tente novamente mais tarde.');
        }
    }    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-2 text-white w-50 p-3">
                <div className="p-1 text-white">
                    {user ? (
                        <div>
                            <p><strong>Nome:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Data de criação:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                            <p><strong>Última atualização:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
                            
                            <div className="d-flex gap-2 mt-3 flex-wrap">
                                <button className="btn btn-outline-warning" onClick={update}>UPDATE</button>

                                <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    DELETE
                                </button>

                                <button className="btn btn-outline-light" onClick={back}>BACK</button>
                            </div>

                            
                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content border border-1 rounded" id="modalDelete" >
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tem certeza?</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Essa ação não pode ser desfeita.
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                                            <button onClick={() => deleteUser() } type="button" className="btn btn-outline-danger">Confirmar exclusão</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1>Carregando dados...</h1>
                    )}
                </div>
            </div>
        </div>
    );
}
