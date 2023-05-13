import { useEffect, useState } from "react";
import "./posts.css";
import { toast, ToastContainer } from "react-toastify";
import { createPost, createPostNoImg } from "../../redux/api-calls/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../redux/api-calls/categoryApi";

const CreatePost = ()=>{

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [newPostCreatd , setNewPostCreated] = useState(false);
    
    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);
    const {categories} = useSelector(state=>state.category);

    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [content,setContent] = useState("");
    const [file,setFile] = useState(null);

    const addPost = (e)=>{
        e.preventDefault();

        // Validation , lazem abl ma tb3t lel server , using react-toast, zy el Alert kda
        if(title.trim() === "")    return toast.error("Title is Required");
        if(category.trim() === "")  return toast.error("Category is Required");
        if(content.trim() === "")  return toast.error("content is Required");
        //if(!file)    return toast.error("image is Required");

        if(!file){
            dispatch( createPostNoImg({title,category,content}) );
            setNewPostCreated(true);
        }else{
            // Handle Image -> its not json, so you have to handle it, form-data
            const formData = new FormData(); // class in js, 5dt mno object
            formData.append("image" , file);
            formData.append("title" , title);
            formData.append("category" , category);
            formData.append("content" , content);        
            dispatch( createPost(formData) );

            setNewPostCreated(true);  // 3shan byt25r shwyaa fe el Loading, hyroo7 lel posts mn 8er ma ykoon et7att !!
        }
    }

    useEffect(()=>{
        if(newPostCreatd){
            navigate("/posts");
        }
    } , [newPostCreatd,navigate]);
    
     /** @Todo -> #47 enhancements : Loading Post , createPostState and navigate  */
     
    return(
        <>
        <div className="post-form1">
        <ToastContainer position="top-center" theme="colored"/>

        <h1 className="text-center cr-post-h">Add New Post</h1>

            <form className="cr-post-form" onSubmit={addPost}>
                <div className="form-group">
                    <label>Post Title</label>
                    <input className="form-control"  placeholder="Post Title"  value={title} onChange={ (e)=>setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label >Category</label>
                    <select className="form-control"  value={category} onChange={ (e)=>setCategory(e.target.value)}>
                        <option> Select Category </option>
                        {
                            categories.map(el=>(
                                <option value={el.title}> {el.title} </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Post Content</label>
                    <textarea placeholder="Post Content" className="form-control"  value={content} onChange={ (e)=>setContent(e.target.value)}>  </textarea>
                </div>
                <div className="form-group">
                    <label>Image </label>
                    <input type="file" className="form-control"  onChange={ (e)=>setFile(e.target.files[0])}/>
                </div>

                <button type="submit" className="cr-post-btn">Create Post</button>
            </form>

        </div>
        </>
    )

}

export default CreatePost;