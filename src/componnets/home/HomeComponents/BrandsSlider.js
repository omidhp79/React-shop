import Slider from "react-slick"
import "../../../assets/css/slick/slick.css"
import "../../../assets/css/slick/slick-theme.css"
import brandImg1 from '../../../assets/Images/Product/Brands/apple.png'
import brandImg2 from '../../../assets/Images/Product/Brands/asus.png'
import brandImg3 from '../../../assets/Images/Product/Brands/hp.png'
import brandImg4 from '../../../assets/Images/Product/Brands/huawei.png'
import brandImg5 from '../../../assets/Images/Product/Brands/lg.png'
import brandImg6 from '../../../assets/Images/Product/Brands/microsoft.png'
import brandImg7 from '../../../assets/Images/Product/Brands/samsung.png'

const BrandsSlider = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500
    };

    return (
        <section className="brandSliderBox">
            <div className="maxW">

                <Slider {...settings}>
                    <div className="BrandItem">
                        <img src={brandImg1} />
                    </div>
                    <div className="BrandItem">
                        <img src={brandImg2} />
                    </div>
                    <div className="BrandItem">
                        <img src={brandImg3} />
                    </div>
                    <div className="BrandItem">
                        <img src={brandImg4} />
                    </div>
                    <div className="BrandItem">
                        <img src={brandImg5} />
                    </div>
                    <div className="BrandItem">
                        <img src={brandImg6} />
                    </div>
                    <div className="BrandItem">
                        <img src={brandImg7} />
                    </div>
                </Slider>

            </div>
        </section>
    )
}

export default BrandsSlider