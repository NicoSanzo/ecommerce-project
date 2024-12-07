import React from "react";
import "./UserStyle.css"
import IconUser from "../../assets/Account_icon.svg";
import { useLoginModal } from "../../Context/LoginPopContext";
import { useAuth } from "../../Context/authContext";
import { AdminMenu } from "./Components/AdminUserMenu/ordenMenu/AdminMenu";
import { ClientMenu } from "./Components/ClientUserMenu/ClientMenu";

export const UserAccount = () =>{

    const{ sessionData,autenticado }=useAuth();
   const { openModal } = useLoginModal(); // Usar la función para abrir el modal
    

    return(
        <>
            {autenticado==false &&
            <div  className="userLogin" onClick={openModal}>
                 <div className="container-login" >         
                    <img src={IconUser} alt="Icono usuario" /> 
                    <h2> Iniciar Sesion</h2> 
                 </div>
            </div>
            }
            {sessionData &&  autenticado==true &&
            <div  className="userLogin" >
                
                 <div className="container-login" >  
                    
                 {  sessionData.data.isAdmin===true &&  <AdminMenu user={sessionData.data.username}/>}
                 {  sessionData.data.isAdmin===false && <ClientMenu user={sessionData.data.nombre}/>}
                    
                 </div>
            </div>
            }
  
        </>
    )
}

