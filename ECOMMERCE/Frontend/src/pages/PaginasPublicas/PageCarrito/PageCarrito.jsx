import "./PageCarritoStyle.css";
import { CarritoProductsContainer } from "./components/CarritoProductsContainer/CarritoProductsContainer";
import { useAddCarrito } from "../../../Context/addCarritoContext";
import { ResumenCarrito } from "./components/ResumenCarrito/ResumenCarrito";
import { MetodosDePago } from "./components/MetodosDePago/MetodosDePago";

export function PageCarrito() {

    const {MostrarMetodosDepago} = useAddCarrito();


    return (
        <>

        <div className="carrito-page-container">

           <CarritoProductsContainer/>
           <div className="datos-de-compra">

           <ResumenCarrito/>
            { MostrarMetodosDepago===true  &&
                
                <MetodosDePago/>
            }
           

           </div>
          
            
        </div>
          
            
        </>
    )
}
