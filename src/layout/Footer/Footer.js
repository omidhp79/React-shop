import { FaInstagram, FaTelegramPlane, FaMobileAlt } from "react-icons/fa";
import "./Footer.css"

const Footer = () => {
    return (
        <>
            <div className="FooterBox">

                <div className="maxW">

                    <div className="row align-items-center topFooter">
                        <p className="col-12 col-md-6 mb-3 mb-md-0 text-white subTextFooter">
                            جهت خبر از محصولات جدید ثبت نام کنید
                        </p>
                        <div className="col-12 col-md-6 subInputBox">
                            <input className="form-control SubInput" placeholder="ایمیل خود را وارد کنید" />
                            <button id="subBtnFooter" className="btn btnSite">Subscribe</button>
                        </div>

                    </div>

                    <div className="middleFooter">

                        <div className="row">

                            <div className="col-12 col-md-4  mb-4 mb-md-0">
                                <h5 className="footerMiddleTitle">
                                    درباره سایت
                                </h5>
                                <p className="footerMiddleItems">
                                    این سایت توسط امید حسن پور
                                    با استفاده از api  فیک
                                    درست شده است و تمامی محصولات به صورت تست می باشد
                                </p>
                            </div>

                            <div className="col-6 col-md-4">
                                <h5 className="footerMiddleTitle">
                                    امکانات سایت
                                </h5>
                                <div className="footerMiddleItems" >
                                    <span className="siteFuitcher">ثبت محصول</span>
                                    <span className="siteFuitcher">لیست محصولات</span>
                                    <span className="siteFuitcher">لاگین و ثبت نام</span>
                                    <span className="siteFuitcher">لیست علاقه مندی ها</span>
                                </div>
                            </div>

                            <div className="col-6 col-md-4">
                                <h5 className="footerMiddleTitle">
                                    ارتباط با من
                                </h5>
                                <div className="footerMiddleItems" >
                                    <div className="socialFooterItems">
                                        <span className="socialItem">
                                            <FaInstagram />
                                        </span>
                                        <span className="socialItem">
                                            <FaTelegramPlane />
                                        </span>
                                        <span className="socialItem">
                                            <FaMobileAlt />
                                        </span>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className="bottomFooter">

                    </div>

                </div>


            </div>

        </>
    )
}

export default Footer