import { expect } from 'chai'
import Activity from '../src/Activity.js'
import User from '../src/User.js'
import UserRepository from '../src/UserRepository.js'
import { userData, hydrationData, sleepData, activityData } from '../src/userData'

describe('Activity', () => {
  let activity, user;

    beforeEach(() => {
      activity = new Activity(activityData)
      user = new UserRepository(userData)
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

    it('should get minutes active for 7 days', () => {
      expect(activity.getActivityAvgWeek(1)).to.be.a('number')
      expect(activity.getActivityAvgWeek(1)).to.equal(130)

    })

    it('should show how many minutes were they active for a given day by their userID', () => {
      expect(activity.getMinActiveByDate(1)).to.be.a('number')
      expect(activity.getMinActiveByDate(1)).to.equal(140)
    })

   it('should show the highest number of flights of stairs a user climbed', () => {
     expect(activity.getHighestClimbingRecord(1)).to.be.a('number')
     expect(activity.getHighestClimbingRecord(1)).to.equal(45)

     expect(activity.getHighestClimbingRecord(2)).to.be.a('number')
     expect(activity.getHighestClimbingRecord(2)).to.equal(70)
   })

   it('should return true if they met or exceeded their step goal', () => {
     expect(activity.reachStepGoal(1, user, "2019/06/15")).to.equal(false)
     expect(activity.reachStepGoal(2, user, "2019/06/16")).to.equal(true)
   })

   it('should return the miles a user has walked based on their number of steps', () => {
     expect(activity.getMilesWalked(1, user)).to.be.a('number')
     expect(activity.getMilesWalked(1, user)).to.equal(6.5)
     expect(activity.getMilesWalked(2, user)).to.be.a('number')
     expect(activity.getMilesWalked(2, user)).to.equal(6.5)
   })

   it('should return the dates in which a user reached or exceeded their step goal', () => {
     expect(activity.reachStepGoalByDate(1, user, "2019/06/15")).to.deep.equal([])
     expect(activity.reachStepGoalByDate(2, user, "2019/06/16")).to.include('2019/06/16')
   })

   it('should return average active minutes by date', () => {
     expect(activity.getAverageActivityByDate("2019/06/15")).to.be.a('number')
     expect(activity.getAverageActivityByDate("2019/06/16")).to.be.a('number')

     expect(activity.getAverageActivityByDate("2019/06/15")).to.equal(131)
     expect(activity.getAverageActivityByDate("2019/06/16")).to.equal(120)
   })

   it('should return average steps by date', () => {
     expect(activity.getAverageStepsByDate("2019/06/15")).to.be.a('number')
     expect(activity.getAverageStepsByDate("2019/06/16")).to.be.a('number')

     expect(activity.getAverageStepsByDate("2019/06/15")).to.equal(5091)
     expect(activity.getAverageStepsByDate("2019/06/16")).to.equal(8468)
   })

   it('should return average stairs climbed by date', () => {
     expect(activity.getAverageStairsByDate("2019/06/15")).to.be.a('number')
     expect(activity.getAverageStairsByDate("2019/06/16")).to.be.a('number')

     expect(activity.getAverageStairsByDate("2019/06/15")).to.equal(20)
     expect(activity.getAverageStairsByDate("2019/06/16")).to.equal(55)
   })
})
