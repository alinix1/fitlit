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
  console.log(data.userData)
  userRepository = new UserRepository(users)
  hydrationInfo = data.hydrationData.map(data => new Hydration(data, userRepository)) // CHANGE DATA AFTER MAP
}

function displayUserData(date, id) {
  randomUser = getRandomId(userRepository.users);
  user = userRepository.users[randomUser];
  id = user.id
  date = user.date
  displayAllData()
}

function displayAllData() {
    welcomeUserBox.innerText = `Welcome, ${user.name}!`;
    userDataBox.innerText = `Name: ${user.name} \n Email: ${user.email} \n
    Address: ${user.address} \n Stride Length: ${user.strideLength} \n Daily Step Goal: ${user.dailyStepGoal}`
    activityBox.innerText = `Your daily step goal: ${user.dailyStepGoal} \n Average user step goal: ${userRepository.getUserAverageStepGoal().toFixed(0)}`}

function getRandomId(userList) {
    return Math.floor(Math.random() * userList.length);
}

// **THINK TANK**
