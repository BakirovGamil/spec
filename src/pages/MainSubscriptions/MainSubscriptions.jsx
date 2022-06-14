import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import AdminSubscription from "../../components/AdminSubscription/AdminSubscription";
import Header from "../../components/Header/Header";
import LinkSpecialist from "../../components/LinkSpecialist/LinkSpecialist";
import SubsSetting from "../../components/SubsSetting/SubsSetting";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Loader from "../../components/UI/Loader/Loader";
import Modal from "../../components/UI/Modal/Modal";
import useFetching from "../../hooks/useFetching";
import "./MainSubscriptions.css";

const initSubs = {
    "id": "1",
    "title": "Здоровый питомец",
    "description": [
        "3 консультации (ветеринары)"
    ],
    "imgUrl": "https://c.tenor.com/O-Ard5UaYIkAAAAi/chubby-tonton.gif",
    "price": 999,
    "months": 1,
    "backgroundColor": "linear-gradient(146.48deg, rgb(246, 211, 137) 1.4%, rgb(239, 94, 89) 98.57%)",
    "color": "rgb(239, 94, 89)",
    "limit": 3,
    "isInArchive": true
}

function MainSubscriptions() {
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false);
    const [isVisibleLink, setIsVisibleLink] = useState(false);
    const [subs, setSubs] = useState(initSubs);
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubs, setSelectedSubs] = useState(initSubs);

    const [isLoadingAdd, fetchAdd, errorAdd] = useFetching(async() => {
        const resAdd = await SubscriptionService.addSubscription(subs);
        const resAddBody = await resAdd.json();

        if(resAdd.ok) {
            toast.success("Подписка добавлена!");
            setSubscriptions([...subscriptions, resAddBody]);
        } else {
            toast.error(resAddBody.message);
            console.log(resAddBody.message);
        }
    });

    const [isLoadingSubs, fetchSubs, errorSubs] = useFetching(async() => {
        const resSubs = await SubscriptionService.getAll();
        const resSubsBody = await resSubs.json();

        if(resSubs.ok) {
            setSubscriptions(resSubsBody);
        } else {
            toast.error(resSubsBody.message);
            console.log(resSubsBody.message);
        }
    });

    const [isLoadingSave, fetchSave, errorSave] = useFetching(async() => {
        const resEdit = await SubscriptionService.edit(selectedSubs.id, selectedSubs);
        const resEditBody = await resEdit.json();

        if(resEdit.ok) {
            toast.success("Подписка обновлена!");
            setSubscriptions(subscriptions.map((subscription) => {
                if(subscription.id === selectedSubs.id) return resEditBody;

                return subscription;
            }));
        } else {
            toast.error(resEditBody.message);
            console.log(resEditBody.message);
        }
    });

    useEffect(() => {
        fetchSubs();
    }, [])

    async function handleAdd() {
        if(isLoadingAdd) return;

        fetchAdd();
    }

    async function handleSave() {
        if(isLoadingSave) return;

        await fetchSave();
        setIsVisibleEdit(false)
    }

    return (<>
        <Header/>
        <main className="main">
            <div className="mainsubs">
                <div className="container">
                    <div className="mainsubs__content">
                        <div className="mainsubs__actions">
                            <Button isBackground onClick={() => setIsVisibleAdd(true)}>
                                Добавить подписку
                            </Button>
                            <Button isBackground onClick={() => setIsVisibleLink(true)}>
                                Привязать специалиста
                            </Button>
                        </div>
                        <div className="mainsubs__subs">
                            <div className="mainsubs__title title">Подписки</div>
                            <div className="mainsubs__body">
                                {isLoadingSubs && <Loader/>}
                                {!isLoadingSubs && subscriptions.map(subscription => {
                                    return (
                                        <AdminSubscription 
                                            key={subscription.id} 
                                            subscription={subscription} 
                                            subscriptions={subscriptions} 
                                            setSubscriptions={setSubscriptions}
                                            setSelectedSubs={setSelectedSubs}
                                            setIsVisibleEdit={setIsVisibleEdit}
                                        />
                                    )
                                })}

                                {subscriptions.length === 0 && <div className="mainsubs__notify">Нет подписок!</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Добавить подписку" isVisible={isVisibleAdd} setIsVisible={setIsVisibleAdd}>
                <SubsSetting subs={subs} setSubs={setSubs}/>
                <div style={{textAlign: "center"}}>
                    <Button isBackground onClick={handleAdd} className="addSubsBtn">
                        {isLoadingAdd && <Loader/>}
                        {!isLoadingAdd && "Добавить"}
                    </Button>
                </div>
            </Modal>
            <Modal title="Изменить подписку" isVisible={isVisibleEdit} setIsVisible={setIsVisibleEdit}>
                <SubsSetting subs={selectedSubs} setSubs={setSelectedSubs}/>
                <div style={{textAlign: "center"}}>
                    <Button isBackground className="addSubsBtn" onClick={handleSave}>
                        {isLoadingSave && <Loader/>}
                        {!isLoadingSave && "Сохранить"}
                    </Button>
                </div>
            </Modal>
            <Modal title="Привязать специалиста" isVisible={isVisibleLink} setIsVisible={setIsVisibleLink}>
                <LinkSpecialist subscriptions={subscriptions}/>
            </Modal>
        </main>
    </>);
}

export default MainSubscriptions;