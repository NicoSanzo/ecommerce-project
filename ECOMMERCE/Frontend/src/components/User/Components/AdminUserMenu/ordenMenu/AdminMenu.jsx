import "./AdminMenuStyle.css";
import downArrow from "../../../../../assets/down_arrow.svg";
import IconUser from "../../../../../assets/Account_icon.svg"
import { useAuth } from "../../../../../Context/authContext";



export const AdminMenu = ({user}) =>{    //recibe como argumento una funcion de la pagina PRODUCTOS con el fin de obtener de pasarle los datos de la consulta

    const {logout}= useAuth();

    const CerrarSession =()=>{
        logout();
    }

    return (
        <>      
            <div className="user-container" >         
            <div className="items-container">
                    <div className="items">
                        <img src={IconUser} alt="Icono usuario" />   
                        <h2> Bienvenido {user}  </h2>  
                        <img className="downarrow" src={downArrow}></img>
                    </div>
                            <ul className="Desplegable">
                                <li >Ventas</li>
                                <li>Publicaciones</li>
                                <li>Resumen</li>
                                <li>Agregar Producto</li>
                                <li onClick={CerrarSession}>Salir</li>           
                            </ul>
                        </div>                   
            </div>                 
        </>
    )
    
}