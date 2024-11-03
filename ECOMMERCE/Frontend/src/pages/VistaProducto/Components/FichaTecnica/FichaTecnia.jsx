import React from "react";
import "./FichaTecnica.css"


export const FichaTecnica = ({Datos})=>{


    const datos= Datos.data[0];

    return(

        <>
            <div className="specifications">
                   <h2 className="titulo">Caracteristicas Principales</h2>
                   <ul className="specs-box">
                       {[
                           {titulo:'codigo' , value:datos.publicacion_id},
                           {titulo:'modelo' , value:datos.modelo},
                           {titulo:'Categoria' , value:datos.categoria_nombre},
                           {titulo:'Marca' , value:datos.marca_nombre}
                           ].map((carc_generales,index)=> (
                            carc_generales && (
                            <li className="item-box" key={index}>
                            <h2 className="item-title">{carc_generales.titulo}</h2>
                            <h2>{carc_generales.value}</h2>
                           </li> 
                           )
                       ))}        
                   </ul>
            </div>
                   
            <div className="specifications">
                <h2 className="titulo">Especificaciones</h2>
                    {(datos.alto || datos.ancho || datos.profundidad || datos.peso || datos.color)&&
                        <ul className="specs-box">
                            {[
                                {titulo:'alto:' , value: datos.alto},
                                {titulo:'ancho:' , value: datos.ancho},
                                {titulo:'profundidad:' , value: datos.profundidad},
                                {titulo:'color:' , value: datos.color},
                                {titulo:'peso:' , value: datos.peso}
                            ].map((spec,index)=>(
                                spec.value && (
                                 <li className="item-box" key={index}>
                                    <h2 className="item-title">{spec.titulo}</h2>
                                    <h2>{spec.value}</h2>
                                </li> 
                                )
                            ))}      
                        </ul>
                    }
            </div>   
         
        </>
    )
}
