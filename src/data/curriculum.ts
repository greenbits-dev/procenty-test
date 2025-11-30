import { Calculator, TrendingUp, Percent, Users, Ticket, Trophy } from 'lucide-react';

export type Team = 'Barcelona' | 'Arsenal' | 'Legia';

export interface TutorialStep {
  id: string;
  title: string;
  concept: string;
  explanation: string;
  example: {
    context: string;
    value: string;
    visual?: string;
  };
  practice: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Problem {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: string;
  question: string;
  data?: string;
  options?: string[]; // For multiple choice if needed, but we might do input
  answer: number | string; // Numeric value or string for comparison
  unit?: string;
  explanation: string;
  team: Team;
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 'intro',
    title: 'Co to jest procent?',
    concept: 'Definicja Procentu',
    explanation: 'Procent (%) to po prostu ułamek o mianowniku 100. "Pro centum" znaczy "na sto". W piłce nożnej używamy go ciągle do posiadania piłki czy celności podań.',
    example: {
      context: 'Posiadanie piłki Barcelony w meczu z Realem',
      value: '65%',
      visual: 'To znaczy, że przez 65 minut na każde 100 minut gry, piłkę miała Barcelona.'
    },
    practice: [
      {
        question: 'Jeśli Arsenal miał 55% posiadania piłki, to jaki ułamek czasu gry kontrolował?',
        options: ['55/100', '5/100', '1/55', '100/55'],
        correctIndex: 0,
        explanation: '55% to dokładnie 55 setnych (55/100).'
      },
      {
        question: 'Lewandowski strzelił gola w 15% swoich meczów. Zapisz to jako ułamek dziesiętny.',
        options: ['1,5', '0,15', '0,015', '15,0'],
        correctIndex: 1,
        explanation: '15% = 15/100 = 0,15'
      }
    ]
  },
  {
    id: 'fractions',
    title: 'Ułamki na Procenty',
    concept: 'Zamiana Ułamków',
    explanation: 'Aby zamienić ułamek na procent, mnożymy go przez 100%. Często przydaje się przy statystykach strzałów.',
    example: {
      context: 'Skuteczność rzutów karnych',
      value: '7 na 10 trafionych',
      visual: '7/10 = 70/100 = 70%'
    },
    practice: [
      {
        question: 'Bramkarz Legii obronił 3 z 4 strzałów. Jaka to skuteczność?',
        options: ['34%', '75%', '30%', '40%'],
        correctIndex: 1,
        explanation: '3/4 rozszerzamy do mianownika 100: 3/4 = 75/100 = 75%.'
      },
      {
        question: 'Połowa kibiców (1/2) ma szaliki. Ile to procent?',
        options: ['20%', '50%', '25%', '100%'],
        correctIndex: 1,
        explanation: '1/2 = 50/100 = 50%.'
      }
    ]
  },
  {
    id: 'calc_percent',
    title: 'Procent z Liczby',
    concept: 'Obliczanie Wartości',
    explanation: 'Aby obliczyć procent z liczby, zamień procent na ułamek i pomnóż. Używamy tego przy obliczaniu kwot transferowych czy liczby kibiców.',
    example: {
      context: 'Prowizja agenta',
      value: '10% z 50 mln €',
      visual: '0,10 · 50 mln = 5 mln €'
    },
    practice: [
      {
        question: 'Stadion Arsenalu mieści 60 000 widzów. Na mecz przyszło 90% kompletu. Ilu było widzów?',
        options: ['54 000', '50 000', '45 000', '59 000'],
        correctIndex: 0,
        explanation: '90% = 0,9. 0,9 · 60 000 = 54 000.'
      },
      {
        question: 'Transfer kosztował 100 mln €. 5% to opłata solidarnościowa. Ile wynosi opłata?',
        options: ['50 mln €', '5 mln €', '0,5 mln €', '20 mln €'],
        correctIndex: 1,
        explanation: '5% z 100 = 5.'
      }
    ]
  },
  {
    id: 'change',
    title: 'Podwyżki i Obniżki',
    concept: 'Zmiana Procentowa',
    explanation: 'Cena biletu wzrasta? Dodajemy procent. Spada? Odejmujemy. To chleb powszedni w kasach biletowych.',
    example: {
      context: 'Cena koszulki po sezonie',
      value: 'Obniżka o 20% z 300 zł',
      visual: '300 zł · (1 - 0,20) = 300 · 0,80 = 240 zł'
    },
    practice: [
      {
        question: 'Bilet na Żyletę kosztował 50 zł. Cena wzrosła o 10%. Ile kosztuje teraz?',
        options: ['55 zł', '60 zł', '51 zł', '45 zł'],
        correctIndex: 0,
        explanation: '10% z 50 zł to 5 zł. 50 zł + 5 zł = 55 zł.'
      },
      {
        question: 'Cena karnetu (400 zł) spadła o 25%. Jaka jest nowa cena?',
        options: ['300 zł', '350 zł', '100 zł', '375 zł'],
        correctIndex: 0,
        explanation: '25% z 400 zł to 100 zł. 400 zł - 100 zł = 300 zł.'
      }
    ]
  }
];

export const practiceProblems: Problem[] = [
  // ŁATWE (EASY)
  {
    id: 'p1',
    difficulty: 'easy',
    type: 'conversion',
    team: 'Barcelona',
    question: 'Barcelona miała posiadanie piłki na poziomie 65%. Jaki to ułamek zwykły (nieskracalny)?',
    answer: '13/20',
    options: ['65/100', '13/20', '6/10', '3/5'],
    explanation: '65% = 65/100. Dzielimy licznik i mianownik przez 5: 65:5=13, 100:5=20. Wynik to 13/20.'
  },
  {
    id: 'p2',
    difficulty: 'easy',
    type: 'calc_value',
    team: 'Arsenal',
    question: 'Saka wykonał 40 podań, z czego 80% było celnych. Ile celnych podań wykonał?',
    answer: 32,
    unit: 'podań',
    explanation: '80% = 0,8. 0,8 · 40 = 32.'
  },
  {
    id: 'p3',
    difficulty: 'easy',
    type: 'calc_percent',
    team: 'Legia',
    question: 'Legia rozegrała 20 meczów w sezonie, wygrywając 12 z nich. Jaki procent meczów wygrała?',
    answer: 60,
    unit: '%',
    explanation: '12/20 = 60/100 = 60%.'
  },
  {
    id: 'p4',
    difficulty: 'easy',
    type: 'conversion',
    team: 'Barcelona',
    question: 'Lamine Yamal strzelił gola w 0,15 swoich występów. Zamień tę liczbę na procent.',
    answer: 15,
    unit: '%',
    explanation: '0,15 · 100% = 15%.'
  },
  {
    id: 'p5',
    difficulty: 'easy',
    type: 'calc_value',
    team: 'Arsenal',
    question: 'Bilet na Emirates Stadium kosztuje 200 funtów. Dzieci mają zniżkę 50%. Ile kosztuje bilet dla dziecka?',
    answer: 100,
    unit: '£',
    explanation: '50% z 200 to połowa, czyli 100.'
  },
  {
    id: 'p6',
    difficulty: 'easy',
    type: 'points',
    team: 'Legia',
    question: 'Poparcie dla trenera wzrosło z 40% do 55%. O ile punktów procentowych wzrosło?',
    answer: 15,
    unit: 'p.p.',
    explanation: '55 - 40 = 15 punktów procentowych.'
  },
  {
    id: 'p7',
    difficulty: 'easy',
    type: 'calc_value',
    team: 'Barcelona',
    question: 'Camp Nou jest w remoncie. Z 100 000 miejsc dostępnych jest tylko 45%. Ile to miejsc?',
    answer: 45000,
    unit: 'miejsc',
    explanation: '45% z 100 000 = 45 000.'
  },

  // ŚREDNIE (MEDIUM)
  {
    id: 'p8',
    difficulty: 'medium',
    type: 'reverse_calc',
    team: 'Arsenal',
    question: 'Odegaard strzelił 15 goli, co stanowiło 20% wszystkich goli Arsenalu w sezonie. Ile goli strzelił cały zespół?',
    answer: 75,
    unit: 'goli',
    explanation: '15 to 20% całości. 20% to 1/5. Więc całośc to 15 · 5 = 75.'
  },
  {
    id: 'p9',
    difficulty: 'medium',
    type: 'increase',
    team: 'Legia',
    question: 'Cena koszulki Legii (300 zł) wzrosła o 15% przed świętami. Ile kosztuje teraz?',
    answer: 345,
    unit: 'zł',
    explanation: '15% z 300 zł = 45 zł. 300 + 45 = 345 zł.'
  },
  {
    id: 'p10',
    difficulty: 'medium',
    type: 'decrease',
    team: 'Barcelona',
    question: 'Wartość Pedriego wynosiła 80 mln €, ale spadła o 10% po kontuzji. Ile wynosi teraz?',
    answer: 72,
    unit: 'mln €',
    explanation: '10% z 80 to 8. 80 - 8 = 72 mln €.'
  },
  {
    id: 'p11',
    difficulty: 'medium',
    type: 'comparison',
    team: 'Arsenal',
    question: 'Co jest większe: 25% z 200 goli czy 20% z 260 goli?',
    answer: '20% z 260',
    options: ['25% z 200', '20% z 260', 'Są równe'],
    explanation: '25% z 200 = 50. 20% z 260 = 52. 52 > 50.'
  },
  {
    id: 'p12',
    difficulty: 'medium',
    type: 'complex_calc',
    team: 'Legia',
    question: 'Na meczu jest 20 000 kibiców. 10% to dzieci, a 40% z pozostałych to kobiety. Ile jest kobiet?',
    answer: 7200,
    unit: 'kobiet',
    explanation: 'Dzieci: 10% z 20 000 = 2 000. Pozostało: 18 000. Kobiety: 40% z 18 000 = 0,4 · 18 000 = 7 200.'
  },
  {
    id: 'p13',
    difficulty: 'medium',
    type: 'increase',
    team: 'Barcelona',
    question: 'Lewandowski zarabia X. Po podwyżce o 20% zarabia 12 mln €. Ile zarabiał wcześniej?',
    answer: 10,
    unit: 'mln €',
    explanation: '120% starej pensji = 12 mln. Stara pensja = 12 : 1,2 = 10 mln.'
  },
  {
    id: 'p14',
    difficulty: 'medium',
    type: 'promille',
    team: 'Arsenal',
    question: 'Na 50 000 kibiców, 250 wniosło race. Ile to promili?',
    answer: 5,
    unit: '‰',
    explanation: '250/50000 = 25/5000 = 5/1000 = 5‰.'
  },

  // TRUDNE (HARD)
  {
    id: 'p15',
    difficulty: 'hard',
    type: 'double_change',
    team: 'Legia',
    question: 'Cena biletu (100 zł) wzrosła o 20%, a potem spadła o 20%. Ile kosztuje teraz?',
    answer: 96,
    unit: 'zł',
    explanation: '100 + 20% = 120. 120 - 20% (czyli 24) = 96 zł. Cena jest niższa niż na początku!'
  },
  {
    id: 'p16',
    difficulty: 'hard',
    type: 'reverse_complex',
    team: 'Barcelona',
    question: 'Po obniżce o 30% koszulka kosztuje 140 zł. Jaka była cena początkowa?',
    answer: 200,
    unit: 'zł',
    explanation: '140 zł to 70% ceny początkowej. Cena = 140 : 0,7 = 200 zł.'
  },
  {
    id: 'p17',
    difficulty: 'hard',
    type: 'comparison_percent',
    team: 'Arsenal',
    question: 'Arsenal wygrał 24 z 30 meczów. Barcelona wygrała 30 z 40 meczów. Która drużyna ma wyższy procent zwycięstw?',
    answer: 'Arsenal',
    options: ['Arsenal', 'Barcelona', 'Równo'],
    explanation: 'Arsenal: 24/30 = 4/5 = 80%. Barcelona: 30/40 = 3/4 = 75%. 80% > 75%.'
  },
  {
    id: 'p18',
    difficulty: 'hard',
    type: 'mixture',
    team: 'Legia',
    question: 'W sektorze gości jest 200 kibiców Widzewa i 800 kibiców Legii (pomyłka ochrony). Jaki procent stanowią kibice Widzewa?',
    answer: 20,
    unit: '%',
    explanation: 'Razem: 1000 kibiców. Widzew: 200/1000 = 20/100 = 20%.'
  },
  {
    id: 'p19',
    difficulty: 'hard',
    type: 'points_vs_percent',
    team: 'Barcelona',
    question: 'Skuteczność napastnika spadła z 20% do 15%. O ile procent (nie punktów!) spadła jego skuteczność?',
    answer: 25,
    unit: '%',
    explanation: 'Spadek o 5 punktów procentowych. W stosunku do 20%: 5/20 = 1/4 = 25%.'
  },
  {
    id: 'p20',
    difficulty: 'hard',
    type: 'complex_increase',
    team: 'Arsenal',
    question: 'Pensja piłkarza wzrosła o 10%, a po roku o kolejne 10%. O ile procent wzrosła łącznie w stosunku do początku?',
    answer: 21,
    unit: '%',
    explanation: '100 -> 110 -> 110 + 11 (10% z 110) = 121. Wzrost o 21%.'
  }
];
