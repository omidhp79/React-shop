import Slider from "react-slick"
import "../../../assets/css/slick/slick.css"
import "../../../assets/css/slick/slick-theme.css"
import baner1 from '../../../assets/Images/Baners/baner (1).jpg'
import baner2 from '../../../assets/Images/Baners/baner (2).jpg'

const MianSlider = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2700
    };

    return (
        <Slider {...settings}>
            <div className="bnaerItem">
                <img src={baner1} />
            </div>
            <div className="bnaerItem">
                <img src={baner2} />
            </div>
        </Slider>
    )
}

export default MianSlider