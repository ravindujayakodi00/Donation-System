import { DonorContext } from "../context/DonorContext";
import { useContext } from "react";

export const useDonorsContext = () => {
    const context = useContext(DonorContext);

    if (!context) {
        throw Error(
            "useDonorContext must be used within DonorContextProvider"
        );
    }

    return context;
}