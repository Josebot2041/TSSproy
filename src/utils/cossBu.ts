/**
 * Generador Congruencial Mixto y Algoritmos de Simulación Estocástica
 * Metodología: Coss Bu (2003) - Simulación: Un enfoque práctico
 * Ecuación: X_{n+1} = (a * X_n + c) mod m
 * Parámetros de ciclo completo: a = 8121, c = 28411, m = 100000
 */

export class CossBuGenerator {
  private a: number = 8121;
  private c: number = 28411;
  private m: number = 100000;
  private currentX: number;
  private initialSeed: number;

  constructor(seed: number = 45217) {
    this.initialSeed = Math.abs(Math.floor(seed)) % this.m;
    if (this.initialSeed === 0) this.initialSeed = 12345;
    this.currentX = this.initialSeed;
  }

  public setSeed(seed: number) {
    this.initialSeed = Math.abs(Math.floor(seed)) % this.m;
    if (this.initialSeed === 0) this.initialSeed = 12345;
    this.currentX = this.initialSeed;
  }

  public next(): { x: number; u: number } {
    this.currentX = (this.a * this.currentX + this.c) % this.m;
    const u = this.currentX / this.m;
    return { x: this.currentX, u };
  }

  public nextU(): number {
    return this.next().u;
  }

  public getParameters() {
    return { a: this.a, c: this.c, m: this.m, seed: this.initialSeed };
  }

  /**
   * Muestra de números aleatorios para inspección
   */
  public sampleNumbers(count: number = 10): Array<{ step: number; x: number; u: number }> {
    const backup = this.currentX;
    const result: Array<{ step: number; x: number; u: number }> = [];
    for (let i = 1; i <= count; i++) {
      const { x, u } = this.next();
      result.push({ step: i, x, u: Number(u.toFixed(5)) });
    }
    this.currentX = backup;
    return result;
  }

  /**
   * Ejecuta pruebas estadísticas de uniformidad e independencia sobre N números
   */
  public runValidationTests(sampleSize: number = 10000) {
    const backup = this.currentX;
    let sum = 0;
    let sumSq = 0;
    const bins = new Array(10).fill(0);

    for (let i = 0; i < sampleSize; i++) {
      const u = this.nextU();
      sum += u;
      sumSq += u * u;
      const binIdx = Math.min(9, Math.floor(u * 10));
      bins[binIdx]++;
    }

    const mean = sum / sampleSize;
    const variance = (sumSq / sampleSize) - (mean * mean);

    // Chi-cuadrado para 10 intervalos uniformes
    const expectedPerBin = sampleSize / 10;
    let chi2 = 0;
    for (let i = 0; i < 10; i++) {
      const diff = bins[i] - expectedPerBin;
      chi2 += (diff * diff) / expectedPerBin;
    }

    this.currentX = backup;

    return {
      sampleSize,
      mean: Number(mean.toFixed(4)),
      expectedMean: 0.5000,
      meanPass: Math.abs(mean - 0.5) < 0.015,
      variance: Number(variance.toFixed(4)),
      expectedVariance: 0.0833, // 1/12 ≈ 0.08333
      variancePass: Math.abs(variance - 0.0833) < 0.005,
      chi2: Number(chi2.toFixed(3)),
      chi2Critical: 16.919, // gl = 9, alpha = 0.05
      chi2Pass: chi2 < 16.919,
      bins,
      period: this.m
    };
  }

  /**
   * Método de la Transformada Inversa para variables discretas
   * Recibe categorías con sus probabilidades (deben sumar 1.0)
   */
  public sampleDiscrete<T>(categories: Array<{ value: T; prob: number }>): T {
    const u = this.nextU();
    let cumulative = 0;
    for (const cat of categories) {
      cumulative += cat.prob;
      if (u < cumulative) {
        return cat.value;
      }
    }
    return categories[categories.length - 1].value;
  }
}

/**
 * Escenario A: Viabilidad de Nuevos Posgrados en la FCyT
 * Pregunta: Si la FCyT abre un posgrado por área, ¿cuántos inscritos puede esperar?
 * Población = 1000 titulados
 * P(interés) = 83%
 * Distribución áreas: IA (43.9%), Ing. Software (23.6%), Redes (20.3%), Base de Datos (8.1%), Robótica (4.1%)
 * P(prefiere FCyT) = 30.9%
 * Tasa conversión efectiva = 35%
 * Mínimo de equilibrio = 15 estudiantes
 */
export function runScenarioA(
  replicas: number = 40,
  population: number = 1000,
  pInterest: number = 0.83,
  pPrefersFCyT: number = 0.309,
  pConversion: number = 0.35,
  minThreshold: number = 15,
  seed: number = 45217
) {
  const gen = new CossBuGenerator(seed);

  const areas = [
    { name: 'IA', share: 0.439 },
    { name: 'Ingeniería de Software', share: 0.236 },
    { name: 'Redes de Datos y Seguridad', share: 0.203 },
    { name: 'Base de Datos', share: 0.081 },
    { name: 'Robótica', share: 0.041 }
  ];

  // Acumuladores de réplicas
  const replicaCounts: { [area: string]: number[] } = {
    'IA': [],
    'Ingeniería de Software': [],
    'Redes de Datos y Seguridad': [],
    'Base de Datos': [],
    'Robótica': []
  };

  for (let r = 0; r < replicas; r++) {
    const currentCounts: { [area: string]: number } = {
      'IA': 0,
      'Ingeniería de Software': 0,
      'Redes de Datos y Seguridad': 0,
      'Base de Datos': 0,
      'Robótica': 0
    };

    for (let i = 0; i < population; i++) {
      // 1. ¿Le interesa posgrado?
      if (gen.nextU() < pInterest) {
        // 2. ¿Qué área?
        const uArea = gen.nextU();
        let selectedArea = 'Robótica';
        let acc = 0;
        for (const a of areas) {
          acc += a.share;
          if (uArea < acc) {
            selectedArea = a.name;
            break;
          }
        }

        // 3. ¿Prefiere Posgrado FCyT?
        if (gen.nextU() < pPrefersFCyT) {
          // 4. ¿Concreta inscripción efectiva?
          if (gen.nextU() < pConversion) {
            currentCounts[selectedArea]++;
          }
        }
      }
    }

    for (const a of areas) {
      replicaCounts[a.name].push(currentCounts[a.name]);
    }
  }

  // Estadísticos finales e Intervalos de Confianza al 95% (t-Student o z = 1.96)
  const results = areas.map((a) => {
    const counts = replicaCounts[a.name];
    const n = counts.length;
    const mean = counts.reduce((acc, v) => acc + v, 0) / n;
    const variance = counts.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1);
    const sd = Math.sqrt(variance);
    const z = 1.96;
    const margin = z * (sd / Math.sqrt(n));

    const superoMinimo = counts.filter((c) => c >= minThreshold).length;
    const probSupera = Math.round((superoMinimo / n) * 100);

    let recomendacion: 'Viable' | 'Viable con apoyo' | 'Integrar como módulo' = 'Integrar como módulo';
    if (probSupera >= 80) {
      recomendacion = 'Viable';
    } else if (probSupera >= 50) {
      recomendacion = 'Viable con apoyo';
    }

    return {
      area: a.name,
      mediaInscritos: Number(mean.toFixed(1)),
      icInferior: Number(Math.max(0, mean - margin).toFixed(1)),
      icSuperior: Number((mean + margin).toFixed(1)),
      sd: Number(sd.toFixed(2)),
      probSuperaMinimo: probSupera,
      recomendacion,
      minThreshold,
      replicasData: counts
    };
  });

  return results;
}

/**
 * Escenario B: Convenios de Becas
 * Pregunta: ¿Cuánto crece la matrícula si, mediante convenios con empresas y la banca,
 * la proporción de estudiantes con beca sube del 8.2% actual al 30%?
 * Se supuso que contar con beca duplica la probabilidad de inscribirse (21.6% frente a 10.8%).
 */
export function runScenarioB(
  replicas: number = 30,
  population: number = 1000,
  pInterest: number = 0.83,
  currentScholarshipPct: number = 0.082,
  targetScholarshipPct: number = 0.30,
  probEnrollNoScholarship: number = 0.108,
  probMultiplierWithScholarship: number = 2.0, // probEnrollWithScholarship = 0.216
  seed: number = 78901
) {
  const gen = new CossBuGenerator(seed);
  const probEnrollWithScholarship = probEnrollNoScholarship * probMultiplierWithScholarship;

  const actualEnrollments: number[] = [];
  const convenioEnrollments: number[] = [];

  for (let r = 0; r < replicas; r++) {
    let actualCount = 0;
    let convenioCount = 0;

    // Situación Actual
    for (let i = 0; i < population; i++) {
      if (gen.nextU() < pInterest) {
        const hasScholarship = gen.nextU() < currentScholarshipPct;
        const probEnroll = hasScholarship ? probEnrollWithScholarship : probEnrollNoScholarship;
        if (gen.nextU() < probEnroll) {
          actualCount++;
        }
      }
    }
    actualEnrollments.push(actualCount);

    // Con Convenios
    for (let i = 0; i < population; i++) {
      if (gen.nextU() < pInterest) {
        const hasScholarship = gen.nextU() < targetScholarshipPct;
        const probEnroll = hasScholarship ? probEnrollWithScholarship : probEnrollNoScholarship;
        if (gen.nextU() < probEnroll) {
          convenioCount++;
        }
      }
    }
    convenioEnrollments.push(convenioCount);
  }

  const meanActual = actualEnrollments.reduce((a, b) => a + b, 0) / replicas;
  const meanConvenio = convenioEnrollments.reduce((a, b) => a + b, 0) / replicas;
  const delta = meanConvenio - meanActual;
  const pctIncrease = ((meanConvenio - meanActual) / meanActual) * 100;

  return {
    meanActual: Number(meanActual.toFixed(1)),
    meanConvenio: Number(meanConvenio.toFixed(1)),
    delta: Number(delta.toFixed(1)),
    pctIncrease: Number(pctIncrease.toFixed(1)),
    replicas,
    actualData: actualEnrollments,
    convenioData: convenioEnrollments
  };
}

/**
 * Escenario C: Pasantías e Inserción Laboral Rápida
 * Pregunta: Si se amplían las pasantías, ¿cuánto mejora la inserción laboral?
 * Distribución real del tiempo hasta el primer empleo:
 * 52.5% ya trabajaba, 9.9% <1 mes, 13.9% 1-4 meses, 5.9% 4-8 meses, 12.9% 8-12 meses, 5.0% >12 meses.
 * Supuesto: Las pasantías trasladan a la mitad (50%) de quienes hoy tardan > 4 meses a la categoría "ya trabajaba antes de titularse".
 */
export function runScenarioC(
  replicas: number = 50,
  sampleSize: number = 1000,
  reductionFactor: number = 0.5,
  seed: number = 24680
) {
  const gen = new CossBuGenerator(seed);

  const realDist = [
    { label: 'Ya trabajaba', prob: 0.525 },
    { label: 'Menos de 1 mes', prob: 0.099 },
    { label: '1 a 4 meses', prob: 0.139 },
    { label: '4 a 8 meses', prob: 0.059 },
    { label: '8 a 12 meses', prob: 0.129 },
    { label: 'Más de 12 meses', prob: 0.050 }
  ];

  // Con pasantías:
  // tardan > 4 meses suman: 0.059 + 0.129 + 0.050 = 0.238
  // el 50% de 0.238 = 0.119 pasa a "Ya trabajaba" (0.525 + 0.119 = 0.644)
  const movedToWorked = (0.059 + 0.129 + 0.050) * reductionFactor;
  const simDist = [
    { label: 'Ya trabajaba', prob: 0.525 + movedToWorked },
    { label: 'Menos de 1 mes', prob: 0.099 },
    { label: '1 a 4 meses', prob: 0.139 },
    { label: '4 a 8 meses', prob: 0.059 * (1 - reductionFactor) },
    { label: '8 a 12 meses', prob: 0.129 * (1 - reductionFactor) },
    { label: 'Más de 12 meses', prob: 0.050 * (1 - reductionFactor) }
  ];

  const actualTotals: { [k: string]: number } = {};
  const simTotals: { [k: string]: number } = {};
  realDist.forEach((d) => {
    actualTotals[d.label] = 0;
    simTotals[d.label] = 0;
  });

  for (let r = 0; r < replicas; r++) {
    // Simular real
    for (let i = 0; i < sampleSize; i++) {
      const u = gen.nextU();
      let acc = 0;
      for (const d of realDist) {
        acc += d.prob;
        if (u < acc) {
          actualTotals[d.label]++;
          break;
        }
      }
    }

    // Simular con pasantías
    for (let i = 0; i < sampleSize; i++) {
      const u = gen.nextU();
      let acc = 0;
      for (const d of simDist) {
        acc += d.prob;
        if (u < acc) {
          simTotals[d.label]++;
          break;
        }
      }
    }
  }

  const grandTotal = replicas * sampleSize;
  const categories = realDist.map((d) => {
    const actualPct = (actualTotals[d.label] / grandTotal) * 100;
    const simPct = (simTotals[d.label] / grandTotal) * 100;
    return {
      label: d.label,
      actualPct: Number(actualPct.toFixed(1)),
      simPct: Number(simPct.toFixed(1)),
      diff: Number((simPct - actualPct).toFixed(1))
    };
  });

  const actualRapid = categories
    .filter((c) => c.label === 'Ya trabajaba' || c.label === 'Menos de 1 mes' || c.label === '1 a 4 meses')
    .reduce((a, b) => a + b.actualPct, 0);

  const simRapid = categories
    .filter((c) => c.label === 'Ya trabajaba' || c.label === 'Menos de 1 mes' || c.label === '1 a 4 meses')
    .reduce((a, b) => a + b.simPct, 0);

  return {
    categories,
    actualRapid: Number(actualRapid.toFixed(1)),
    simRapid: Number(simRapid.toFixed(1)),
    gainRapid: Number((simRapid - actualRapid).toFixed(1)),
    replicas,
    sampleSize
  };
}
