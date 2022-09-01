let fetchData = (data) => {
    return fetch(data)
            .then(response => response.json())
            .catch(err => console.log('ERROR!!!!'))
};

const apiCalls = {
    getUserData: () => {
        return fetchData('https://fitlit-api.herokuapp.com/api/v1/users')
    },
    getSleepData: () => {
        return fetchData('https://fitlit-api.herokuapp.com/api/v1/sleep')
    },
    getHydrationData: () => {
        return fetchData('https://fitlit-api.herokuapp.com/api/v1/hydration/')
    }
}

export default apiCalls
