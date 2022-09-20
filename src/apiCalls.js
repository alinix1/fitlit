let fetchData = (data) => {
    return fetch(data)
    .then(response => response.json())
    .catch(err => console.log(err))
}


const postData = (url, dataToSend) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => console.log('50',data))
    // .catch(error => alert('🔥ERROR🔥'))
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
    },
    addSleepData: (sleepData) => {
        console.log('label',postData('http://localhost:3001/api/v1/sleep', sleepData))
        return postData('http://localhost:3001/api/v1/sleep', sleepData)
        

    }
}

    // const postAllData = {
    //     postSleepData: (data) => {
    //         return postData('http://localhost:3001/api/v1/sleep', data)
    //     }
        // getSleepData: () => {
        //     return fetchData('http://localhost:3001/api/v1/sleep')
        // },
        // getHydrationData: () => {
        //     return fetchData('http://localhost:3001/api/v1/hydration')
        // },
        // getActivityData: () => {
        //   return fetchData('http://localhost:3001/api/v1/activity')
        // }
    
    // postSleepData: (dataToSend) => {
    //     fetch('http://localhost:3001/api/v1/hydration', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(dataToSend)
    //     })
    //     .then(response => {response.json()})
    //     .catch(error => alert('🔥ERROR🔥'))
    // },
    // postActivityData: (dataToSend) => {
    //     fetch('http://localhost:3001/api/v1/activity', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(dataToSend)
    //     })
    //     .then(response => {response.json()})
    //     .catch(err => alert('🔥ERROR🔥'))
    // }


export { apiCalls }


