import { expect } from 'chai'
import Activity from '../src/Activity.js'
import User from '../src/User.js'
import UserRepository from '../src/UserRepository.js'
import { userData, activityData } from '../src/userData'

describe('Activity', () => {
  let activity1, activity2, user1, user2;

    beforeEach(() => {
      user1 = new User(userData[0])
      user2 = new User(userData[1])

      activity1 = new Activity(activityData, user1)
      activity2 = new Activity(activityData, user2)

    })

    it('should be a function', () => {
      expect(Activity).to.be.a('function')
    })

    it('should be an instance of Activity', () => {
      expect(activity1).to.be.an.instanceof(Activity)
      expect(activity2).to.be.an.instanceof(Activity)
    })

    it('should have access to a user via an id', () => {
      expect(activity1.activityData[0].userID).to.equal(1)
      expect(activity1.activityData[1].userID).to.equal(2)
    })

    it('should have a date', () => {
      expect(activity1.activityData[0].date).to.be.a('string')
      expect(activity1.activityData[1].date).to.equal("2019/06/15")
    })

    it('should have number of steps', () => {
      expect(activity1.activityData[0].numSteps).to.be.a('number')
      expect(activity1.activityData[0].numSteps).to.equal(3577)

      expect(activity2.activityData[1].numSteps).to.be.a('number')
      expect(activity2.activityData[1].numSteps).to.equal(4294)

    })

    it('should have minutes active', () => {
        expect(activity1.activityData[0].minutesActive).to.be.a('number')
        expect(activity1.activityData[0].minutesActive).to.equal(140)

        expect(activity2.activityData[1].minutesActive).to.be.a('number')
        expect(activity2.activityData[1].minutesActive).to.equal(138)

    })

    it('should have flights of stairs', () => {
        expect(activity1.activityData[0].flightsOfStairs).to.be.a('number')
        expect(activity1.activityData[0].flightsOfStairs).to.equal(16)

        expect(activity2.activityData[1].flightsOfStairs).to.be.a('number')
        expect(activity2.activityData[1].flightsOfStairs).to.equal(10)

    })

    it('should get minutes active for 7 days', () => {
      expect(activity1.getActivityAvgWeek(1)).to.be.a('number')
      expect(activity1.getActivityAvgWeek(1)).to.equal(260)

    })

    it('should show how many minutes were they active for a given day by their userID', () => {
      expect(activity1.getMinActiveByDate(1)).to.be.a('number')
      expect(activity1.getMinActiveByDate(1)).to.equal(140)
   })

   it('should show the highest number of flights of stairs a user climbed', () => {
     expect(activity1.getHighestClimbingRecord(1)).to.be.a('number')
     expect(activity1.getHighestClimbingRecord(1)).to.equal(45)

     expect(activity2.getHighestClimbingRecord(2)).to.be.a('number')
     expect(activity2.getHighestClimbingRecord(2)).to.equal(70)
   })

   it('should return a string if they meet or exceeded their step goal', () => {
     expect(activity1.reachStepGoal(1, "2019/06/15")).to.be.a('string')
     expect(activity1.reachStepGoal(2, "2019/06/16")).to.be.a('string')

     expect(activity1.reachStepGoal(1, "2019/06/15")).to.equal(`You are 6423 steps away from your step goal! Keep it up`)
     expect(activity1.reachStepGoal(2, "2019/06/16")).to.equal(`You are 6423 steps away from your step goal! Keep it up`)
   })

   it('should return the miles a user has walked based on their number of steps', () => {
     expect(activity1.getMilesWalked(1)).to.be.a('number')
     expect(activity1.getMilesWalked(1)).to.equal(3)
     expect(activity1.getMilesWalked(2)).to.be.a('number')
     expect(activity1.getMilesWalked(2)).to.equal(3)
   })

   // it('should return the dates in which a user reached or exceeded their step goal', () => {
   //   expect(activity1.reachStepGoalByDate(1, "2019/06/15")).to.deep.equal([])
   //   expect(activity1.reachStepGoalByDate(2, "2019/06/16")).to.include('2019/06/16')
   // })

   it('should return average active minutes by date', () => {
     expect(activity1.getAverageActivityByDate("2019/06/15")).to.be.a('number')
     expect(activity2.getAverageActivityByDate("2019/06/15")).to.be.a('number')

     expect(activity1.getAverageActivityByDate("2019/06/15")).to.equal(125)
     expect(activity2.getAverageActivityByDate("2019/06/15")).to.equal(125)
   })

   it('should return average steps by date', () => {
     expect(activity1.getAverageStepsByDate("2019/06/15")).to.be.a('number')
     expect(activity2.getAverageStepsByDate("2019/06/15")).to.be.a('number')

     expect(activity1.getAverageStepsByDate("2019/06/15")).to.equal(6780)
     expect(activity2.getAverageStepsByDate("2019/06/15")).to.equal(6780)
   })

   it('should return average stairs climbed by date', () => {
     expect(activity1.getAverageStairsByDate("2019/06/15")).to.be.a('number')
     expect(activity2.getAverageStairsByDate("2019/06/15")).to.be.a('number')

     expect(activity1.getAverageStairsByDate("2019/06/15")).to.equal(37)
     expect(activity2.getAverageStairsByDate("2019/06/15")).to.equal(37)
   })

   it('should return the steps on that day', () => {
     expect(activity1.getStepsToday(1, "2019/06/15"))
   })
})
