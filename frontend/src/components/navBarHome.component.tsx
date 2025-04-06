import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import api from "../axios/api";
import { AxiosResponse } from "axios";

export default function NavBarHome(){

    const nav: NavigateFunction = useNavigate();

    async function profile() {
        nav('/profile');
    }

    async function logout() {
        try {
            const response: AxiosResponse<any, any> = await api.post('users/logout');

            if (response.status == 200) {
                alert('Logout done!!');
                localStorage.clear();
                nav('/');
            }

            alert('Error the make logout');
        } catch (e) {
            console.error(e);
            alert('Error the make logout');
        }
    }

    return (
        <header>
            <div className="row">
                <div className="col-3 text-center">
                    <h1>Home</h1>
                </div>
                <div className="col-6"></div>
                <div className="col-3 text-center ">
                    <button className="btn btn-outline-light mt-2" onClick={() => { profile() } } >PROFILE</button>
                    <button className="btn btn-outline-light mt-2 ms-2" onClick={() => { logout() } } >LOGOUT</button>
                </div>
            </div>
        </header>
    );
}