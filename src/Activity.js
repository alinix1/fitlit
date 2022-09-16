// import { DatasetController } from "chart.js";

class Activity {
    constructor(activityData) {
        this.activityData = activityData;

    }

    getUserById(id) {
        const userID = this.activityData.filter(data => data.userID === id)
        return userID
    }

     getHighestClimbingRecord(id) {
        const activityById = this.getUserById(id)
        let reduced = Object.keys(activityById).reduce((acc, currentRecord) => {
            if (acc < activityById[currentRecord].flightsOfStairs) {
                acc = activityById[currentRecord].flightsOfStairs
            }
            return acc
        }, 0)
        return reduced
      }

      getMinActiveByDate(id) {
        const activityById = this.getUserById(id)
        const getDate = activityById.map(activity => activity.date).shift()
        const activityByDate = activityById.find(activity => activity.date === getDate)
        return activityByDate.minutesActive
      }

        getAverageActivityByDate(date) {
          const byDate = this.activityData.filter(user => user.date === date);
          const avgActivity = byDate.reduce((acc, user) => {
            acc += user.minutesActive;
            return acc;
          }, 0) / byDate.length
          console.log(Math.round(avgActivity))
          return Math.round(avgActivity)
        }

        getAverageStepsByDate(date) {
          const byDate = this.activityData.filter(user => user.date === date);
          const avgSteps = byDate.reduce((acc, user) => {
            acc += user.numSteps;
            return acc;
          }, 0) / byDate.length
          return Math.round(avgSteps)
        }

        getAverageStairsByDate(date) {
          const byDate = this.activityData.filter(user => user.date === date);
          const avgStairs = byDate.reduce((acc, user) => {
            acc += user.flightsOfStairs;
            return acc;
          }, 0) / byDate.length
          return Math.round(avgStairs)
        }

        getMilesWalked(id, user, date) {
          const keys = Object.keys(user)
          const activityById = this.getUserById(id)
          const milesWalked = activityById.reduce((acc, currentUser) => {
            user[keys].filter(use => {
              if(currentUser.userID === use.id) {
                acc = (use.strideLength * currentUser.numSteps) / 5280
              }
            })
            return acc;
          }, 0)
          console.log(Math.round(milesWalked*2)/2)
          return Math.round(milesWalked*2)/2;
        }

        reachStepGoal(id, user, date) {
          const keys = Object.keys(user)
          const activityById = this.getUserById(id)
          const compareSteps = activityById.reduce((acc, currentUser) => {
            let newUser = user[keys].filter(use => {
              if(currentUser.userID === use.id) {
                if (currentUser.numSteps >= use.dailyStepGoal) {
                  acc = true
                } else {
                  acc = false
                }
              }
            })
            return acc
          })
          return compareSteps
        }

        reachStepGoalByDate(id, user, date) {
          const keys = Object.keys(user)
          const activityById = this.getUserById(id)
          const compareSteps = activityById.reduce((acc, currentUser) => {
            let newUser = user[keys].filter(use => {
              if(currentUser.userID === use.id && date === currentUser.date) {
                if (currentUser.numSteps >= use.dailyStepGoal) {
                  acc.push(currentUser.date);
                }
              }
            })
            return acc
          }, [])
          console.log(compareSteps)
          return compareSteps
        }

        getActivityAvgWeek(id) {
          const activityById = this.getUserById(id).splice(0, 7)
          const activeWeek = activityById.reduce((acc, currentUser) => {
            acc += currentUser.minutesActive
            return acc
          }, 0) / activityById.length
          return activeWeek
        }
      }

export default Activity
