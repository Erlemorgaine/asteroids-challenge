import renderer from 'react-test-renderer';
import { getMinMax, scaleLinear } from './functions';

test('scaleLinear, positive values', () => {
  const scale = scaleLinear([0, 10], [20, 40])

  expect(scale(5)).toEqual(30);
});

test('scaleLinear, decimal values', () => {
  const scale = scaleLinear([0, 1], [20, 40])

  expect(scale(0.75)).toEqual(35);
});

test('scaleLinear, positive / negative values', () => {
  const scale = scaleLinear([-15, -5], [20, 40])

  expect(scale(-7.5)).toEqual(35);
});

test('scaleLinear, negative values', () => {
  const scale = scaleLinear([-15, -5], [-2, -1])

  expect(scale(-12.5)).toEqual(-1.75);
});

test('scaleLinear, values growing inversely', () => {
  const scale = scaleLinear([10, 0], [20, 40])

  expect(scale(7.5)).toEqual(25);
});

test('getMinMax, array of +2 items', () => {
  const minMax = getMinMax([3, 1, 8, 21, 3, 5, 7, 10], a => a)

  expect(minMax).toEqual([1, 21]);
});

test('getMinMax, array of 2 items', () => {
  const minMax = getMinMax([4, 6], a => a)

  expect(minMax).toEqual([4, 6]);
});

test('getMinMax, array of 1 items', () => {
  const minMax = getMinMax([4], a => a)

  expect(minMax).toEqual([4]);
});

test('getMinMax, empty array', () => {
  const minMax = getMinMax([], a => a.test)

  expect(minMax).toEqual([]);
});

test('getMinMax, array of objects', () => {
  const minMax = getMinMax(
    [{ test: 100.1 }, { test: 555 }, { test: 100.11 }, { test: 555.4 } ],
      a => a.test
  )

  expect(minMax).toEqual([100.1, 555.4]);
});

test('getMinMax, no function', () => {
  expect(getMinMax([56, 10, 2, 0, 34])).toEqual([0, 56]);
});

test('getMinMax, function with non-existing property', () => {
  expect(
    () => getMinMax([10, 0], a => a.test)
  ).toThrow('Your function returned an array with undefined items');
});

test('momentToDateString, ', () => {

});

test('momentToDateString, ', () => {

});

test('momentToDayString, ', () => {

});

test('momentToDayString, ', () => {

});

test('getWeekStartEndStringForDate, ', () => {

});

test('getWeekStartEndStringForDate, ', () => {

});


