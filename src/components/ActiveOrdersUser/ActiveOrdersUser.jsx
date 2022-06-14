import Order from "../Order/Order";
import Loader from "../UI/Loader/Loader";
import "./ActiveOrdersUser.css";

function ActiveOrdersUser({isLoading, orders, setOrders, fetch}) {
    return (
        <div className="ActiveOrdersUser">
            <div className="container">
                <div className="ActiveOredersUser__content">
                    <div className="ActiveOrders__title title">
                        Заказы
                    </div>
                    <div className="ActiveOrders__body">
                        {isLoading && <Loader/>}
                        {
                            !isLoading && 
                            orders.map(order => <Order key={order.id} order={order} isCancel fetch={fetch}/>)
                        }
                        {
                            orders.length === 0 && 
                            <div className="ActiveOrdersUser__notify">
                                Нет активных заказов
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveOrdersUser;