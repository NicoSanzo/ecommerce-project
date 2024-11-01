import React from "react";
import "./FichaTecnica.css"


export const FichaTecnica = ()=>{

    return(

        <>
         <div className="specifications">
                        <h2 className="titulo">Caracteristicas Principales</h2>
                        <ul className="specs-box">
                             <li className="item-box">
                                <h2 className="item-title">Codigo</h2>
                                <h2>2155</h2>
                            </li> 
                            <li className="item-box">
                                <h2 className="item-title">modelo:</h2>
                                <h2>Agenda123</h2>
                            </li> 
                            <li className="item-box">
                                <h2 className="item-title">Categoria</h2>
                                <h2>Agenda</h2>
                            </li> 
                            <li className="item-box">
                                <h2 className="item-title">Marca</h2>
                                <h2>Agenda</h2>
                            </li> 
                    </ul>
            </div>
                   
        <div className="specifications">
            <h2 className="titulo">Especificaciones</h2>
                        <ul className="specs-box">
                             <li className="item-box">
                                <h2 className="item-title">ALTO</h2>
                                <h2>21,55 cm</h2>
                            </li> 
                            <li className="item-box">
                                <h2 className="item-title">ANCHO:</h2>
                                <h2>21,55 cm</h2>
                            </li> 
                            <li className="item-box">
                                <h2 className="item-title">PRODUNFIDAD</h2>
                                <h2>21,55 cm</h2>
                            </li> 
                            <li className="item-box">
                                <h2 className="item-title">PESO</h2>
                                <h2>250 gr</h2>
                            </li> 
                            <li className="item-box">
                                <h2 className="item-title">PESO</h2>
                                <h2>250 gr</h2>
                            </li> 
            </ul>
        </div>   
        
        
        </>
    )
}
