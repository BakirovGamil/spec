import { useContext } from "react";
import { SpecialistContext } from "../App";

function useAuthSpecialist() {
    const context = useContext(SpecialistContext)
    if (context === undefined) {
      throw new Error("Необходимо указать провайдер")
    }

    return context;
}

export default useAuthSpecialist;