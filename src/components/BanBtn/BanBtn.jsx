import { toast } from "react-toastify";
import AuthorizationService from "../../API/AuthorizarizationService";
import useAuthUser from "../../hooks/useAuthUser";
import Button from "../UI/Button/Button";

function BanBtn({specialist, setSpecialist, specialists, setSpecialists, isOne = false}) {
    const user = specialist.user;
    const [authUser, setAuthUser] = useAuthUser();

    async function handleClick() {
        const resUser = await AuthorizationService.updateIsBanned({id: user.id, isBanned: !user.isBanned});
        const resUserBody = await resUser.json();

        if(resUser.ok) {
            if(isOne) {
                setSpecialist({...specialist, user: resUserBody});
            } else {
                setSpecialists(specialists.map(spec => {
                    if(resUserBody.id === spec.user.id) return {...spec, user: resUserBody};
    
                    return spec;
                }));
            }

            if(resUserBody.isBanned) {
                toast.success("Пользователь забанен!");
            } else {
                toast.success("Пользователь разбанен!");
            }
        } else {
            toast.error(resUserBody.message);
        }
    }

    return (<>
    {   authUser && authUser.role === "admin" &&
        <Button isBackground onClick={handleClick}>
            {user.isBanned ? "Разбанить" : "Забанить"}
        </Button>
    }
    </>)
}

export default BanBtn;