import axios from "axios";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

const ContactsTable = ()=>{

    const [contacts,setContacts] = useState([]);

    const getContacts = async()=>{
        try{
            let contactsRes = await axios.get("http://localhost:9000/api/contacts" , {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user") ).token }
            });
            console.log(contactsRes);
            setContacts(contactsRes.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getContacts()
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
                <th scope="col"> user wants to contact </th>
                <th scope="col"> contact Mssg </th>
                <th scope="col"> Phone Number (if exists) </th>
                {/*<th scope="col"> Content </th>*/}
                </tr>
            </thead>
            <tbody>
                {contacts?.map((el , idx)=>(
                    <tr key={idx}>
                        <th scope="row">{idx+1}</th>
                        <td> <Link to={`/profile/${el.user?._id}`}>{el.user?.username}</Link> </td>
                        <td> {el.mssg}</td>
                        <td> {el.phoneNumber? el.phoneNumber : <></>} </td>
                        {/*<td>{el.reported.content}</td>*/}
                    </tr>
                    ))}


            </tbody>
            </table>
        </div>
    </section>
    
    </>
}



export default ContactsTable;