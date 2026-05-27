import React from "react";
function Product({name, price, brand, description, image}){
    
return(
    <div className="w-100 mx-auto border-2 border-red-400 rounded-lg shadow-sky-50 p-5 flex flex-col items-center m-10">
        <div className="flex justify-center items-center h-50 w-full p-5 ">
  <img src={image} className="h-full object-contain" alt={name} />
</div>
        <div>{name}</div>
        <div className="flex p-4 justify-center">
            <div className="p-4">
               $ {price}
            </div>
            <div className="p-4 font-bold">
                {brand}
            </div>
        </div> 
        <div className="font-light fill-blue-600 ">{description}</div>

    </div>
)
}

export default Product;
