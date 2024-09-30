import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const dispatchContext = createContext();

const reducer = (state, action) =>{

    switch(action.type){
        case "ADD":
            return [...state,{id:action.id, name:action.name, description: action.description,
                img:action.img, qty:action.qty, size:action.size, price:action.price}]
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index,1)
            return newArr;
        case "UPDATE":
            let arr =[...state];
            arr = arr.map((food, index) =>{
                if(food.id === action.id && food.size === action.size){
                    return {...food, qty:action.qty, price:action.price}
                }
                return food;
            })
            return arr;
        case "DROP":
            return [];

        default:
            console.log("Error in Reducer");
            return state;

    }

}

export const CartProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer,[])
    return (

        <dispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>

        </dispatchContext.Provider>

    )
}

export const useCart =() => useContext(cartStateContext);
export const useDispatchCard =() => useContext(dispatchContext);

