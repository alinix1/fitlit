import { expect } from 'chai'
import UserRepository from '../src/UserRepository'
import User from '../src/User'
import { userData } from '../src/userData'

describe('User Repository', () => {
  let userRepository, user1, user2

  beforeEach(() => {
    user1 = new User(userData[0])
    user2 = new User(userData[1])
    userRepository = new UserRepository()
    userRepository.users.push(user1, user2)
  })

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function')
  })

  it('should be an instance of UserRepository', () => {
    expect(userRepository).to.be.an.instanceof(UserRepository)
  })

  it('should be able to occupy an array of users', () => {
    expect(userRepository.users).to.deep.equal([user1, user2])
    expect(userRepository.users.length).to.deep.equal(2)

  })

  it('should return user data via id', () => {
    expect(userRepository.getUserData(1)).to.equal(user1)
    expect(userRepository.getUserData(2)).to.equal(user2)

  })

  it('should return average step goals for all users', () => {
    expect(userRepository.getUserAverageStepGoal()).to.equal(7500)
  })

})
