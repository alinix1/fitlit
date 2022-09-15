class UserRepository {
 constructor(users) {
    this.users = users || []

    }
    getUserData(id) {
        if (id === undefined) {
            return "Invalid user id"
        } else {
            return this.users.find(user => user.id === id)
        }
    }
    getUserAverageStepGoal() {
        let aveDailySteps = this.users.map(user => user.dailyStepGoal)
        let totals = aveDailySteps.reduce((sum, userGoal) => {
            return sum += userGoal
        }, 0)
        return totals / this.users.length
    }

    getDailyStepGoal(id) {
        return this.users.filter(user => user.dailyStepGoal)
    }

}

export default UserRepository
