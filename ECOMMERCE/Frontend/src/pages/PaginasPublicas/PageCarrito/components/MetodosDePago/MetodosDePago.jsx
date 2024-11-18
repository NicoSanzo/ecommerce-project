import "./MetodosDePagoStyle.css";
import { UseMetodosDePago } from "./useMetodosDePago";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";

export function MetodosDePago() {

   
const {handleChangeOpcionesPago} =useAddCarrito()

    return (
        <>

            <div className="metodos-pago-container">
                    <h2 className="titulo"> Metodos De Pago</h2>
                <div className="container-metodos-pago">
                    <div className="Metodos-Pago"> 
                        <input 
                            type="radio"
                            name="metodo_pago" 
                            value="transfer" 
                            onChange={handleChangeOpcionesPago}
                            />
                        <h2 className="pago">Paga con transferencia bancaria (10% OFF)</h2>
                        
                    </div>
                    <div className="precios-container"> 
                        <input 
                            type="radio" 
                            name="metodo_pago"
                            value="MP"
                            onChange={handleChangeOpcionesPago}
                            />
                    </div>

                </div>
                <div className="precios-container"> 
                        <h2 className="total-compra">TOTAL:</h2>
                        <h2 className="total-compra"></h2>  
                </div>
                    
                  
                    
            </div>
            
        </>
    )
}