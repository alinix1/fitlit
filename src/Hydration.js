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

  getFluidOuncesByDate(id) {
    const hydrationById = this.getUserById(id)
    const mapped = hydrationById.map(obj => obj.date).pop()
    const hydrationByDate = hydrationById.find(obj => obj.date === mapped)
    // const hydrationByDate = hydrationById.filter(data => data.date === date)
    // .reduce((sum, data) => {
    //   sum += data.numOunces;
    //   return sum;
    // }, 0)
    return hydrationByDate.numOunces;
  }

  getFluidOuncesConsumedPerWeek(id) {

    const hydrationById = this.getUserById(id).splice(0, 7)
    const perWeek = hydrationById.reduce((acc, userInfo) => {
       acc[userInfo.date] = userInfo.numOunces;
       return acc
     }, {})
     console.log('39', perWeek)
     return perWeek
  }
}
export default Hydration;
