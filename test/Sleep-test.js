import { expect } from 'chai'
import Sleep from '../src/Sleep.js'
import { sleepData } from '../src/userData'

describe('Sleep', () => {
    let sleep
    beforeEach(() => {
        sleep = new Sleep(sleepData)
    })

    it('should be a function', () => {
        expect(Sleep).to.be.a('function')
    })

    it('should be an instance of Sleep', () => {
        expect(sleep).to.be.an.instanceof(Sleep)
    })

    it('should have access to a user via an id', () => {
        expect(sleep.sleepData[0].userID).to.equal(1)

        expect(sleep.sleepData[0].userID).to.not.equal(5)
    })

    it('should have a date', () => {
        expect(sleep.sleepData[0].date).to.be.a('string')
        expect(sleep.sleepData[0].date).to.equal('2019/06/15')

        expect(sleep.sleepData[0].date).to.not.be.a('number')
        expect(sleep.sleepData[0].date).to.not.equal('2024/06/15')
    })

    it('should show how many hours slept for a user', () => {
        expect(sleep.sleepData[0].hoursSlept).to.be.a('number')
        expect(sleep.sleepData[0].hoursSlept).to.equal(6.1)

        expect(sleep.sleepData[0].hoursSlept).to.not.be.a('string')
        expect(sleep.sleepData[0].hoursSlept).to.not.equal(9.6)
    })

    it('should show sleep quality for a user', () => {
        expect(sleep.sleepData[0].sleepQuality).to.be.a('number')
        expect(sleep.sleepData[0].sleepQuality).to.equal(2.2)

        expect(sleep.sleepData[0].sleepQuality).to.not.be.a('string')
        expect(sleep.sleepData[0].sleepQuality).to.not.equal(2.5)
    })

    it('should calculate the average number of hours slept per day via an id', () => {
        expect(sleep.calculateAverageSleep(1, 'hoursSlept')).to.equal('8.1')

        expect(sleep.calculateAverageSleep(1, 'hoursSlept')).to.not.equal('6.9')
    })

    it('should calculate the average sleep quality per day over time', () => {
        expect(sleep.calculateAverageSleep(1, 'sleepQuality')).to.equal('2.6')
        
        expect(sleep.calculateAverageSleep(1, 'sleepQuality')).to.not.equal('5.6')
    })

    it('should calculate how many hours a user slept for a specific day', () => {
        sleep.getAverageSleepByDate()
        expect(sleep.getAverageSleepByDate(1, "2019/06/15", 'hoursSlept')).to.equal('6.1')

        expect(sleep.getAverageSleepByDate(1, "2019/06/15", 'hoursSlept')).to.not.equal('2.3')
    })

    it('should calculate sleep quality for a specific day', () => {
        sleep.getAverageSleepByDate()
        expect(sleep.getAverageSleepByDate(1, "2019/06/15", 'sleepQuality')).to.equal('2.2')

        expect(sleep.getAverageSleepByDate(1, "2019/06/15", 'sleepQuality')).to.not.equal('2.9')
    })

    it('should calculate average sleep quality for all users', () => {
        sleep.calculateAverageSleep()
        expect(sleep.calculateAverageSleep(1, "sleepQuality")).to.equal('2.6')
        
        expect(sleep.calculateAverageSleep(1, "sleepQuality")).to.not.equal('29.6')
    })

    it('should calculate average hours slept for all users', () => {
        sleep.calculateAverageSleep()
        expect(sleep.calculateAverageSleep(1, "hoursSlept")).to.equal('8.1')

        expect(sleep.calculateAverageSleep(1, "hoursSlept")).to.not.equal('3.1')
    })

    it('should calculate how many hours slept each day over the course of a given week', () => {
        const sleepHoursPerWeek = {
            "2019/06/15": 6.1,
            "2019/06/16": 4.1,
            "2019/06/17": 8,
            "2019/06/18": 10.4,
            "2019/06/19": 10.7,
            "2019/06/20": 9.3,
            "2019/06/21": 7.8
        }
        expect(sleep.getHourSleptAWeek(1, "hoursSlept", "2019/06/21")).to.deep.equal(sleepHoursPerWeek)

        expect(sleep.getHourSleptAWeek(1, "hoursSlept", "2019/06/21")).to.not.deep.equal({})
    })

    it('should calculate the sleep quality each day over the course of a given week', () => {
        const sleepQualityPerWeek = {
            "2019/06/15": 2.2,
            "2019/06/16": 3.8,
            "2019/06/17": 2.6,
            "2019/06/18": 3.1,
            "2019/06/19": 1.2,
            "2019/06/20": 1.2,
            "2019/06/21": 4.2
        }
        expect(sleep.getHourSleptAWeek(1,"sleepQuality", "2019/06/21")).to.deep.equal(sleepQualityPerWeek)

        expect(sleep.getHourSleptAWeek(1,"sleepQuality", "2019/06/21")).to.not.deep.equal({})
    })
})
