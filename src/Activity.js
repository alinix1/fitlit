import { DatasetController } from "chart.js";

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
         const getDate = activityById.map(userData => userData.date).pop()
         const activityByDate = activityById.find(userData => userData.date === getDate)
         return activityByDate.minutesActive
      
        }

        getAverageActivityByDate(id, date) {
          const activityById = this.getUserById(id)
          const avgActivity = activityById.filter(date => data.date === date)
          .reduce((acc, data) => {
            acc += data.minutesActive
            return acc
          }, 0) / activityById.length 
          return avgActivity.toFixed(0)
        }

        getAverageStepsByDate(id, date) {
          const activityById = this.getUserById(id)
          const avgActivity = activityById.filter(date => data.date === date)
          .reduce((acc, data) => {
            acc += data.numSteps
            return acc
          }, 0) / activityById.length 
          return avgActivity.toFixed(0)
        }

        getAverageStairsByDate(id, date) {
          const activityById = this.getUserById(id)
          const avgActivity = activityById.filter(date => data.date === date)
          .reduce((acc, data) => {
            acc += data.flightsOfStairs
            return acc
          }, 0) / activityById.length 
          return avgActivity.toFixed(0)
        }

        getActivityAvgWeek(id) {
          const activityById = this.getUserById(id).splice(0, 7)
          const activeWeek = activityById.reduce((acc, currentUser) => {
            acc[currentUser.date] = currentUser.minutesActive
            return acc
          }, {})
          // }, {}) // need the average // return a num instead of an object?
          return activeWeek
        }
      }

export default Activity

// way to DRY up the above averages for all users - mins active, steps, stairs
// similar to hours slept and quality of sleep methods 

