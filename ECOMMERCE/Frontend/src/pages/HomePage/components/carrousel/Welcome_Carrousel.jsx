
import React from "react";
import {Carrousel} from "../../../../components/GenericCarrousel/Carrousel";
import "./style.css";
import {images} from "./imagenes.js"


export const Welcome_Carrousel =()=>{
   return (
       <>
         <section className="welcome">
            <Carrousel ImagenesCarrousel= {images} />
         </section>
       </>
      
   )
}

   