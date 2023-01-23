import baner1 from '../../../assets/Images/Baners/BanerHomePage (1)-min.jpg'
import baner2 from '../../../assets/Images/Baners/BanerHomePage (2)-min.jpg'

const Baners = () => {

    return (
        <section className="maxW mtBaners">
            <div className="row">
                <div className="col-6">
                    <img src={baner1} className="imgBager0" />
                </div>
                <div className="col-6">
                    <img src={baner2} className="imgBager0" />
                </div>
            </div>
        </section>
    )
}

export default Baners