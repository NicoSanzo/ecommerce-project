import "./MenuStyle.css"
import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom";


export const Menu = ({placeOrientation,itemsDistance}) =>{

const settings = useRef(null);

const inicio =()=>{
        window.scrollTo({top:0,behavior:'smooth'});
}

    useEffect(()=>{
        placeOrientation === "vertical" &&(settings.current.style.flexDirection = "column");
        placeOrientation === "horizontal" &&(settings.current.style.flexDirection = "row");
        typeof(itemsDistance)==="number" && (settings.current.style.gap= `${itemsDistance}px`);
    },[placeOrientation,itemsDistance])
        
       
    return(
    <>
           <ul className="menu" ref={settings}>
                <Link to={"/"} className="item" id="home" onClick={inicio}> inicio </Link>
                <Link to={"/Productos"} className="item">productos</Link>
                <Link to={"/infoCompra"}  className="item">info de compra</Link>
                <Link to={"/Contacto"} className="item">contacto</Link>
                <Link className="item">nuestras politicas</Link>
            </ul>
    </>

    )
}