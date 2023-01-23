import Layout from "../../layout/Layout"
import "./home.css"
import Baners from "./HomeComponents/Baners"
import BrandsSlider from "./HomeComponents/BrandsSlider"
import CategorySlider from "./HomeComponents/CategorySlider"
import MianSlider from "./HomeComponents/MainSlider"
import ProductListSlider from "./HomeComponents/ProductListSlider"

const Home = () => {

    return (
        <Layout cssClass={""} Title={"Alpha Shop"} >

            <MianSlider />

            <CategorySlider />

            <ProductListSlider />

            <Baners />

            <BrandsSlider />

        </Layout>
    )
}

export default Home