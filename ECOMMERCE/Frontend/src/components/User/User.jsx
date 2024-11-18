import React from "react";
import "./UserStyle.css"
import IconUser from "../../assets/Account_icon.svg";
import { useLoginModal } from "../../Context/LoginPopContext";
import { useAuth } from "../../Context/authContext";
import { AdminMenu } from "./Components/AdminUserMenu/ordenMenu/AdminMenu";
import { ClientMenu } from "./Components/ClientUserMenu/ClientMenu";

export const UserAccount = () =>{

   const {autenticado}= useAuth();
   const {datauser} =  useAuth();
   const { openModal } = useLoginModal(); // Usar la función para abrir el modal
    const isAdmin = sessionStorage.getItem('isAdmin');
    const hash = sessionStorage.getItem('sessionId');
   



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
                 {hash &&  isAdmin=="true" &&  <AdminMenu user={datauser.usuario}/>}
                 {hash && isAdmin=="false" && <ClientMenu user={datauser.nombre}/>}
                    

                 </div>
            </div>
            }
  
        </>
    )
}

