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
const formBox = document.getElementById('formBox')
const submitBtn = document.getElementById('submitBtn')
const nameIp = document.getElementById('nameIp')
const sleepIp = document.getElementById('sleepIp')
const hydrationIp = document.getElementById('hydrationIp')
const activityIp = document.getElementById('activityIp')
const activityForm = document.getElementById('activityForm')
const sleepForm = document.getElementById('sleepForm')
const hydrationForm = document.getElementById('hydrationForm')
const formSection = document.getElementById('formSection')
const dropBtn = document.getElementById('dropBtn')
const hydrationTab = document.getElementById('hydrationTab')
const stepsTab = document.getElementById('stepsTab')
const sleepTab = document.getElementById('sleepTab')
const stairsTab = document.getElementById('stairsTab')
const minActiveTab = document.getElementById('minActiveTab')
const hydrationChartDiv = document.getElementById('hydrationChartDiv')
const stepsChartDiv = document.getElementById('stepsChartDiv')
const sleepChartDiv = document.getElementById('sleepChartDiv')
const stairsChartDiv = document.getElementById('stairsChartDiv')
const minActiveChartDiv = document.getElementById('minActiveChartDiv')
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
activityForm.addEventListener('click', displayActivityForm)
sleepForm.addEventListener('click',displaySleepForm)
hydrationForm.addEventListener('click',displayHydrationForm)
hydrationTab.addEventListener('click', showHydrationChart)
stepsTab.addEventListener('click', showStepsChart)
sleepTab.addEventListener('click', showSleepChart)
stairsTab.addEventListener('click', showStairsChart)
minActiveTab.addEventListener('click', showMinActiveChart)



// --------------------------------------------------- FETCH PROMISES
Promise.all([apiCalls.getUserData(), apiCalls.getHydrationData(), apiCalls.getSleepData(), apiCalls.getActivityData()])
  .then((data) => {
    const allUserData = data.reduce((userList, userItem) => {
      return userList = {...userList, ...userItem}
    }, {})
    instantiateData(allUserData)
    assignUser()
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

function displayAllData() {
  displayWelcomeData()
  displayCurrentUserData()
  displayUserData()
  displayActivityInfo()
  displayChartData()
}

function assignUser() {
  randomUser = getRandomId(singleUser.id)
  user = userRepository.users[randomUser]
}

function displayWelcomeData() {
  welcomeSideBar.innerHTML += `<h4 class="welcome-title">W E L C O M E</h4> <p class="welcome-name">${singleUser.userFirstName(singleUser.id)}</p>`
}

function displayCurrentUserData() {
  userDataBox.innerHTML += `<h1 class='headers'>C U R R E N T  U S E R</h1> <p class="user-data-text">Name: ${singleUser.name} <br><br> Email: ${singleUser.email} <br><br>
  Address: ${singleUser.address} <br><br> Stride Length: ${singleUser.strideLength} <br><br> Daily Step Goal: ${activityInfo.getUserStepGoal(singleUser.id)}</p>
  `
}

function displayUserData() {
  dailyBox.innerHTML += `<h1 class='headers' id="dailyData">D A I L Y D A T A</h1> <section class="daily-left" id="dailyBar">WATER CONSUMED<br> ${hydrationInfo.getFluidOuncesByDate(singleUser.id)}oz <br><br>
   HOURS SLEPT<br> ${sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")}hrs <br><br>
   SLEEP QUALITY<br> ${sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")}/5
   <br><br>AVERAGE USER STEPS<br>${activityInfo.getAverageStepsByDate()}<br><br>
   AVERAGE USER ACTIVE TIME<br>${activityInfo.getAverageActivityByDate()}<br><br>
   AVERAGE USER STAIRS<br>${activityInfo.getAverageStairsByDate()}<br><br>
   </section>

   `
}
function displayActivityInfo() {
   activityBox.innerHTML += `<h1 class='headers'>A C T I V I T Y</h1> <br> MOST STAIRS CLIMBED <br> ${activityInfo.getHighestClimbingRecord(singleUser.id)}<br>
   <br> MINUTES ACTIVE <br> ${activityInfo.getMinActiveByDate(singleUser.id)}
   <br> <br> STEPS <br> ${activityInfo.getStepsToday(singleUser.id)}<br>
   <br>${activityInfo.reachStepGoal(singleUser.id)} <br><br>
   You trotted a whole ${activityInfo.getMilesWalked(singleUser.id)} miles today 💪
   `}

function displayChartData() {
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
          aspectRatio: 1 | 4,
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
            aspectRatio: 1 | 4,
            maintainAspectRatio: true
        }
      })
  const displayStepsChart = new Chart(stepsChart, {
      type: 'bar',
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
            }, {
              label: ['All Users Average Steps'],
              data: [userRepository.getUserAverageStepGoal().toFixed(0), userRepository.getUserAverageStepGoal().toFixed(0), userRepository.getUserAverageStepGoal().toFixed(0), userRepository.getUserAverageStepGoal().toFixed(0), userRepository.getUserAverageStepGoal().toFixed(0), userRepository.getUserAverageStepGoal().toFixed(0), userRepository.getUserAverageStepGoal().toFixed(0)],
              backgroundColor: [
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }
        ]},
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
                aspectRatio: 1 | 4,
            maintainAspectRatio: true
        }
      })
  const displayStairsChart = new Chart(stairsChart, {
      type: 'line',
      data: {
          labels: [stairKeys[0], stairKeys[1], stairKeys[2], stairKeys[3], stairKeys[4], stairKeys[5], stairKeys[6]],
          datasets: [{
              label: 'Flights of Stairs',
              data: [stairValues[0], stairValues[1], stairValues[2], stairValues[3], stairValues[4], stairValues[5], stairValues[6]],
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
          aspectRatio: 1 | 4,
          maintainAspectRatio: true// maintainAspectRatio: false
      }
  })
  const displayMinActiveChart = new Chart(minActiveChart, {
      type: 'line',
      data: {
          labels: [activityKeys[0], activityKeys[1], activityKeys[2], activityKeys[3], activityKeys[4], activityKeys[5], activityKeys[6]],
          datasets: [{
              label: 'Activity Time(minutes)',
              data: [activityValues[0], activityValues[1], activityValues[2], activityValues[3], activityValues[4], activityValues[5], activityValues[6]],
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
          aspectRatio: 1 | 4,
          maintainAspectRatio: true// maintainAspectRatio: false
      }
  })
}

function getRandomId() {
    return Math.floor(Math.random() * 49) +1
}

function refreshingButton() {
    location.reload();
}

function displayActivityForm() {
  dropBtn.classList.add('hidden')
  hydrationForm.classList.add('hidden')
  sleepForm.classList.add('hidden')
    formSection.innerHTML += `<form name="dataForm" class="form-box" id="activityForm" action="" onsubmit="return validateForm()" method="post">
          Minutes Active <br><input type="text" name="fname" id="nameIp"><br>
          Flights Of Stairs <br><input type="text" name="fname" id="nameIp"><br>
          Steps <br><input type="text" name="fname" id="nameIp"><br>
        <input class="submit-button" id="submitBtn" type="submit" value="Send it!" disabled><br>`
}

function displayHydrationForm() {
    activityForm.classList.add('hidden')
    sleepForm.classList.add('hidden')
    formSection.innerHTML += `<form name="dataForm" class="form-box" id="hydrationForm" action="" onsubmit="return validateForm()" method="post">
          Water Drank(oz)<br><input type="text" name="fname" id="nameIp"><br>
        <input class="submit-button" id="submitBtn" type="submit" value="Send it!" disabled><br>`

}

function displaySleepForm() {
  hydrationForm.classList.add('hidden')
  activityForm.classList.add('hidden')
    formSection.innerHTML += `<form name="dataForm" class="form-box" id="sleepForm" action="" onsubmit="return validateForm()" method="post">
          Hours Slept<br><input type="text" name="fname" id="nameIp"><br>
          Sleep Quality(0-5)<br><input type="text" name="fname" id="nameIp"><br>
        <input class="submit-button" id="submitBtn" type="submit" value="Send it!" disabled><br>`

}

function hideAllCharts() {
  hide(stepsChartDiv)
  hide(sleepChartDiv)
  hide(stairsChartDiv)
  hide(minActiveChartDiv)
  hide(hydrationChartDiv)
}
function showHydrationChart() {
  hideAllCharts()
  show(hydrationChartDiv)
}
function showStepsChart() {
  hideAllCharts()
  show(stepsChartDiv)
}
function showSleepChart() {
  hideAllCharts()
  show(sleepChartDiv)
}

function showMinActiveChart() {
  hideAllCharts()
  show(minActiveChartDiv)
}

function showStairsChart() {
  hideAllCharts()
  show(stairsChartDiv)
}

function show(e) {
  e.removeAttribute('hidden')
}

function hide(item) {
  item.setAttribute('hidden', 'hidden')
}
