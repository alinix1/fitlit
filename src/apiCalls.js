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

export default apiCalls
