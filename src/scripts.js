import './css/styles.css';

import './images/turing-logo.png'
import { userData } from './userData';
import UserRepository from '../src/UserRepository.js';
import User from './User';



// --------------------------------------------------- QUERY SELECTORS
let welcomeUserBox = document.getElementById('welcomeUser-box');
let userDataBox = document.querySelector('#userData-box');
let activityBox = document.getElementById('activity-Box');
let sleepBox = document.getElementById('sleep-box');
let hydrationBox = document.getElementById('hydration-box');
let communityBox = document.getElementById('community-box');

// --------------------------------------------------- GLOBAL VARIABLES
let userRepository = new UserRepository(); // <------ may need parameter
let user;
let randomUser;
let users = [];

// --------------------------------------------------- EVENT LISTENERS

  userDataBox.addEventListener('click', displayUserData);

// --------------------------------------------------- FUNCTIONS
function clickTest() {
  console.log('banana')
}
function instantiateData(data) {
  users = userData.map(user => new User(user));
  userRepository = new UserRepository(users)
}

function displayUserData() {
  instantiateData();
  console.log(userRepository)
  randomUser = getRandomId(userRepository.users);
  user = userRepository.users[randomUser];
  displayAllData()
}

function displayAllData() {
    welcomeUserBox.innerText = `Welcome, ${user.name}!`;
    userDataBox.innerText = `Name: ${user.name} \n Email: ${user.email} \n
    Address: ${user.address} \n Stride Length: ${user.strideLength} \n Daily Step Goal: ${user.dailyStepGoal}`
    console.log('ayyyyy', user.name);
}

function getRandomId(userList) {
    return Math.floor(Math.random() * userList.length);
}
// **THINK TANK**
// going to need a function that gets all the userData
// change user button later....maybe???
// get first name
