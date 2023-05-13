import { useNavigate } from "react-router-dom";
import "./postscategory.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchCategories } from "../../redux/api-calls/categoryApi";

const CategoryPage = ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);

    const {categories} = useSelector(state=>state.category);

    return(
        <>
        <div className="categories-page-container">    

            <div className="classi-page-left">
                <h1> An Overview of Mental Disorders </h1> <br/>
                <h3> According to World Health Organization (WHO) : </h3>
                <h4> 1 in every 8 people in the world live with a mental disorder </h4> <br/>
                <h3> We Are Here To Help You Overcome your suffering  </h3> <br/>
                <p> Here You Can Take a Look at an Overview of each Mental Disorder </p>
                <p> For each disorder, there is a room to join , You Can Share your suffering on it & let people help you </p>
                <p> or if you have been through This suffering, and you overcame it, please Join The Room & Help others </p>
                <p> Share People Your Experience </p>

                <button className="mental-dis-rooms-btn"
                        onClick={ ()=>navigate("/rooms") }
                > Mental Disorders Rooms ( Join Us ) </button>
            </div>

            <div className="classi-page-right">
                <div className="sidebar-categ">
                    <h1 className="cat-header1">Mental Disorders</h1>
                    {categories.map(el=>(
                        <Link to={`/posts/category/${el.title}`}> {el.title} </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    )

}
export default CategoryPage;