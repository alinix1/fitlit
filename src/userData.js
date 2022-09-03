const userData = [
    {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    },
    {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    },
    {
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [
        19,
        11,
        42,
        33
      ]
    }
];

const hydrationData = [
  //1
  {
    "userID": 1,
    "date": "2019/06/15",
    "numOunces": 37
  },
  {
    "userID": 2,
    "date": "2019/06/15",
    "numOunces": 75
  },
  {
    "userID": 3,
    "date": "2019/06/15",
    "numOunces": 47
  },
  //2

  //3
  {
    "userID": 1,
    "date": "2019/06/16",
    "numOunces": 69
  },
  {
    "userID": 2,
    "date": "2019/06/16",
    "numOunces": 91
  },
  {
    "userID": 3,
    "date": "2019/06/16",
    "numOunces": 99
  },
  //4
  {
    "userID": 1,
    "date": "2019/06/17",
    "numOunces": 96
  },
  {
    "userID": 2,
    "date": "2019/06/17",
    "numOunces": 96
  },
  {
    "userID": 3,
    "date": "2019/06/17",
    "numOunces": 28
  },
  //5
  {
    "userID": 1,
    "date": "2019/06/18",
    "numOunces": 61
  },
  {
    "userID": 2,
    "date": "2019/06/18",
    "numOunces": 70
  },
  {
  "userID": 3,
  "date": "2019/06/18",
  "numOunces": 40
  },
  //6
  {
    "userID": 1,
    "date": "2019/06/19",
    "numOunces": 91
  },
  {
    "userID": 2,
    "date": "2019/06/19",
    "numOunces": 76
  },
  {
    "userID": 3,
    "date": "2019/06/19",
    "numOunces": 85
  },
  //7
  {
    "userID": 1,
    "date": "2019/06/20",
    "numOunces": 50
  },
  {
    "userID": 2,
    "date": "2019/06/20",
    "numOunces": 71
  },
  {
    "userID": 3,
    "date": "2019/06/20",
    "numOunces": 51
  },
  {
    "userID": 1,
    "date": "2019/06/21",
    "numOunces": 50
  },
  {
    "userID": 2,
    "date": "2019/06/21",
    "numOunces": 27
  },
  {
    "userID": 3,
    "date": "2019/06/21",
    "numOunces": 41

  },

]

const sleepData = [
  //1
  {
    "userID": 1,
    "date": "2019/06/15",
    "hoursSlept": 6.1,
    "sleepQuality": 2.2
  },
  {
    "userID": 2,
    "date": "2019/06/15",
    "hoursSlept": 7,
    "sleepQuality": 4.7
  },
  {
    "userID": 3,
    "date": "2019/06/15",
    "hoursSlept": 10.8,
    "sleepQuality": 4.7
  },
//2
  {
    "userID":1,
    "date":"2019/06/16",
    "hoursSlept":4.1,
    "sleepQuality":3.8
  },
  {
    "userID":2,
    "date":"2019/06/16",
    "hoursSlept":7.5,
    "sleepQuality":3.8
  },
  {
    "userID":3,
    "date":"2019/06/16",
    "hoursSlept":10.7,
    "sleepQuality":3.4
  },
//3
  {
    "userID":1,
    "date":"2019/06/17",
    "hoursSlept":8,
    "sleepQuality":2.6
  },
  {
    "userID":2,
    "date":"2019/06/17",
    "hoursSlept":5.7,
    "sleepQuality":3
  },
  {
    "userID":3,
    "date":"2019/06/17",
    "hoursSlept":5.3,
    "sleepQuality":4.9
  },
//4
  {
    "userID":1,
    "date":"2019/06/18",
    "hoursSlept":10.4,
    "sleepQuality":3.1
  },
  {
    "userID":2,
    "date":"2019/06/18",
    "hoursSlept":10.8,
    "sleepQuality":3.2
  },
  {
    "userID":3,
    "date":"2019/06/18",
    "hoursSlept":9.8,
    "sleepQuality":2.6
  },
//5
  {
    "userID":1,
    "date":"2019/06/19",
    "hoursSlept":10.7,
    "sleepQuality":1.2
  },
  {
    "userID":2,
    "date":"2019/06/19",
    "hoursSlept":9.6,
    "sleepQuality":2.5
  },
  {
    "userID":3,
    "date":"2019/06/19",
    "hoursSlept":7.2,
    "sleepQuality":3.4
  },
//6
  {
    "userID":1,
    "date":"2019/06/20",
    "hoursSlept":9.3,
    "sleepQuality":1.2
  },
  {
    "userID":2,
    "date":"2019/06/20",
    "hoursSlept":10.1,
    "sleepQuality":2.4
  },
  {
    "userID":3,
    "date":"2019/06/20",
    "hoursSlept":9.4,
    "sleepQuality":1.2
  },
  //7
  {
    "userID":1,
    "date":"2019/06/21",
    "hoursSlept":7.8,
    "sleepQuality":4.2
  },
  {
    "userID":2,
    "date":"2019/06/21",
    "hoursSlept":4.3,
    "sleepQuality":4.8
  },
  {
    "userID":3,
    "date":"2019/06/21",
    "hoursSlept":8.9,
    "sleepQuality":3.7
  }
]


module.exports = { userData, hydrationData, sleepData };
