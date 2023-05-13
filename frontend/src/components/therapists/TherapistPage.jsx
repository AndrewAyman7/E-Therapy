import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react"; 
import swal from "sweetalert";
import "./therapist.css";
import axios from "axios";


const TherapistPage = ()=>{

    const navigate = useNavigate();

    const [therapists,setTherapists] = useState([]);

    const [rate,setRate] = useState(null);
    const [thId , setThId] = useState(null);


    const getTherapists = async ()=>{
        try{
            let thers = await axios.get(`http://localhost:9000/api/fetch-therapist` , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(thers.data);
            setTherapists(thers.data);
        }catch(err){
            console.log(err);
        }
    }

    const addRateTherapist = async()=>{
        try{
            let rateRes = await axios.post(`http://localhost:9000/api/therapist/rate/${thId}` ,
                { rate } , { 
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    const getTherapistRate = async(id)=>{
        try{
            let rates = await axios.get(`http://localhost:9000/api/therapist-rates/${id}`);
            console.log(rates);
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    const setRateFun = async (val,id)=>{
        setRate(val);
        setThId(id);
    }

    if(rate && thId){
        addRateTherapist();
        console.log(rate,thId)
    }


    useEffect(()=>{
        getTherapists();
    },[rate])



    return<>

    <div className="therapists-page">
        <h1 className="therapist-header-page"> Our Therapists </h1>
        <div className="therapists-container">

            {
                therapists?.map((item,idx)=>(
                    <div className="therapist-info" onClick={ ()=> navigate(`/therapist/profile/${item._id}`) } >
                        <div className="therapist-img">
                            {
                             item.profileimg?.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                             <img src= {item.profileimg.url }/> :  
                             <img src= {`http://localhost:9000/${item.profileimg.url}`}/>
                            }
                        </div>
                        <div className="therapist-details">
                            <h2> DR. {item.username} </h2>
                            <h4> {item.therapist.specialization} </h4>
                            <p>  {item.therapist.collegeDegree} </p>
                            <p>  {item.therapist.city} </p>

                            <div className="therapist-rate">

                                {
                                    item.therapist.avgRates?
                                    [... Array(5)].map((item2,item2_idx)=>(
                                            <label>
                                                <i className= {(item2_idx+1) <= item.therapist.avgRates ? "bi bi-star-fill"  : "bi bi-star my-star-2" }></i>
                                            </label>
                                        ) 
                                        
                                    ): <>No Rates Yet</>
                                }

                                {/*
                                    [... Array(5)].map((item2,id)=>{
                                        let rateValue = id+1;
                                        return (
                                            <label>
                                                <input type="radio" value={rateValue} onClick={()=>{setRateFun(rateValue,item._id)}} /> 
                                                <i className= {rateValue<= rate ? "bi bi-star-fill" : "bi bi-star"} ></i>
                                            </label>
                                        )
                                        
                                    })
                                */}
                                
                            </div>

                        </div>
                    </div>
                ))
            }
            
        </div>
        </div>
    </>
}
export default TherapistPage;