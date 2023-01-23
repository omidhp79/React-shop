import Logo from '../../assets/Images/Logo/LogoMini.png'
import './Header.css'
import productImg from '../../assets/Images/Product/PrdImg.jpg'

import { BsChevronDown, BsSearch, BsMenuButtonWide, BsX, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as AType from '../../redux/actions/Action';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchHeader from './SearchHeader';
import { CheckToken } from '../../componnets/Authentication/TokenSetting/TokenSetting';

const Header = (props) => {

    const myData = useSelector(state => state.CategoryReducer),
        cartdetails = useSelector(state => state.Cart),
        dispatch = useDispatch(),
        [cartCont, setCartCont] = useState(0),
        [showCart, setShowCart] = useState(false),
        [showMiniMenu, setShowMiniMenu] = useState(false),
        [searchBox, setSearchBox] = useState(false),
        [userFond, setUserFond] = useState(CheckToken());

    useEffect(() => {
        dispatch(AType.dispatchGetCatList())
    }, [])

    useEffect(() => {
        if (cartdetails.data != null) {
            setCartCont(cartdetails.data.length)
        }
    }, [cartdetails])

    const onBlurCartBtn = () => {
        setTimeout(() => {
            setShowCart(false);
        }, 200);
    }

    const closeSearchBox = () => {
        setTimeout(() => {
            setSearchBox(false);
        }, 100);
    }

    return (
        <div className="HeaderBox">
            <div className="d-flex maxW headerContainer">

                <button className='btn btnMiniMenu showMobile' onClick={() => setShowMiniMenu(prev => !prev)}>
                    <BsMenuButtonWide />
                </button>

                <div className={'hideMobile rollItemsContainer ' + (showMiniMenu && "showMiniMenu")}>

                    <div className='rollItems'>
                        <div className="logoBox">

                            <button className='btn btnCloseMiniMenu showMobile' onClick={() => setShowMiniMenu(prev => !prev)}>
                                <BsX />
                            </button>

                            <Link className='d-flex' to={"/"}>
                                <img src={Logo} className="imgLogoHeader" />
                            </Link>
                        </div>

                        <div className='d-flex linkBar'>
                            <Link to={'/'} className="linkBarItem">خانه</Link>

                            <Link to={'/productlist'} className="linkBarItem">لیست محصولات</Link>

                            <span className="linkBarItem linkHDrop">
                                دسته بندی محصولات
                                <BsChevronDown className='linkBarIcon' />

                                <div className='dropDownBox'>
                                    <div className='dropDown'>
                                        {myData.loading == false
                                            ?
                                            !myData.error
                                                ? myData.data.map((item, index) => (
                                                    <Link to={`/productlist/${item}`} key={index} className='drpItem'> {item} </Link>
                                                ))
                                                :
                                                <p className='drpItem'>عملیات با خطا مواجه شد</p>
                                            :
                                            <p className='drpItem'> درحال دریافت اطلاعات از سرور</p>
                                        }
                                    </div>
                                </div>
                            </span>
                        </div>

                        <div className='d-flex optionsSite'>

                            <button className='searchBtn' onClick={() => setSearchBox(true)}>
                                <BsSearch />

                                {searchBox &&
                                    <SearchHeader showEvent={closeSearchBox} />
                                }
                            </button>

                            <button className='cartBoxHeader' onFocus={() => setShowCart(true)} onBlur={onBlurCartBtn}>
                                <AiOutlineShopping />
                                {cartCont != 0
                                    ? <span className='CartCount'>{cartCont}</span>
                                    : null}

                                {showCart &&
                                    <div className='CartsBox' id='CartsBox'>
                                        {cartCont != 0
                                            ?
                                            cartdetails.data.map(item => (
                                                <Link to={`/product/${item.id}`} key={item.id}>
                                                    <div className='CartItem'>
                                                        <div className='namePrdCart'> {item.title} </div>
                                                        <div className='imgPrdCart'>
                                                            <img className="imgPrd" src={productImg} />
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                            : null}

                                        {cartCont != 0
                                            ? <Link className='gotoCart' to={`/cart`}>
                                                نمایش صفحه سبد خرید
                                            </Link>
                                            : null
                                        }
                                    </div>
                                }

                            </button>
                        </div>
                    </div>
                </div>

                {userFond.found
                    ?
                    <Link to={'/Dashboard'} className='btn btnSite me-auto ms-4 btnLog_InOut d-flex align-items-center'>
                        {userFond.data}
                        <BsFillPersonFill className='me-1'/>
                    </Link>
                    :
                    <Link to={'/Login'} className='btn btnSite me-auto ms-4 btnLog_InOut'>ثبت نام / ورود</Link>
                }

                <div className="logoBox showMobile">
                    <Link className='d-flex' to={"/"}>
                        <img src={Logo} className="imgLogoHeader" />
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Header