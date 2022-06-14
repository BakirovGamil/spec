import { useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import "./LinkSpecialist.css";

function LinkSpecialist({subscriptions}) {
    const [specId, setSpecId] = useState("");
    const [subsId, setSubsId] = useState("");

    async function handleLink() {
        const res = await SubscriptionService.addSpecialisToSubs(specId, subsId);
        const resBody = await res.json();

        if(res.ok) {
            toast.success("Специалист привязан");
        } else {
            toast.error(resBody.message);
        }
    }

    return (
        <div className="linkSpecialist">
            <select name="linkSpecialist__select" className="ServiceList__input linkSpecialist__input" value={subsId} onChange={e => setSubsId(e.target.value)}>
                {subscriptions.map(subs =>  <option value={subs.id}>{subs.title}</option>)}
            </select>
            <Input isBackground placeholder="id специалиста" value={specId} onChange={e => setSpecId(e.target.value)} className="linkSpecialist__tInput"/>
            <Button isBackground onClick={handleLink}>
                Привязать
            </Button>
        </div>
    )
}

export default LinkSpecialist;