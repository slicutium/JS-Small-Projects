

const about = document.querySelector('.about');
const btns = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', (e)=>{
    //target returns the target
    //current target would return about, but target would return the exact element
    //the buttons we created have a dataset and in our case id
    if (e.target.dataset.id){
        btns.forEach((btn)=>{
            //remove all the active
            btn.classList.remove('active');
            
        });
        e.target.classList.add('active');
        articles.forEach((article)=>{
            //remove all the active
            article.classList.remove('active');
            if (article.id === e.target.dataset.id){
                article.classList.add('active');
            }            
        });
    }
});