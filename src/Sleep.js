class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
  getUserById(id) {
    const userID = this.sleepData.filter(data => data.userID === id)
    return userID
  }
  calculateAverageSleep(id, hoursOrQuality) {
    const sleepById = this.getUserById(id)
    const avgSleep = sleepById.reduce((sum, data) => {
      sum += data[hoursOrQuality];
      return sum;
    }, 0) / sleepById.length;
    return Math.ceil(avgSleep)
  }
  getAllUsersAverageSleepQuality() {
    let totals = this.sleepData.reduce((sum, currentUser) => {
      sum += currentUser.sleepQuality;
      return sum;
    }, 0);
    let averageSleepQuality = totals / this.sleepData.length;
    return Math.ceil(averageSleepQuality)
  }
  getAverageSleepByDate(id, date, hoursOrQuality) {
    const sleepById = this.getUserById(id)
    const sleepByDate = sleepById.filter(data => data.date === date)
    .reduce((sum, currentUser) => {
      sum += currentUser[hoursOrQuality];
      return sum
    }, 0)
    return sleepByDate.toFixed(1);
  }

  getHourSleptAWeek(id, date, hours) {
    const sleepID = this.getUserById(id)
    const sleepWeek = sleepID.reduce((acc, userInfo) => {
      acc[userInfo.date] = userInfo.hoursSlept;
      return acc
    }, {})
    return sleepWeek
  }

  getSleepQualityAWeek(id) {
    const sleepID2 = this.getUserById(id)
    const sleepQualityWeek = sleepID2.reduce((acc, userInfo) => {
      acc[userInfo.date] = userInfo.sleepQuality;
      return acc
    }, {})
    return sleepQualityWeek 
  }

// think tot use toFixed(1) instead of Math.round
// data is structured like this: 6.1
}

export default Sleep;