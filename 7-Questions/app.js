//using selectors inside the element

//get all the questions
const questions = document.querySelectorAll('.question');
//loop over the questions
questions.forEach((question)=>{
    //select the button
    const btn = question.querySelector('.question-btn');
    //add event listener for click
    btn.addEventListener('click', ()=>{
        //loop over the questions again
        // we want to find the questions that have not been clicked
        questions.forEach((pregunta) => {
            if (pregunta !== question) {
                //if the question wasnt the one clicked, remove the show text class
                pregunta.classList.remove('show-text');
            }
        });
        question.classList.toggle('show-text');
    });
});


// traversing the dom

// const btns = document.querySelectorAll('.question-btn')

// btns.forEach((btn)=>{
//     btn.addEventListener('click',(e)=>{
//         const question =e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     })
// })