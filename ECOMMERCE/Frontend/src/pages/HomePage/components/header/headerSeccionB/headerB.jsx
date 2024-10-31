import React, { useRef, useEffect} from "react";
import "./styleHeaderB.css"
import { Link } from "react-router-dom";
import { NavegationBar } from "../../../../../components/GenericNavegationBar/NavegationBar";
import { ShoppingCart } from "../../../../../components/ShoppingCart/ShoppingCart";
import { Menu } from "../../../../../components/GenericMenu/Menu";
import { UserAccount } from "../../../../../components/User/User";


export const HeaderB = () =>{

    const stickyheader=useRef(null);
    const Logo=useRef(null);
    const NavBar=useRef(null);

    const inicio = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    // Función que cambia el diseño del encabezado según el desplazamiento y el tamaño de la pantalla
    const cambiarDiseñoEncabezado = () => {
        if (stickyheader.current && Logo.current && NavBar.current) 
        {
            const scrollY = window.scrollY;
            const esPantallaAncha = window.innerWidth > 900;
            if (esPantallaAncha) {     
                stickyheader.current.style.height = scrollY > 30 ? "130px" : "170px";
                Logo.current.style.width = scrollY > 30 ? "130px" : "200px";
                NavBar.current.style.height = scrollY > 30 ? "130px" : "170px";
            } else {
                Logo.current.style.width = scrollY > 30 ? "85px" : "100px";
                stickyheader.current.style.height = scrollY > 30 ? "170px" : "200px";
                NavBar.current.style.height = scrollY > 30 ? "100px" : "120px"; 
            }
        }   
        stickyheader.current.style.boxShadow = scrollY > 30 ? "0 0 10px 0 #aaaaaa" : "none";
        stickyheader.current.style.borderRadius = scrollY > 30 ? "0 0 10px 10px" : "0"; 
        Logo.current.style.transition = "width 0.2s ease-in-out";
        stickyheader.current.style.transition = "box-shadow 0.2s ease-in-out, height 0.2s ease-in-out";
    };

    useEffect(() => {      
        window.addEventListener("scroll", cambiarDiseñoEncabezado);
        window.addEventListener("resize", cambiarDiseñoEncabezado);  
        return () => {
            window.removeEventListener("scroll", cambiarDiseñoEncabezado);
            window.removeEventListener("resize", cambiarDiseñoEncabezado);
        };
    }, []);

   
    return(
    <>
        <section className="header-section-b" ref={stickyheader} >

                <div className="logo-container">
                    <Link className="headerLogo" to={"/"} onClick={inicio} ref={Logo} > <div className="logo" > </div> </Link>
                </div>
                <nav className="navigation" ref={NavBar}>
                    <NavegationBar/>
                    <Menu
                        placeOrientation={"horizontal"} 
                        itemsDistance={25}
                    />
                </nav>
                <div className="user-icons">
                    <UserAccount/>
                    <ShoppingCart/>
                </div>
        </section>   
    
    </>

    )
}