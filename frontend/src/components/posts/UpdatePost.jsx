import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updatePost, updatePostWithImg } from "../../redux/api-calls/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/api-calls/categoryApi";

const UpdatePost = ({setUpdateBox , post})=>{ 

    const [title,setTitle] = useState(post.title);
    const [category,setCategory] = useState(post.category);
    const [content,setContent] = useState(post.content);
    const [file,setFile] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);
    const {categories} = useSelector(state=>state.category);

    const updateForm = (e)=>{
        e.preventDefault();

        if(title.trim() === "")    return toast.error("Title is Required");  // 3lshanlw ms7 elinput w sabo faddy
        if(category.trim() === "")  return toast.error("Category is Required");
        if(content.trim() === "")  return toast.error("content is Required");
        //if(!file)    return toast.error("image is Required");

        if(!file){
            dispatch(updatePost({ title,category,content }, post?._id  ));
        }else{
            const formData = new FormData();
            formData.append("image" , file);
            formData.append("title" , title);
            formData.append("category" , category);
            formData.append("content" , content);
            dispatch(updatePostWithImg(formData, post?._id  ));
        }
        
        //dispatch(updatePost({ title,category,content }, post?._id  ));

        // to close form and reload page
        setUpdateBox(false);
        //navigate(`/posts/details/${post._id}`);
    }
    
    return(
        <>
        <div className="update-box-layer">
        <div className="update-box">
            <div className="close-form">
                <i class="bi bi-x-circle"  onClick={()=>{setUpdateBox(false)}}></i>
            </div>   
            <div className="post-update-form">
            <ToastContainer position="top-center" theme="colored"/>

                <h3 className="text-center">Update Post</h3>
                <form className="m-3"  onSubmit={updateForm}>  {/** Golden Note : onSubmit, not onClick */}
                    <div className="form-group">
                        <label>Post Title</label>
                        <input className="form-control"  placeholder="Post Title"  value={title} onChange={ (e)=>setTitle(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label >Category</label>
                        <select className="form-control"  value={category} onChange={ (e)=>setCategory(e.target.value)}>
                        <option disabled> Select Category new </option>
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
                        <input type="file" name="file" id="file" className="form-control"
                        
                        //onChange = { (e)=> e.target.files[0] ? setFile(e.target.files[0]) : setFile(post.image.url) }
                        onChange={ (e)=>setFile(e.target.files[0])}
                        />
                       </div>
                    

                    <button type="submit" className="btn my-btn" >Update Post</button>
                </form>
            </div>

        </div>
        </div>
        </>
    )

}
export default UpdatePost;