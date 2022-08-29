import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

describe('User Repository', () => {
  let userRepository, user1, user2;

  beforeEach(() => {
    user1 = new User(
    
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
    }),

    user2 = new User(
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
    })
    userRepository = new UserRepository();
    userRepository.users.push(user1, user2);
  })

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  // it('should return empty array if no data passed as a parameter', () => {
  //   expect(userRepository.users).empty([]);
  //   expect(userRepository.users.length).to.deep.equal(0)
  // });

  it('should be able to occupy an array of users', () => {
    expect(userRepository.users).to.deep.equal([user1, user2]);
    expect(userRepository.users.length).to.deep.equal(2);

  });

  it('should return user data via id', () => {
    expect(userRepository.getUserData(1)).to.equal(user1);
  });

  it('should return average step goals for all users', () => {
    expect(userRepository.getUserAverageStepGoal()).to.equal(7500)
  })

});