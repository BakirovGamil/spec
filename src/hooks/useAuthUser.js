import { useContext } from "react";
import { UserContext } from "../App";

function useAuthUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
      throw new Error("Необходимо указать провайдер")
    }

    return context;
}

export default useAuthUser;