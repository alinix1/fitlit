import './css/styles.css'
import UserRepository from './UserRepository'
import User from './User'
import Sleep from './Sleep'
import Hydration from './Hydration'
import Chart from 'chart.js/auto'
import Activity from './Activity'
import apiCalls from './apiCalls'
import { userData, hydrationData, sleepData, activityData } from './userData'


// --------------------------------------------------- QUERY SELECTORS
const welcomeUserBox = document.getElementById('welcomeUserBox')
const userDataBox = document.getElementById('userDataBox')
const dailyBox = document.getElementById('dailyBox')
const stepsChart = document.getElementById('stepsChart')
const hydrationChart = document.getElementById('hydrationChart')
const sleepChart = document.getElementById('sleepChart')
const activityChart = document.getElementById('activityChart')
const refreshButton = document.getElementById('refreshButton')
const welcomeSideBar = document.getElementById('welcomeText')
const activityBox = document.getElementById('activityBox')



// --------------------------------------------------- GLOBAL VARIABLES
let userRepository = new UserRepository()
let user
let randomUser
let singleUser
let users = []
let hydrationInfo = []
let sleepInfo = []
let activityInfo = [];


// --------------------------------------------------- EVENT LISTENERS

window.addEventListener('load', instantiateData)
refreshButton.addEventListener('click', refreshingButton);

// --------------------------------------------------- FETCH PROMISES
Promise.all([apiCalls.getUserData(), apiCalls.getHydrationData(), apiCalls.getSleepData(), apiCalls.getActivityData()])
  .then((data) => {
    const allUserData = data.reduce((userList, userItem) => {
      return userList = {...userList, ...userItem}
    }, {})
    instantiateData(allUserData)
    displayUserData()
    displayAllData()
    })

// --------------------------------------------------- FUNCTIONS

function instantiateData(data) {
  users = data.userData.map(user => new User(user))
  userRepository = new UserRepository(users)
  singleUser = new User(users[getRandomId()])
  hydrationInfo = new Hydration(data.hydrationData)
  sleepInfo = new Sleep(data.sleepData)
  activityInfo = new Activity(data.activityData, singleUser)
}

function displayUserData(id, date) {
  randomUser = getRandomId(singleUser.id)
  user = userRepository.users[randomUser]
  // id = user.id
  // date = user.date
}

function displayAllData() {
  chartData()
  // console.log(activityInfo.getMilesWalked(singleUser.id))
  // console.log(activityInfo.getAverageActivityByDate());
  console.log(activityInfo.getActivityForWeek(singleUser.id));
  welcomeSideBar.innerHTML += `<h4 class="welcome-title">W E L C O M E</h4> <p class="welcome-name">${singleUser.userFirstName(singleUser.id)}</p>`

  userDataBox.innerHTML += `<h1 class='headers'>C U R R E N T  U S E R</h1> <p class="user-data-text">Name: ${singleUser.name} <br><br> Email: ${singleUser.email} <br><br>
  Address: ${singleUser.address} <br><br> Stride Length: ${singleUser.strideLength} <br><br> Daily Step Goal: ${activityInfo.getUserStepGoal(singleUser.id)}</p>
  `


  dailyBox.innerHTML += `<h1 class='headers' id="dailyData">D A I L Y D A T A</h1> <section class="daily-left" id="dailyBar">WATER CONSUMED<br> ${hydrationInfo.getFluidOuncesByDate(singleUser.id)}oz <br><br>
   HOURS SLEPT<br> ${sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")}hrs <br><br>
   SLEEP QUALITY<br> ${sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")}/5
   <br><br>AVERAGE USER STEPS<br>${activityInfo.getAverageStepsByDate()}<br><br>
   AVERAGE USER ACTIVE TIME<br>${activityInfo.getAverageActivityByDate()}<br><br>
   AVERAGE USER STAIRS<br>${activityInfo.getAverageStairsByDate()}<br><br>
   </section>

   `


   activityBox.innerHTML += `<h1 class='headers'>A C T I V I T Y</h1> <br> MOST STAIRS CLIMBED <br> ${activityInfo.getHighestClimbingRecord(singleUser.id)}<br>
   <br> MINUTES ACTIVE <br> ${activityInfo.getMinActiveByDate(singleUser.id)}
   <br> <br> STEPS <br> ${activityInfo.getStepsToday(singleUser.id)}<br>
   <br>${activityInfo.reachStepGoal(singleUser.id)} <br><br>
   You trotted a whole ${activityInfo.getMilesWalked(singleUser.id)} miles today 💪
   `
}

function chartData() {
  const weeklyFluidConsumption = hydrationInfo.getFluidOuncesConsumedPerWeek(singleUser.id)
  const hydroKeys = Object.keys(weeklyFluidConsumption)
  const hydroValues = Object.values(weeklyFluidConsumption)
  const sleepyWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "hoursSlept")
  const sleepyKeys = Object.keys(sleepyWeek)
  const sleepyValues = Object.values(sleepyWeek)
  const qualityWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "sleepQuality")
  const qualityKeys = Object.keys(qualityWeek)
  const qualityValues = Object.values(qualityWeek)
  const weeklySteps = activityInfo.getStepsForWeek(singleUser.id)
  const stepKeys = Object.keys(weeklySteps)
  const stepValues = Object.values(weeklySteps)
  const weeklyStairs = activityInfo.getStairsForWeek(singleUser.id)
  const stairKeys = Object.keys(weeklyStairs)
  const stairValues = Object.values(weeklyStairs)
  const weeklyActivity = activityInfo.getActivityForWeek(singleUser.id)
  const activityKeys = Object.keys(weeklyActivity)
  const activityValues = Object.values(weeklyActivity)




  const displayStepsChart = new Chart(stepsChart, {
      type: 'doughnut',
      data: {
          labels: ['Daily User Step Goal', 'Users Avg Step Goal'],
          datasets: [{
              label: 'Steps',
              data: [user.dailyStepGoal, userRepository.getUserAverageStepGoal().toFixed(0)], //parameters referrenced
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {

          },
          responsive: true,
          maintainAspectRatio: true
        }
    })

  const displayHydrationChart = new Chart(hydrationChart, {
      type: 'bar',
      data: {
          labels: [hydroKeys[0], hydroKeys[1], hydroKeys[2], hydroKeys[3], hydroKeys[4], hydroKeys[5], hydroKeys[6]],
          datasets: [{
              label: 'Hydration (per ounce)',
              data: [hydroValues[0], hydroValues[1], hydroValues[2], hydroValues[3], hydroValues[4], hydroValues[5], hydroValues[6]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(153, 102, 255, 1)',
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
          responsive: true,
          // aspectRatio: 1,
          maintainAspectRatio: true// maintainAspectRatio: false
      }
  })

  const displaySleepChart = new Chart(sleepChart, {
      type: 'line',
      data: {
          labels: [sleepyKeys[0],sleepyKeys[1],sleepyKeys[2],sleepyKeys[3],sleepyKeys[4],sleepyKeys[5],sleepyKeys[6]],
          datasets: [{
              label: ['Hours Slept'],
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
            label: ['Quality of Sleep (0-5)'],
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
            responsive: true,
            // aspectRatio: 1,
            maintainAspectRatio: true
        }
      })
  const displayActivityChart = new Chart(activityChart, {
      type: 'line',
      data: {
          labels: [stepKeys[0],stepKeys[1],stepKeys[2],stepKeys[3],stepKeys[4],stepKeys[5],stepKeys[6]],
          datasets: [{
              label: ['Steps'],
              data: [stepValues[0], stepValues[1], stepValues[2], stepValues[3], stepValues[4], stepValues[5], stepValues[6]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                      'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          },
        //   {
        //     label: ['Flights of stairs'],
        //     data: [stairsValues[0], stairsValues[1], stairsValues[2], stairsValues[3], stairsValues[4], stairsValues[5], stairsValues[6]],
        //     backgroundColor: [
        //       'rgba(255, 159, 64, 0.2)'
        //     ],
        //     borderColor: [
        //         'rgba(255, 159, 64, 1)'
        //     ],
        //     borderWidth: 1
        //     }
        // },
        // {
        //   label: ['Minutes active'],
        //   data: [activityValues[0], activityValues[1], activityValues[2], activityValues[3], activityValues[4], activityValues[5], activityValues[6]],
        //   backgroundColor: [
        //     'rgba(255, 159, 64, 0.2)'
        //   ],
        //   borderColor: [
        //       'rgba(255, 159, 64, 1)'
        //   ],
        //   borderWidth: 1
        // },
      ]},
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
                // aspectRatio: 1,
            maintainAspectRatio: true
        }
      })
}

function getRandomId() {
    return Math.floor(Math.random() * 49) +1
}

function refreshingButton() {
    location.reload();
}
