import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

const AdminDashboard = ()=>{

    return(
        <>
        <section className="dashboard-container">  
            <AdminSidebar/>
            <AdminMain/>
        </section>
        </>
    )

}
export default AdminDashboard;