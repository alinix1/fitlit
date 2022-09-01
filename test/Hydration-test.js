import { expect } from 'chai';
import Hydration from '../src/Hydration.js';
import { userData, hydrationData, sleepData } from '../src/userData';

describe('Hydration', () => {
    let hydration1, hydration2, hydration3;

    beforeEach(() => {
        hydration1 = new Hydration(hydrationData[0]);
        hydration2 = new Hydration(hydrationData[1]);
        hydration3 = new Hydration(hydrationData[2]);

    })

    it('should be a function', () => {
        expect(Hydration).to.be.a('function');
    });

    it('should be an instance of Hydration', () => {
        expect(hydration1).to.be.an.instanceof(Hydration);
    });

    it('should have access to a user via an id', () => {
        expect(hydration1.userId).to.deep.equal(1);
        expect(hydration2.userId).to.deep.equal(2);
        expect(hydration3.userId).to.deep.equal(3);
    });

    it('should have a date', () => {
        expect(hydration1.date).to.be.a('string');
        expect(hydration1.date).to.equal("2019/06/15");
    });

    it('should have number of ounces', () => {
        expect(hydration1.ounces).to.be.a('number');
        expect(hydration1.ounces).to.equal(37);

        expect(hydration2.ounces).to.be.a('number');
        expect(hydration2.ounces).to.equal(75);

        expect(hydration3.ounces).to.be.a('number');
        expect(hydration3.ounces).to.equal(47);
    });

    it('should return average fluid ounces of a user via an id', () => {
        expect(hydration1.getAvgDailyFluidOunces(1)).to.equal(53);

        expect(hydration2.getAvgDailyFluidOunces(2)).to.equal(83);

        expect(hydration3.getAvgDailyFluidOunces(3)).to.equal(73);
    });

    it('should return total fluid ounces of a user given a specific date', () => {
        expect(hydration1.getFluidOuncesByDate("2019/06/15").to.equal(37))
    });

    it('should return all fluid ounces of a user for the most recent week', () => {
        const OuncesOneWeek1 = [
            {
              "2019/06/15": 37,
              "2019/06/16": 69,
              "2019/06/17": 69,
              "2019/06/18": 61,
              "2019/06/19": 91,
              "2019/06/20": 50,
              "2019/06/21": 50
            }
        ]

        expect(hydration1.getWeeklyFluidOunces("2019/06/21").to.deep.equal(OuncesOneWeek1));

        const OuncesOneWeek2 = [
            {
              "2019/06/15": 75,
              "2019/06/16": 91,
              "2019/06/17": 96,
              "2019/06/18": 70,
              "2019/06/19": 76,
              "2019/06/20": 71,
              "2019/06/21": 27
            }
        ]

        expect(hydration2.getWeeklyafaluidOunces("2019/06/21").to.deep.equal(OuncesOneWeek2));
    });
})

