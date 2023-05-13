import { useNavigate } from "react-router-dom";
import "./therapy.css";

const TherapyMain = ({})=>{

    const navigate = useNavigate();

    return(

        <>
        <div className="therapy-container">
            <div className="therapy-page-box" onClick={ ()=>{ navigate("/posts") } } >
                {/*<img src="../../images/blog-card.jpg" />   {/** damn @Copyright, upload it without images 
                <h4 className="our-quiz-h2"> OUR BLOG </h4> */}

                <img src="../../images/blog-card.jpg" />   {/** damn @Copyright, upload it without images */}
                <h4 className="our-quiz-h"> OUR BLOG </h4>
                <h3> Welcome To Our Unique Community </h3> <br/>
            </div>

            <div className="therapy-page-box" onClick={ ()=>{ navigate("/classifications") } } >
                <img src="../../images/mental-h.png" />
                <h4 className="our-quiz-h"> MENTAL ILLNESS </h4>
                <h3> Take A Look At Different mental illnesses </h3>
            </div>

            <div className="therapy-page-box" onClick={ ()=>{ navigate("/quiz") } } >
                <img src="../../images/conf.jpg" />
                <h4 className="our-quiz-h"> OUR QUIZ </h4>
                <h3> Do I Really Need Therapy ? </h3>
            </div>

            <div className="therapy-page-box" onClick={ ()=>{ navigate("/rooms") } } >
                <img src="../../images/rooms.png" />
                <h4 className="our-quiz-h"> ROOMS </h4> 
                <h3> Share Your Suffering or Help Others </h3>
            </div>

            <div className="therapy-page-box" onClick={ ()=>{ navigate("/therapists") } } >
                <img src="../../images/therapist.png" />
                <h4 className="our-quiz-h"> OUR THERAPISTs</h4>
                <h3> Online-Therapy & Counselling </h3>
            </div>
        </div> 
        </>

)
}

export default TherapyMain;