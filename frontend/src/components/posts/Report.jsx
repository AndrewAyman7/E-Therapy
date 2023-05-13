import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const Report = ({post,setReportBox})=>{ 

    const [report,setReport] = useState("");  

    const reportFun = async()=>{
        try{
            let rateRes = await axios.post(`http://localhost:9000/api/report/${post._id}` ,
                { report } , { 
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    const addForm = (e)=>{
        e.preventDefault();
        if(report.trim() === "")    return toast.error("Report can't be empty");
        reportFun();
        setReportBox(false);
    }
    
    return(
        <>
        <ToastContainer position="top-center" theme="colored"/>
        <div className="update-box2-layer">
        <div className="update-box2">
            <div className="close-form">
                <i class="bi bi-x-circle"  onClick={()=>{setReportBox(false)}}></i>
            </div>   
            <div className="post-update-form">
                <h3 className="text-center">Report</h3>
                <form className="m-3"  onSubmit={addForm}>
                    <div className="form-group">
                        <label>Report Details</label>
                        <input className="form-control"  placeholder="report"  value={report} onChange={ (e)=>setReport(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn my-btn" >Report Now</button>
                </form>
            </div>

        </div>
        </div>
        </>
    )

}
export default Report;