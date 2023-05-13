import { useEffect } from "react";

const QuizResult = ( {quizRes} )=>{

    let resNum = 0;
    const resultAnalysis = (quizRes)=>{
        for(let i=0; i < quizRes.length; i++){
            resNum += quizRes[i];
        }
    }
    resultAnalysis(quizRes);

    const sum = quizRes.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      useEffect(()=>{
        resultAnalysis(quizRes);
      }, []);

    return(

        <>

            {console.log(quizRes)}
            {console.log(resNum)}
            {/*console.log(sum)*/}

            {
                resNum<100 ? 
                    <div className="quiz-result-container">
                        <h1> Congrats, You Are Good , you dont need therapy </h1>
                        <div className="progress-container-result">
                            <h4>the gravity of the situation</h4> 
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill good-bgcolor" style={ {width: "15%" } }>
                                </div>
                            </div>
                        </div>
                    </div>
                : resNum>=100 && resNum<= 144 ?
                    <div className="quiz-result-container">
                        <h1> You don't really need therapy, But You need to talk to someone</h1>
                        <div className="progress-container-result">
                            <h4>the gravity of the situation</h4> 
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill avg-bgcolor" style={ {width: "30%" } }>
                                </div>
                            </div>
                        </div>
                        </div>
                : resNum>144 && resNum< 170?
                    <div className="quiz-result-container">
                        <h1> You need therapy , You Should Talk With Therapist</h1>
                        <div className="progress-container-result">
                            <h4>the gravity of the situation</h4> 
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill bad-bgcolor" style={ {width: "65%" } }>
                                </div>
                            </div>
                        </div>
                    </div>
                : resNum>=170?
                    <div className="quiz-result-container">
                        <h1> You Are in a bad condition , You need therapy , You Should Talk With Therapist ASAP.</h1>
                        <div className="progress-container-result">
                            <h4>the gravity of the situation</h4> 
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-bar-fill toobad-bgcolor" style={ {width: "93%" } }>
                                </div>
                            </div>
                        </div>
                    </div>
                :   <></>
            }
        
        
        </>

)
}

export default QuizResult;