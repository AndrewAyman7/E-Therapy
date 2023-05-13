import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "./admin.css";
import axios from "axios";


const AddTherapist = ({setAddTherapist})=>{ 


    const addNewTherapist = async({username,email,password,age,city, collegeDegree, specialization})=>{
        try{
            let issue = await axios.post("http://localhost:9000/api/auth/register-therapist" ,
                { username,email,password,age,city, collegeDegree, specialization} , { 
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
        }catch(err){
            toast.error(err.response.data.message);
        }
    }

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState(""); 
    const [password,setPassword] = useState("");
    const [age,setAge] = useState("");
    const [city,setCity] = useState("");
    const [collegeDegree,setCollegeDegree] = useState("");
    const [specialization,setSpecialization] = useState("");

    const addForm = (e)=>{
        e.preventDefault();
        if(username.trim() === "")  return toast.error("username is Required");
        if(email.trim() === "")    return toast.error("email can't be empty");
        if(password.trim() === "")    return toast.error("password can't be empty");
        if(age.trim() === "")    return toast.error("age can't be empty");
        if(city.trim() === "")    return toast.error("city can't be empty");
        if(collegeDegree.trim() === "")    return toast.error("College Degree can't be empty");
        if(specialization.trim() === "")    return toast.error("specialization can't be empty");

        addNewTherapist({username,email,password,age,city, collegeDegree, specialization})
        setAddTherapist(false);
    }
    
    return(
        <>
        <ToastContainer position="top-center" theme="colored"/>
        <div className="update-box3-layer">
        <div className="update-box4">
            <div className="close-form">
                <i class="bi bi-x-circle"  onClick={()=>{setAddTherapist(false)}}></i>
            </div>   
            <div className="post-update-form">
                <h3 className="text-center">Add New Therapist</h3>
                <form className="m-3"  onSubmit={addForm}>  {/** Golden Note : onSubmit, not onClick */}

                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control"  placeholder="username"  value={username} onChange={ (e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control"  placeholder="email"  value={email} onChange={ (e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" placeholder="password"  value={password} onChange={ (e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input className="form-control"  placeholder="age"  value={age} onChange={ (e)=>setAge(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input className="form-control"  placeholder="city"  value={city} onChange={ (e)=>setCity(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Collage Degree</label>
                        <input className="form-control"  placeholder="collage degree"  value={collegeDegree} onChange={ (e)=>setCollegeDegree(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Specialization</label>
                        <input className="form-control"  placeholder="specialization"  value={specialization} onChange={ (e)=>setSpecialization(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn my-btn" >Add New Therapist</button>
                </form>
            </div>

        </div>
        </div>
        </>
    )

}
export default AddTherapist;