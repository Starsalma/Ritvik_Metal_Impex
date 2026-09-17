/**
 * Technical specification tables rendered on product detail pages.
 *
 * Structured the way buyers of industrial metals actually search: chemical
 * composition, mechanical properties, physical properties, equivalent grades
 * across standards, and dimensional range. Each table is a long-tail SEO
 * surface ("ASTM A312 TP304L chemical composition", "316L yield strength",
 * "1.4404 equivalent grade") as well as a genuine procurement aid.
 *
 * Figures are the specified minima/maxima from the governing ASTM/ASME
 * standards. They are typical published values for the grade, not a
 * substitute for the mill test certificate of a specific heat.
 */

/** Minimum order quantity, quoted on every product page and in schema. */
export const MOQ = '5 kg';

/* ------------------------------------------------------------------ */
/* Chemical composition — % by weight, max unless a range is given     */
/* ------------------------------------------------------------------ */

const chemistry = {
  'Stainless Steel': {
    id: 'chemical-composition',
    title: 'Chemical Composition',
    note: 'Per ASTM A312 / A240. Values are maximum % by weight unless a range is shown. ASTM A312 permits 0.035% max carbon on L grades, where ASTM A240 plate specifies 0.030% max.',
    columns: ['Grade', 'C', 'Mn', 'P', 'S', 'Si', 'Cr', 'Ni', 'Mo', 'Other'],
    rows: [
      ['TP 304', '0.08', '2.00', '0.045', '0.030', '1.00', '18.0–20.0', '8.0–11.0', '—', 'N 0.10'],
      ['TP 304L', '0.035', '2.00', '0.045', '0.030', '1.00', '18.0–20.0', '8.0–13.0', '—', 'N 0.10'],
      ['TP 316', '0.08', '2.00', '0.045', '0.030', '1.00', '16.0–18.0', '11.0–14.0', '2.00–3.00', 'N 0.10'],
      ['TP 316L', '0.035', '2.00', '0.045', '0.030', '1.00', '16.0–18.0', '10.0–15.0', '2.00–3.00', 'N 0.10'],
      ['TP 321', '0.08', '2.00', '0.045', '0.030', '1.00', '17.0–19.0', '9.0–12.0', '—', 'Ti ≥ 5 × C'],
      ['TP 347', '0.08', '2.00', '0.045', '0.030', '1.00', '17.0–19.0', '9.0–13.0', '—', 'Nb ≥ 10 × C'],
      ['TP 310S', '0.08', '2.00', '0.045', '0.030', '1.00', '24.0–26.0', '19.0–22.0', '—', '—'],
      ['TP 317L', '0.035', '2.00', '0.045', '0.030', '1.00', '18.0–20.0', '11.0–15.0', '3.00–4.00', 'N 0.10'],
    ],
  },

  'Carbon Steel': {
    id: 'chemical-composition',
    title: 'Chemical Composition',
    note: 'Per ASTM A106 (seamless pressure pipe), ASTM A53 (welded and seamless) and ASTM A234 WPB (fittings). Maximum % by weight unless a range is shown.',
    columns: ['Grade', 'C', 'Mn', 'P', 'S', 'Si', 'Cr', 'Ni', 'Mo', 'Cu', 'V'],
    rows: [
      ['A106 Gr. A', '0.25', '0.27–0.93', '0.035', '0.035', '0.10 min', '0.40', '0.40', '0.15', '0.40', '0.08'],
      ['A106 Gr. B', '0.30', '0.29–1.06', '0.035', '0.035', '0.10 min', '0.40', '0.40', '0.15', '0.40', '0.08'],
      ['A106 Gr. C', '0.35', '0.29–1.06', '0.035', '0.035', '0.10 min', '0.40', '0.40', '0.15', '0.40', '0.08'],
      ['A53 Gr. B', '0.30', '1.20', '0.05', '0.045', '—', '0.40', '0.40', '0.15', '0.40', '0.08'],
      ['A234 WPB', '0.30', '0.29–1.06', '0.050', '0.058', '0.10 min', '0.40', '0.40', '0.15', '0.40', '0.08'],
      ['A105 (forgings)', '0.35', '0.60–1.05', '0.035', '0.040', '0.10–0.35', '0.30', '0.40', '0.12', '0.40', '0.08'],
    ],
  },

  'Alloy Steel': {
    id: 'chemical-composition',
    title: 'Chemical Composition',
    note: 'Per ASTM A335 (pipe) and ASTM A182 (forgings). Chromium and molybdenum content is what sets creep strength and high-temperature service limits.',
    columns: ['Grade', 'C', 'Mn', 'P', 'S', 'Si', 'Cr', 'Mo', 'Other'],
    rows: [
      ['P1 / F1', '0.10–0.20', '0.30–0.80', '0.025', '0.025', '0.10–0.50', '—', '0.44–0.65', '—'],
      ['P5 / F5', '0.15', '0.30–0.60', '0.025', '0.025', '0.50', '4.00–6.00', '0.45–0.65', '—'],
      ['P9 / F9', '0.15', '0.30–0.60', '0.025', '0.025', '0.25–1.00', '8.00–10.00', '0.90–1.10', '—'],
      ['P11 / F11', '0.05–0.15', '0.30–0.60', '0.025', '0.025', '0.50–1.00', '1.00–1.50', '0.44–0.65', '—'],
      ['P22 / F22', '0.05–0.15', '0.30–0.60', '0.025', '0.025', '0.50', '1.90–2.60', '0.87–1.13', '—'],
      ['P91 / F91', '0.08–0.12', '0.30–0.60', '0.020', '0.010', '0.20–0.50', '8.00–9.50', '0.85–1.05', 'V 0.18–0.25, Nb 0.06–0.10, N 0.03–0.07'],
    ],
  },

  'Duplex Steel': {
    id: 'chemical-composition',
    title: 'Chemical Composition',
    note: 'Per ASTM A790 (pipe) and ASTM A240 (plate). Nitrogen is deliberately controlled — it stabilises austenite and contributes heavily to the PREN.',
    columns: ['Grade', 'UNS', 'C', 'Cr', 'Ni', 'Mo', 'N', 'PREN (typical)'],
    rows: [
      ['Duplex 2205', 'S31803', '0.030', '21.0–23.0', '4.5–6.5', '2.5–3.5', '0.08–0.20', '33–35'],
      ['Duplex 2205', 'S32205', '0.030', '22.0–23.0', '4.5–6.5', '3.0–3.5', '0.14–0.20', '35–36'],
      ['Super Duplex 2507', 'S32750', '0.030', '24.0–26.0', '6.0–8.0', '3.0–5.0', '0.24–0.32', '40–43'],
      ['Super Duplex', 'S32760', '0.030', '24.0–26.0', '6.0–8.0', '3.0–4.0', '0.20–0.30', '≥ 40'],
      ['Lean Duplex 2304', 'S32304', '0.030', '21.5–24.5', '3.0–5.5', '0.05–0.60', '0.05–0.20', '24–26'],
    ],
  },

  'Nickel Alloys': {
    id: 'chemical-composition',
    title: 'Chemical Composition',
    note: 'Nominal composition % by weight. Order against the UNS number rather than the trade name — Monel, Inconel, Incoloy and Hastelloy are trademarks, not specifications.',
    columns: ['Alloy', 'UNS', 'Ni', 'Cr', 'Mo', 'Fe', 'Cu', 'Other'],
    rows: [
      ['Monel 400', 'N04400', '63.0 min', '—', '—', '2.5 max', '28.0–34.0', 'Mn 2.0 max'],
      ['Inconel 600', 'N06600', '72.0 min', '14.0–17.0', '—', '6.0–10.0', '0.5 max', '—'],
      ['Inconel 625', 'N06625', '58.0 min', '20.0–23.0', '8.0–10.0', '5.0 max', '—', 'Nb+Ta 3.15–4.15'],
      ['Inconel 718', 'N07718', '50.0–55.0', '17.0–21.0', '2.8–3.3', 'Balance', '0.3 max', 'Nb 4.75–5.5, Ti 0.65–1.15'],
      ['Incoloy 800', 'N08800', '30.0–35.0', '19.0–23.0', '—', '39.5 min', '0.75 max', 'Ti + Al 0.15–0.60 each'],
      ['Incoloy 825', 'N08825', '38.0–46.0', '19.5–23.5', '2.5–3.5', 'Balance', '1.5–3.0', 'Ti 0.6–1.2'],
      ['Hastelloy C-276', 'N10276', '57.0 nom', '14.5–16.5', '15.0–17.0', '4.0–7.0', '—', 'W 3.0–4.5, Co 2.5 max'],
      ['Hastelloy C-22', 'N06022', '56.0 nom', '20.0–22.5', '12.5–14.5', '2.0–6.0', '—', 'W 2.5–3.5'],
    ],
  },

  Copper: {
    id: 'chemical-composition',
    title: 'Chemical Composition',
    note: 'The grade is chosen by whether the product will be brazed or will carry current. Deoxidised grades braze safely; ETP maximises conductivity.',
    columns: ['Grade', 'UNS', 'Cu (min)', 'P', 'O', 'Conductivity', 'Typical use'],
    rows: [
      ['ETP — Electrolytic Tough Pitch', 'C11000', '99.90%', '—', '0.02–0.05', '≈ 101% IACS', 'Busbars, strips, wire, conductors'],
      ['DHP — Deoxidised High Phosphorus', 'C12200', '99.90%', '0.015–0.040', 'Nil', '≈ 85% IACS', 'Water tube, ACR tube, heat exchangers'],
      ['DLP — Deoxidised Low Phosphorus', 'C12000', '99.90%', '0.004–0.012', 'Nil', '≈ 98% IACS', 'Brazed assemblies needing conductivity'],
      ['OFE — Oxygen Free Electronic', 'C10100', '99.99%', '—', '0.0005 max', '≈ 101% IACS', 'Vacuum, semiconductor, high reliability'],
      ['OF — Oxygen Free', 'C10200', '99.95%', '—', '0.001 max', '≈ 101% IACS', 'High-purity electrical and brazed work'],
    ],
  },

  Brass: {
    id: 'chemical-composition',
    title: 'Chemical Composition',
    note: 'Zinc content and lead additions drive machinability, strength and dezincification behaviour. Specify a DZR grade for prolonged potable water contact.',
    columns: ['Grade', 'UNS', 'Cu', 'Zn', 'Pb', 'Other', 'Typical use'],
    rows: [
      ['Free-cutting brass', 'C36000', '60.0–63.0', 'Balance', '2.5–3.7', 'Fe 0.35 max', 'CNC-turned components, fittings'],
      ['Forging brass', 'C37700', '58.0–61.0', 'Balance', '1.5–2.5', 'Fe 0.30 max', 'Hot-forged valve bodies and fittings'],
      ['Naval brass', 'C46400', '59.0–62.0', 'Balance', '0.20 max', 'Sn 0.50–1.00', 'Marine hardware, condenser plate'],
      ['Admiralty brass', 'C44300', '70.0–73.0', 'Balance', '0.07 max', 'Sn 0.8–1.2, As 0.02–0.06', 'Condenser and heat exchanger tube'],
      ['Aluminium brass', 'C68700', '76.0–79.0', 'Balance', '0.07 max', 'Al 1.8–2.5, As 0.02–0.06', 'Seawater-cooled condenser tube'],
      ['Cartridge brass', 'C26000', '68.5–71.5', 'Balance', '0.07 max', 'Fe 0.05 max', 'Deep-drawn and pressed parts'],
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Mechanical properties                                               */
/* ------------------------------------------------------------------ */

const mechanical = {
  'Stainless Steel': {
    id: 'mechanical-properties',
    title: 'Mechanical Properties',
    note: 'Specified minimum values in the solution-annealed condition, per ASTM A312 / A240. Elongation is measured in 50 mm (2 in.).',
    columns: ['Grade', 'Tensile Strength (min)', 'Yield Strength 0.2% (min)', 'Elongation (min)', 'Hardness (max)'],
    rows: [
      ['TP 304', '515 MPa (75 ksi)', '205 MPa (30 ksi)', '35%', '90 HRB / 192 HBW'],
      ['TP 304L', '485 MPa (70 ksi)', '170 MPa (25 ksi)', '35%', '90 HRB / 192 HBW'],
      ['TP 316', '515 MPa (75 ksi)', '205 MPa (30 ksi)', '35%', '90 HRB / 192 HBW'],
      ['TP 316L', '485 MPa (70 ksi)', '170 MPa (25 ksi)', '35%', '90 HRB / 192 HBW'],
      ['TP 321', '515 MPa (75 ksi)', '205 MPa (30 ksi)', '35%', '90 HRB / 192 HBW'],
      ['TP 347', '515 MPa (75 ksi)', '205 MPa (30 ksi)', '35%', '90 HRB / 192 HBW'],
      ['TP 310S', '515 MPa (75 ksi)', '205 MPa (30 ksi)', '35%', '90 HRB / 192 HBW'],
    ],
  },

  'Carbon Steel': {
    id: 'mechanical-properties',
    title: 'Mechanical Properties',
    note: 'Specified minimum values. Impact testing to a stated temperature is available where low-temperature service requires it (ASTM A333 / A350 LF2).',
    columns: ['Grade', 'Tensile Strength (min)', 'Yield Strength (min)', 'Elongation, longitudinal (min)'],
    rows: [
      ['A106 Gr. A', '330 MPa (48 ksi)', '205 MPa (30 ksi)', '35%'],
      ['A106 Gr. B', '415 MPa (60 ksi)', '240 MPa (35 ksi)', '30%'],
      ['A106 Gr. C', '485 MPa (70 ksi)', '275 MPa (40 ksi)', '30%'],
      ['A53 Gr. B', '415 MPa (60 ksi)', '240 MPa (35 ksi)', '—'],
      ['A234 WPB', '415–585 MPa (60–85 ksi)', '240 MPa (35 ksi)', '—'],
      ['A105 forgings', '485 MPa (70 ksi)', '250 MPa (36 ksi)', '30%'],
      ['A516 Gr. 70 plate', '485–620 MPa (70–90 ksi)', '260 MPa (38 ksi)', '21%'],
    ],
  },

  'Alloy Steel': {
    id: 'mechanical-properties',
    title: 'Mechanical Properties',
    note: 'Specified minimum values per ASTM A335 in the normalised and tempered condition. P91 requires tightly controlled heat treatment to achieve its properties.',
    columns: ['Grade', 'Tensile Strength (min)', 'Yield Strength (min)', 'Elongation (min)', 'Typical max service temp.'],
    rows: [
      ['P1', '380 MPa (55 ksi)', '205 MPa (30 ksi)', '30%', '≈ 480 °C'],
      ['P5', '415 MPa (60 ksi)', '205 MPa (30 ksi)', '30%', '≈ 620 °C'],
      ['P9', '415 MPa (60 ksi)', '205 MPa (30 ksi)', '30%', '≈ 650 °C'],
      ['P11', '415 MPa (60 ksi)', '205 MPa (30 ksi)', '30%', '≈ 565 °C'],
      ['P22', '415 MPa (60 ksi)', '205 MPa (30 ksi)', '30%', '≈ 595 °C'],
      ['P91', '585 MPa (85 ksi)', '415 MPa (60 ksi)', '20%', '≈ 650 °C'],
    ],
  },

  'Duplex Steel': {
    id: 'mechanical-properties',
    title: 'Mechanical Properties',
    note: 'Duplex grades deliver roughly double the yield strength of austenitic stainless, which often allows a thinner wall for the same design pressure.',
    columns: ['Grade', 'Tensile Strength (min)', 'Yield Strength 0.2% (min)', 'Elongation (min)', 'Hardness (max)'],
    rows: [
      ['Duplex 2205 (S31803)', '620 MPa (90 ksi)', '450 MPa (65 ksi)', '25%', '31 HRC / 293 HBW'],
      ['Duplex 2205 (S32205)', '655 MPa (95 ksi)', '450 MPa (65 ksi)', '25%', '31 HRC / 293 HBW'],
      ['Super Duplex 2507 (S32750)', '795 MPa (116 ksi)', '550 MPa (80 ksi)', '15%', '32 HRC / 310 HBW'],
      ['Super Duplex (S32760)', '750 MPa (109 ksi)', '550 MPa (80 ksi)', '25%', '32 HRC / 310 HBW'],
    ],
  },

  'Nickel Alloys': {
    id: 'mechanical-properties',
    title: 'Mechanical Properties',
    note: 'Typical minimum values in the annealed condition. Inconel 718 is age-hardenable and its properties depend entirely on the specified heat treatment.',
    columns: ['Alloy', 'Tensile Strength (min)', 'Yield Strength 0.2% (min)', 'Elongation (min)', 'Density'],
    rows: [
      ['Monel 400', '480 MPa (70 ksi)', '170 MPa (25 ksi)', '35%', '8.80 g/cm³'],
      ['Inconel 600', '550 MPa (80 ksi)', '240 MPa (35 ksi)', '30%', '8.47 g/cm³'],
      ['Inconel 625', '827 MPa (120 ksi)', '414 MPa (60 ksi)', '30%', '8.44 g/cm³'],
      ['Inconel 718 (aged)', '1275 MPa (185 ksi)', '1034 MPa (150 ksi)', '12%', '8.19 g/cm³'],
      ['Incoloy 800', '520 MPa (75 ksi)', '205 MPa (30 ksi)', '30%', '7.94 g/cm³'],
      ['Incoloy 825', '586 MPa (85 ksi)', '241 MPa (35 ksi)', '30%', '8.14 g/cm³'],
      ['Hastelloy C-276', '690 MPa (100 ksi)', '283 MPa (41 ksi)', '40%', '8.89 g/cm³'],
    ],
  },

  Copper: {
    id: 'mechanical-properties',
    title: 'Mechanical Properties by Temper',
    note: 'Temper governs both formability and allowable working pressure. Annealed coil bends by hand; hard drawn is supplied in rigid straight lengths.',
    columns: ['Temper', 'Designation', 'Tensile Strength', 'Elongation', 'Supplied as', 'Typical use'],
    rows: [
      ['Annealed / soft', 'O60', '205–260 MPa', '≥ 40%', 'Coils', 'ACR line sets, instrument lines, buried runs'],
      ['Half hard', 'H55', '250–310 MPa', '≈ 25%', 'Straight lengths', 'Formed work needing some rigidity'],
      ['Hard drawn', 'H58', '≥ 310 MPa', '≈ 8%', 'Straight lengths', 'Exposed risers, busbar stock'],
    ],
  },

  Brass: {
    id: 'mechanical-properties',
    title: 'Mechanical Properties',
    note: 'Typical values. Free-cutting grades trade strength and cold formability for a very high machinability rating.',
    columns: ['Grade', 'Tensile Strength', 'Yield Strength', 'Elongation', 'Machinability (C36000 = 100)'],
    rows: [
      ['C36000 free-cutting', '340–470 MPa', '124–310 MPa', '20–53%', '100'],
      ['C37700 forging', '370–400 MPa', '140–160 MPa', '≈ 45%', '80'],
      ['C46400 naval', '380–610 MPa', '170–455 MPa', '15–50%', '30'],
      ['C44300 admiralty', '330–380 MPa', '125–150 MPa', '≈ 65%', '30'],
      ['C26000 cartridge', '300–590 MPa', '75–450 MPa', '8–65%', '30'],
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Physical properties                                                 */
/* ------------------------------------------------------------------ */

const physical = {
  'Stainless Steel': {
    id: 'physical-properties',
    title: 'Physical Properties',
    note: 'Values at 20 °C unless stated. Thermal expansion matters when austenitic stainless is welded to carbon steel.',
    columns: ['Property', 'SS 304 / 304L', 'SS 316 / 316L'],
    rows: [
      ['Density', '8.00 g/cm³', '8.00 g/cm³'],
      ['Melting range', '1400–1450 °C', '1375–1400 °C'],
      ['Modulus of elasticity', '193 GPa', '193 GPa'],
      ['Thermal conductivity (100 °C)', '16.2 W/m·K', '16.3 W/m·K'],
      ['Specific heat (0–100 °C)', '500 J/kg·K', '500 J/kg·K'],
      ['Thermal expansion (0–100 °C)', '17.2 µm/m·°C', '15.9 µm/m·°C'],
      ['Electrical resistivity', '720 nΩ·m', '740 nΩ·m'],
      ['Max continuous service temp.', '≈ 870 °C', '≈ 925 °C'],
      ['Magnetic response (annealed)', 'Non-magnetic', 'Non-magnetic'],
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Equivalent grades across standards                                  */
/* ------------------------------------------------------------------ */

const equivalents = {
  'Stainless Steel': {
    id: 'equivalent-grades',
    title: 'Equivalent Grades Across Standards',
    note: 'Cross-reference for enquiries written against European, Japanese or Chinese standards. Equivalents are close but not always identical — check the composition limits before substituting.',
    columns: ['ASTM / AISI', 'UNS', 'EN / DIN', 'EN Name', 'JIS', 'GB'],
    rows: [
      ['304', 'S30400', '1.4301', 'X5CrNi18-10', 'SUS 304', '06Cr19Ni10'],
      ['304L', 'S30403', '1.4307', 'X2CrNi18-9', 'SUS 304L', '022Cr19Ni10'],
      ['316', 'S31600', '1.4401', 'X5CrNiMo17-12-2', 'SUS 316', '06Cr17Ni12Mo2'],
      ['316L', 'S31603', '1.4404', 'X2CrNiMo17-12-2', 'SUS 316L', '022Cr17Ni12Mo2'],
      ['321', 'S32100', '1.4541', 'X6CrNiTi18-10', 'SUS 321', '06Cr18Ni11Ti'],
      ['347', 'S34700', '1.4550', 'X6CrNiNb18-10', 'SUS 347', '06Cr18Ni11Nb'],
      ['310S', 'S31008', '1.4845', 'X8CrNi25-21', 'SUS 310S', '06Cr25Ni20'],
      ['430', 'S43000', '1.4016', 'X6Cr17', 'SUS 430', '10Cr17'],
    ],
  },

  'Duplex Steel': {
    id: 'equivalent-grades',
    title: 'Equivalent Grades Across Standards',
    note: 'S32205 is the modern, tightened version of 2205 with higher guaranteed nitrogen and chromium. Where the specification allows either, ask for S32205.',
    columns: ['Common name', 'UNS', 'EN / DIN', 'JIS', 'PREN (typical)'],
    rows: [
      ['Duplex 2205', 'S31803', '1.4462', 'SUS 329J3L', '33–35'],
      ['Duplex 2205', 'S32205', '1.4462', 'SUS 329J3L', '35–36'],
      ['Super Duplex 2507', 'S32750', '1.4410', '—', '40–43'],
      ['Super Duplex Zeron 100', 'S32760', '1.4501', '—', '≥ 40'],
      ['Lean Duplex 2304', 'S32304', '1.4362', '—', '24–26'],
    ],
  },

  'Nickel Alloys': {
    id: 'equivalent-grades',
    title: 'Equivalent Grades & Product Standards',
    note: 'Trade names are trademarks. Order against the UNS number together with the correct product standard for the form you need.',
    columns: ['Trade name', 'UNS', 'EN / DIN', 'Pipe / tube', 'Forgings & flanges', 'Plate & sheet'],
    rows: [
      ['Monel 400', 'N04400', '2.4360', 'ASTM B165', 'ASTM B564', 'ASTM B127'],
      ['Inconel 600', 'N06600', '2.4816', 'ASTM B167', 'ASTM B564', 'ASTM B168'],
      ['Inconel 625', 'N06625', '2.4856', 'ASTM B444 / B705', 'ASTM B564', 'ASTM B443'],
      ['Inconel 718', 'N07718', '2.4668', 'ASTM B983', 'ASTM B637', 'ASTM B670'],
      ['Incoloy 800', 'N08800', '1.4876', 'ASTM B407', 'ASTM B564', 'ASTM B409'],
      ['Incoloy 825', 'N08825', '2.4858', 'ASTM B423', 'ASTM B564', 'ASTM B424'],
      ['Hastelloy C-276', 'N10276', '2.4819', 'ASTM B622 / B619', 'ASTM B564', 'ASTM B575'],
    ],
  },

  Copper: {
    id: 'equivalent-grades',
    title: 'Product Standards by Application',
    note: 'The three copper tube standards are not interchangeable — B280 ACR tube is cleaned, dehydrated and capped at the mill, and is sized by actual outside diameter.',
    columns: ['Standard', 'Covers', 'Sizing convention', 'Typical application'],
    rows: [
      ['ASTM B88', 'Seamless copper water tube', 'Nominal size (OD = nominal + 1/8")', 'Potable water, plumbing, general fluid'],
      ['ASTM B280', 'Seamless ACR tube', 'Actual outside diameter', 'HVAC, refrigeration field service'],
      ['ASTM B111', 'Condenser tube & ferrule stock', 'Actual OD and wall gauge', 'Condensers, heat exchangers, evaporators'],
      ['ASTM B68', 'Bright annealed seamless tube', 'Actual OD', 'Instrument and hydraulic lines'],
      ['ASTM B152', 'Copper sheet, strip, plate & bar', 'Thickness and width', 'Busbars, strips, pressed components'],
      ['IEC 60317', 'Enamelled winding wire', 'Conductor diameter', 'Motor, transformer and coil windings'],
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Dimensional range — keyed by product form                           */
/* ------------------------------------------------------------------ */

const dimensional = {
  Pipes: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Nominal bore', '1/2" NB to 24" NB (larger on enquiry)'],
      ['Outside diameter', '6 mm to 610 mm'],
      ['Wall thickness', 'Schedule 5S, 10S, 20, 30, 40 / 40S, 60, 80 / 80S, 100, 120, 140, 160, XXS'],
      ['Manufacturing type', 'Seamless, ERW, EFW and LSAW'],
      ['Length', 'Single random 4–7 m, double random 9–13 m, or cut to length'],
      ['End finish', 'Plain end, bevelled end (30° ± 5°), threaded'],
      ['Surface', 'Annealed & pickled, bright annealed, mirror or satin polished'],
      ['Governing standards', 'ASTM A312 / A358 / A790 / A106 / A53, ASME B36.10M & B36.19M'],
    ],
  },
  Tubes: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Outside diameter', '3 mm to 254 mm'],
      ['Wall thickness', '0.5 mm to 20 mm'],
      ['Manufacturing type', 'Seamless and welded'],
      ['Length', 'Up to 12 m, or cut to length; coils for soft temper'],
      ['Surface', 'Annealed & pickled, bright annealed, polished, electro-polished'],
      ['Governing standards', 'ASTM A213 / A249 / A269 / A554, ASTM B88 / B280 / B111 for copper'],
    ],
  },
  Fittings: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Buttweld size range', '1/4" NB to 32" NB seamless, up to 48" NB welded'],
      ['Forged fitting size range', '1/4" NB to 4" NB'],
      ['Wall thickness', 'Schedule 5S to XXS'],
      ['Pressure class (forged)', 'Class 2000#, 3000#, 6000#, 9000#'],
      ['End connection', 'Buttweld, socketweld, screwed (NPT / BSP / BSPT)'],
      ['Dimensional standards', 'ASME B16.9 (buttweld), B16.11 (forged), B16.28 (short radius), MSS SP-43 / SP-75 / SP-79 / SP-83 / SP-95'],
      ['Material standards', 'ASTM A403 / A234 / A182 / A815 / B366'],
    ],
  },
  Flanges: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Size range', '1/2" NB to 24" NB (ASME B16.5); 26" to 60" NB (ASME B16.47 Series A / B)'],
      ['Pressure class', 'Class 150#, 300#, 400#, 600#, 900#, 1500#, 2500#'],
      ['Types', 'Weld neck, slip-on, blind, socket weld, lap joint, threaded, reducing, spectacle blind, ring joint, orifice, long weld neck'],
      ['Facing', 'Raised face (RF), flat face (FF), ring type joint (RTJ), tongue & groove, male & female'],
      ['Face finish', 'Serrated spiral, serrated concentric, smooth — 125 to 250 AARH'],
      ['Standards', 'ASME B16.5, B16.47, B16.36, B16.48, MSS SP-44, EN 1092-1, DIN, JIS, BS'],
    ],
  },
  Sheets: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Thickness — sheet', '0.3 mm to 6 mm'],
      ['Thickness — plate', '6 mm to 120 mm'],
      ['Width', '1000 mm, 1219 mm, 1250 mm, 1500 mm, 2000 mm, 2500 mm'],
      ['Length', '2000 mm, 2440 mm, 3000 mm, 6000 mm, or cut to size'],
      ['Coil form', 'Slit coil and full-width coil'],
      ['Finish', '2B, 2D, BA, No. 1, No. 4 brushed, Hairline, No. 8 mirror, Scotch-Brite'],
      ['Standards', 'ASTM A240 / A480, ASTM A516 (boiler quality), ASTM A387 (alloy), IS 2062'],
    ],
  },
  Bars: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Round bar diameter', '3 mm to 500 mm'],
      ['Square bar', '4 mm to 100 mm'],
      ['Hex bar across flats', '2 mm to 100 mm'],
      ['Flat bar', '3 mm to 100 mm thick × 10 mm to 500 mm wide'],
      ['Length', '100 mm to 6000 mm, or cut to length'],
      ['Condition', 'Hot rolled, forged, cold drawn, centreless ground, peeled, polished, black'],
      ['Standards', 'ASTM A276 / A479 / A484 / A582, ASTM A182 (forged), ASTM B164 / B166 / B446 (nickel)'],
    ],
  },
  Fasteners: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Diameter', 'M3 to M100 / #4 to 4"'],
      ['Length', '3 mm to 500 mm'],
      ['Thread standards', 'Metric coarse & fine, UNC, UNF, BSW, BSF, NPT, BSP'],
      ['Property class — carbon & alloy', '4.6, 4.8, 5.8, 8.8, 10.9, 12.9'],
      ['Property class — stainless', 'A2-70, A2-80, A4-70, A4-80'],
      ['High-temperature bolting', 'ASTM A193 B7 / B8 / B8M studs with ASTM A194 2H / 8 / 8M nuts'],
      ['Finish', 'Plain, hot dip galvanised, zinc plated, PTFE / Xylan coated, phosphated, cadmium plated'],
      ['Standards', 'ASME B18.2.1 / B18.2.2, DIN 931 / 933 / 934, IS 1367, ISO 4014 / 4017'],
    ],
  },
  Valves: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Size range', '1/4" NB to 24" NB'],
      ['Pressure class', 'Class 150# to 2500#; instrument valves to 6000 psi'],
      ['Types', 'Ball, gate, globe, check, needle, butterfly, mini, gauge root, 2-way / 3-way / 5-way manifold'],
      ['End connection', 'Flanged, screwed (NPT / BSP), socket weld, butt weld, wafer, lug'],
      ['Operation', 'Lever, handwheel, gear, pneumatic or electric actuator'],
      ['Testing', 'API 598 / BS 6755 shell, seat and backseat test; fire-safe to API 607 / API 6FA'],
      ['Standards', 'API 600 / 602 / 6D, BS 1868 / 1873, ASME B16.34'],
    ],
  },
  Wire: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Bare wire diameter', '0.09 mm to 12 mm'],
      ['Enamelled wire diameter', '0.05 mm to 5 mm (SWG, AWG or IEC 60317 metric sizes)'],
      ['Thermal class — enamel', '155 (F), 180 (H), 200, 220'],
      ['Grade of build', 'Grade 1, Grade 2, Grade 3'],
      ['Enamel type', 'Polyester, polyesterimide, polyamide-imide overcoat, self-bonding, solderable'],
      ['Packing', 'Spools, reels, coils and drums'],
      ['Standards', 'IEC 60317, IS 13730, NEMA MW 1000, JIS C 3202'],
    ],
  },
  Profiles: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Strip thickness', '0.1 mm to 12 mm'],
      ['Strip width', '3 mm to 600 mm'],
      ['Busbar section', '3 × 10 mm up to 20 × 200 mm'],
      ['Profile forms', 'Rectangular, square, round-edge flat, channel and custom drawn sections'],
      ['Temper', 'Annealed (O60), half hard (H55), hard drawn (H58)'],
      ['Edge condition', 'Mill edge, slit edge, radiused edge, full round edge'],
      ['Plating', 'Bare, tin plated, silver plated, nickel plated'],
    ],
  },
  Plates: {
    id: 'size-range',
    title: 'Size Range & Supply Condition',
    columns: ['Parameter', 'Range'],
    rows: [
      ['Thickness', '6 mm to 120 mm'],
      ['Width', 'Up to 2500 mm'],
      ['Length', 'Up to 12000 mm, or cut to size'],
      ['Condition', 'Hot rolled, annealed and pickled; normalised for boiler quality'],
      ['Testing', 'Ultrasonic testing to ASTM A435 / A578, IBR certification on request'],
      ['Standards', 'ASTM A240, ASTM A516 Gr. 60 / 70, ASTM A387, IS 2062'],
    ],
  },
};


/* ------------------------------------------------------------------ */
/* Pipe dimensions & weight — ASME B36.19M                             */
/* ------------------------------------------------------------------ */

/*
 * Outside diameter and wall thickness per ASME B36.19M (stainless steel pipe).
 * Weight is computed rather than transcribed, which removes a whole class of
 * copy-paste error from a 14-row × 3-schedule table:
 *   kg/m = pi * t * (OD - t) * density / 1e6
 * with density 8000 kg/m3 for austenitic stainless.
 */
const SS_DENSITY = 8000;
const kgPerMetre = (od, t) => (Math.PI * t * (od - t) * SS_DENSITY) / 1e6;

const B36_19M = [
  // [NPS, OD mm, Sch 10S, Sch 40S, Sch 80S]
  ['1/2"', 21.3, 2.11, 2.77, 3.73],
  ['3/4"', 26.7, 2.11, 2.87, 3.91],
  ['1"', 33.4, 2.77, 3.38, 4.55],
  ['1 1/4"', 42.2, 2.77, 3.56, 4.85],
  ['1 1/2"', 48.3, 2.77, 3.68, 5.08],
  ['2"', 60.3, 2.77, 3.91, 5.54],
  ['2 1/2"', 73.0, 3.05, 5.16, 7.01],
  ['3"', 88.9, 3.05, 5.49, 7.62],
  ['4"', 114.3, 3.05, 6.02, 8.56],
  ['5"', 141.3, 3.40, 6.55, 9.53],
  ['6"', 168.3, 3.40, 7.11, 10.97],
  ['8"', 219.1, 3.76, 8.18, 12.70],
  ['10"', 273.0, 4.19, 9.27, 12.70],
  ['12"', 323.8, 4.57, 9.53, 12.70],
];

const cell = (od, t) => `${t.toFixed(2)} mm / ${kgPerMetre(od, t).toFixed(2)} kg/m`;

const pipeDimensions = {
  id: 'dimensions-weight',
  title: 'Pipe Dimensions & Weight Chart',
  note:
    'Outside diameter and wall thickness per ASME B36.19M. Weight is calculated for austenitic stainless at 8.0 g/cm3 and is indicative — actual weight varies with grade and mill tolerance. Each cell shows wall thickness / weight per metre.',
  columns: ['NPS', 'OD (mm)', 'Sch 10S', 'Sch 40S', 'Sch 80S'],
  rows: B36_19M.map(([nps, od, s10, s40, s80]) => [
    nps,
    od.toFixed(1),
    cell(od, s10),
    cell(od, s40),
    cell(od, s80),
  ]),
};

/* Welded pipe is also sold in square and rectangular section. */
const hollowSections = {
  id: 'hollow-sections',
  title: 'Square & Rectangular Sections',
  note:
    'Welded stainless steel hollow sections, supplied in 304/304L, 316/316L and 202. Other sizes are rolled to order.',
  columns: ['Section', 'Size range', 'Wall thickness', 'Length'],
  rows: [
    ['Square', '10 x 10 mm to 200 x 200 mm', '0.8 mm to 8 mm', '6 m / 12 m / cut to length'],
    ['Rectangular', '10 x 20 mm to 200 x 400 mm', '0.8 mm to 8 mm', '6 m / 12 m / cut to length'],
    ['Round (welded)', '6 mm to 610 mm OD', '0.6 mm to 12 mm', '6 m / 12 m / cut to length'],
    ['Finish', 'Mill, matt, satin, No. 4 brushed, No. 8 mirror', '—', '—'],
  ],
};


/* ------------------------------------------------------------------ */
/* Socket weld & threaded forged fittings — ASME B16.11                */
/* ------------------------------------------------------------------ */

/*
 * A point almost every supplier page gets wrong: under ASME B16.11 the Class
 * 3000 / 6000 / 9000 designation identifies the socket bore and the pipe
 * schedule the fitting is matched to. It is NOT a working pressure in psi — a
 * Class 3000 fitting does not mean 3000 psi. The allowable pressure comes from
 * the material and the governing code, so we state the schedule relationship
 * and say plainly what the class does not mean.
 */
const forgedClasses = {
  id: 'pressure-classes',
  title: 'Class & Matched Pipe Schedule',
  note:
    'Under ASME B16.11 the class designation identifies the socket bore and the pipe schedule the fitting is bored to accept — it is not a pressure in psi. A Class 3000 fitting is not rated for 3000 psi. Allowable working pressure follows from the material grade, the design temperature and the governing code (ASME B31.1 / B31.3), so confirm it against your piping class rather than reading it from the class number.',
  columns: ['Class', 'Matched pipe schedule', 'Size range', 'Typical use'],
  rows: [
    ['Class 2000', 'Schedule 40 / STD', '1/8" to 4" NPS (threaded only)', 'Low-pressure utility and instrument lines'],
    ['Class 3000', 'Schedule 80 / XS', '1/8" to 4" NPS', 'The standard stocked class for small-bore process piping'],
    ['Class 6000', 'Schedule 160', '1/8" to 4" NPS', 'Higher-pressure service on heavier-wall pipe'],
    ['Class 9000', 'XXS', '1/8" to 2" NPS (socket weld)', 'Extreme-pressure small-bore, hydraulic and instrument lines'],
  ],
};

const forgedTypes = {
  id: 'fitting-types',
  title: 'Types & End Connections',
  note:
    'Socket weld and threaded fittings share the same ASME B16.11 body dimensions and pressure classes; only the end preparation differs. Both are made from forgings rather than castings, which gives a worked grain structure and better mechanical properties.',
  columns: ['Type', 'Socket weld', 'Threaded (NPT / BSP)', 'Notes'],
  rows: [
    ['Elbow 90°', 'Yes', 'Yes', 'Also available as 45°'],
    ['Tee — equal & reducing', 'Yes', 'Yes', 'Reducing tees reduce on the branch'],
    ['Cross', 'Yes', 'Yes', 'Four-way branch'],
    ['Coupling — full & half', 'Yes', 'Yes', 'Half coupling for branch connections on a header'],
    ['Reducer insert / bushing', 'Yes', 'Yes', 'Steps a socket down one or two sizes'],
    ['Union', 'Yes', 'Yes', 'Three-piece; allows dismantling without cutting'],
    ['Cap & plug', 'Yes', 'Yes', 'Terminates a line or a test connection'],
    ['Swage nipple, hex & barrel nipple', 'Plain / bevel end', 'Threaded both ends', 'Concentric or eccentric swages'],
    ['Welding boss & branch outlet', 'Yes', 'Yes', 'Set-on branch connections'],
  ],
};

const socketWeldInstallation = {
  id: 'installation',
  title: 'Installation & Inspection Requirements',
  note:
    'These are the points that most often cause a socket weld joint to be rejected on site. Follow a qualified WPS and the piping class in all cases.',
  columns: ['Requirement', 'Detail'],
  rows: [
    ['Expansion gap (setback)', 'Insert the pipe fully, then withdraw approximately 1.5 mm (1/16") before welding. Welding a bottomed-out pipe puts the weld root into tension as the joint expands and is a classic cause of root cracking. This is a code requirement, not a preference.'],
    ['Weld type', 'Fillet weld on the outside of the socket. Minimum fillet leg is normally 1.09 × nominal pipe wall thickness per ASME B31.1 / B31.3.'],
    ['Non-destructive examination', 'Socket welds cannot be radiographed — the socket geometry blocks a meaningful image. Inspection is limited to visual, dye penetrant (PT) and magnetic particle (MT) on the surface.'],
    ['Crevice', 'The annular gap between pipe OD and socket bore traps process fluid. Avoid socket weld in high-purity, hygienic, and severely corrosive or crevice-sensitive service; use buttweld instead.'],
    ['Vibration & cyclic service', 'Socket welds have lower fatigue strength than buttweld joints. Many specifications prohibit them in lines with severe vibration or thermal cycling.'],
    ['Size limit', 'Generally used up to 2" NB. Above that buttweld is both more economical and inspectable.'],
    ['Threaded joints', 'Seal with PTFE tape or an approved sealant and make up to the correct torque. Where leak-tightness is critical, the specification may call for a seal weld over the completed thread — which also removes the ability to dismantle it.'],
  ],
};

/* ------------------------------------------------------------------ */
/* Commercial terms — the same for every line                          */
/* ------------------------------------------------------------------ */

const commercial = (product) => ({
  id: 'ordering',
  title: 'Ordering & Supply',
  note: 'Cut lengths, non-standard sizes and special certification are available on request. Prices are quoted against grade, size, schedule and quantity.',
  columns: ['Parameter', 'Detail'],
  rows: [
    ['Minimum order quantity', `${MOQ} (mixed sizes within a grade can be combined to reach the MOQ)`],
    ['Price basis', 'Ex-works Mumbai, FOB or CIF — quoted per kg, per metre or per piece depending on the form'],
    ['Lead time', 'Ready stock dispatched in 1–3 working days; mill orders typically 2–6 weeks'],
    ['Certification', 'Mill test certificate to EN 10204 3.1 as standard; 3.2 with third-party witness, IBR and NACE MR0175 on request'],
    ['Testing available', 'PMI, IGC (ASTM A262), hydrostatic, ultrasonic, radiographic, impact and hardness testing'],
    ['Third-party inspection', 'Bureau Veritas, TÜV, DNV, SGS, Lloyd\'s Register, Intertek, RITES and client/EPC inspection'],
    ['Packing', 'Wooden crates or pallets, plastic caps on pipe ends, VCI wrapping where required, seaworthy export packing'],
    ['Payment terms', 'Advance, against proforma invoice, or LC at sight for export orders'],
    ['Supply area', 'Across India and export to the Middle East, Europe, the USA, Africa and South East Asia'],
    ['Product form', product?.form ?? '—'],
  ],
});

/* ------------------------------------------------------------------ */

/*
 * ASME B16.11 covers forged socket-weld and threaded fittings only. Buttweld
 * fittings (ASME B16.9) and ferrule/compression fittings share the "Fittings"
 * form but are governed by different standards, so matching on form alone would
 * put the wrong tables on those pages.
 */
const isForgedFitting = (product) =>
  /socketweld|socket weld|screwed|forged/i.test(product?.name ?? '');

/**
 * Returns the specification tables that apply to a product, in the order
 * they should be rendered. Missing entries are simply skipped, so adding a
 * new material or form degrades gracefully.
 */
export function getSpecTables(product) {
  if (!product) return [];
  return [
    chemistry[product.material],
    mechanical[product.material],
    dimensional[product.form],
    product.form === 'Pipes' ? pipeDimensions : null,
    product.form === 'Pipes' ? hollowSections : null,
    isForgedFitting(product) ? forgedClasses : null,
    isForgedFitting(product) ? forgedTypes : null,
    isForgedFitting(product) ? socketWeldInstallation : null,
    physical[product.material],
    equivalents[product.material],
    commercial(product),
  ].filter(Boolean);
}

/** Quick-reference facts for the "at a glance" strip on a product page. */
export function getQuickFacts(product) {
  if (!product) return [];
  return [
    { label: 'Material', value: product.material },
    { label: 'Product Form', value: product.form },
    { label: 'Min. Order Qty', value: MOQ },
    { label: 'Certification', value: 'EN 10204 3.1 MTC' },
    { label: 'Inspection', value: 'BV · TÜV · DNV · SGS' },
    { label: 'Supply', value: 'Ready stock & mill order' },
  ];
}
