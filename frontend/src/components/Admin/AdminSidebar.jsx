import { Link } from "react-router-dom";

const AdminSidebar = ()=>{

    return(
        <>
        <section className="admin-sidebar container-fluid">  
            <div className="admin-sidebar-header">
                <i class="bi bi-columns"></i> <h3 className="admin-side-header">Dashboard</h3> 
            </div>
            <div className="sidebar-admin-list">
                <div className="admin-list-item"><Link to={"/admin-dashboard/users-table"} > <i class="bi bi-person"></i>  Users </Link> </div>
                <div className="admin-list-item"><Link to={"/admin-dashboard/posts-table"} > <i class="bi bi-stickies"></i> Posts </Link> </div>
                <div className="admin-list-item"><Link to={"/admin-dashboard/category-table"} > <i class="bi bi-tags"></i> Categories </Link> </div>
                <div className="admin-list-item"><Link to={"/admin-dashboard/comments-table"} > <i class="bi bi-chat-left-text"></i> Comments </Link> </div>
                <div className="admin-list-item"><Link to={"/admin-dashboard/therapists-table"} > <i class="bi bi-person-heart"></i> Therapists </Link> </div>
                <div className="admin-list-item"><Link to={"/admin-dashboard/reports-table"} > <i class="bi bi-clipboard2-pulse"></i> Reports </Link> </div>
                <div className="admin-list-item"><Link to={"/admin-dashboard/contacts-table"} > <i class="bi bi-envelope-at"></i> Contacts </Link> </div>
            </div>
        </section>
        </>
    )

}
export default AdminSidebar;