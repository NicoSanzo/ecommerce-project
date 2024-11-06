import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useFetch } from "../../../../../hooks/PedidoFetchGenerico";
import "./SelectsStyle.css";


export const Selects = forwardRef(({ refeMarca,refCategoria,ErrorCat,ErrorMarca ,onChange},ref)=>{


const[triggerfetch,setTriggerFetch]=useState(true);

/*AGREGO LAS MARCAS Y CATEGORIAS*/

  const{data:data_marca_categoria,loading:loading_Marca_cat,error:error_marca_cat} = useFetch("api/fetch_marca_y_categoria.php","POST",null,triggerfetch);

  useEffect(()=>{
    setTriggerFetch(false);  
  },[data_marca_categoria])


/*********************************CONTROLAN LOS SELECT ACTUALIZNDO EL VALOR AL SELECCIONAR UNA OPCION*****************/

const [selectedMarca, setSelectedMarca] = useState('');
const [selectedCategoria, setSelectedCategoria] = useState('');

const handleChangeMarca = (event) => {
    setSelectedMarca(event.target.value);
    onChange && onChange(event);
};

const handleChangeCat = (event) => {
    setSelectedCategoria(event.target.value)
    onChange && onChange(event);
};


/*********************************CONTROLAN TODO LO RELACIONADO CON EL INPUT Y INPUT CHECKED DE MARCA**********************************/

const [triggerMarca,setTriggerMarca]=useState(false);
const [isAddingMarca, setIsAddingMarca] = useState(false);
const [inputMarcaValue, setInputmarcaValue] = useState("");
const [errorMarcainput,setErrormarcainput]= useState(null);
const [seagregoMarca,SetseagregoMarca]=useState(false);

const {data:Success_Marca,loading:loading_Success_Marca,error:erorr_Success_Marca}=useFetch("api/alta_marca.php","POST",{inputMarcaValue},triggerMarca)

 /*AGREGO UNA MARCA EN CASO DE QUE SE REQUIERA*/
const ControlMarcaChecked = (event) => {
    setIsAddingMarca(event.target.checked);
    setErrormarcainput(null);
    SetseagregoMarca(false);
    
  };

  const handleChangeInputMarca = (event) => {
    setInputmarcaValue(event.target.value); 
    
    if (errorMarcainput) {
      setErrormarcainput(null);
    }
    if (inputMarcaValue.length < 4 && isAddingMarca) {
      setErrormarcainput("*Ingrese una Marca");
      
    }
};

const SubirMarcaButton =() =>{
  if(inputMarcaValue.length > 4 && isAddingMarca){
    setTriggerMarca(true);
  }
  if (inputMarcaValue.length < 4 && isAddingMarca){
    setErrormarcainput("*Ingrese una Marca");
  }
  
};

useEffect(() => {
  if (Success_Marca) {
    SetseagregoMarca(true);
    setTriggerMarca(false)
    setTriggerFetch(true);
    setInputmarcaValue('');
  }
  if (erorr_Success_Marca) {
    setErrormarcainput("*Error al agregar categoría. Intente nuevamente.");
  }

      setTimeout(() => {
        SetseagregoMarca(false)
    }, 2500);

}, [Success_Marca]);


/*********************************CONTROLAN TODO LO RELACIONADO CON EL INPUT Y INPUT CHECKED DE CATEGORIAS**********************************/
const [isAddingCat, setIsAddingCat] = useState(false);
const [triggerCategoria,setTriggerCategoria]=useState(false);
const [inputCatValue, setInputCatValue] = useState("");
const [errorCatinput,setErrorCatinput]= useState(null);
const [seAgregoCat,SetseAgregoCat]=useState(false);


  
    const {data:data_Success_Categoria,loading:loading_Categoria,error:error_Success_Categoria}=useFetch("api/alta_categoria.php","POST",{inputCatValue},triggerCategoria)

    /*AGREGO UNA MARCA EN CASO DE QUE SE REQUIERA*/
   const ControlCatChecked = (event) => {
       setIsAddingCat(event.target.checked);
       setErrorCatinput(null);
      
     };
   
     const handleChangeInputCat = (event) => {
       setInputCatValue(event.target.value); 
       
       if (errorCatinput) {
        setErrorCatinput(null);
       }
       if (inputCatValue.length < 4 && isAddingCat) {
        setErrorCatinput("*Ingrese una Categoria");
       }
   };
   
   const SubirCatButton =() =>{
   
     if(inputCatValue.length > 4 && isAddingCat){
      setTriggerCategoria(true);
   
     }
     if (inputCatValue.length < 4 && isAddingCat){
      setErrorCatinput("*Ingrese una Categoria");
     }
     
    };
    

    useEffect(() => {
    if (data_Success_Categoria) {
     
      SetseAgregoCat(true);
      setInputCatValue('');
      setTriggerCategoria(false); 
      setTriggerFetch(true);
    }
    if (error_Success_Categoria) {
      setErrorCatinput("*Error al agregar categoría. Intente nuevamente.");
    }

    setTimeout(() => {
      SetseAgregoCat(false)
  }, 2500);

  }, [data_Success_Categoria]);
  
  
    return(            

            <>
              <div className="input-selects">
                <label htmlFor="Marca">
                    Marca
                  <span className="requerido"> (Requerido)</span>
                </label>
                <select name="Marca" value={selectedMarca} onChange={handleChangeMarca} ref={refeMarca} >
                  <option value="" disabled>Seleccione una Marca</option>
                  {data_marca_categoria && data_marca_categoria.data.marca.map((Marca) => (
                    <option key={Marca.id} value={Marca.id}>
                      {Marca.nombre}
                    </option>
                  ))}
                </select>
                <label className="Agregar">
                  Agregar marca
                  <input type="checkbox" onChange={ControlMarcaChecked} />
                  <span className="checkmark"></span>
                </label>
                
                {ErrorMarca && <span  className="error-message">{ErrorMarca}</span>}
                {isAddingMarca && (
                  <div className="div-button-agregar">
                   <input type="text" 
                      className="input-div"
                      value={inputMarcaValue} 
                      onChange={handleChangeInputMarca} 
                    />
                    {seagregoMarca && <span style={{ color: 'green' }} className="error-message">Marca agregada</span>}
                    {errorMarcainput && <span className="error-message">{errorMarcainput}</span>}
                    <button type="button" onClick={SubirMarcaButton}>Agregar</button>
                    
                  </div> )}
                 
              </div>
          
              <div className="input-selects">
                <label htmlFor="categoria" >Categoría 
                    <span className="requerido"> (Requerido)</span>
                </label>
                <select name="categoria" value={selectedCategoria} onChange={handleChangeCat} ref={refCategoria}>
                  <option value="" disabled>Seleccione una categoría</option>
                  {data_marca_categoria && data_marca_categoria.data.categoria.map((Categoria) => (
                    <option key={Categoria.id} value={Categoria.id}>
                      {Categoria.nombre}
                    </option>
                  ))}
                </select>
                <label className="Agregar">
                  Agregar categoría
                  <input type="checkbox" onChange={ControlCatChecked } />
                  <span className="checkmark"></span>
                </label>
                {isAddingCat && (
                  <div className="div-button-agregar">
                     <input type="text" 
                      className="input-div"
                      value={inputCatValue} 
                      onChange={handleChangeInputCat} 
                    />
                    {seAgregoCat && <span style={{ color: 'green' }} className="error-message">Categoria Agregada</span>}
                    {errorCatinput && <span className="error-message">{errorCatinput}</span>}
                    <button type="button" onClick={SubirCatButton} >Agregar</button>
                  </div>
                )}
                {ErrorCat && <span className="error-message">{ErrorCat}</span>}
              </div>
            </>
          );
})