import "./posts.css";

const Pagination = ({pages,page,setPage})=>{

    const generatePages = [];     // Lazem a7wl num of pages, to array, 3shan a3rf a3ml map
    for(let i=1; i<=pages; i++){
        generatePages.push(i);
    }

    return(
        <>
        <div className="pagination">
            <button className="prev" onClick={()=>{setPage(page-1)}} disabled={page===1}> prev</button>
            {
                generatePages.map(p=>(
                    <div key={p} onClick={()=>{setPage(p)}}
                    className={page===p? "page active" : "page"}>              {p} </div>
                ))
            }
            <button className="next" onClick={()=>{setPage(page+1)}} disabled={page===pages}> next</button>
        </div>
        </>
    )

}
export default Pagination;