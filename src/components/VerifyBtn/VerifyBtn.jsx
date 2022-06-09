import { toast } from "react-toastify";
import SpecialistService from "../../API/SpecialistService";
import useAuthUser from "../../hooks/useAuthUser";
import Button from "../UI/Button/Button";

function VerifyBtn({specialist, setSpecialist, specialists, setSpecialists, isOne = false}) {
    const [authUser, setAuthUser] = useAuthUser();

    async function handleClick() {
        const resSpecialist = await SpecialistService.updateIsVerifyById({id: specialist.id, isVerify: !specialist.isVerify})
        const resSpecialistBody = await resSpecialist.json();

        if(resSpecialist.ok) {
            if(isOne) {
                setSpecialist({...specialist, isVerify: resSpecialistBody.isVerify});
            } else {
                setSpecialists(specialists.map(spec => {
                    if(specialist.id === spec.id) return {...spec, isVerify: resSpecialistBody.isVerify};
    
                    return spec;
                }));
            }

            if(resSpecialistBody.isVerify) {
                toast.success("Специалист одобрен!");
            } else {
                toast.success("Одобрение убрано!");
            }
        } else {
            toast.error(resSpecialistBody.message);
        }
    }

    return (<>
    {   authUser && authUser.role === "admin" &&
        <Button isBackground onClick={handleClick}>
            {specialist.isVerify ? "Убрать одобрение" : "Одобрить"}
        </Button>
    }
    </>)
}

export default VerifyBtn;