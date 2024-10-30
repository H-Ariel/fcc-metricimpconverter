'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const { input } = req.query;

    let initNum, initUnit;
    let isValidNum = true, isValidUnit = true;

    try { initNum = convertHandler.getNum(input); }
    catch (err) { isValidNum = false; }
    try { initUnit = convertHandler.getUnit(input); }
    catch (err) { isValidUnit = false; }

    if (!isValidNum && !isValidUnit)
      res.send('invalid number and unit');
    else if (!isValidNum)
      res.send('invalid number');
    else if (!isValidUnit)
      res.send('invalid unit');
    else {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });
    }
  });
};
