import Slider from "react-slick"
import productImg from '../../../assets/Images/Product/PrdImg.jpg'

import { FiRefreshCw } from "react-icons/fi";
import { BsFillCartFill, BsFillCartCheckFill, BsStarFill, BsExclamationCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as AType from "../../../redux/actions/Action";
import { Link } from "react-router-dom";

const ProductListSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        arrow: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    arrow: false,
                    dots: true
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    };

    const myData = useSelector((state) => state.PrdList);
    const dispatch = useDispatch();

    // const [activeClass]

    useEffect(() => {
        dispatch(AType.dispatchProductList())
    }, [])


    // Click Handler :‌ Get Product List By Category Name
    const chooseCategory = (el, name) => {

        if (name == "all") {
            dispatch(AType.dispatchProductList())
        }
        else {
            dispatch(AType.getPrdListWithCategory(name))
        }

        // Remove Active Class From Inactive Buttons 
        let catBtnSelect = document.querySelectorAll('.btnCatPrdList');
        catBtnSelect.forEach(item => {
            item.classList.remove('activeGroup');
        });

        // Add Active Class to Clicked Button
        el.target.classList.add("activeGroup");
    }

    const getFinalPrice = (price, disCount) => {
        let finalPrice = (price * disCount) / 100;
        finalPrice = Math.round(price - finalPrice);
        return finalPrice
    }

    if (!myData.error) {
        return (
            <section className="maxW prdListBox">

                <div className="d-flex justify-content-between align-items-center prdListSliderHeader">
                    <p className="mb-0 stieTitle">
                        جدید ترین
                        <span className="greenText"> محصولات</span>
                    </p>
                    <div className="btnCatPrdListBox">
                        <button className="btn btnCatPrdList" onClick={(e) => chooseCategory(e, "all")}>
                            all
                        </button>
                        <button className="btn btnCatPrdList" onClick={(e) => chooseCategory(e, "smartphones")}>
                            smart phones
                        </button>
                        <button className="btn btnCatPrdList" onClick={(e) => chooseCategory(e, "laptops")}>
                            laptops
                        </button>
                        <button className="btn btnCatPrdList" onClick={(e) => chooseCategory(e, "groceries")}>
                            groceries
                        </button>
                        <button className="btn btnCatPrdList" onClick={(e) => chooseCategory(e, "home-decoration")}>
                            home decoration
                        </button>

                    </div>
                </div>
                <div>
                    {myData.loading == false
                        ?
                        <Slider {...settings}>

                            {myData.data.map(item => (
                                <div className="singlePrdBox" key={item.id}>
                                    <div className="singlePrd">
                                        <div className="prdImgBox">
                                            <Link to={`/product/${item.id}`} >
                                                {/* <img className="imgPrd" src={item.thumbnail} /> */}
                                                <img className="imgPrd" src={productImg} />
                                            </Link>
                                        </div>
                                        <Link to={`/product/${item.id}`} className="prdName">{item.title}</Link>
                                        <div className="d-flex descPrd">
                                            <div className="priceBox">
                                                <p className="prdPrice mb-0">
                                                    <span className="firstPrice">{item.price}</span>
                                                    <span className="disCountPrice">{getFinalPrice(item.price, item.discountPercentage)} $</span>
                                                </p>
                                                <p className="prdRating">
                                                    <BsStarFill />
                                                    <span className="ms-2 mt-1">{item.rating}</span>
                                                </p>
                                            </div>
                                            <div className="addToCartBox">

                                                <button className="btn btnOutlineSite addToCart"
                                                    onClick={() => dispatch(
                                                        AType.dispatchAddToCart(item.id, item.title,
                                                            getFinalPrice(item.price, item.discountPercentage),
                                                            1, getFinalPrice(item.price, item.discountPercentage)))}>
                                                    <BsFillCartFill />
                                                    {/* <BsFillCartCheckFill/>
                                    <FiRefreshCw/> */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </Slider>

                        :
                        <div className="singlePrdBox w250px">
                            <div className="singlePrd">
                                <div className="prdImgBox">
                                    <img className="imgPrd" src={productImg} />
                                </div>
                                <p className="prdName">درحال دریافت . . .</p>
                                <div className="d-flex descPrd">
                                    <div className="priceBox">
                                        <p className="prdPrice mb-0">
                                            <span className="firstPrice">000</span>
                                            <span className="disCountPrice">000</span>
                                        </p>
                                        <p className="prdRating">
                                            <BsStarFill />
                                        </p>
                                    </div>
                                    <div className="addToCartBox">

                                        <button className="btn btnOutlineSite addToCart"
                                            onClick={() => dispatch(
                                                AType.dispatchAddToCart(1, "Loading", 5800, 1, 13.5,5800))}>
                                            <BsFillCartFill />
                                            {/* <BsFillCartCheckFill/>
                                    <FiRefreshCw/> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>

            </section >

        )
    }
    else {
        return (
            <section className="maxW categoriesBox">
                <h2 className="text-danger text-center w-100 py-3 bg-light border rounded">
                    <BsExclamationCircle className="ms-3" />
                    دریافت لیست محصولات با خطا مواجه شد
                </h2>
            </section>
        )
    }
}

export default ProductListSlider