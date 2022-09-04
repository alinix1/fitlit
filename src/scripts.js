import './css/styles.css';
import './images/fitlit.png'
import UserRepository from '../src/UserRepository.js';
import User from './User';
import Sleep from './Sleep'
import Hydration from './Hydration'
import apiCalls from './apiCalls'
import { userData } from './userData';
import { hydrationData } from './userData'
import { sleepData } from './userData'
import Chart from 'chart.js/auto';

// --------------------------------------------------- QUERY SELECTORS
let welcomeUserBox = document.getElementById('welcomeUser-box');
let userDataBox = document.querySelector('#userData-box');
let activityBox = document.getElementById('activity-box');
let sleepBox = document.getElementById('sleep-box');
let hydrationBox = document.getElementById('hydration-box');
let communityBox = document.getElementById('community-box');
let widgetBox = document.querySelector('#widget-box');
let dailyBox = document.getElementById('daily-box');

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
  const weeklyFluidConsumption = hydrationInfo.getFluidOuncesConsumedPerWeek(singleUser.id);
  const weeklyKeys = Object.keys(weeklyFluidConsumption);
  const weeklyValues = Object.values(weeklyFluidConsumption);
  const sleepyWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "hoursSlept");
  const sleepyKeys = Object.keys(sleepyWeek);
  const sleepyValues = Object.values(sleepyWeek);
  const qualityWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "sleepQuality");
  const qualityKeys = Object.keys(qualityWeek);
  const qualityValues = Object.values(qualityWeek);
  const totalSleep = sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")
  const totalQuality = sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")
  welcomeUserBox.innerText = `Welcome  \n ${user.userFirstName()}!`;
  userDataBox.innerText = `CURRENT USER \n ------- \n Name: ${user.name} \n Email: ${user.email} \n
  Address: ${user.address} \n Stride Length: ${user.strideLength} \n Daily Step Goal: ${user.dailyStepGoal}`
  dailyBox.innerText = `Daily Data: \n \n Hydration - ${hydrationInfo.getFluidOuncesByDate(singleUser.id)} ounces \n \n
   Hours Slept - ${sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")} \n \n
   Sleep Quality - ${sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")}`

    const ctx1 = document.getElementById('activity-chart');
    const myChar1 = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Daily User Step Goal', 'Users Avg Step Goal'],
            datasets: [{
                label: 'Steps',
                data: [user.dailyStepGoal, userRepository.getUserAverageStepGoal().toFixed(0)], //parameters referrenced 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                  
            }
        }
    
    })
    
  const ctx2 = document.getElementById('hydration-chart');
  const myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
          labels: [weeklyKeys[0], weeklyKeys[1], weeklyKeys[2], weeklyKeys[3], weeklyKeys[4], weeklyKeys[5], weeklyKeys[6]],
          datasets: [{
              label: 'Hydration Weekly Avg', 
              data: [weeklyValues[0], weeklyValues[1], weeklyValues[2], weeklyValues[3], weeklyValues[4], weeklyValues[5], weeklyValues[6]], 
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  // 'rgba(54, 162, 235, 0.2)',
                  // 'rgba(255, 206, 86, 0.2)',
                  // 'rgba(75, 192, 192, 0.2)',
                  // 'rgba(153, 102, 255, 0.2)',
                  // 'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  // 'rgba(255, 99, 132, 1)',
                  // 'rgba(54, 162, 235, 1)',
                  // 'rgba(255, 206, 86, 1)',
                  // 'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  // 'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          maintainAspectRatio: false
      }
  })

  const ctx3 = document.getElementById('sleep-chart');
  const myChart3 = new Chart(ctx3, {
      type: 'line',
      data: {
          labels: [sleepyKeys[0],sleepyKeys[1],sleepyKeys[2],sleepyKeys[3],sleepyKeys[4],sleepyKeys[5],sleepyKeys[6]],
          datasets: [{
              label: ['Hours Slept Weekly Avg'],
              data: [sleepyValues[0], sleepyValues[1], sleepyValues[2], sleepyValues[3], sleepyValues[4], sleepyValues[5], sleepyValues[6]], 
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          },
          {
            label: ['Quality of Sleep Weekly Avg'],
            data: [qualityValues[0], qualityValues[1], qualityValues[2], qualityValues[3], qualityValues[4], qualityValues[5], qualityValues[6]],
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
          }
        ]  
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          maintainAspectRatio: false
      }
  
  })
}

function getRandomId() {
    return Math.floor(Math.random() * 49) +1;
}

