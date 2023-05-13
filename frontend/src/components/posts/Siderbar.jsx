import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchCategories } from "../../redux/api-calls/categoryApi";
import "./posts.css";

const Sidebar = ()=>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);
    const {categories} = useSelector(state=>state.category);
    return(
        <>
        <div className="sidebar-categ">
            <h1 className="cat-header1">Categories</h1>
            {categories.map(el=>(
                <Link to={`/posts/category/${el.title}`}> {el.title} </Link>
            ))}
        </div>
        </>
    )

}
export default Sidebar;