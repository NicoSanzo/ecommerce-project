import React from "react";
import "./ProductsComboStyle.css";
import { Productbox } from "../../../../components/GenericProductBox/ProductBox";
import { ProductCard } from "../../../../components/GenericProductCard/ProductCard";
import { InstagramFollow } from "./components/InstagramFollow/InstagramFollow";
import {productos} from "./productprueba";

export const ProductCombo = ()=>{
return(    
    <>  
        <section className="comboProducts">
            <h2 className="productsTitle">Super combos:</h2> 
                <Productbox  
                    childrenCard={productos.map((producto, index) => (
                        <ProductCard 
                            key={index} 
                            imagen={producto.foto} 
                            description={producto.descripcion} 
                            price={producto.precio}
                        />
                    ))}
                    EffectInicialPoint={450}
                    effectEndPoint={550}
            />
            <InstagramFollow/>
         <hr/>
        </section>
    </> 
)}
