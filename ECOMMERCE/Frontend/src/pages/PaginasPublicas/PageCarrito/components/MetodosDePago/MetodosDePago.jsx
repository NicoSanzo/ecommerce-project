import "./MetodosDePagoStyle.css";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-1ff4363c-60dc-43b8-badf-525b10c8db2e');

import { UseMetodosDePago } from "./useMetodosDePago";
import {Link} from "react-router-dom"
import { CustomCheckbox } from "../../../../../components/GenericCheckbox/CheckBox";




export function MetodosDePago() {



const {handleChangeOpcionesPago,setTerminosCondiciones,handleRealizarCompraTransfer, isSubmitted,errors,metodo_pago,handleFinalizarCompra,validacionExitosa,data_MP}= UseMetodosDePago();

console.log(data_MP)


const style = isSubmitted && errors && (errors.metodo_pago || errors.terminos) ? { border: "1px solid red" } : {};

    return (
        <>

            <div style={style} className="metodos-pago-container">
                    <h2 className="titulo"> Metodos De Pago</h2>
                <div className="container-metodos-pago">
                    <div className="Metodos-Pago"> 
                        <input 
                            type="radio"
                            name="metodo_pago" 
                            value="Transferencia" 
                            onChange={handleChangeOpcionesPago}
                            />
                        <h2 className="pago">Paga con transferencia bancaria (10% OFF)</h2>
                        
                    </div>
                    <div className="Metodos-Pago"> 
                        <input 
                            type="radio"
                            name="metodo_pago" 
                            value="Mercadopago" 
                            onChange={handleChangeOpcionesPago}
                            />
                        <h2 className="pago">Mercadopago</h2>
                    </div>

                    {isSubmitted==true && errors && errors.metodo_pago &&
                <span style={{"color":"red"}}>  {errors.metodo_pago} </span>
                }
                    
                </div>
                

                <div className="checkbox">
                    <CustomCheckbox 
                        label="He leído y acepto los" 
                        value={setTerminosCondiciones}
                        /> 
                        <Link>Términos y Condiciones</Link>

                </div> 
                    {isSubmitted==true && errors && errors.terminos &&
                            <span style={{"color":"red"}}>  {errors.terminos} </span>
                    }

                {validacionExitosa==true && metodo_pago==="Transferencia"?
                    <div id="wallet_container">
                        <button 
                             className="pagar-transfer-button"     
                              onClick={handleRealizarCompraTransfer}  
                        >
                        Pagar con Transferencia
                        </button> 
                    </div>:
                    validacionExitosa==true && metodo_pago==="Mercadopago" && data_MP ? 
                    <div id="wallet_container">
                        <Wallet 
                            initialization= {{ 
                                            preferenceId: data_MP,
                                            redirectMode: 'blank' }} 
                    
                             customization={{ texts:{ 
                                                    valueProp: 'security_details'
                                                    }, 
                                             visual: {
                                                        buttonBackground: 'black',
                                                        borderRadius: '6px',
                                                        buttonHeight: '48px'
                                                     },
                                                }}                      
                            
                        />

                    </div>  : 
                    
                    <button 
                         className="terminar-comprar-button"     
                          onClick={handleFinalizarCompra}  
                    >
                    Finalizar compra
                    </button> }    
                               
                    
            </div>
            
        </>
    )
}