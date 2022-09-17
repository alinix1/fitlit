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
}
function displayAllData() {
  chartData()
  console.log(activityInfo.getMilesWalked(singleUser.id));
  welcomeSideBar.innerHTML += `<h4 class="welcome-title">W E L C O M E</h4> <p class="welcome-name">${user.userFirstName()}</p>`
  userDataBox.innerHTML += `<h1 class='headers'>C U R R E N T  U S E R</h1> <p class="user-data-text">Name: ${user.name} <br><br> Email: ${user.email} <br><br>
  Address: ${user.address} <br><br> Stride Length: ${user.strideLength} <br><br> Daily Step Goal: ${user.dailyStepGoal}</p>`
  dailyBox.innerHTML += `<h1 class='headers'>D A I L Y D A T A</h1> <p class="daily-text">WATER CONSUMED<br> ${hydrationInfo.getFluidOuncesByDate(singleUser.id)}oz <br><br>
   HOURS SLEPT<br> ${sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")}hrs <br><br>
   SLEEP QUALITY<br> ${sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")}/5 <br><br> MINUTES ACTIVE <br> ${activityInfo.getMinActiveByDate(singleUser.id)}
   <br> <br> STEPS <br> ${activityInfo.getStepsToday(singleUser.id)}</p>`
  activityBox.innerHTML += `<h1 class='headers'>A C T I V I T Y</h1> <br> MOST STAIRS CLIMBED <br> ${activityInfo.getHighestClimbingRecord(singleUser.id)}<br>
  <img src=\"https://media3.giphy.com/media/xUPGcKoAYCn5fHK0Zq/giphy.gif"> <br>
  ${activityInfo.getMilesWalked(singleUser.id)}<br>${activityInfo.reachStepGoal(singleUser.id)}`
}

function getRandomId() {
    return Math.floor(Math.random() * 49) +1
}

function refreshingButton() {
    location.reload();
}
