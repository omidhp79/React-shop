import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick"
import imgCategory from '../../../assets/Images/Category/Category.jpg'

import { BsExclamationCircle } from "react-icons/bs";

class CategorySlider extends React.Component {

    state = {
        settings: {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4,
                        dots: true
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
        }
    }

    // const myData = useSelector((state) => state.CategoryReducer);
    render() {
        if (!this.props.myData.error) {
            return (
                <section className="maxW categoriesBox">
                    <p className="mb-2 mb-sm-4 mb-md-5 stieTitle">
                        دسته بندی
                        <span className="greenText"> محصولات</span>
                    </p>

                    <div>
                        {
                            this.props.myData.loading == false
                                ?
                                <Slider {...this.state.settings}>
                                    {
                                        this.props.myData.data.map((item, index) => (
                                            <Link to={`/productlist/${item}`} key={index} >
                                                <div className="singleCatBox">
                                                    <div className="singleCat">
                                                        <img className="imgCat" src={imgCategory} />
                                                        <p className="categortName">{item}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </Slider>
                                :
                                <div className="singleCatBox">
                                    <div className="singleCat">
                                        <img className="imgCat" src={imgCategory} />
                                        <p className="categortName">در حال دریافت ...</p>
                                    </div>
                                </div>
                        }

                    </div>

                </section>

            )
        }
        else {
            return (
                <section className="maxW categoriesBox">
                    <h2 className="text-danger text-center w-100 py-3 bg-light border rounded">
                        <BsExclamationCircle className="ms-3" />
                        دریافت اطلاعات لیست دسته بندی محصولات با خطا مواجه شد
                    </h2>
                </section>
            )
        }
    }

}

const mapState=state=>{

    return{
        myData:state.CategoryReducer
    }

}

export default connect(mapState)(CategorySlider)