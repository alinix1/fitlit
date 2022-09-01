class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getUserById(id) {
    const userID = this.hydrationData.filter(data => data.userID === id)
    return userID
  }

  calculateAverageOunces(id) {
    const hydrationById = this.getUserById(id)
    const aveHydration = hydrationById.reduce((sum, data) => {
      sum += data.numOunces;
      return sum;
    }, 0) / hydrationById.length;
    return Math.round(aveHydration)
  }

  getFluidOuncesByDate(id, date) {
    const hydrationById = this.getUserById(id)
    const hydrationByDate = hydrationById.filter(data => data.date === date)
    .reduce((sum, data) => {
      sum += data.numOunces;
      return sum;
    }, 0)
    return Math.round(hydrationByDate)
  }

  getFluidOuncesConsumedPerWeek(id, date, ounces) {
    const hydrationById = this.getUserById(id)
    const perWeek = hydrationById.reduce((acc, userInfo) => {
       acc[userInfo.date] = userInfo.numOunces;
       return acc
     }, {})
     return perWeek
  }
}

export default Hydration;
