import Info from "../UI/Info/Info";

function IsVerify({specialist}) {
    return (
        <>
             {
                specialist.isVerify 
                ?
                <Info placeholder={"Прошел модерацию"} isValid className="profile__verify-item">
                    Мы проверили аккаунт специалиста:<br/>
                    — имя, фамилия и фото совпадают.
                </Info>
                :
                <Info placeholder={"Не проверен модерацией"} className="profile__verify-item">
                    На данный момент аккаунт <br/> не проверен модерацией<br/>
                    <br/>
                    На нашем сервисе проводится модерация специалистов: <br/>
                    - Модератор проводит проверку имени, фамилии и фотки
                </Info>
            }
        </>
    );
}

export default IsVerify;