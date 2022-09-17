let fetchData = (data) => {
    return fetch(data)
            .then(response => response.json())
            .catch(err => console.log(err))
}

const apiCalls = {
    getUserData: () => {
        return fetchData('http://localhost:3001/api/v1/users')
    },
    getSleepData: () => {
        return fetchData('http://localhost:3001/api/v1/sleep')
    },
    getHydrationData: () => {
        return fetchData('http://localhost:3001/api/v1/hydration')
    },
    getActivityData: () => {
      return fetchData('http://localhost:3001/api/v1/activity')
    }
}

const post = {
    postSleepData: () => {
        fetch('http://localhost:3001/api/v1/sleep', {
            method: 'POST',
            body: JSON.stringify({
                userID: 1,
                date: '2022/09/16',
                hoursSlept: 2,
                sleepQuality: 2.2
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log())
        .catch(error => console.log('you don fucked up!'))
    },
    postHydrationData: () => {
        fetch('http://localhost:3001/api/v1/hydration', {
            method: 'POST',
            body: JSON.stringify({
                userID: 1,
                date: '2022/09/16',
                numOunces: 88,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log())
        .catch(error => console.log('you don fucked up!'))
    },
    postActivityData: () => {
        fetch('http://localhost:3001/api/v1/activity', {
            method: 'POST',
            body: JSON.stringify({
                userID: 1,
                date: '2022/09/16',
                numSteps: 6851,
                minutesActive: 54,
                flightsOfStairs: 23
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log())
        .catch(err => console.log('watch out now!'))
    }
}

export default apiCalls
