const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const button = document.getElementById('btn');
const color = document.querySelector(".color");

button.addEventListener('click', ()=>{
    //let newColor = ['#']
    let newColor = ['#'];
    for (let i =0; i <6; i++){
        //newColor.push(hex[getRandomNumber()])
        newColor += hex[getRandomNumber()];
    }
    //newColor =newColor.join('')
    document.body.style.backgroundColor = newColor;
    color.textContent = newColor;
});

const getRandomNumber = (()=>{
    return Math.floor(Math.random()*hex.length);
});