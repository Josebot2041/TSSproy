/**
 * Cálculos estadísticos descriptivos e inferenciales
 * Según el marco metodológico del Taller de Simulación de Sistemas (UMSS)
 */

import { ChiSquareResult } from '../types';

/**
 * Cálculo de media, mediana, desviación estándar, cuartiles y rango
 */
export function calculateDescriptiveStats(numbers: number[]) {
  if (numbers.length === 0) {
    return { count: 0, mean: 0, median: 0, sd: 0, q1: 0, q3: 0, min: 0, max: 0, range: 0 };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  // Mediana
  const mid = Math.floor(n / 2);
  const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Cuartiles
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];

  // Varianza y desviación estándar muestral
  const variance = n > 1
    ? sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1)
    : 0;
  const sd = Math.sqrt(variance);

  const min = sorted[0];
  const max = sorted[n - 1];

  return {
    count: n,
    mean: Number(mean.toFixed(2)),
    median: Number(median.toFixed(2)),
    sd: Number(sd.toFixed(2)),
    q1: Number(q1.toFixed(2)),
    q3: Number(q3.toFixed(2)),
    min,
    max,
    range: max - min
  };
}

/**
 * Ecuación (2) del informe:
 * Índice de acuerdo de los empleadores (0 a 100):
 * Índice = ((TA + 0.5 * PA) / n) * 100
 * Donde TA = Totalmente de acuerdo, PA = Parcialmente de acuerdo, n = Total sin contar 'No sabe'
 */
export function calculateEmployerAgreementIndex(
  ta: number,
  pa: number,
  td: number
): { index: number; validCount: number; taPct: number; paPct: number; tdPct: number } {
  const n = ta + pa + td;
  if (n === 0) return { index: 0, validCount: 0, taPct: 0, paPct: 0, tdPct: 0 };
  const index = ((ta + 0.5 * pa) / n) * 100;
  return {
    index: Number(index.toFixed(1)),
    validCount: n,
    taPct: Number(((ta / n) * 100).toFixed(1)),
    paPct: Number(((pa / n) * 100).toFixed(1)),
    tdPct: Number(((td / n) * 100).toFixed(1))
  };
}

/**
 * Chi-cuadrado de independencia (Ecuación 1) y V de Cramér
 */
export function calculateChiSquare(
  matrix: number[][],
  rowLabels: string[],
  colLabels: string[]
): ChiSquareResult {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const rowSums = matrix.map((row) => row.reduce((a, b) => a + b, 0));
  const colSums = Array.from({ length: numCols }, (_, c) =>
    matrix.reduce((sum, row) => sum + row[c], 0)
  );
  const total = rowSums.reduce((a, b) => a + b, 0);

  let chi2 = 0;
  const expected: number[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(0)
  );

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      const e = total > 0 ? (rowSums[r] * colSums[c]) / total : 0;
      expected[r][c] = Number(e.toFixed(2));
      if (e > 0) {
        const o = matrix[r][c];
        chi2 += Math.pow(o - e, 2) / e;
      }
    }
  }

  const df = (numRows - 1) * (numCols - 1);

  // Valor crítico aproximado para alpha = 0.05
  const criticalValues: { [df: number]: number } = {
    1: 3.841,
    2: 5.991,
    3: 7.815,
    4: 9.488,
    5: 11.07,
    6: 12.592,
    7: 14.067,
    8: 15.507,
    9: 16.919,
    10: 18.307,
    12: 21.026,
    16: 26.296,
    20: 31.41
  };

  const criticalValue = criticalValues[df] || Number((df + 1.96 * Math.sqrt(2 * df)).toFixed(3));

  // P-Value approximation
  const pValue = approximateChiSquarePValue(chi2, df);

  // V de Cramér: V = sqrt(chi2 / (N * min(r-1, c-1)))
  const minDim = Math.min(numRows - 1, numCols - 1);
  const cramersV = minDim > 0 && total > 0
    ? Math.sqrt(chi2 / (total * minDim))
    : 0;

  return {
    chi2: Number(chi2.toFixed(3)),
    df,
    criticalValue,
    pValue: Number(pValue.toFixed(4)),
    cramersV: Number(cramersV.toFixed(3)),
    isSignificant: chi2 > criticalValue || pValue < 0.05,
    observed: matrix,
    expected,
    rowLabels,
    colLabels
  };
}

/**
 * Función Gamma Incompleta aproximada para cálculo de p-valor de Chi-cuadrado
 */
function approximateChiSquarePValue(chi: number, df: number): number {
  if (chi <= 0 || df <= 0) return 1;

  // Aproximación de Wilson-Hilferty para gl >= 1
  const k = df;
  const s = 2 / (9 * k);
  const z = (Math.pow(chi / k, 1 / 3) - (1 - s)) / Math.sqrt(s);

  // Complementary error function approximation for standard normal
  const normalCDF = 0.5 * (1 + erf(z / Math.SQRT2));
  const pVal = 1 - normalCDF;
  return Math.max(0.0001, Math.min(0.9999, pVal));
}

function erf(x: number): number {
  // A&S formula 7.1.26
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

  return sign * y;
}
