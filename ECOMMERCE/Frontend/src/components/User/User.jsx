import React from "react";
import "./UserStyle.css"
import IconUser from "../../assets/Account_icon.svg"
import { Link } from "react-router-dom";

export const UserAccount = () =>{

    return(

        <>
            <div  className="userLogin">
                 <Link to={"/"}>
                    <img src={IconUser} alt="Icono usuario" />
                    <h2> Iniciar Sesion</h2>
                </Link>
            </div>
            
        </>
    )
}