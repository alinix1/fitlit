import { expect } from 'chai';
import Hydration from '../src/Hydration.js';
import { userData, hydrationData, sleepData } from '../src/userData';

describe('Hydration', () => {

    let hydration, hydration1, hydration2, hydration3;

    beforeEach(() => {


        hydration = new Hydration(hydrationData);

    })
    it('should be a function', () => {
        expect(Hydration).to.be.a('function');
    });

    it('should be an instance of Hydration', () => {

        expect(hydration).to.be.an.instanceof(Hydration);
    });

    it('should have access to a user via an id', () => {
        expect(hydration.hydrationData[0].userID).to.equal(1);
        expect(hydration.hydrationData[1].userID).to.equal(2);
        expect(hydration.hydrationData[2].userID).to.equal(3);
    });

    it('should have a date', () => {
        expect(hydration.hydrationData[0].date).to.be.a('string');
        expect(hydration.hydrationData[0].date).to.equal("2019/06/15");
    });

    it('should have number of ounces', () => {
        expect(hydration.hydrationData[0].numOunces).to.be.a('number');
        expect(hydration.hydrationData[0].numOunces).to.equal(37);

        expect(hydration.hydrationData[1].numOunces).to.be.a('number');
        expect(hydration.hydrationData[1].numOunces).to.equal(75);

        expect(hydration.hydrationData[2].numOunces).to.be.a('number');
        expect(hydration.hydrationData[2].numOunces).to.equal(47);
    });

    it('should return average fluid ounces of a user via an id', () => {
        expect(hydration.calculateAverageOunces(1)).to.equal(65);

        expect(hydration.calculateAverageOunces(2)).to.equal(72);

        expect(hydration.calculateAverageOunces(3)).to.equal(56);
    });

    it('should return total fluid ounces of a user given a specific date', () => {
        expect(hydration.getFluidOuncesByDate(1, "2019/06/15")).to.equal(37)
        expect(hydration.getFluidOuncesByDate(2, "2019/06/15")).to.equal(75)
    });

    it('should return all fluid ounces of a user for the most recent week', () => {
        const OuncesOneWeek1 = {
              "2019/06/15": 37,
              "2019/06/16": 69,
              "2019/06/17": 96,
              "2019/06/18": 61,
              "2019/06/19": 91,
              "2019/06/20": 50,
              "2019/06/21": 50
            }



        expect(hydration.getFluidOuncesConsumedPerWeek(1, "2019/06/21", 50)).to.deep.equal(OuncesOneWeek1);

        const OuncesOneWeek2 = {

              "2019/06/15": 75,
              "2019/06/16": 91,
              "2019/06/17": 96,
              "2019/06/18": 70,
              "2019/06/19": 76,
              "2019/06/20": 71,
              "2019/06/21": 27
            }



        expect(hydration.getFluidOuncesConsumedPerWeek(2, "2019/06/21", 27)).to.deep.equal(OuncesOneWeek2);
    });
})
