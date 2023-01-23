import Layout from "../../layout/Layout"
import { BsFillCartFill, BsFillCartCheckFill, BsStarFill, BsExclamationCircle, BsCurrencyDollar } from "react-icons/bs";
import productImg from '../../assets/Images/Product/PrdImg.jpg'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as AType from "../../redux/actions/Action";

import "./productList.css"
import { useParams } from "react-router";

import { Link } from 'react-router-dom';

const ProductList = () => {

    const
        myData = useSelector(state => state.PrdList),
        dispatch = useDispatch(),
        { catName: categoryName } = useParams();

    useEffect(() => {
        if (categoryName == "" || categoryName == "All" || categoryName == "all" || categoryName == undefined) {
            dispatch(AType.dispatchProductList())
        }
        else {
            dispatch(AType.getPrdListWithCategory(categoryName))
        }
    }, [categoryName]);

    const getFinalPrice = (price, disCount) => {
        let finalPrice = (price * disCount) / 100;
        finalPrice = Math.round(price - finalPrice);
        return finalPrice
    }

    if (!myData.error) {
        return (
            <Layout childCssClass={"maxW my-5"} Title={"Product List"} Loading={myData.loading}>
                <div className="row">

                    {/* <div className="col-3">

                </div> */}

                    <div className="col-12">

                        <div className="row">
                            {myData.loading == false
                                ?
                                myData.data.map(item => (
                                    <div className="col-3" key={item.id}>
                                        <div className="singlePrdListBox">
                                            <div className="singlePrd">
                                                <div className="prdImgBox">
                                                    <Link to={`/product/${item.id}`}>
                                                        {/* <img className="imgPrd" src={item.thumbnail} /> */}
                                                        <img className="imgPrd" src={productImg} />
                                                    </Link>
                                                </div>
                                                <Link to={`/product/${item.id}`} className="prdName">{item.title}</Link>
                                                <div className="d-flex descPrd">
                                                    <div className="priceBox">
                                                        <p className="prdPrice mb-0">
                                                            <span className="disCountPrice">
                                                                {getFinalPrice(item.price, item.discountPercentage)}
                                                                <BsCurrencyDollar className="pb-1" />
                                                            </span>
                                                            <span className="firstPrice">{item.price}</span>
                                                        </p>
                                                        <p className="prdRating">
                                                            <BsStarFill />
                                                            <span className="mw-2 mt-1">{item.rating}</span>
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
                                    </div>
                                ))
                                :
                                <p className="my-5 py-5 text-white"><br /><br /><br /><br /><br /></p>
                            }
                        </div>
                    </div>

                </div>

            </Layout>
        )
    }
    else {
        return (
            <Layout childCssClass={"maxW my-5"} Title={"Product List"} >
                <div className="row">

                    <div className="col-12">
                        <h2 className="text-danger text-center w-100 py-3 bg-light border rounded">
                            <BsExclamationCircle className="ms-3" />
                            دریافت لیست محصولات با خطا مواجه شد</h2>
                    </div>

                </div>

            </Layout>

        )
    }
}

export default ProductList