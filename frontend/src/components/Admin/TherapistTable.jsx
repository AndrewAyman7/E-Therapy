import {Link, useNavigate} from "react-router-dom";
import "./admin.css";
import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { getAllUsers } from "../../redux/api-calls/profileApi";
import { deleteAccount, logOut } from "../../redux/api-calls/authApi";
import swal from "sweetalert";
import AddTherapist from "./AddTherapist";
import axios from "axios";


const TherapistTable = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [therapists,setTherapists] = useState([]);

    const [addTherapist , setAddTherapist] = useState(false);

    const getTherapists = async ()=>{
        try{
            let thers = await axios.get(`http://localhost:9000/api/fetch-therapist` , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(thers.data);
            setTherapists(thers.data);
        }catch(err){
            console.log(err);
        }
        
    }

    useEffect(()=>{
        getTherapists();
    },[])

    const deleteAcc = (id)=>{ 
        swal({
            title: "Are You Sure To Delete ?",
            icon: "warning",
            buttons: true
        }).then(clicked=>{
            if(clicked){
                dispatch(deleteAccount(id));
                /** @ToDo Lazem t3ml state isDeleted fe elRedux , 3shan yzhrlk ely etms7 3ltool mn lazem t3ml 8er reload */
            }
        })
    }

    return<>
    <section className="dashboard-container">
        <AdminSidebar/>

        <div className="admin-main container-fluid">
            <h1 className="table-header"> Therapists </h1> <button className="add-new-therapist-but" onClick={()=>setAddTherapist(true)}> Add New Therapist </button>
            <table className="table table-dark mt-3">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Therapist</th>
                <th scope="col">photo</th>
                <th scope="col">email</th>
                <th scope="col">Operations</th>
                <th scope="col">Rates</th>
                </tr>
            </thead>
            <tbody>
                { therapists?.map((el , idx)=>(
                    <tr key={el._id}>
                        <th scope="row">{idx+1}</th>
                        <td> <Link to={`/profile/${el._id}`}>{el.username}</Link> </td>
                        {
                            el.profileimg.url.startsWith("http") ?   // 3shan ana 3amel default photo lw md5lsh profileimg , btbtdy b http
                            <img className="dash-user-img" src= {el.profileimg.url}/> : 
                            <img className="dash-user-img" src= {`http://localhost:9000/${el.profileimg.url}`}/>
                        }

                        <td>{el.email}</td> 
                        <Link className="btn btn-success" to={`/therapist/profile/${el._id}`} >View Profile </Link>
                        <button
                        type="button"
                        className="btn btn-danger" 
                        onClick={ ()=>{deleteAcc(el._id) } }
                        > Remove Account</button>
                        <td> { [... Array(el.therapist.avgRates)].map((item2,item2_idx)=>(
                            <i className="bi bi-star-fill"> </i>
                        ) ) } </td>

                    </tr>
                ))}

                
            </tbody>
            
            </table>
        </div>
        
    </section>

    { addTherapist? <AddTherapist setAddTherapist={setAddTherapist} /> : <></> }


    </>
}
export default TherapistTable;