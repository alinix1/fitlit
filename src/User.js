class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.address = userData.address;
        this.email = userData.email;
        this.strideLength = userData.strideLength;
        this.dailyStepGoal = userData.dailyStepGoal;
        this.friends = userData.friends;
        this.totalSteps = 0;
        this.ouncesRecord = [];
        this.ouncesAverage = 0;

    }
    userFirstName() {
        const firstName = this.name.split(' ');
        return firstName[0];

    }

    // updateUserHydration(date, amount) {
    //     this.ouncesRecord.unshift({[date]: amount});
    //     if (this.ouncesRecord.length) {
    //       this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesTotal.length);
    //     } else {
    //       this.ouncesAverage = amount;
    //     }
    // }

    // addOuncesDaily(date) {
    //   return this.ouncesRecord.reduce((acc, record) => {
    //     let amount = record[date];
    //     if(amount) {
    //       acc += amount
    //     }
    //     return acc;
    //   }, 0)
    // }

};

export default User;
