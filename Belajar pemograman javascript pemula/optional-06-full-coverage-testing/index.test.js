import assert from 'node:assert';
import test from 'node:test';
import sum from './index.js';

function approximatelyEqual(actual, expected, tolerance = 0.0001) {
  return Math.abs(actual - expected) < tolerance;
}

let testPassed = true; // Untuk mengecek apakah semua test berhasil

test('Kesiapan Bersama - test', async (t) => {
  await t.test('No microcheating', () => {
    assert.strictEqual(sum(5, 3), 8);
    assert.strictEqual(sum(10, 20), 30);
  });

  await t.test('berusaha untuk ada di setiap keadaan', () => {
    assert.strictEqual(sum('5', 3), 0);
    assert.strictEqual(sum(5, '3'), 0);
  });

  await t.test('Tidak ada diam-diaman', () => {
    assert.strictEqual(sum(-5, 3), 0);
  });

  await t.test('Komunikasi bukan sekadar formalitas', () => {
    assert.strictEqual(sum(0, 0), 0);
  });

  await t.test('Siap menghadapi semua suasana hati', () => {
    assert(approximatelyEqual(sum(2.5, 3.5), 6));
  });

  await t.test('Susah senang tetap berusaha memperbaiki', () => {
    assert.strictEqual(sum(1000000, 2000000), 3000000);
  });
});

// Menangani error jika ada test yang gagal
process.on('uncaughtException', (err) => {
  testPassed = false;
  console.error('\n💔 Ada yang gagal! Mungkin masih ada yang harus diperbaiki dalam hubungan ini. 💔');
  console.error(`❌ Error: ${err.message}\n`);
});

// Menampilkan hasil setelah semua test selesai
process.on('exit', (code) => {
  if (testPassed) {
    console.log('\n💖 Semua tes lolos! Hubungan ini siap diuji dalam kehidupan nyata. 💖');
  }
});
