import { useEffect, useState } from "react";
import {questions} from "./questions";
const Quiz = ( {setQuizState , setQuizRes} )=>{

    const [currQuestion , setCurrQuestion] = useState(0);

    const [userAnswers, setUserAnswers] = useState([]);

    const [tmpSelectedAnswer , seTmpSelectedAnswer] = useState("");

    const [endQuiz , setEndQuiz] = useState(false);

    const nextQuestion = (val)=>{
        if(val === ""){
            alert("choose")
        }else{
            console.log(val)
            setUserAnswers( cur=>[...cur, val] );
            seTmpSelectedAnswer("");      // To Validate , if user doesnot choose an answer and click next
            setCurrQuestion(currQuestion+1);
        }
    }

    const finishQuiz = (val)=>{
        setUserAnswers( cur=>[...cur, val] );
        setQuizRes(userAnswers);
        setEndQuiz(true);
    }


    if(endQuiz === true){
        console.log(userAnswers);
        setQuizRes(userAnswers);
        setQuizState("end");
    }


    return(

        <>
        <div className="quiz-questions">
            <h3 className="question-header"> { questions[currQuestion].text } </h3>
            {
                questions[currQuestion].options.map(op=>(
                  <button className="quiz-answer-btn" value={op.answer} onClick={ (e)=>{ seTmpSelectedAnswer(op.needRate * questions[currQuestion].weight) } }> {op.answer} </button>
                ))
            }
            
            {
                currQuestion < questions.length-1 ? 
                    <button className="next-quest-but" onClick={ (e)=>{
                        nextQuestion( tmpSelectedAnswer );
                    } } > next </button>
                    
                :   <button className="end-quest-but" onClick={ ()=>{
                        finishQuiz(tmpSelectedAnswer);
                    } } > End </button>
            }

            <div className="quiz-progress-bar">
                <div className="quiz-progress-bar-fill" style={ {width: `${(currQuestion+1)*10}%` } }>
                </div>
            </div>
        </div>
        

        </>

)
}

export default Quiz;