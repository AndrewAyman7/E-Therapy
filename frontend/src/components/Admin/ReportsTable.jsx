import axios from "axios";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

const ReportsTable = ()=>{

    const [reports,setReports] = useState([]);

    const getReports = async()=>{
        try{
            let reportsRes = await axios.get("http://localhost:9000/api/reports" , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(reportsRes);
            setReports(reportsRes.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getReports()
    },[])


    return <>

    <section className="dashboard-container">
        <AdminSidebar/>

        <div className="admin-main container-fluid">
            <h1 className="table-header"> Reports </h1>
            <table className="table table-dark mt-3">
            <thead>
                <tr>
                <th scope="col"> # </th>
                <th scope="col"> Report From  </th>
                <th scope="col"> The Reported User </th>
                <th scope="col"> Report Details </th>
                <th scope="col"> Reported Post </th>
                {/*<th scope="col"> Content </th>*/}
                </tr>
            </thead>
            <tbody>
                {reports?.map((el , idx)=>(
                    <tr key={idx}>
                        <th scope="row">{idx+1}</th>
                        <td> <Link to={`/profile/${el.reportFrom?._id}`}>{el.reportFrom?.username}</Link> </td>

                        <td> <Link to={`/profile/${el.reported?.user?._id}`}>  {el.reported?.user?.username} </Link> </td>  
                        <td> {el.reportDetails}</td>
                        <td> <Link to={`/posts/details/${el.reported?.id}`}> See The Post </Link> </td>
                        {/*<td>{el.reported.content}</td>*/}
                    </tr>
                    ))}


            </tbody>
            </table>
        </div>
    </section>
    
    </>
}



export default ReportsTable;