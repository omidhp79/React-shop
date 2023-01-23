import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout/Layout"
import "./Cart.css"

import productImg from '../../assets/Images/Product/PrdImg.jpg'
import { Link } from "react-router-dom";
import * as AType from "../../redux/actions/Action";
import { BsTrash } from "react-icons/bs";
import DeletePrd from "./DeletePrd";

const Cart = () => {

    const cartdetails = useSelector(state => state.Cart),
        [cartCont, setCartCont] = useState(0),
        dispatch = useDispatch(),
        [showDelete, setShowDelete] = useState({
            id: 0,
            prdName: null,
            isShow: false
        })

    useEffect(() => {
        if (cartdetails.data != null) {
            setCartCont(cartdetails.data.length);
        }
    }, [cartdetails])

    const countPrd = (type, idPrd) => {
        let input = document.querySelector(`#inputCount${idPrd}`);
        if (input != null) {
            let firsetCount = parseInt(input.value),
                newCount = 0;

            if (type == "-" && firsetCount > 1) {
                input.value = firsetCount - 1;
                newCount = firsetCount - 1;
            }
            else if (type == "+") {
                input.value = firsetCount + 1;
                newCount = firsetCount + 1;
            }

            if (newCount > 0) {
                let cartLS = JSON.parse(localStorage.getItem("cart"));

                cartLS.forEach(item => {
                    if (item.id == idPrd) {
                        item.count = newCount;
                        item.finalPrice = newCount * item.price;
                    }
                });

                dispatch(AType.dispatchChangeCart(cartLS))
            }
        }
    }

    const closeDelete = () => {
        setTimeout(() => {
            setShowDelete({
                id: 0,
                prdName: null,
                isShow: false
            });
            
        }, 100);
    }

    if (cartCont > 0) {
        let allPrice = 0;
        return (
            <Layout childCssClass={"maxW my-5"} Title={"Cart"} >                

                <DeletePrd deletePrdProps={showDelete} eventDelete={closeDelete} />

                <div className="bascketBox">
                    <div className="row">

                        <div className="col-8">
                            <div className="bg-light border rounded shadow p-4 pb-3">
                                {cartdetails.data.map(item => (
                                    <div key={item.id} className='CartItem border-bottom pb-3' >

                                        <button className="btn ms-3 btn-outline-danger py-1 px-2"
                                            onClick={() => setShowDelete({ id: item.id, isShow: true, prdName: item.title })}>
                                            {/* onClick={() => alert(item.title)}> */}
                                            <BsTrash />
                                        </button>

                                        <div className='imgPrdCart me-0'>
                                            <Link to={`/product/${item.id}`}>
                                                <img className="imgPrd" src={productImg} />
                                            </Link>
                                        </div>

                                        <div className='namePrdCart'>
                                            <Link to={`/product/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </div>

                                        <div className='d-flex align-items-center prieAndCountPrdCart'>

                                            <div className="d-flex ms-3 CountPrd">
                                                <div className="btnCountBox">
                                                    <button className="btn btnCountCart btnMines" onClick={() => countPrd("-", item.id)}>-</button>
                                                    <button className="btn btnCountCart btnPlus" onClick={() => countPrd("+", item.id)}>+</button>
                                                </div>
                                                <input type="text" className="form-control inputCountPrd" id={`inputCount${item.id}`} defaultValue={item.count} />
                                            </div>

                                            <div className="pricePrd">
                                                $ {item.finalPrice}
                                            </div>

                                        </div>
                                    </div>
                                ))}
                                <div className="">
                                    {cartdetails.data.map(item => {
                                        allPrice += item.finalPrice;
                                    })}
                                    <div className="d-flex">
                                        <div className="pricePrd ms-0 me-auto">
                                            جمع کل :
                                        </div>
                                        <div className="pricePrd ">
                                            $ {allPrice}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="bg-light border rounded shadow p-4 pb-3">
                            </div>
                        </div>

                    </div>
                </div>

            </Layout >
        )
    }
    else {
        return (
            <Layout childCssClass={"maxW my-5"} Title={"Cart"} >
                <h3 className="bg-light border rounded shadow text-center">
                    سبد خرید شما خالی می باشد
                </h3>
            </Layout>
        )
    }
}

export default Cart