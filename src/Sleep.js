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
    return avgSleep.toFixed(1);
  }

  getUserSleepOrHours(id, hoursOrQuality) {
    let totals = this.sleepData.reduce((sum, currentUser) => {
      sum += currentUser[hoursOrQuality];
      return sum;
    }, 0);
    let averageSleepQuality = totals / this.sleepData.length;
    return averageSleepQuality.toFixed(1);
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

  getHourSleptAWeek(id, hoursOrQuality) {
    const sleepID = this.getUserById(id).splice(0, 7);
    const sleepWeek = sleepID.reduce((acc, userInfo) => {
      acc[userInfo.date] = userInfo[hoursOrQuality];
      return acc
    }, {})
    return sleepWeek
  }
  


}

export default Sleep;