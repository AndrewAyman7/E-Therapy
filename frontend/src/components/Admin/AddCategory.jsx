import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addCategory } from "../../redux/api-calls/categoryApi";
import "./admin.css";

const AddCategory = ({setAddCatBox})=>{ 
    const dispatch = useDispatch();
    const [title,setTitle] = useState("");  // Lazem ytsma be esmo fe elBackend

    const addForm = (e)=>{
        e.preventDefault();
        if(title.trim() === "")    return toast.error("Category can't be empty");
        dispatch(addCategory({title}));
        setAddCatBox(false);
    }
    
    return(
        <>
        <ToastContainer position="top-center" theme="colored"/>
        <div className="update-box2-layer">
        <div className="update-box2">
            <div className="close-form">
                <i class="bi bi-x-circle"  onClick={()=>{setAddCatBox(false)}}></i>
            </div>   
            <div className="post-update-form">
                <h3 className="text-center">Add Category</h3>
                <form className="m-3"  onSubmit={addForm}>  {/** Golden Note : onSubmit, not onClick */}
                    <div className="form-group">
                        <label>Category</label>
                        <input className="form-control"  placeholder="category"  value={title} onChange={ (e)=>setTitle(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn my-btn" >Add Category</button>
                </form>
            </div>

        </div>
        </div>
        </>
    )

}
export default AddCategory;