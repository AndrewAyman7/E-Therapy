import PostItem from "./PostItem";

const Posts = ({posts})=>{

    return(
        <>
        {
            posts.map(el=> <PostItem post={el} key={el._id}/> )
        }
        </>
    )

}
export default Posts;