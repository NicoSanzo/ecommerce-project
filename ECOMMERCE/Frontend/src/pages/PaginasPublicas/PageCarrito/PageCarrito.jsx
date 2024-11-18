import "./PageCarritoStyle.css";
import { CarritoProductsContainer } from "./components/CarritoProductsContainer/CarritoProductsContainer";
import { ResumenCarrito } from "./components/ResumenCarrito/ResumenCarrito";
import { MetodosDePago } from "./components/MetodosDePago/MetodosDePago";

export function PageCarrito() {


    return (
        <>

        <div className="carrito-page-container">

           <CarritoProductsContainer/>
           <div className="datos-de-compra">

           <ResumenCarrito/>
           <MetodosDePago/>

           </div>
          
            
        </div>
          
            
        </>
    )
}
