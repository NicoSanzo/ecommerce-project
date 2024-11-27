
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-9ab9840b-2b56-47dd-bda3-e9b339e84c4e');



export function BotonMercadopago() {


    


    return (
        <>

            <div id="wallet_container">
                    <Wallet 
                        initialization= {{ 
                                        preferenceId: '' ,
                                        redirectMode: 'self' }} 
                    
                         customization={{ texts:{ valueProp: 'security_details'}, 
                                         visual: {
                                            buttonBackground: 'black',
                                            borderRadius: '6px',
                                            buttonHeight: '48px'
                                        },}} />

                </div>   
            
        </>
    )
}
