import style from "../componnets/Authentication/Auth.module.css";

const MyInput = (props) => {

    const blurInput = (e) => {
        if (e.target.value == "") {
            e.target.parentElement.classList.remove("hasValue");
        }
        else {
            e.target.parentElement.classList.add("hasValue");
        }
    }
    const inputValidate = (e, type) => {

        if (type == "password") {
            let passRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
            if (!passRegex.test(e.target.value) && type == "password") {
                e.target.parentElement.classList.add("errValue");
                e.target.setAttribute('data-valid', false);
            }
            else {
                e.target.parentElement.classList.remove("errValue");
                e.target.setAttribute('data-valid', true);
            }
        }

        if (type == "text") {
            if (e.target.value == "") {
                e.target.parentElement.classList.add("errValue");
                e.target.setAttribute('data-valid', false);
            }
            else {
                e.target.parentElement.classList.remove("errValue");
                e.target.setAttribute('data-valid', true);
            }
        }

        props.changeEvenet(e)
    }
    return (
        <div className={style.singleBox}>
            <input type={props.type} className="form-control" id={props.id} data-valid={false}
                onBlur={(e) => blurInput(e)} onChange={(e) => inputValidate(e, props.type)} />
            <label htmlFor="userName" className={style.formLabel}>{props.label}  </label>
            <span className="errMsg">
                {props.errMsg}
            </span>
        </div>
    )
}

export default MyInput;