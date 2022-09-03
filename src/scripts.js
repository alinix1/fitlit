import './css/styles.css';
import './images/turing-logo.png'
// import './fitlit/src/images/fitlit.png'
import UserRepository from '../src/UserRepository.js';
import User from './User';
import Sleep from './Sleep'
import Hydration from './Hydration'
import apiCalls from './apiCalls'
import { userData } from './userData';
import { hydrationData } from './userData'
import { sleepData } from './userData'


// --------------------------------------------------- QUERY SELECTORS
let welcomeUserBox = document.getElementById('welcomeUser-box');
let userDataBox = document.querySelector('#userData-box');
let activityBox = document.getElementById('activity-box');
let sleepBox = document.getElementById('sleep-box');
let hydrationBox = document.getElementById('hydration-box');
let communityBox = document.getElementById('community-box');
let widgetBox = document.querySelector('#widget-box');

// --------------------------------------------------- GLOBAL VARIABLES
let userRepository = new UserRepository(); // <------ may need parameter
let user;
let randomUser;
let users = [];
let nestedData
let hydrationInfo = [];
let sleepInfo = [];
let singleUser;

// --------------------------------------------------- EVENT LISTENERS
// userDataBox.addEventListener('click', displayUserData);
window.addEventListener('load', instantiateData)

// --------------------------------------------------- FETCH PROMISES
Promise.all([apiCalls.getUserData(), apiCalls.getHydrationData(), apiCalls.getSleepData()])
  .then((data) => {
    const allUserData = data.reduce((userList, userItem) => {
      return userList = {...userList, ...userItem};
    }, {})
    instantiateData(allUserData)
    displayUserData();
  })

// --------------------------------------------------- FUNCTIONS
function instantiateData(data) {
  users = data.userData.map(user => new User(user));
  userRepository = new UserRepository(users)
  singleUser = new User(users[getRandomId()])
  hydrationInfo = new Hydration(data.hydrationData)
  sleepInfo = new Sleep(data.sleepData);
}



function displayUserData(id, date) {
  randomUser = getRandomId(singleUser.id);
  user = userRepository.users[randomUser];
  id = user.id
  date = user.date
  console.log(user.name)
  displayAllData()
}


function displayAllData() {
  welcomeUserBox.innerText = `Welcome  \n ${user.userFirstName()}!`;
  userDataBox.innerText = `CURRENT USER \n ------- \n Name: ${user.name} \n Email: ${user.email} \n
  Address: ${user.address} \n Stride Length: ${user.strideLength} \n Daily Step Goal: ${user.dailyStepGoal}`
  activityBox.innerText = `Step Goal \n \n ${user.dailyStepGoal} \nAverage Step Goal\n ${userRepository.getUserAverageStepGoal().toFixed(0)} \n \n `

  const weeklyFluidConsumption = hydrationInfo.getFluidOuncesConsumedPerWeek(singleUser.id);
  const weeklyKeys = Object.keys(weeklyFluidConsumption);
  const weeklyValues = Object.values(weeklyFluidConsumption);
  hydrationBox.innerText = `Hydration: \n \n ${user.name} \n \n Today: \n ${hydrationInfo.getFluidOuncesByDate(singleUser.id)} \n This Week's Hydration: \n
  ${weeklyKeys[0]} ${weeklyValues[0]}
  ${weeklyKeys[1]} ${weeklyValues[1]}
  ${weeklyKeys[2]} ${weeklyValues[2]}
  ${weeklyKeys[3]} ${weeklyValues[3]}
  ${weeklyKeys[4]} ${weeklyValues[4]}
  ${weeklyKeys[5]} ${weeklyValues[5]}
  ${weeklyKeys[6]} ${weeklyValues[6]}`

  const sleepyWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "hoursSlept");
  const sleepyKeys = Object.keys(sleepyWeek);
  const sleepyValues = Object.values(sleepyWeek);
  console.log('82', sleepyWeek);

  const qualityWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "sleepQuality");
  const qualityKeys = Object.keys(qualityWeek);
  const qualityValues = Object.values(qualityWeek);
  const totalSleep = sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")
  const totalQuality = sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")

  sleepBox.innerText = `Sleep \n \n ${user.name} \n Hours Slept Today \n ${sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")} \n Sleep Quality Today \n ${sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")}\n \n This Week's Hours Slept + Quality \n 
  ${sleepyKeys[0]} ${sleepyValues[0]} ${qualityValues[0]} 
  ${sleepyKeys[1]} ${sleepyValues[1]} ${qualityValues[1]}
  ${sleepyKeys[2]} ${sleepyValues[2]} ${qualityValues[2]}
  ${sleepyKeys[3]} ${sleepyValues[3]} ${qualityValues[3]}
  ${sleepyKeys[4]} ${sleepyValues[4]} ${qualityValues[4]}
  ${sleepyKeys[5]} ${sleepyValues[5]} ${qualityValues[5]}
  ${sleepyKeys[6]} ${sleepyValues[6]} ${qualityValues[6]}
  \n
  Avg Hours Slept ${totalSleep} | Avg Quality Sleep ${totalQuality}`
}

function getRandomId() {
    return Math.floor(Math.random() * 49) +1;
}

// **THINK TANK**
