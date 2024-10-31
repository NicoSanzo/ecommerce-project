import "./StyleNavegationBar.css"
import React from "react"


export const NavegationBar = () =>{
    return(
    <>
          <div className="search">
             <div className="input-div">
                <input type="text" name="input-search" className="input-search" />
                <div className="search-icon"></div>
            </div>
         </div>
    
    </>

    )
}