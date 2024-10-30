const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('read a whole number input', function () {
        assert.equal(convertHandler.getNum('123km'), 123);
    });

    test('read a decimal number input', function () {
        assert.equal(convertHandler.getNum('12.3km'), 12.3);
    });

    test('read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2km'), 1 / 2);
    });

    test('read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('1.5/2.5km'), 1.5 / 2.5);
    });

    test('return an error on a double-fraction', function () {
        assert.throws(() => convertHandler.getNum('3/2/3km'), 'invalid number');
    });

    test('default to a numerical input of 1', function () {
        assert.equal(convertHandler.getNum('km'), 1);
    });

    test('read each valid input unit', function () {
        assert.equal(convertHandler.getUnit('123km'), 'km');
        assert.equal(convertHandler.getUnit('123mi'), 'mi');
        assert.equal(convertHandler.getUnit('123gal'), 'gal');
        assert.equal(convertHandler.getUnit('123L'), 'L');
        assert.equal(convertHandler.getUnit('123kg'), 'kg');
        assert.equal(convertHandler.getUnit('123lbs'), 'lbs');
    });

    test('return an error for an invalid input unit', function () {
        assert.throws(() => convertHandler.getUnit('123xyz'), 'invalid unit');
    });

    test('return the correct return unit', function () {
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    });

    test('return the spelled-out string unit', function () {
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    });

    test('convert gal to L', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    });

    test('convert L to gal', function () {
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    });

    test('convert mi to km', function () {
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    });

    test('convert km to mi', function () {
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    });

    test('convert lbs to kg', function () {
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    });

    test('convert kg to lbs', function () {
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
});
