import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataByTokenHttp } from "../../../redux/actions/UserAction";

const GetUserWithToken = (props) => {
    const userData = useSelector(state => state.User);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataByTokenHttp(props.token))
    }, []);

    return (
        <>
            {
                userData.data.length > 0
                    ?
                    <span>{userData.data[0].userName}</span>
                    :
                    null
            }

        </>
    )
}

export default GetUserWithToken;