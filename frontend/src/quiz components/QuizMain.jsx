import { useState } from "react";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";
import "./quiz.css";

const QuizMain = ({})=>{

    const [quizState,setQuizState] = useState("");
    const [quizRes,setQuizRes] = useState("");

    return(

        <>
        <div className="quiz-container">
            <h1> Quiz </h1>
            <h1> Do I Really Need Therapy? </h1>

            {
                quizState === "" ? 
                <div className="home-quiz">
                    <button className="go-quiz-btn" onClick={ ()=>{setQuizState("quiz")} } > Start Quiz </button>
                    <div className="home-quiz-details">
                        <h3> Note That You May Get 1 of these 4 Rates</h3>
                        <div className="rate-div-details"> 
                            <h6 className="rate-left-side"> Congrats, You Are Good , you dont need therapy </h6>
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill good-bgcolor" style={ {width: "15%" } }>
                                </div>
                            </div>
                        </div>
                        <div className="rate-div-details">
                            <h6 className="rate-left-side"> You don't really need therapy, But You need to talk to someone </h6>
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill avg-bgcolor" style={ {width: "30%" } }>
                                </div>
                            </div>
                        </div>
                            <div className="rate-div-details">
                                <h6 className="rate-left-side"> You need therapy , You Should Talk With Therapist </h6>
                                <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill bad-bgcolor" style={ {width: "65%" } }>
                                </div>
                            </div>
                        </div>
                        <div className="rate-div-details">
                            <h6 className="rate-left-side"> You Are in a bad condition, You need therapy, You Should Talk With Therapist ASAP</h6>
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill toobad-bgcolor" style={ {width: "93%" } }>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : <></>
            }
            { quizState ==="quiz" ? <Quiz setQuizState={setQuizState} setQuizRes={setQuizRes} /> : <></> }
            { quizState === "end" ? <QuizResult quizRes={quizRes}  /> : <></> }
        </div> 
        </>

)
}

export default QuizMain;