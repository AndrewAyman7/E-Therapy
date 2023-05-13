import axios from "axios";
import { categoryActions } from "../slices/categorySlice";
import { toast } from "react-toastify";


const fetchCategories = ()=>{
    return async (dispatch,getState)=>{
        try{
            let cats = await axios.get("http://localhost:9000/api/category");
            dispatch(categoryActions.setCats(cats.data));
            console.log(cats);
        }catch(err){
            console.log(err);
        }
    }
}

const addCategory = (title)=>{
    return async (dispatch,getState)=>{
        try{
            let cat = await axios.post("http://localhost:9000/api/category" , title , {  //Lazem ytsma be esmo fe elBackend , req.body.title
                headers: { Authorization: "Bearer " + getState().auth.user.token }
            });
            dispatch(categoryActions.addCat(cat.data));
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
}

const getCategoryInfo = (issue)=>{
    return async (dispatch,getState)=>{
        try{
            let info = await axios.get(`http://localhost:9000/api/issue/${issue}`);
            dispatch(categoryActions.setCategoryInfo(info.data));
            console.log(info);
        }catch(err){
            console.log(err);
        }
    }
}

/** @ToDo  deleteCategory  */

export {fetchCategories , addCategory , getCategoryInfo}