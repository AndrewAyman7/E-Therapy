import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addCategory } from "../../redux/api-calls/categoryApi";
import "./admin.css";
import axios from "axios";
import { fetchCategories } from "../../redux/api-calls/categoryApi";


const AddMentalIssue = ({setAddIssueBox})=>{ 

    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);
    const {categories} = useSelector(state=>state.category);

    const addMentalIsseue = async({category,details})=>{
        try{
            let issue = await axios.post("http://localhost:9000/api/issue" , {category,details} , {  //Lazem ytsma be esmo fe elBackend , req.body.title
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
        }catch(err){
            toast.error(err.response.data.message);
        }
    }

    const dispatch = useDispatch();
    const [category,setCategory] = useState("");
    const [details,setDetails] = useState(""); 

    const addForm = (e)=>{
        e.preventDefault();
        if(category.trim() === "")  return toast.error("Category is Required");
        if(details.trim() === "")    return toast.error("Category can't be empty");
        addMentalIsseue({category,details})
        setAddIssueBox(false);
    }
    
    return(
        <>
        <ToastContainer position="top-center" theme="colored"/>
        <div className="update-box3-layer">
        <div className="update-box3">
            <div className="close-form">
                <i class="bi bi-x-circle"  onClick={()=>{setAddIssueBox(false)}}></i>
            </div>   
            <div className="post-update-form">
                <h3 className="text-center">Add Mental Issue</h3>
                <form className="m-3"  onSubmit={addForm}>  {/** Golden Note : onSubmit, not onClick */}
                    <div className="form-group">
                        <label >Category</label>
                        <select className="form-control"  value={category} onChange={ (e)=>setCategory(e.target.value)}>
                            <option> Select Category new </option>
                            {
                                categories.map(el=>(
                                    <option value={el.title}> {el.title} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mental Issue Details</label>
                        <textarea className="form-control textarea-det"  placeholder="Mental Issue Details"  value={details} onChange={ (e)=>setDetails(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn my-btn" >Add Mental Issue</button>
                </form>
            </div>

        </div>
        </div>
        </>
    )

}
export default AddMentalIssue;