import assert from 'node:assert';
import test from 'node:test';
import sum from './index.js';

function approximatelyEqual(actual, expected, tolerance = 0.0001) {
  return Math.abs(actual - expected) < tolerance;
}

test('sum function', async (t) => {
  await t.test('menambah 2 angka positif dengan benar', () => {
    assert.strictEqual(sum(5, 3), 8);
    assert.strictEqual(sum(10, 20), 30);
  });

  await t.test('return 0 jika input bukan angka', () => {
    assert.strictEqual(sum('5', 3), 0);
    assert.strictEqual(sum(5, '3'), 0);
    assert.strictEqual(sum('5', '3'), 0);
    assert.strictEqual(sum(null, 3), 0);
    assert.strictEqual(sum(5, null), 0);
    assert.strictEqual(sum(undefined, 3), 0);
    assert.strictEqual(sum(5, undefined), 0);
  });

  await t.test('return 0 jika input negatif', () => {
    assert.strictEqual(sum(-5, 3), 0);
    assert.strictEqual(sum(5, -3), 0);
    assert.strictEqual(sum(-5, -3), 0);
  });

  await t.test('menangani input 0', () => {
    assert.strictEqual(sum(0, 0), 0);
    assert.strictEqual(sum(5, 0), 5);
    assert.strictEqual(sum(0, 5), 5);
  });

  await t.test('handling angka decimal', () => {
    assert(approximatelyEqual(sum(2.5, 3.5), 6), 'Failed 2.5 + 3.5');
    assert(approximatelyEqual(sum(1.1, 2.2), 3.3), 'Failed 1.1 + 2.2');
  });

  await t.test('handling nominal besar', () => {
    assert.strictEqual(sum(1000000, 2000000), 3000000);
  });
});