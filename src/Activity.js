class Activity {
    constructor(activityData, currentUser) {
        this.activityData = activityData
        this.currentUser = currentUser

    }

    getUserById() {
        const userID = this.activityData.filter(data => data.userID === this.currentUser.id)
        return userID
    }

    getStepsToday(id, date) {
      const activityById = this.getUserById()
      const getDate = activityById.find(user => user.date)
      return getDate.numSteps
    }

    getUserStepGoal(id) {
      return this.currentUser.dailyStepGoal
    }

    getUserStrideLength(id) {
      return this.currentUser.strideLength
    }

     getHighestClimbingRecord(id) {
        const activityById = this.getUserById()
        let reduced = Object.keys(activityById).reduce((acc, currentRecord) => {
            if (acc < activityById[currentRecord].flightsOfStairs) {
                acc = activityById[currentRecord].flightsOfStairs
            }
            return acc
        }, 0)
        return reduced
      }

      getMinActiveByDate(id) {
        const activityById = this.getUserById()
        const getDate = activityById.find(user => user.date)
        return getDate.minutesActive;
      }

        getAverageActivityByDate() {
          const getDate = this.activityData.filter(user => user.date)
          let totals = getDate.reduce((sum, user) => {
              return sum += user.minutesActive
          }, 0)
          return Math.round(totals / getDate.length)
        }

        getAverageStepsByDate() {
          const getDate = this.activityData.filter(user => user.date)
          const totals = getDate.reduce((sum, user) => {
              return sum += user.numSteps
          }, 0)
          return Math.round(totals / getDate.length)
        }

        getAverageStairsByDate() {
          const getDate = this.activityData.filter(user => user.date)
          const totals = getDate.reduce((sum, user) => {
              return sum += user.flightsOfStairs
          }, 0)
          return Math.round(totals / getDate.length)
        }

        getMilesWalked(id) {
          const activityById = this.getUserById()
          const getDate = activityById.find(user => user.date)
          const milesWalked = (getDate.numSteps * this.currentUser.strideLength) / 5280;
          return Math.round(milesWalked*2)/2
        }

        reachStepGoal(id, date) {
          let message = '';
          const byDate = this.activityData.filter(user => user.date === date);
          const activityById = this.getUserById();
          const checkSteps = activityById.find(user => {
            let remainingSteps = this.getUserStepGoal() - this.getStepsToday();
            if(this.getStepsToday() >= this.getUserStepGoal()) {
              message = 'You have reached your step goal today!'
            } else {
              message = `You are ${remainingSteps} steps away from your step goal! Keep it up`
            }
          })
          return message
        }

        getStepsForWeek(id) {
          const activityById = this.getUserById().splice(0, 7)
          const stepsWeek = activityById.reduce((acc, currentUser) => {
            acc[currentUser.date] = currentUser.numSteps
            return acc
          }, {})
          return stepsWeek
        }

        getStairsForWeek(id) {
          const activityById = this.getUserById().splice(0, 7)
          const stairsWeek = activityById.reduce((acc, currentUser) => {
            acc[currentUser.date] = currentUser.flightsOfStairs
            return acc
          }, {})
          return stairsWeek
        }


        getActivityForWeek(id) {
          const activityById = this.getUserById().splice(0, 7)
          const activeWeek = activityById.reduce((acc, currentUser) => {
            acc[currentUser.date] = currentUser.minutesActive
            return acc
          }, {})
          return activeWeek
        }

        getActivityAvgWeek(id) {
          const activityById = this.getUserById().splice(0, 7)
          const avgActiveWeek = activityById.reduce((acc, currentUser) => {
            acc += currentUser.minutesActive
            return acc
          }, 0)
          return avgActiveWeek
        }
      }

export default Activity
