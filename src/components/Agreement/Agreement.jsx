import "./Agreement.css";

function Agreement({isAgree, setIsAgree, className}) {
    const fullClassName = className ? ["agreement", className].join(" ") : "agreement";

    return (
        <div className={fullClassName}>
            <input id="isAgreeCheckBox" type="checkbox" checked={isAgree} onChange={() => setIsAgree(!isAgree)} className="agreement__checkbox"/>
            <label htmlFor="isAgreeCheckBox" className="agreement__label">
                Согласен с обработкой персональных данных
            </label>
            <div>
                <a href="/PravilaObrabotki.docx" className="agreement__link" target="_blank">Правила обработки персональных данных</a>
            </div>
            <div>
                <a href="/PravilaObrabotki.docx" className="agreement__link" target="_blank">Политика конфиденциальности</a>
            </div>
        </div>
    )
}

export default Agreement;