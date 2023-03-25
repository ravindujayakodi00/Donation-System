import { createContext, useReducer } from "react";

export const DonorContext = createContext();

export const donorReducer = (state, action) => {
    switch (action.type){
        case 'SET_DONORS':
            return {
                donors: action.payload
            }
        //get a single donor
        case 'GET_DONOR':
            return {   
                donors: state.donors.find((donor) => donor._id === action.payload._id)
            }    
        case 'CREATE_DONOR':
            return {
                donors: [action.payload, ...state.donors]
            }
        case 'DELETE_DONOR':
            return {
                donors: state.donors.filter((donor) => donor._id !== action.payload._id)
            }
        case 'UPDATE_DONOR':
            return {
                donors: state.donors.map((donor) => donor._id === action.payload._id ? action.payload : donor)
            }  
        default:
            return state;
    }
}

export const DonorContextProvider = ({ children }) => {

    const [ state, dispatch] = useReducer(donorReducer, {
        donors: null,
    })

    return (
        <DonorContext.Provider value={{...state, dispatch}}>
            {children}
        </DonorContext.Provider>
    )
};