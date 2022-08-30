import './css/styles.css';
import './images/turing-logo.png'
import User from './User';
import userData from './data/userData.js';
import UserRepository from './UserRepository';


// --------------------------------------------------- QUERY SELECTORS
const welcomeUserBox = document.getElementById('welcomeUser-box');
const userDataBox = document.getElementById('userData-box');
const activityBox = document.getElementById('activity-Box');
const sleepBox = document.getElementById('sleep-box');
const hydrationBox = document.getElementById('hydration-box');
const communityBox = document.getElementById('community-box');

// --------------------------------------------------- GLOBAL VARIABLES
let userRepository = new UserRepository(); // <------ may need parameter
let user, randomUser;
let users = [];

// --------------------------------------------------- EVENT LISTENERS


// --------------------------------------------------- FUNCTIONS
function getRandomId(userList) {
    return Math.floor(Math.random() * userList.length);
}

function displayUserData() {
    randomUser = getRandomId(userRepository.users);
    user = userRepository.users[randomUser];
    displayPageInfo();
}

function displayPageInfo() {
    userDataBox.innerText = `${user.name}`;
    console.log('ayyyyy', user.name);
}
// **THINK TANK**
// going to need a function that gets all the userData
// change user button later....maybe??? 
// get first name