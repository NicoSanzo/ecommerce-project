import React, { useEffect, useRef, useState } from "react";
import "./ModificarPublicacionStyle.css";
import { InputText } from "./components/InputText/inputText";
import { InputNumber } from "./components/inputSelect/inputNumber";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";
import { Selects } from "./components/SelectMarca/Selects";
import { ImageUploader } from "./components/AgregarImagen/AgregarImagen";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { GenericExitoso } from "../../../components/GenericExitoso/GenericExitoso";



export const ModificarPublicacion = ({ itemKey, onClose ,onSuccess }) => {


    const [formValues, setFormValues] = useState({
        titulo: "",
        precio: "",
        stock: "",
        modelo: "",
        alto: "",
        ancho: "",
        profundidad: "",
        descripcion: "",
        peso: "",
        color: "",
        marca_id: "",
        categoria_id: "",
        imagen: "",
        id_publicacion: "",
        codigo_producto: ""     
    });

    const [errors, setErrors] = useState({});
    const [triggerfetch, setTriggerfetch] = useState(false);
    
    const principal_container = useRef(null)
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío
    const [errorEnvio, setErrorEnvio] = useState(false);
    const[FORMDATA,SetFormData]=useState({data:[]});
    const { data: data_rellenar, loading: loading_relleno, error: error_relleno } = useFetch("api/fetch_publicaciones.php", "POST", { itemKey }, true);

    // Cargar los datos en el formulario al recibir la respuesta
    useEffect(() => {
        if (data_rellenar && data_rellenar.data) {
            const data = data_rellenar.data[0];
            setFormValues({
                titulo: data.titulo,
                precio: data.precio.replace(",", "."),
                stock: data.stock,
                modelo: data.modelo,
                alto: data.alto,
                ancho: data.ancho,
                profundidad: data.profundidad,
                descripcion: data.descripcion,
                peso: data.peso,
                color: data.color,
                marca_id: data.marca_id,
                categoria_id: data.categoria_id,
                imagen: data.imagen || null,
                id_publicacion: data.id_publicacion,
                codigo_producto:  data.codigo_producto
            });
/*
            if (data.imagen) {
                setImageToview(data.imagen);
            }*/
        }
    }, [data_rellenar]);

    // Validaciones del formulario
    const validate = () => {
        const newErrors = {};
        if (!formValues.titulo) {
            newErrors.titulo = "* El título es requerido";
        } else if (formValues.titulo.length > 70) {
            newErrors.titulo = "* Hasta 70 caracteres";
        }

        if (!formValues.precio) {
            newErrors.precio = "* El precio es requerido";
        } else if (formValues.precio > 9999999) {
            newErrors.precio = "* Hasta $999999";
        } else if (formValues.precio <= 0) {
            newErrors.precio = "Debe ser mayor a 0";
        }
        

        if (!formValues.stock) {
            newErrors.stock = "* El stock es requerido";
        } else if (formValues.stock > 1000) {
            newErrors.stock = "* Hasta 999";
        } else if (formValues.stock <= 0) {
            newErrors.stock = "Debe ser mayor a 0";
        }

        if (!formValues.modelo) {
            newErrors.modelo = "* El modelo es requerido";
        } else if (formValues.modelo.length > 25) {
            newErrors.modelo = "* Debe contener hasta 25 caracteres";
        }

        const medidas = [formValues.alto, formValues.ancho, formValues.profundidad, formValues.peso];
        medidas.forEach((value) => {
            if (value > 1000) {
                newErrors.medidas = "* Hasta 999,99";
            } else if (value < 0) {
                newErrors.medidas = "Debe ser mayor a 0";
            }
        });

        if (formValues.color.length > 25) {
            newErrors.color = "* Debe contener hasta 25 caracteres";
        }

        if (formValues.descripcion.length > 10000) {
            newErrors.descripcion = "* Debe contener hasta 10000 caracteres";
        }

        if (!formValues.categoria_id) {
            newErrors.categoria = "* Seleccione una categoría";
        }

        if (!formValues.marca_id) {
            newErrors.marca = "* Seleccione una marca";
        }

        return newErrors;
    };


    useEffect(() => {
        const newErrors = validate(formValues);
        setErrors(newErrors);

       
        if (principal_container.current) {
            if (Object.keys(newErrors).length > 0) {
                principal_container.current.style.borderColor = "red";
            } else {
                principal_container.current.style.borderColor = "";
            }
        }
    }, [formValues]); 


    // Manejador de cambios en los inputs
    const handleChange = (event) => {
        
    const { name, value } = event.target || event;
        
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));  
        
    };

    

    // Manejo del submit del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();

            // Agregar todos los valores del formulario a formData
            Object.keys(formValues).forEach((key) => {
                formData.append(key, formValues[key]);

            });
            
           SetFormData(formData)
           console.log(FORMDATA);
            
            setTriggerfetch(true);
        } else {
            setErrors(validationErrors);
            setErrorEnvio(true);
            principal_container.current.style.borderColor = "red";
            
        }
    };


    const { data, loading:loading_confirmar, error } = useFetch('api/modi_publicaciones.php', 'POST', FORMDATA, triggerfetch);
    console.log(data);

    useEffect(() => {
        if (data ) {
            if(data.data==true){
                onClose();
                onSuccess()
            }
        }
    }, [data]);

    

    useEffect(() => {
        if (triggerfetch) {
            setTriggerfetch(false);
        }
    }, [data, error, triggerfetch]);



    return (
        <>
        {loading_relleno ? <LoadingComponente width={65} height={65}/>:
        submitted &&  loading_confirmar? <LoadingComponente width={65} height={65}/> :
        <form onSubmit={handleSubmit} className="principal-container-modificar" ref={principal_container}>
            <h2 className="titulo-principal">Modificar Publicación</h2>

            <div className="div-titulo-publi">
                <InputText
                    label_name={"Título"}
                    value={formValues.titulo}
                    error={errors.titulo}
                    onChange={handleChange}
                    required={true}
                    placeholder={"Hasta 70 caracteres"}
                    name="titulo"
                />
            </div>

            <h2>Foto</h2>
            <div className="foto-container">
                <span className="requerido"> (Requerido)</span>
                <ImageUploader
                    imagen={formValues.imagen}
                    onChange={handleChange}
                    name="imagen"
                    //ref= {imgRef}
                />
            </div>

            <h2>Publicación</h2>
            <div className="Caracteristicas-publicacion">
                <InputNumber
                    label_name={"Precio"}
                    medicion={"$"}
                    value={formValues.precio}
                    error={errors.precio}
                    onChange={handleChange}
                    required={true}
                    name="precio"
                />
                <InputNumber
                    label_name={"Stock"}
                    medicion={"unidades"}
                    value={formValues.stock}
                    error={errors.stock}
                    onChange={handleChange}
                    required={true}
                    name="stock"
                />
                <Selects
                    valueCat={formValues.categoria_id}
                    valueMar={formValues.marca_id}
                    onChange={handleChange}
                    ErrorCat={errors.categoria}
                    ErrorMarca={errors.marca}
                />
                
            </div>

            <h2>Especificaciones</h2>
            <div className="Especificaciones">
                <InputText
                    label_name={"Modelo"}
                    value={formValues.modelo}
                    error={errors.modelo}
                    onChange={handleChange}
                    required={true}
                    name="modelo"
                />
                <InputText
                    label_name={"Color"}
                    value={formValues.color}
                    error={errors.color}
                    onChange={handleChange}
                    name="color"
                />
                <InputNumber
                    label_name={"Alto"}
                    medicion={"cm"}
                    value={formValues.alto}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="alto"
                />
                <InputNumber
                    label_name={"Ancho"}
                    medicion={"cm"}
                    value={formValues.ancho}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="ancho"
                />
                <InputNumber
                    label_name={"Profundidad"}
                    medicion={"cm"}
                    value={formValues.profundidad}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="profundidad"
                />
                <InputNumber
                    label_name={"Peso"}
                    medicion={"kg"}
                    value={formValues.peso}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="peso"
                />
            </div>

            <h2>Descripción</h2>
            <div className="div-descripcion">
                <textarea
                    className="Descripcion"
                    value={formValues.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese una descripcion..."
                    name="descripcion"
                />
            </div>
            {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}

            <div className="div-button">
                <button className="botton-submit" type="submit">MODIFICAR</button>
            </div>
            {errorEnvio && <div className="Verificar-Campos"> * VERIFIQUE LOS CAMPOS</div>}
        </form>
        
        }
           
        </>
    );
    
}