import { expect } from 'chai'
import Activity from '../src/Activity.js'
import { userData, hydrationData, sleepData, activityData } from '../src/userData'

describe('Activity', () => {
  let activity;

    beforeEach(() => {
      activity = new Activity(activityData)
    })

    it('should be a function', () => {
        expect(Activity).to.be.a('function')
    })

    it('should be an instance of Activity', () => {
      expect(activity).to.be.an.instanceof(Activity)
    })

    it('should have access to a user via an id', () => {
        expect(activity.activityData[0].userID).to.equal(1)
        expect(activity.activityData[1].userID).to.equal(2)
        expect(activity.activityData[2].userID).to.equal(3)
    })

    it('should have a date', () => {
        expect(activity.activityData[0].date).to.be.a('string')
        expect(activity.activityData[0].date).to.equal("2019/06/15")
    })

    it('should have number of steps', () => {
        expect(activity.activityData[0].numSteps).to.be.a('number')
        expect(activity.activityData[0].numSteps).to.equal(3577)

        expect(activity.activityData[1].numSteps).to.be.a('number')
        expect(activity.activityData[1].numSteps).to.equal(4294)

        expect(activity.activityData[2].numSteps).to.be.a('number')
        expect(activity.activityData[2].numSteps).to.equal(7402)
    })

    it('should have minutes active', () => {
        expect(activity.activityData[0].minutesActive).to.be.a('number')
        expect(activity.activityData[0].minutesActive).to.equal(140)

        expect(activity.activityData[1].minutesActive).to.be.a('number')
        expect(activity.activityData[1].minutesActive).to.equal(138)

        expect(activity.activityData[2].minutesActive).to.be.a('number')
        expect(activity.activityData[2].minutesActive).to.equal(114)
    })

    it('should have flights of stairs', () => {
        expect(activity.activityData[0].flightsOfStairs).to.be.a('number')
        expect(activity.activityData[0].flightsOfStairs).to.equal(16)

        expect(activity.activityData[1].flightsOfStairs).to.be.a('number')
        expect(activity.activityData[1].flightsOfStairs).to.equal(10)

        expect(activity.activityData[2].flightsOfStairs).to.be.a('number')
        expect(activity.activityData[2].flightsOfStairs).to.equal(33)
    })

})