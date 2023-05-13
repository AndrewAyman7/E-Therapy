import {Link} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin.css"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/api-calls/categoryApi";
import AddCategory from "./AddCategory";
import AddMentalIssue from "./AddMentalIssue";
import { toast, ToastContainer } from "react-toastify";



const CategoryTable = ()=>{
    const dispatch = useDispatch();

    const [addCatBox , setAddCatBox] = useState(false);
    const [addIssueBox , setAddIssueBox] = useState(false);

    useEffect(()=>{
        dispatch(fetchCategories());    // de ely ht3ml set lel categories fe elRedux (state)
    },[]);
    const {categories} = useSelector(state=>state.category);

    return<>
    <ToastContainer position="top-center" theme="colored"/>
    <section className="dashboard-container">
        <AdminSidebar/>

        <div className="admin-main container-fluid">
            <h1 className="table-header"> Categories </h1><br/>
            <div className="mental-categories-btns">
                <button className="btn my-btn" onClick={()=>setAddCatBox(true)}> Add Category </button>
                <button className="btn my-btn" onClick={()=>setAddIssueBox(true)}> Add Mental Issue Details </button>
            </div>

            <table className="table table-dark mt-3">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Operations</th>
                </tr>
            </thead>
            <tbody>
                { categories.map((el , i)=>(
                    <tr key={el._id}>
                        <th scope="row">{i+1}</th>
                        <td> {el.title} </td>
                        <button type="button" className="btn btn-info">Edit</button>
                        <button type="button" className="btn btn-danger">Delete</button>
                    </tr>
                ))}


            </tbody>
            </table>
            <h2 className="table-header"> {categories.length} categories </h2>
        </div>
        { addCatBox? <AddCategory setAddCatBox={setAddCatBox}/>  : <></>}
        { addIssueBox? <AddMentalIssue setAddIssueBox={setAddIssueBox} /> : <></> }
    </section>


    </>
}
export default CategoryTable;