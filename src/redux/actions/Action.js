import axios from "axios";
import { toast } from "react-toastify";


// Get Category List For Slider Home Page 

export const getCatList = "getCatList";
export const dispatchGetCatList = () => {
    return async dispatch => {

        let Err = false,
            loading = true

        try {
            // let result = await axios.get("https://dummyjson.com/products/categories");
            let result = await axios.get("http://localhost:3001/categories");

            if (result.status == 200) {
                result = result.data
                loading = false
            }
            else {
                Err = true
                loading = false
            }

            dispatch({
                type: getCatList,
                data: result,
                error: Err,
                loading: loading
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: getCatList,
                data: null,
                error: true,
                loading: false
            })
        }
    }
}

// Get Product List For Slider Home Page 
export const getPrdList = "getPrdList";
export const dispatchProductList = () => {
    return async dispatch => {

        let Err = false,
            loading = true;

        try {
            // let result = await axios.get('https://dummyjson.com/products');
            let result = await axios.get('http://localhost:3001/products');

            if (result.status == 200) {
                result = result.data.products
                loading = false
            }
            else {
                Err = true
                loading = false
            }

            dispatch({
                type: getPrdList,
                data: result,
                error: Err,
                loading: loading
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: getPrdList,
                data: null,
                error: true,
                loading: false
            })
        }
    }
}

// Get Product List With Category Name 

export const getWithCategory = "getWithCategory";
export const getPrdListWithCategory = (catName) => {
    return async dispatch => {

        let Err = false,
            loading = true;

        try {
            let result = await axios.get(`https://dummyjson.com/products/category/${catName}`);

            if (result.status == 200) {
                result = result.data.products
                loading = false
            }
            else {
                Err = true
                loading = false
            }

            dispatch({
                type: getWithCategory,
                data: result,
                error: Err,
                loading: loading
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: getWithCategory,
                data: null,
                error: true,
                loading: false
            })
        }

    }
}

// Get Product With id

export const getSinglePrd = "getSinglePrd";
export const dispatchGetSinglePrd = (prdId) => {
    return async dispatch => {

        let Err = false,
            loading = true;
        try {
            let result = await axios.get(`https://dummyjson.com/products/${prdId}`);

            if (result.status == 200) {
                result = result.data
                loading = false
            }
            else {
                Err = true
                loading = false
            }

            dispatch({
                type: getSinglePrd,
                data: result,
                error: Err,
                loading: loading
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: getSinglePrd,
                data: null,
                error: true,
                loading: false
            })
        }
    }

}

// add to cart
export const addToCart = "addToCart";
export const dispatchAddToCart = (id, title, price, count, finalPrice) => {
    return dispatch => {

        let cartLS = JSON.parse(localStorage.getItem("cart")),
            allData = [],
            newData = {
                id: id,
                count: count,
                title: title,
                price: price,
                finalPrice: finalPrice
            },
            Repet = false;

        if (cartLS != null && cartLS != undefined) {
            cartLS.forEach(item => {
                allData.push(item)
            });
        }

        allData.forEach(item => {
            if (item.id == newData.id) {
                Repet = true
            }
        })

        if (!Repet) {
            allData.push(newData)
        }

        else {
            allData.forEach(item => {
                if (item.id == newData.id) {
                    item.count = item.count + newData.count;
                }
            })
        }


        localStorage.setItem('cart', JSON.stringify(allData))

        toast.success(`${title} به سبد خرید اضافه شد `, {
            position: toast.POSITION.TOP_LEFT,
            theme: "dark",
            draggableDirection: "rtl"
        });

        dispatch({
            type: addToCart,
            loading: false,
            data: allData
        })
    }
}

// change cart
export const changeCart = "changeCart";
export const dispatchChangeCart = (cartLS) => {
    return dispatch => {

        localStorage.setItem('cart', JSON.stringify(cartLS))

        dispatch({
            type: addToCart,
            loading: false,
            data: cartLS
        })
    }
}

// Delete Item Form Cart List 
export const dispatchDeleteCart = (prd) => {
    return dispatch => {

        let cartItems = JSON.parse(localStorage.getItem("cart"));

        cartItems = cartItems.filter(item => {
            return (item.id != prd.id)
        });

        localStorage.setItem('cart', JSON.stringify(cartItems));

        toast.success(`حذف  ${prd.prdName} با موفقیت انجام شد `, {
            position: toast.POSITION.TOP_LEFT,
            theme: "dark",
            draggableDirection: "rtl"
        });

        dispatch({
            type: changeCart,
            loading: false,
            data: cartItems
        })
    }
}