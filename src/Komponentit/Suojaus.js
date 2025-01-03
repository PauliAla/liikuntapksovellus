import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export default function Protected(props) {
    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() => {
        let login = localStorage.getItem("kirjaudu");
        if(!login){
            localStorage.setItem("loginStatus", "Työpöydälle vaaditaan kirjautuminen!");
            navigate("/", {replace: true});
        }
    }, [navigate]);
 
    return(
        <Component />
    );
}