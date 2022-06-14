import Subscription from "../Subscription/Subscription";
import Input from "../UI/Input/Input";

function SubsSetting({subs, setSubs}) {
    function handleChange(e, field) {
        setSubs({...subs, [field]: e.target.value});
    }

    function handleChangeTA(e) {
        const description = e.target.value.split("\n");
        setSubs({...subs, description});
    }

    function handleChangeColor(e) {
        setSubs({...subs, color: e.target.value});
    } 

    return (
        <div className="addSubs">
            <div className="addSubs__left">
                <div className="addSubs__title">
                    <span className="addSubs__title-text">Представление</span>
                </div>
                <div className="addSubs__subsContainer" onClick={(e) => e.stopPropagation()}>
                    <Subscription className="addSubs_subs" subscription={subs}/>
                </div>
            </div>
            <div className="addSubs__right">
                <div className="addSubs__title">
                    <span className="addSubs__title-text">Настройка</span>
                </div>
                <div className="addSubs__settings">
                    <Input required isBackground placeholder="Название" value={subs.title} onChange={(e) => handleChange(e, "title")}/>
                    <Input required isBackground placeholder="Ссылка на фотку" value={subs.imgUrl} onChange={(e) => handleChange(e, "imgUrl")}/>
                    <Input required type="number" isBackground placeholder="На сколько месяцев" value={subs.months} onChange={(e) => handleChange(e, "months")}/>
                    <Input required type="number" isBackground placeholder="Количество использований" value={subs.limit} onChange={(e) => handleChange(e, "limit")}/>
                    <Input required type="number" isBackground placeholder="Цена" value={subs.price} onChange={(e) => handleChange(e, "price")}/>
                    <Input required isBackground placeholder="Фон в формате css" value={subs.backgroundColor} onChange={(e) => handleChange(e, "backgroundColor")}/>
                    <div className="addSubs__colors">
                        <Input required isBackground placeholder="Цвет текста на кнопке в формате css" value={subs.color} onChange={(e) => handleChange(e, "color")}/>
                        <input className="addSubs__color" type="color" onChange={handleChangeColor}/>
                    </div>
                    <textarea
                        className="SpecialistRegistration__about addSubs__textarea"
                        value={subs.description.join("\n")}
                        onChange={handleChangeTA}
                        required 
                    />
                </div>
            </div>
        </div>
    );
}

export default SubsSetting;