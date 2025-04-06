import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarHome from "../components/navBarHome.component";

export default function Home(){

    const nav = useNavigate();

    useEffect(() => {
        isLogged()
    }, [])

    async function isLogged() {
        const token: string | null = localStorage.getItem("token");

        if (token == null) {
            nav('/');
        }
    }

    return (
        <>
          <NavBarHome />
          <div>
            
          </div>  
        </>
    );
}