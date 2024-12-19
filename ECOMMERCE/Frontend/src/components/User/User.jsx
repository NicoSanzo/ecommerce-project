import React from "react";
import "./UserStyle.css";
import IconUser from "../../assets/Account_icon.svg";
import { useLoginModal } from "../../Context/LoginPopContext";
import { useAuth } from "../../Context/authContext";
import { AdminMenu } from "./Components/AdminUserMenu/ordenMenu/AdminMenu";
import { ClientMenu } from "./Components/ClientUserMenu/ClientMenu";

export const UserAccount = () => {
    const { sessionData, autenticado } = useAuth();
    const { openModal } = useLoginModal(); 

   
    if (!autenticado) {
        return (
            <div className="userLogin" onClick={openModal}>
                <div className="container-login">
                    <img src={IconUser} alt="Icono usuario" />
                    <h2>Iniciar Sesión</h2>
                </div>
            </div>
        );
    }

    if (sessionData) {
        const isAdmin = sessionData?.data?.isAdmin;
        const username = sessionData?.data?.username || sessionData?.data?.nombre;

        return (
            <div className="userLogin">
                <div className="container-login">
                    {isAdmin ? (
                        <AdminMenu user={username} />
                    ) : (
                        <ClientMenu user={username} />
                    )}
                </div>
            </div>
        );
    }

    // Caso en el que `sessionData` no esté presente pero el usuario esté autenticado
    return null;
};