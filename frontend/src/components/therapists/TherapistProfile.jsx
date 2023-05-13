import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../UserProfile/UserProfile";
import "./therapist.css";
import { getUserProfileById, uploadProfilePhoto } from "../../redux/api-calls/profileApi"; 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TherapistProfile = ({})=>{

    let {id} = useParams();

    const [profile,setProfile] = useState(null);

    const getTherapistProfile = async()=>{
        try{
            let therap = await axios.get(`http://localhost:9000/api/therapist-user/${id}`);
            setProfile(therap.data);
        }catch(err){
            console.log(err);
        }
    }

    // Rate Therapist
    const [rateBox,setRateBox] = useState(false);
    const [rate,setRate] = useState(null);
    const [thId , setThId] = useState(null);

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

    const setRateFun = async (val,id)=>{
        setRate(val);
        setThId(id);
    }

    if(rate && thId){
        addRateTherapist();
        console.log(rate,thId)
    }


    useEffect(()=>{
        getTherapistProfile();
        window.scrollTo(0,0);
    } , [rate,thId,rateBox]);

    console.log(profile)

    return(
        <>
        <div className="therapist-profile-container">

            <div className="therapist-profile-dr-container">

                <div className="therapist-box">
                    {
                        profile? <>

                        <div className="therapist-info-profile">
                            <div className="therapist-img">
                                {
                                profile.profileimg?.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                                <img src= {profile.profileimg.url }/> :  
                                <img src= {`http://localhost:9000/${profile.profileimg.url}`}/>
                                }
                            </div>
                            <div className="therapist-details">
                                <h2> DR. {profile.username} </h2>
                                <h4> {profile.therapist.specialization} </h4>
                                <p>  {profile.therapist.collegeDegree} </p>
                                <p>  {profile.therapist.city} </p>

                                <div className="therapist-rate">

                                    {
                                        profile.therapist.avgRates?
                                        [... Array(5)].map((item2,item2_idx)=>(
                                                <label>
                                                    <i className= {(item2_idx+1) <= profile.therapist.avgRates ? "bi bi-star-fill"  : "bi bi-star" }></i>
                                                </label>
                                            ) 
                                            
                                        ): <>No Rates Yet</>
                                    }
                                    
                                </div>

                <div className="rate-box"> 
                <button onClick={ ()=>setRateBox(true) }> Rate Therapist </button>

                {
                    rateBox? <>
                    <div className="update-box3-layer">
                    <div className="update-box-rate">
                        <div className="close-form">
                            <i class="bi bi-x-circle"  onClick={()=>{setRateBox(false)}}></i>
                        </div>   
                        <div className="post-update-form">
                            <h3 className="text-center">Rate Therapist</h3>
                            {
                                [... Array(5)].map((item2,id)=>{
                                    let rateValue = id+1;
                                    return (
                                        <label>
                                            <input type="radio" value={rateValue} onClick={()=>{setRateFun(rateValue,profile._id)}} /> 
                                            <i className= {rateValue<= rate ? "bi bi-star-fill my-star" : "bi bi-star my-star"} ></i>
                                        </label>
                                    )
                                    
                                })
                            }
                        </div>

                    </div>
                    </div>
                    </> : <></>
                }
                    
                </div>
                            </div>
                        </div>

                        </> : <></>
                    }
                </div>

                
            </div>

            
            <div className="therapist-user-profile">
                <UserProfile/>
            </div>
        </div>
        </>
    )

}
export default TherapistProfile;