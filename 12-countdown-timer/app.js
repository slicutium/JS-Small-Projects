const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector('.deadline');
const giveaway = document.querySelector('.giveaway');
const items = document.querySelectorAll('.deadline-format h4');

//let futureDate = new Date(2022, 08, 24, 13, 30, 0);

//to perpetually run at 10 days from the first render by user
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11,30,0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

const month = months[futureDate.getMonth()]; 
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;


//future time in ms
const futureTime = futureDate.getTime();

const  getRemainingTime = ()=>{
  //current time in ms
  const today = new Date().getTime();

  const t = futureTime - today;

  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  const oneSecond = 1000;

  //calculate all values

  let days = t/oneDay;
  days = Math.floor(days);

  let hours = (t%oneDay)/oneHour;
  hours = Math.floor(hours);

  let minutes = (t%oneHour)/oneMinute;
  minutes = Math.floor(minutes);

  let seconds = (t%oneMinute)/oneSecond;
  seconds = Math.floor(seconds)

  // set values array;
  const values = [days, hours, minutes, seconds]



  items.forEach((item, index)=>{
    item.innerHTML = format(values[index]);
  });

  if(t<0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry this giveaway has expired</h4>`
  }
};

const format = (item)=>{
  if(item <10){
    return item = `0${item}`
  }
  return item
};

//countdow
let countdown = setInterval(getRemainingTime,1000);

getRemainingTime();

