import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import Layout from "../../layout/Layout"

import productImg from '../../assets/Images/Product/PrdImg.jpg'
import './product.css'
import * as AType from "../../redux/actions/Action";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { useRef } from "react";

const Product = () => {

    const { id: prdId } = useParams(),
        myData = useSelector(state => state.singlePrd),
        [finalPrice, setFinalPrice] = useState(0),
        dispatch = useDispatch(),
        countForCart = useRef(),
        [prdCount, setPrdCount] = useState(1);

    useEffect(() => {
        dispatch(AType.dispatchGetSinglePrd(prdId))
    }, [])

    const countPrd = (type) => {
        let inputVal = parseInt(countForCart.current.value);

        if (type == "-" && inputVal > 1) {
            countForCart.current.value = inputVal - 1;
        }
        else if (type == "+") {
            countForCart.current.value = inputVal + 1;
        }

        setPrdCount(parseInt(countForCart.current.value))
    }

    const getFinalPrice = (price, disCount) => {
        let finalPrice = (price * disCount) / 100;
        finalPrice = Math.round(price - finalPrice);
        return finalPrice
    }

    return (
        <Layout childCssClass={"maxW my-5"} Title={"Product"} Loading={myData.loading}>

            <div className="bg-light border rounded shadow p-3" id="singleProduct">
                <div className="row">

                    <div className="col500px">
                        <div className="prdImgGallery">

                            <div className="mainImgPBox">
                                <div className="mainImgCBox">
                                    <img src={productImg} />
                                </div>
                            </div>

                            <div className="galleryShortImg">
                                <div className="galleryIgItem">
                                    <img src={productImg} />
                                </div>
                                <div className="galleryIgItem">
                                    <img src={productImg} />
                                </div>
                                <div className="galleryIgItem">
                                    <img src={productImg} />
                                </div>
                                <div className="galleryIgItem">
                                    <img src={productImg} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col">

                        <div className="prdDetails">

                            <h1 className="border-bottom pt-4 pb-2 mb-4 pe-2">{!myData.error && myData.data.title}</h1>

                            <div className="d-flex mb-5">
                                <span className="prdRating ms-4">
                                    <BsStarFill className="ms-1" />
                                    {!myData.error && myData.data.rating}
                                </span>

                                <span className="ms-4">
                                    <span className="ms-1">برند :</span>
                                    {!myData.error && myData.data.brand}
                                </span>

                                <span className="">
                                    <span className="ms-1">گروه :</span>
                                    {!myData.error && myData.data.category}
                                </span>
                            </div>

                            <div className="row">

                                <div className="col-5">
                                    <h4 className="d-flex flex-column">
                                        <span className="mb-2">توضیحات : </span>
                                        <span className="prdDecription">{!myData.error && myData.data.description}</span>
                                    </h4>
                                </div>

                                <div className="col-7">
                                    <div className="d-flex flex-column justify-content-center h-100 border rounded py-4 px-2">
                                        <p className="firstPrice mb-0 ps-2">{!myData.error && myData.data.price}</p>

                                        <div className="d-flex align-items-center justify-content-between">

                                            <div className="d-flex CountPrd">
                                                <div className="btnCountBox">
                                                    <button className="btn btnCountCart btnMines" onClick={() => countPrd("-")}>-</button>
                                                    <button className="btn btnCountCart btnPlus" onClick={() => countPrd("+")}>+</button>
                                                </div>
                                                <input type="text" className="form-control inputCountPrd" ref={countForCart} defaultValue={prdCount} />
                                            </div>

                                            <button className="btn btnOutlineSite ms-auto me-2"
                                                onClick={() => dispatch(
                                                    AType.dispatchAddToCart(myData.data.id, myData.data.title,
                                                        getFinalPrice(myData.data.price, myData.data.discountPercentage),
                                                        prdCount, getFinalPrice(myData.data.price, myData.data.discountPercentage)))}>
                                                افزودن به سبد خرید
                                            </button>

                                            <p className="disCountPrice mb-0">
                                                <span>{!myData.error && getFinalPrice(myData.data.price, myData.data.discountPercentage)}</span>
                                                <span className="ms-1">$</span>
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    )

}

export default Product