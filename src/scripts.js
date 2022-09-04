import './css/styles.css'
import './images/fitlit.png'
import UserRepository from './UserRepository'
import User from './User'
import Sleep from './Sleep'
import Hydration from './Hydration'
import Chart from 'chart.js/auto'
import apiCalls from './apiCalls'
import { userData } from './userData'
import { hydrationData } from './userData'
import { sleepData } from './userData'


// --------------------------------------------------- QUERY SELECTORS
const welcomeUserBox = document.getElementById('welcomeUserBox')
const userDataBox = document.getElementById('userDataBox')
const dailyBox = document.getElementById('dailyBox')
const activityChart = document.getElementById('activityChart')
const hydrationChart = document.getElementById('hydrationChart')
const sleepChart = document.getElementById('sleepChart')
const refreshButton = document.getElementById('refreshButton')



// --------------------------------------------------- GLOBAL VARIABLES
let userRepository = new UserRepository()
let user
let randomUser
let singleUser
let users = []
let hydrationInfo = []
let sleepInfo = []


// --------------------------------------------------- EVENT LISTENERS

window.addEventListener('load', instantiateData)
refreshButton.addEventListener('click', refreshingButton);

// --------------------------------------------------- FETCH PROMISES
Promise.all([apiCalls.getUserData(), apiCalls.getHydrationData(), apiCalls.getSleepData()])
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
  console.log(data)
  users = data.userData.map(user => new User(user))
  userRepository = new UserRepository(users)
  singleUser = new User(users[getRandomId()])
  hydrationInfo = new Hydration(data.hydrationData)
  sleepInfo = new Sleep(data.sleepData)
}

function displayUserData(id, date) {
  randomUser = getRandomId(singleUser.id)
  user = userRepository.users[randomUser]
  id = user.id
  date = user.date
}

function displayAllData() {
  const weeklyFluidConsumption = hydrationInfo.getFluidOuncesConsumedPerWeek(singleUser.id)
  const hydroKeys = Object.keys(weeklyFluidConsumption)
  const hydroValues = Object.values(weeklyFluidConsumption)
  const sleepyWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "hoursSlept")
  const sleepyKeys = Object.keys(sleepyWeek)
  const sleepyValues = Object.values(sleepyWeek)
  const qualityWeek = sleepInfo.getHourSleptAWeek(singleUser.id, "sleepQuality")
  const qualityKeys = Object.keys(qualityWeek)
  const qualityValues = Object.values(qualityWeek)

  welcomeUserBox.innerText = `Welcome  \n ${user.userFirstName()}!`
  userDataBox.innerText = `CURRENT USER \n ------- \n Name: ${user.name} \n Email: ${user.email} \n
  Address: ${user.address} \n Stride Length: ${user.strideLength} \n Daily Step Goal: ${user.dailyStepGoal}`
  dailyBox.innerText = `Daily Data: \n \n Hydration - ${hydrationInfo.getFluidOuncesByDate(singleUser.id)} ounces \n \n
   Hours Slept - ${sleepInfo.calculateAverageSleep(singleUser.id, "hoursSlept")} \n \n
   Sleep Quality - ${sleepInfo.calculateAverageSleep(singleUser.id, "sleepQuality")}`

  const displayActivityChart = new Chart(activityChart, {
      type: 'pie',
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
          maintainAspectRatio: false
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
          maintainAspectRatio: false
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
            maintainAspectRatio: false
        }
      })
}

function getRandomId() {
    return Math.floor(Math.random() * 49) +1
}

function refreshingButton() {
    location.reload();
}
