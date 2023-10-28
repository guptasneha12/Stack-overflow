import React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import './HomeMainbar.css';
import {useSelector} from 'react-redux';


import QuestionsList from './QuestionsList';

const HomeMainbar = () => {
    // questionlist is an array of objects as an element
    
    const location = useLocation()
    const user =2;
    const navigate=useNavigate();

const questionList = useSelector(state=>state.questionsReducer)
// console.log(questionList)



    // var questionList = [{
    //     _id: 1,
    //     upVotes: 3,
    //     downVotes:2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted: "mano",
    //     userId:1,
    //     askedOn: " jan 1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswered:"Kumar",
    //         answeredOn:"jan 2",
    //         userId:2,
    //     }]

    // },
    // {
    //     _id: 2,
    //     upVotes: 3,
    //     downVotes:2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted: "mano",
    //     userId:1,
    //     askedOn: " jan 1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswered:"Kumar",
    //         answeredOn:"jan 2",
    //         userId:2,
    //     }]
    // },
    // {
    //     _id: 3,
    //     upVotes: 1,
    //     downVotes:0,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted: "mano",
    //     userId:1,
    //     askedOn: " jan 1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswered:"Kumar",
    //         answeredOn:"jan 2",
    //         userId:2,
    //     }]
    // }]


const checkAuth=()=>{
    if(user===null){
        // if user is not authenticated then they must to auth page for login or sign up
        alert("login or signup to ask a question")
       navigate('/Auth') 
    }
    // else user will move to ask question page
    else{
        navigate('/AskQuestion')
    }
}


    return (
        <div className='main-bar' style={{marginRight:"70px"}}>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ? <h1 style={{marginRight: "100px"}}>Top Questions</h1> : <h1 style={{marginRight: "100px"}}>All Questions</h1>
                }
                <button onClick={checkAuth} className='ask-btn' >Ask Question</button>
            </div>
            <div>
                {
                    questionList.data === null ?
                        <h1>Loading...</h1> :
                        <>
                            <p style={{marginRight: "100px"}}>{questionList.data.length} questions</p>
                            <QuestionsList questionList={questionList.data}/>
                        </>

                }
            </div>

        </div>
    );
}

export default HomeMainbar;












