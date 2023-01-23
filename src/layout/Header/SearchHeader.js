import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import productImg from '../../assets/Images/Product/PrdImg.jpg'
import { dispatchProductList } from "../../redux/actions/Action";
import Jdata from "../../assets/API/products.json"
import { BsX } from "react-icons/bs";

const SearchHeader = (props) => {

    const prdListData = useSelector((state) => state.PrdList),
        urlName = useLocation(),
        dispatch = useDispatch(),
        [searchResult, setSearchResult] = useState([]),
        searchInputRef = useRef(),
        [searchLoading, setSearchLoading] = useState(false);



    useEffect(() => {
        if (urlName.pathname != "/productlist") {
            dispatch(dispatchProductList())
        }
    }, [])


    const SearchPrdInHeader = () => {
        let SV = searchInputRef.current.value;
        SV = SV.toLocaleLowerCase();
        setSearchLoading(true)
        if (SV != "") {
            let newData = []

            // Jdata.products.map(item => {
            prdListData.data.map(item => {
                let lowname = item.title.toLocaleLowerCase()
                if (lowname.includes(SV)) {
                    newData.push(item)
                }
            })

            setSearchResult(newData)

            setTimeout(() => {
                setSearchLoading(false)
            }, 2000);

        }
        else {
            setSearchLoading(false)
            setSearchResult([])
        }
    }

    // if (!prdListData.error) {

    return (
        <div className='searchBoxParent'>
            <div className='searchBox'>

                <button className="btn text-danger closeSearchBox" onClick={props.showEvent}><BsX /></button>

                {searchLoading &&
                    <span className="loader"></span>
                }

                {/* {prdListData.loading
                    ?
                    <input className='form-cotrol inputSearchHeader' placeholder="در حال ارتباط با سرور" />
                    :
                    <input className='form-cotrol inputSearchHeader' onChange={SearchPrdInHeader} ref={searchInputRef} />
                } */}
                <input className='form-cotrol inputSearchHeader' onChange={SearchPrdInHeader} ref={searchInputRef} />

                <div className="mt-3 searchResultBox">
                    {searchResult.length > 0
                        ?
                        searchResult.map(item => (
                            <Link to={`/product/${item.id}`} key={item.id}>
                                <div className='CartItem'>
                                    <div className='namePrdCart'> {item.title} </div>
                                    <div className='imgPrdCart'>
                                        <img className="imgPrd" src={productImg} />
                                    </div>
                                </div>
                            </Link>
                        ))
                        : null
                    }
                </div>
            </div >
        </div >
    )
    // }
    // else {
    //     return (
    //         <div className='searchBox'>
    //             <p className="mb-0">عملیات جستجو با خطا مواجه شد</p>
    //         </div>
    //     )
    // }
}

export default SearchHeader;