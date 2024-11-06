import React from "react";
import "./UserStyle.css"
import IconUser from "../../assets/Account_icon.svg";
import { useLoginModal } from "../../Context/LoginPopContext";
import { useAuth } from "../../Context/authContext";
import { AdminMenu } from "./Components/AdminUserMenu/ordenMenu/AdminMenu";

export const UserAccount = () =>{

   const {autenticado}= useAuth();
   const {datauser} =  useAuth();
   const { openModal } = useLoginModal(); // Usar la función para abrir el modal

    return(
        <>
            {!autenticado &&
            <div  className="userLogin" onClick={openModal}>
                 <div className="container-login" >         
                    <img src={IconUser} alt="Icono usuario" /> 
                    <h2> Iniciar Sesion</h2> 
                 </div>
            </div>
            }
            {autenticado &&
            <div  className="userLogin" >
                 <div className="container-login" >         
                    <AdminMenu user={datauser.usuario}/>  
                 </div>
            </div>
            }
  
        </>
    )
}

