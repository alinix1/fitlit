import { expect } from 'chai'
import User from '../src/User.js'
import { userData } from '../src/userData'

describe('User', () => {
    let user1, user2, user3

    beforeEach(() => {
        user1 = new User(userData[0])
        user2 = new User(userData[1])
        user3 = new User(userData[2])

    })

    it('should be a function', () => {
        expect(User).to.be.a('function')
    })

    it('should be an instance of User', () => {
        expect(user1).to.be.an.instanceof(User)
    })

    it('should have a user id', () => {
        expect(user1.id).to.be.finite
        expect(user1.id).to.equal(1)
    })

    it ('should be the correct number', () => {
        expect(user1.id).to.not.equal(2)
    })

    it('should have a user name', () => {
        expect(user1.name).to.be.a('string')
        expect(user1.name).to.equal('Luisa Hane')
    })

    it('should have a user address', () => {
        expect(user1.address).to.be.a('string')
        expect(user1.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697")
    })

    it('should have a user email', () => {
        expect(user1.email).to.be.a('string')
        expect(user1.email).to.equal("Diana.Hayes1@hotmail.com")
    })

    it('should have a user stride length', () => {
        expect(user1.strideLength).to.be.a('number')
        expect(user1.strideLength).to.equal(4.3)
    })

    it('should have a user daily step goal', () => {
        expect(user1.dailyStepGoal).to.be.a('number')
        expect(user1.dailyStepGoal).to.equal(10000)
    })

    it('should have access to a user friends', () => {
        expect(user1.friends).to.deep.equal([
            16,
            4,
            8
          ])
          expect(user1.friends).to.have.lengthOf(3)
    })

    it('should display only the first name', () => {
        expect(user1.userFirstName()).to.be.a('string')
        expect(user1.userFirstName()).equal('Luisa')
        expect(user1.userFirstName()).to.not.equal('Bob')
    })

    })
