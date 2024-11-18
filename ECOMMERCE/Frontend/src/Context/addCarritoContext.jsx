import React, { createContext, useContext, useEffect, useState } from 'react';



const AddCarritoContext = createContext();

export const ContextCarritoProvider = ({ children }) => {

    const[arrayProductsCarrito, SetproductosToCarrito] = useState([]);
    const [cantidaditemsCarrito,setCantidadItemsCarrito] =useState(0);
    const [total,SetTotal] =useState(0);
    const [descuento,setDescuento]=useState(0);


    useEffect(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
          SetproductosToCarrito(JSON.parse(carritoGuardado));
        }
      }, []);
    
      // Guardar el carrito en localStorage cada vez que cambie
      useEffect(() => {
        if (arrayProductsCarrito.length > 0) {
          localStorage.setItem('carrito', JSON.stringify(arrayProductsCarrito));
        }
      }, [arrayProductsCarrito]);


    const agregarProductoAlCarrito = (producto) => {   
        SetproductosToCarrito((prevCarrito) => {
            // Verificar si el producto ya existe en el carrito
            const productoExistente = prevCarrito.find(item => item.data.data.itemKey === producto.data.itemKey);
            
            if (productoExistente) {
                // Si ya existe, incrementar la cantidad
                return prevCarrito.map(item => 
                   ( item.data.data.itemKey === producto.data.itemKey && item.stock< item.data.data.stock)   
                        ? { ...item, stock: item.stock + 1 }  // Aumentar la cantidad
                        : item
                );
            } else {
                // Si no existe, agregar el producto con cantidad 1
                return [...prevCarrito, { data: producto, stock: 1 }];
            }
        });
    };

    useEffect(() => {
      const subtotal = arrayProductsCarrito.reduce(
          (total, item) => total + item.data.data.price * item.stock,
          0
      );
      const totalConDescuento = subtotal - (subtotal * descuento) / 100;
      SetTotal(totalConDescuento);
  }, [arrayProductsCarrito, descuento]);


  const handleChangeOpcionesPago = (event) => {
        
       if(event.target.value==="transfer")
         {setDescuento(10)}
       else if (event.target.value==="MP"){
        setDescuento(0);
       } 
       else 
       {setDescuento(0)}
    }


   

    useEffect(() => {
        if(arrayProductsCarrito ){
            setCantidadItemsCarrito(arrayProductsCarrito.reduce((cantidad, items) => cantidad + (items.stock),0));
        }
    }, [arrayProductsCarrito]);

     

    const AgregarStock = (itemKey) => {
        const updatedProducts = arrayProductsCarrito.map(item => 
          ((item.data.data.itemKey === itemKey) && (item.stock < item.data.data.stock))
            ? { ...item, stock: item.stock + 1 }  
            : item
        );
        SetproductosToCarrito(updatedProducts);
      };


      const RestarStock = (itemKey) => {
        const updatedProducts = arrayProductsCarrito.map(item => 
          (item.data.data.itemKey === itemKey && item.stock>1)
            ? { ...item, stock: item.stock - 1 }  
            : item
        );
        SetproductosToCarrito(updatedProducts);
      };

    

    const EliminarProductoCarrito=(productoId)=>{ 
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const nuevoCarrito = carrito.filter(item => item.data.data.itemKey !== productoId);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        SetproductosToCarrito(nuevoCarrito);
    };

    const EliminarTodoElCarrito = () => {
         localStorage.removeItem('carrito');
        SetproductosToCarrito([]);   
    }

    
  
    return (
        <AddCarritoContext.Provider 
            value={{ 

                agregarProductoAlCarrito, 
                arrayProductsCarrito, 
                total, 
                cantidaditemsCarrito,
                EliminarProductoCarrito,
                EliminarTodoElCarrito,
                AgregarStock,
                RestarStock,
                handleChangeOpcionesPago

            }}>
            {children}
        </AddCarritoContext.Provider>
    );
};
export const useAddCarrito = () => useContext(AddCarritoContext); // Hook que retorno 