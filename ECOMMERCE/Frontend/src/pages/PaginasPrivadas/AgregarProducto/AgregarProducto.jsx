import React, { useEffect, useState,useRef } from "react";
import "./AgregarProductoStyle.css";
import { InputText } from "./components/InputText/inputText";
import { InputNumber } from "./components/inputSelect/inputNumber";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";
import { Selects } from "./components/SelectMarca/Selects";
import { ImageUploader } from "./components/AgregarImagen/AgregarImagen";



export const AgregarProducto = () => {
    const titleRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const modelRef = useRef();
    const AltoRef =useRef();
    const AnchoRef =useRef();
    const ProfundidadRef =useRef();
    const descriptionRef = useRef();
    const PesoRef=useRef();
    const ColorRef = useRef();
    const refMarca = useRef();
    const refCategoria = useRef();
    const refImagen = useRef();
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío
    const [errorenvio,setErrorEnvio]=useState(false);
    const [errors, setErrors] = useState({});
    const[FORMDATA,SetFormData]=useState({data:[]});
    const[triggerfetch,setTriggerfetch]=useState(false);
    
    const principal_container = useRef(null)


    const validate = () => {
        const newErrors = {};
        if (!titleRef.current.value) {
            newErrors.title = "* El título es requerido";
        } else if (titleRef.current.value.length > 70) {
            newErrors.title = "* Hasta 70 caracteres";
        }
    
        if (!priceRef.current.value) {
            newErrors.price = "* El precio es requerido";
        } else if (priceRef.current.value.length > 999999999) {
            newErrors.price = "* Hasta $999999999,99";
        }
    
        if (!stockRef.current.value) {
            newErrors.stock = "* El stock es requerido";
        } else if (stockRef.current.value > 1000) {
            newErrors.stock = "* Hasta 999";
        }
    
        if (!modelRef.current.value) {
            newErrors.model = "* El modelo es requerido";
        } else if (modelRef.current.value.length > 25) {
            newErrors.model = "* Debe contener hasta 25 caracteres";
        }
    
        const medidas = [AltoRef, AnchoRef, ProfundidadRef, PesoRef];
        medidas.forEach(ref => {
            if (ref.current.value > 1000) {
                newErrors.medidas = "* Hasta 999";
            }
        });
        /*
        if (refImagen.current ) {
            newErrors.imagen = "* Debe cargar una imagen";
          }*/
    
        if (ColorRef.current.value.length > 25) {
            newErrors.color = "* Debe contener hasta 25 caracteres";
        }
        
        if (descriptionRef.current.value.length > 10000) {
            newErrors.descripcion = "* Debe contener hasta 10000 caracteres";
        }
    
        if (!refCategoria.current.value) {
            newErrors.categoria = "* Seleccione una categoría";
        }
        
        if (!refMarca.current.value) {
            newErrors.marca = "* Seleccione una marca";
        }    
        return newErrors; // Retorna los nuevos errores
    };
    

    const handleChange = () => {
       
        if (submitted) { // Solo valida si ya se ha intentado enviar  
            setErrors(validate());
            setErrorEnvio(false);
        }
        refMarca.current.style.borderColor="";
        principal_container.current.style.borderColor="#FDC7E8";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true); // Marca que se ha intentado enviar
        const validationErrors = validate();
        

        if (Object.keys(validationErrors).length === 0) {
 
            const formData = new FormData(); // Crea una nueva instancia de FormData

           formData.append("titulo", titleRef.current.value);
           formData.append("precio", priceRef.current.value);
           formData.append("stock", stockRef.current.value);
           formData.append("modelo", modelRef.current.value);
           formData.append("descripcion", descriptionRef.current.value);
           formData.append("alto", AltoRef.current.value);
           formData.append("ancho", AnchoRef.current.value);
           formData.append("profundidad", ProfundidadRef.current.value);
           formData.append("peso", PesoRef.current.value);
           formData.append("color", ColorRef.current.value);
           formData.append("marca_id", refMarca.current.value);
           formData.append("categoria_id", refCategoria.current.value);
           formData.append("imagen", refImagen.current);
            
            SetFormData(formData);
            setTriggerfetch(true);   

            console.log(error);
            console.log(data);

        } else {
            setErrors(validationErrors);
            principal_container.current.style.borderColor="red";
            refMarca.current.style.borderColor="red";
            setErrorEnvio(true);
        }
 
    };
    
    const {data,loading,error}=useFetch('api/alta_publicaciones.php','POST',FORMDATA,triggerfetch)
    console.log(error);
            console.log(data);
    
   

useEffect(() => {
    if (triggerfetch) {
        // Aquí podrías hacer algo más si es necesario con los datos.
        
        setTriggerfetch(false); // Reinicia el estado después de hacer la consulta
    }
   
}, [data, error, triggerfetch]);


    return (
        <form onSubmit={handleSubmit} className="principal-container-agregar" ref={principal_container}>
            <h2 className="titulo-principal">Nueva publicacion</h2>
           

            <div className="div-titulo-publi">
                <InputText
                    label_name={"titulo "}
                    ref={titleRef}
                    error={errors.title}
                    onChange={handleChange}
                    required={true}
                    placeholder={"Hasta 70 caracteres"}
                />
            </div>

            <h2>Foto</h2>
             <div className="foto-container">
             <span className="requerido"> (Requerido)</span>
                <ImageUploader
                    ref={refImagen}
                    error={errors.imagen}
                    onChange={handleChange}
                     
                />
                    
             </div>

             <h2>Publicación</h2>
            <div className="Caracteristicas-publicacion">
                <InputNumber
                    label_name={"Precio "}
                    medicion={"$"}
                    ref={priceRef}
                    error={errors.price}
                    onChange={handleChange}
                    required={true}
                    
                />
                <InputNumber
                    label_name={"Stock "}
                    medicion={"unidades"}
                    ref={stockRef}
                    error={errors.stock}
                    onChange={handleChange}
                    required={true}
                />
                <Selects
                    refeMarca={refMarca}
                    refCategoria={refCategoria}
                    ErrorCat={errors.categoria}
                    ErrorMarca={errors.marca}
                    onChange={handleChange}
                />
            </div>

            <h2>Especificaciones</h2>
            <div className="Especificaciones">
                <InputText
                    label_name={"Modelo "}
                    ref={modelRef}
                    error={errors.model}
                    onChange={handleChange}
                    required={true}
                />
                <InputText
                    label_name={"Color"}
                    ref={ColorRef}
                    error={errors.color}
                    onChange={handleChange}
                   
                    
                />
                <InputNumber
                    label_name={"Alto "}
                    medicion={"cm"}
                    ref={AltoRef}
                    error={errors.medidas}
                    onChange={handleChange}
                />
                <InputNumber
                    label_name={"Ancho "}
                    medicion={"cm"}
                    ref={AnchoRef}
                    error={errors.medidas}
                    onChange={handleChange}
                />
                <InputNumber
                    label_name={"Profundidad "}
                    medicion={"cm"}
                    ref={ProfundidadRef}
                    error={errors.medidas}
                    onChange={handleChange}
                />
                <InputNumber
                    label_name={"Peso "}
                    medicion={"kg"}
                    ref={PesoRef}
                    error={errors.medidas}
                    onChange={handleChange}
                />
            </div>

            <h2>Descripción</h2>
            <textarea
                className="Descripcion"
                ref={descriptionRef}
                error={errors.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripcion..."
            />

            {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}

            <button className="botton-submit" type="submit">PUBLICAR</button>
            {errorenvio && <div className="Verificar-Campos"> * VERIFIQUE LOS CAMPOS INDICADOS * </div>}
        </form>
    );
};

