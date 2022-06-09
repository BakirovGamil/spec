import { useContext } from "react";
import { FavoriteContext } from "../App";

function useFavorite() {
    const context = useContext(FavoriteContext)
    if (context === undefined) {
      throw new Error("Необходимо указать провайдер")
    }

    return context;
}

export default useFavorite;