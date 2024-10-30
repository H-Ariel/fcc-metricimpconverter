function ConvertHandler() {

  const unitMap = {
    'lbs': 'kg',
    'kg': 'lbs',
    'mi': 'km',
    'km': 'mi',
    'gal': 'L',
    'L': 'gal'
  };

  // round to 5 after point
  this.getFixedNumber = number => Number(number.toFixed(5));
  // fix to lower case (except L)
  this.getFixedUnit = initUnit => initUnit == 'l' || initUnit == 'L' ? 'L' : initUnit.toLowerCase();


  this.getNum = function (input) {
    // check for double fractions
    if ((input.match(/\//g) || []).length > 1)
      throw new Error('invalid number');

    // find numbers or fractions
    const result = input.match(/(?:\d*\.?\d+(?:\/\d*\.?\d+)?)/g);
    if (result) {
      const [num, denom] = result[0].split('/');
      let x = denom ? parseFloat(num) / parseFloat(denom) : parseFloat(num);
      return this.getFixedNumber(x);
    }
    return 1;
  };

  this.getUnit = function (input) {
    let result = input.match(/[a-zA-Z]+/);
    if (!result) // search for text
      throw new Error('invalid unit');

    let unit = this.getFixedUnit(result[0]);
    // check for valid unit
    if (!Object.keys(unitMap).includes(unit))
      throw new Error('invalid unit');

    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    let unit = this.getFixedUnit(initUnit);
    if (!unitMap.hasOwnProperty(unit))
      throw new Error('invalid unit');
    return unitMap[unit];
  };

  this.spellOutUnit = function (unit) {
    const unitSpell = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };

    if (!unitSpell.hasOwnProperty(unit))
      throw new Error('invalid unit');
    return unitSpell[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let returnNum;

    switch (initUnit) {
      case 'gal': returnNum = initNum * galToL; break;
      case 'L': returnNum = initNum / galToL; break;

      case 'lbs': returnNum = initNum * lbsToKg; break;
      case 'kg': returnNum = initNum / lbsToKg; break;

      case 'mi': returnNum = initNum * miToKm; break;
      case 'km': returnNum = initNum / miToKm; break;

      default: throw new Error('invalid unit: ' + initUnit);
    }

    return this.getFixedNumber(returnNum);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
