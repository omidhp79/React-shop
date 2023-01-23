import { useDispatch } from "react-redux";
import { dispatchDeleteCart } from "../../redux/actions/Action";

const DeletePrd = (props) => {

    const dispatch = useDispatch()

    const deleteFromSotre = () => {
        dispatch(dispatchDeleteCart(props.deletePrdProps));
        props.eventDelete();
    }

    if (props.deletePrdProps.isShow) {

        return (
            <div className="deleteBoxCart">
                <div className="yseNoBox">
                    <p className="DeleteTitle">
                        آیا
                        <span className="deleteprdName">
                            {props.deletePrdProps.prdName}
                        </span>
                        از سبد خرید حذف شود ؟
                    </p>

                    <div className=" d-flex justify-content-center">
                        <button className="btn btn-outline-danger ms-1" onClick={deleteFromSotre}>
                            بله
                        </button>
                        <button className="btn btn-outline-dark me-1" onClick={props.eventDelete}>
                            خیر
                        </button>
                    </div>

                </div>
            </div>
        )
    }
    else {
        return null
    }
}

export default DeletePrd