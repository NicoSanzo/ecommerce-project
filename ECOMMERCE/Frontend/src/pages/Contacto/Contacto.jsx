import React, { useEffect, useRef, useState } from "react";
import "./ContactoStyle.css";
import phone_icon from "../../assets/phone_icon.png";
import facebook_icon from "../../assets/facebook_logo_icon.svg";
import mail_icon from "../../assets/Email_icon.svg";
import instagram_icon from "../../assets/instagram_logo_circle.svg";
import like_icon from "../../assets/like_icon.svg";
import { LoadingComponente } from "../../components/GenericLoadingComponent/LoadingComponent";

export const Contacto = ()=>{

    
    const[isdisabled,SetDisable]= useState(true);
    const[nombreInput,setNombre]= useState('');
    const[apellidoInput,setApellido]= useState('');
    const[emailInput,SetEmail]= useState('');
    const[textAreaInput,setTextArea]= useState('');
    const[isMail,setIsMail]=useState(false);
    const expresion= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    const nameInputChange = (event) => {
        setNombre(event.target.value);
    };
   
    const lastNameInputChange = (event) => {
        setApellido(event.target.value);
    };

    const textAreaInputChange = (event) => {
        setTextArea(event.target.value);
    };

    const emailInputChange = (event) => {
        const value = event.target.value; 
        SetEmail(value); 
        setIsMail(expresion.test(value)); 
    };


    const submit = useRef(null)
    const[data,setData]=useState(null);
    const[error,setError]=useState(null);
    const[loading, setLoading]= useState(false);


    useEffect (()=>{
        (nombreInput=='' || apellidoInput=='' || emailInput=='' || isMail==false || textAreaInput=='') ? SetDisable(true):SetDisable(false)    
        },[nombreInput,apellidoInput,emailInput,textAreaInput]);
  

    const sendEmail = async(event) => {  
        event.preventDefault(); /*evita que se recargue la pagina*/
        setLoading(true);
        setData(null);
        setError(null);

        const formData = new FormData();
        formData.append('nombre', nombreInput);
        formData.append('apellido', apellidoInput);
        formData.append('email', emailInput);
        formData.append('mensaje', textAreaInput);
    
        try {
            const response = await fetch("api/Contacto.php", {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('No se pudo enviar el Mensaje');
            }
            const resultado = await response.text();
            setData(resultado);  
        } 
        catch (Error) {
            setError(Error.message);
            
        } 
        finally {
            setLoading(false);  
        }  
    };


    useEffect(() => {
        setNombre('');
        setApellido('');
        SetEmail('');
        setTextArea('');
     
    }, [data])
    
    

    return(
        <>
            <div className="contact-container">
                <h2 className="title">Contacto</h2>

                <div className="contact-items">
                            <div className="box-wpp">
                                <img src={phone_icon} alt="telefono" />
                                <div className="text-box">11-3802-4906</div>
                            </div>
                            <div className="mail-box">
                               <img src={mail_icon} alt="mail" />
                               <div className="text-box">olivia_design@outlook.com</div>
                            </div>
                            <div className="box-redes">
                                <img className= "like" src={like_icon} alt="like"/>
                                <a href="https://www.instagram.com/disenos.oliviaok/?igsh=M2E5aXdrcHB3N3V4" target="blank">
                                    <img className="instagram" src={instagram_icon} alt="instagram" />
                                </a>

                                <a href="https://www.facebook.com/Disenos.oliviaok?mibextid=ZbWKwL" target="blank">
                                    <img className="facebook" src={facebook_icon} alt="facebook" />
                                </a>
                            </div>
                </div>

                <form className="contact-form" onSubmit={sendEmail}>
                        <div className="item-name">
                            <div className="name-style">
                                <label className="label-style"  htmlFor="">Nombre *</label>
                                <input 
                                    className="input-style" 
                                    value={nombreInput} 
                                    onChange={nameInputChange} 
                                    type="text" 
                                />
                             </div>
                             <div className="lastname-style">
                                <label className="label-style" htmlFor="">Apellido *</label>
                                <input 
                                    className="input-style" 
                                    value={apellidoInput} 
                                    onChange={lastNameInputChange} 
                                    type="text"  
                                />
                             </div>
                        </div>
                        <div className="item-mail">
                            <label className="label-style" htmlFor="">Email *</label>
                            <input 
                                className="input-style" 
                                type="email" 
                                value={emailInput}
                                onChange={emailInputChange}
                             />
                        </div>
                        
                        <div className="item-mensaje">
                            <label className="label-style" htmlFor="">Mensaje *</label>
                            <textarea 
                                className="textarea-style" 
                                type="text" 
                                value={textAreaInput}
                                onChange={textAreaInputChange}
                                 />     
                        </div>
                        <button 
                            className="submit-button" 
                            ref={submit} 
                            type="submit"
                            disabled={isdisabled} 
                            style={{
                                backgroundColor:isdisabled? "#dddddd":"#FDC7E8",
                                border:isdisabled? "none":"solid #FF5EC0 thin",
                                cursor:isdisabled? "auto":"pointer"
                            }}         
                        >
                        Enviar
                        </button>
                        <div className="msjBox" >
                            {loading && 
                                    <div style={{transition: "0.3s ease-in-out"}}>
                                        <LoadingComponente width={20} height={20}/>
                                    </div>}
                            {data && <h2 style={{transition:"0.3 ease", color: "#87AA96"}}> {data}</h2>} 
                        </div>
                </form>
                        
               
                
            </div>
            
        </>     
    )
}
