import axios from "axios";
import "./contact.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";


const ContactUs = ()=>{

    const [mssg,setMssg] = useState("");
    const [phone,setPhone] = useState("");

    const postContact = async()=>{
        try{
            const contactRes = await axios.post("http://localhost:9000/api/contact-us" , { mssg,phone } , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
        }catch(err){
            console.log(err);
        }
    }

    const submitForm = (e)=>{
        e.preventDefault();
        if(mssg.trim() === "")  return toast.error("mssg is Required");
        postContact();
        swal("Done")
    }


    return <>

    <div className="contact-us-container">
    <ToastContainer position="top-center" theme="colored"/>
    <div className="contact-us-form-container">
        <div className="contact-us-form">
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Write Your Message</label>
                    <textarea className="form-control" placeholder="Write here .." value={mssg} onChange={(e)=>{setMssg(e.target.value)}}/>
                </div> <br/>
                <div className="form-group">
                    <label>Your Phone Number (*optional)</label>
                    <input className="form-control"  placeholder="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                </div>
                <button type="submit" className="contact-but">Send Message <i class="bi bi-check-circle-fill"></i> </button>
            </form>
        </div>
        <div className="form-sidebar">
            <p> Contact Us </p>
        </div>
    </div>
    </div>

    </>
}

export default ContactUs;