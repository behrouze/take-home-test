import { Drug, Pharmacy } from './pharmacy';

describe('Pharmacy general rules', () => {
  it('should decrease the benefit and expiresIn', () => {
    expect(new Pharmacy([new Drug('test', 2, 3)]).updateBenefitValue()).toEqual([
      new Drug('test', 1, 2)
    ]);
  });

  it('shoudl decrease twice as fast when expiresIn < 0', () => {
    expect(new Pharmacy([new Drug('test', -1, 3)]).updateBenefitValue()).toEqual([
      new Drug('test', -2, 1)
    ]);
  });

  it('should never have a Drug with negative value', () => {
    expect(new Pharmacy([new Drug('test', 2, 0)]).updateBenefitValue()).toEqual([
      new Drug('test', 1, 0)
    ]);
  });

  it('should never have a Benefit > 50', () => {
    expect(new Pharmacy([new Drug('Herbal Tea', 2, 50)]).updateBenefitValue()).toEqual([
      new Drug('Herbal Tea', 1, 50)
    ]);
  });
});

describe('Pharmacy of specifif products', () => {
  it('"Magic Pill" should never expires nor decreases in Benefit', () => {
    expect(new Pharmacy([new Drug('Magic Pill', 2, 3)]).updateBenefitValue()).toEqual([
      new Drug('Magic Pill', 2, 3)
    ]);
  });

  it('"Herbal Tea" should increase the Benefit by 1 the older it gets', () => {
    expect(new Pharmacy([new Drug('Herbal Tea', 2, 3)]).updateBenefitValue()).toEqual([
      new Drug('Herbal Tea', 1, 4)
    ]);
  });

  it('"Fervex" should increase the Benefit by 1 the older it gets: expire > 10 days', () => {
    expect(new Pharmacy([new Drug('Fervex', 11, 3)]).updateBenefitValue()).toEqual([
      new Drug('Fervex', 10, 4)
    ]);
  });

  it('"Fervex" should increase the Benefit by 2 the older it gets: 5 < expire <= 10 days', () => {
    expect(new Pharmacy([new Drug('Fervex', 10, 3)]).updateBenefitValue()).toEqual([
      new Drug('Fervex', 9, 5)
    ]);
  });

  it('"Fervex" should increase the Benefit by 3 the older it gets: expire <= 5 days', () => {
    expect(new Pharmacy([new Drug('Fervex', 5, 3)]).updateBenefitValue()).toEqual([
      new Drug('Fervex', 4, 6)
    ]);
  });

  it('"Fervex" should loose all Benefit if it expires', () => {
    expect(new Pharmacy([new Drug('Fervex', 0, 5)]).updateBenefitValue()).toEqual([
      new Drug('Fervex', -1, 0)
    ]);
  });
});
