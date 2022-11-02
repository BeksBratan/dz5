import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addOrder, getMenu} from "./features/counter/counterSlice";
import Modal from '@mui/material/Modal';


function App() {
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [name, setName] = useState("");
    const [sum, setSum] = useState(0);
    const menu = useSelector(state => state.menu.menu.food);
    const [order, setOrder] = useState([]);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const handleClick = e => {
        const count = order.filter(m => m.food===e );
        if (count.length < 1){
            setOrder([...order, {food: e, price: menu[e].price , count: 1}])
        } else {
            count.forEach(e=>e.count++)
            count[0].price = menu[e].price * count[0].count
            setOrder([...order.filter(m=>m.food!==e), count[0]])
        }
        setSum(sum + menu[e].price)
    }
    const handleDelete = e => {
        const count = order.filter(m => m.food===e );
        count.forEach(e=>e.count--)
        count[0].price = menu[e].price * count[0].count
        if (count[0].count > 0){
            setOrder([...order.filter(m=>m.food!==e), count[0]])
            setSum(sum - menu[e].price)
        } else {
            setOrder([...order.filter(m=>m.food!==e)])
            setSum(sum - menu[e].price)
        }
    };
    const addOrder_ = () => {
        if (email && telephone && name !== ""){
            dispatch(addOrder([order, sum]));
            setModal(false);
        }
    };
    useEffect(() => {
        dispatch(getMenu());
    }, []);
  return (
    <div className="App">
        <div className="restaurant">
            <ul className="menu">
                {menu ? Object.keys(menu).map((food,key) => <li className="food" key={key}>
                    <img style={{width:50, height: 50}} src={menu[food].img} alt=""/>
                    <div className="menu_info">
                        <span>{food}</span> <span>KGS {menu[food].price}</span>
                    </div>
                    <button onClick={()=>handleClick(food)}>add cart</button></li>) : "loading..."}
            </ul>
            <div className="cart">
                <ul>
                    {order.map((food, key)=> <li key={key}><span style={{cursor: "pointer"}} onClick={()=>handleDelete(food.food)}>{food.food} X{food.count}</span> <span>{food.price}</span></li>)}
                </ul>
                <span>Доставка: {order.length > 0 && 150}</span>
                <span>Итого: {sum}</span>
                <button disabled={order<1} onClick={()=>setModal(true)}>Place order</button>
            </div>
            <Modal open={modal} onClose={()=>setModal(false)}>
                <div className="modal">
                    <input onChange={e=>setName(e.target.value)} style={{marginBottom: 10}} type="text" placeholder="name" value={name}/>
                    <input onChange={e=>setEmail(e.target.value)} style={{marginBottom: 10}} type="email" placeholder="email" value={email}/>
                    <input onChange={e=>setTelephone(e.target.value)} style={{marginBottom: 10}} type="tel" placeholder="telephone" value={telephone}/>
                    <button onClick={addOrder_}>Add order</button>
                </div>
            </Modal>
        </div>
    </div>
  );
}

export default App;
