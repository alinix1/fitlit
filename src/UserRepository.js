class UserRepository {
 constructor(users) {
    this.users = users || [];

    }
    getUserData(id) {
        return this.users.find(user => user.id === id);
    }
    getUserAverageStepGoal() {
        let aveDailySteps = this.users.map(user => user.dailyStepGoal)
        let totals = aveDailySteps.reduce((sum, userGoal) => {
            return sum += userGoal;
        }, 0)
        return totals / this.users.length;
    }

}

export default UserRepository;
