import './css/styles.css';
import './images/turing-logo.png'
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

// --------------------------------------------------- GLOBAL VARIABLES
let userRepository = new UserRepository(); // <------ may need parameter
let user;
let randomUser;
let users = [];
let nestedData
let hydrationInfo = [];

// --------------------------------------------------- EVENT LISTENERS
userDataBox.addEventListener('click', displayUserData);

// --------------------------------------------------- FETCH PROMISES
Promise.all([apiCalls.getUserData(), apiCalls.getHydrationData()])
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
  hydrationInfo = new Hydration(data.hydrationData, userRepository)

  console.log(hydrationInfo.getFluidOuncesByDate(5, "2019/06/15"))

 // CHANGE DATA AFTER MAP
}



function displayUserData(id, date) {
  randomUser = getRandomId(userRepository.users);
  user = userRepository.users[randomUser];
  displayAllData()
}


function displayAllData() {
    welcomeUserBox.innerText = `Welcome  \n ${user.userFirstName()}!`;
    userDataBox.innerText = `CURRENT USER \n ------- \n Name: ${user.name} \n Email: ${user.email} \n
    Address: ${user.address} \n Stride Length: ${user.strideLength} \n Daily Step Goal: ${user.dailyStepGoal}`
    activityBox.innerText = `Step Goal \n \n ${user.dailyStepGoal} \n \n ${userRepository.getUserAverageStepGoal().toFixed(0)} \n \n Average Step Goal`
    // hydrationBox.innerText = `Hydration \n ${hydrationInfo}`
  }

function getRandomId(userList) {
    return Math.floor(Math.random() * userList.length);
}

// **THINK TANK**
