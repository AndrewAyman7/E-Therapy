export const questions = [
    {
        text: "Are You Angry All Time ?",
        options: [
            { id: 0 , answer: "yes always" , answerRate: "need" , needRate: 5 },
            { id: 1 , answer: "Most Time" , answerRate: "need" , needRate: 3 },
            { id: 2 , answer: "no, never" , answerRate: "noneed" , needRate: 1 }
        ],
        weight : 3
    },
    {
        text: "Do You Love anyone ?",
        options: [
            { id: 0 , answer: "yes, iam in a relationship" , answerRate: "noneed" , needRate: 1},
            { id: 1 , answer: "Only Family" , answerRate: "noneed" , needRate: 1},
            { id: 2 , answer: "No, not a damn one" , answerRate: "need" , needRate: 5 }
        ],
        weight: 3
    },
    {
        text: "Is there a change in your eating habits ?",
        options: [
            { id: 0 , answer: "Yes, I eat a lot" , answerRate: "need" , needRate: 5}, 
            { id: 1 , answer: "Yes, I barely eat" , answerRate: "need" , needRate: 5},
            { id: 2 , answer: "No, no changes" , answerRate: "noneed" , needRate: 1 }
        ],
        weight: 4
    },
    {
        text: "How do you channel your anger ?",
        options: [
            { id: 0 , answer: "I hurt myself" , answerRate: "need" , needRate: 5}, 
            { id: 1 , answer: "I hurt others" , answerRate: "need" , needRate: 5},
            { id: 2 , answer: "I keep it all inside until I explode" , answerRate: "need" , needRate: 4 },
            { id: 3 , answer: "Try to calm down" , answerRate: "noneed" , needRate: 1}
        ],
        weight: 3
    },
    {
        text: "Are you having any trouble staying focused on work, school, or other tasks in life?",
        options: [
            { id: 0 , answer: "yes, A lot" , answerRate: "need" , needRate: 5}, 
            { id: 1 , answer: "A little" , answerRate: "need" , needRate: 3},
            { id: 2 , answer: "no" , answerRate: "noneed" , needRate: 1 },
        ],
        weight: 3
    },
    {
        text: "Have you become addicted recently? ( Drugs, Alcohol )..",
        options: [
            { id: 0 , answer: "Yes" , answerRate: "need" , needRate: 7}, 
            { id: 1 , answer: "No, but I'm thinking about it" , answerRate: "need" , needRate: 6},
            { id: 2 , answer: "no" , answerRate: "noneed" , needRate: 1 },
        ],
        weight: 6
    },
    {
        text: "Have you experienced trauma or had other emotionally difficult experiences that continue to bother you?",
        options: [
            { id: 0 , answer: "Yes" , answerRate: "need" , needRate: 5}, 
            { id: 1 , answer: "No" , answerRate: "noneed" , needRate: 1 },
        ],
        weight: 4
    },
    {
        text: "Have you tried to stop or reduce the thoughts or behaviors you are concerned about on your own?",
        options: [
            { id: 0 , answer: "Yes, with some success" , answerRate: "need" , needRate: 1}, 
            { id: 1 , answer: "Yes, but without success" , answerRate: "need" , needRate: 4 },
            { id: 1 , answer: "No" , answerRate: "need" , needRate: 3 },
        ],
        weight: 4
    },
    {
        text: "Have you talked through things with a family member or friends?",
        options: [
            { id: 0 , answer: "Yes, and they were able to help me work through my concerns" , answerRate: "noneed" , needRate: 1}, 
            { id: 1 , answer: "I've tried, but I'm still concerned" , answerRate: "need" , needRate: 4 },
            { id: 1 , answer: "No, I haven't tried talking about my concerns with anyone" , answerRate: "need" , needRate: 4 },
            { id: 1 , answer: "No, I don't have anyone I feel comfortable talking to" , answerRate: "need" , needRate: 5 }
        ],
        weight: 4
    },
    {
        text: "Do you feel isolated or alone?",
        options: [
            { id: 0 , answer: "Yes, a lot" , answerRate: "need" , needRate: 5}, 
            { id: 1 , answer: "Yes" , answerRate: "need" , needRate: 3 },
            { id: 1 , answer: "No, not at all" , answerRate: "noneed" , needRate: 1 },
        ],
        weight: 5
    },
    
]


// @ToDo Quiz

//1- Public Quiz -> Predict 3ndoo eeh , h3mll ashharr 10 hagaat , w lw fe el Result Array msln msh by7b y3od lw7do , predict tawa7od..
// ezaaay a predict ? ->  2ool msln lw el Score bta3 (by7b y3od lw7do) > 90 -> tawa7odd

//2- am i toxic ?