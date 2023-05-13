import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {Link , useNavigate} from "react-router-dom";
import { register } from "../../redux/api-calls/authApi";
import { useDispatch , useSelector} from "react-redux";
import "./forms.css";

import swal from "sweetalert";

const Register = ()=>{

    const navigate = useNavigate();
    const {registerMssg} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [age,setAge] = useState("");

    const submitForm = (e)=>{
        e.preventDefault();

        if(username.trim() === "")  return toast.error("username is Required");
        if(email.trim() === "")    return toast.error("email is Required");
        if(password.trim() === "")  return toast.error("password is Required");
        if(age.trim() === "")  return toast.error("Age is Required");
        
        dispatch(register({username,email,password,age}));
    }

    if(registerMssg){ 
        swal({
            title: registerMssg,
            icon: "success"
        }).then(isOk => {
            if(isOk) navigate("/login")
        })
    }
    
    return(
        <>
        <div className="register-container">
        <ToastContainer position="top-center" theme="colored"/>

        <h1 className="text-center">Create An Account</h1>

            <form className="m-3" onSubmit={submitForm}>
                <div className="form-group">
                    <label>username</label>
                    <input className="form-control" placeholder="username"  value={username} onChange={ (e)=>setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control"  placeholder="email"  value={email} onChange={ (e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  placeholder="password"  value={password} onChange={ (e)=>setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input className="form-control"  placeholder="age"  value={age} onChange={ (e)=>setAge(e.target.value)}/>
                </div>

                <button type="submit" className="btn my-btn2">Create Account</button>
            </form>

            <br/><br/>

            <div>
                Already have an account ? <Link to={"/login"} type="button" className="btn my-btn2">Login</Link>
            </div>
            
        </div>
        </>
    )

}

export default Register;