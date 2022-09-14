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
}

export default Activity

