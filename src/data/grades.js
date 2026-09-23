/**
 * Grade-level landing pages.
 *
 * The catalogue is organised by form — Pipes, Fittings, Bars — but industrial
 * buyers search by grade: "duplex 2205 pipe supplier", "inconel 625 fasteners",
 * "ss 316l seamless tube". Before these pages the site had nothing that could
 * rank for any of it; every grade was buried inside a product description.
 *
 * ONLY grades the business has confirmed it stocks belong here. Publishing a
 * page for a grade we cannot supply produces enquiries we have to turn down,
 * which costs more than the traffic is worth. Confirmed by the business:
 * 304, 316, Duplex 2205, Inconel and Monel (20 Sep 2026); Titanium Grade 2 and
 * 904L (21 Sep); titanium fasteners and 904L pipe and plate (23 Sep).
 *
 * Composition and mechanical values are the nominal limits from the governing
 * ASTM specification, quoted so a buyer can sanity-check a requirement. They
 * are not a substitute for the mill test certificate, and every page says so.
 */

export const GRADE_DATA_NOTE =
  'Composition and mechanical values are the limits set by the governing ASTM specification and are given for reference. The mill test certificate supplied with your consignment carries the actual heat analysis.';

export const grades = [
  {
    slug: 'stainless-steel-304',
    name: 'Stainless Steel 304 / 304L',
    shortName: 'SS 304',
    uns: 'S30400 / S30403',
    family: 'Austenitic stainless steel',
    tagline: 'The general-purpose austenitic grade',
    summary:
      'SS 304 is the most widely used stainless steel: an 18/8 austenitic grade with good corrosion resistance in atmospheric, freshwater and mild chemical service, excellent formability and straightforward welding. 304L, the low-carbon variant, is specified where the part is welded and heavy sections risk sensitisation.',
    whenToUse:
      'Choose 304 for general corrosion resistance, food and dairy contact, architectural work and indoor process piping. Move up to 316 when chlorides are present — seawater, coastal air, brines or chlorinated cleaning chemicals — because 304 is vulnerable to pitting in those conditions.',
    standards: [
      ['ASTM A312 / A358', 'Seamless and welded pipe'],
      ['ASTM A213 / A269', 'Tube'],
      ['ASTM A240', 'Plate, sheet and coil'],
      ['ASTM A276 / A479', 'Bar and shapes'],
      ['ASTM A403 WP304/304L', 'Buttweld fittings'],
      ['ASTM A182 F304/F304L', 'Forged fittings and flanges'],
    ],
    chemistry: {
      columns: ['Element', '304 (S30400)', '304L (S30403)'],
      rows: [
        ['Carbon', '0.08 max', '0.030 max'],
        ['Chromium', '18.0 – 20.0', '18.0 – 20.0'],
        ['Nickel', '8.0 – 10.5', '8.0 – 12.0'],
        ['Manganese', '2.00 max', '2.00 max'],
        ['Silicon', '0.75 max', '0.75 max'],
        ['Phosphorus', '0.045 max', '0.045 max'],
        ['Sulphur', '0.030 max', '0.030 max'],
        ['Nitrogen', '0.10 max', '0.10 max'],
      ],
    },
    mechanical: {
      columns: ['Property', '304', '304L'],
      rows: [
        ['Tensile strength', '515 MPa min', '485 MPa min'],
        ['Yield strength (0.2%)', '205 MPa min', '170 MPa min'],
        ['Elongation in 50 mm', '40% min', '40% min'],
        ['Hardness', '201 HB / 92 HRB max', '201 HB / 92 HRB max'],
        ['Density', '8.00 g/cm³', '8.00 g/cm³'],
      ],
    },
    equivalents: [
      ['EN', '1.4301 (304) / 1.4307 (304L)'],
      ['JIS', 'SUS 304 / SUS 304L'],
      ['GB', '06Cr19Ni10 / 022Cr19Ni10'],
      ['UNS', 'S30400 / S30403'],
    ],
    applications: [
      'Process and utility piping in mild service',
      'Food, dairy and beverage plant',
      'Architectural cladding, railings and structural trim',
      'Heat exchanger and condenser tubing in freshwater',
      'Tanks, vessels and general fabrication',
    ],
    industries: ['Food & Dairy', 'Pharmaceutical', 'Construction', 'Water Treatment', 'Engineering'],
    productIds: [1, 2, 3, 4, 6, 7, 8, 9, 10, 18, 21, 23],
    faqs: [
      {
        question: 'What is the difference between 304 and 304L?',
        answer:
          '304L limits carbon to 0.030% against 0.08% for 304. The lower carbon reduces the risk of chromium carbide precipitation at grain boundaries during welding — sensitisation — which would otherwise leave the heat-affected zone vulnerable to intergranular corrosion. Specify 304L for welded heavy sections; 304 is adequate for thin sections and non-welded parts. 304L has slightly lower strength as a result.',
      },
      {
        question: 'Is SS 304 suitable for seawater?',
        answer:
          'No. Chlorides attack the passive layer on 304 and cause pitting and crevice corrosion. For seawater and chloride-bearing service use 316/316L, and for higher chloride levels or higher temperatures use Duplex 2205 or a super duplex grade.',
      },
      {
        question: 'Is SS 304 magnetic?',
        answer:
          'In the annealed condition 304 is essentially non-magnetic. Cold working — bending, drawing, machining — transforms some austenite to martensite and can make the part weakly magnetic. This is normal and does not indicate the wrong grade has been supplied.',
      },
    ],
  },

  {
    slug: 'stainless-steel-316',
    name: 'Stainless Steel 316 / 316L',
    shortName: 'SS 316',
    uns: 'S31600 / S31603',
    family: 'Austenitic stainless steel, molybdenum-bearing',
    tagline: 'The chloride-resistant workhorse',
    summary:
      'SS 316 adds 2–3% molybdenum to the 18/8 base, which markedly improves resistance to pitting and crevice corrosion in chloride environments. It is the default grade for marine, coastal and chemical process service. 316L, the low-carbon variant, is specified for welded construction.',
    whenToUse:
      'Choose 316 or 316L wherever chlorides are present — coastal installations, seawater cooling, brines, bleaches and many process chemicals — and in pharmaceutical and food plant where aggressive cleaning chemicals are used. If chloride levels or temperatures are higher still, or if higher strength would allow a lighter section, consider Duplex 2205.',
    standards: [
      ['ASTM A312 / A358', 'Seamless and welded pipe'],
      ['ASTM A213 / A269', 'Tube'],
      ['ASTM A240', 'Plate, sheet and coil'],
      ['ASTM A276 / A479', 'Bar and shapes'],
      ['ASTM A403 WP316/316L', 'Buttweld fittings'],
      ['ASTM A182 F316/F316L', 'Forged fittings and flanges'],
    ],
    chemistry: {
      columns: ['Element', '316 (S31600)', '316L (S31603)'],
      rows: [
        ['Carbon', '0.08 max', '0.030 max'],
        ['Chromium', '16.0 – 18.0', '16.0 – 18.0'],
        ['Nickel', '10.0 – 14.0', '10.0 – 14.0'],
        ['Molybdenum', '2.00 – 3.00', '2.00 – 3.00'],
        ['Manganese', '2.00 max', '2.00 max'],
        ['Silicon', '0.75 max', '0.75 max'],
        ['Phosphorus', '0.045 max', '0.045 max'],
        ['Sulphur', '0.030 max', '0.030 max'],
      ],
    },
    mechanical: {
      columns: ['Property', '316', '316L'],
      rows: [
        ['Tensile strength', '515 MPa min', '485 MPa min'],
        ['Yield strength (0.2%)', '205 MPa min', '170 MPa min'],
        ['Elongation in 50 mm', '40% min', '40% min'],
        ['Hardness', '217 HB / 95 HRB max', '217 HB / 95 HRB max'],
        ['Density', '8.00 g/cm³', '8.00 g/cm³'],
      ],
    },
    equivalents: [
      ['EN', '1.4401 (316) / 1.4404 (316L)'],
      ['JIS', 'SUS 316 / SUS 316L'],
      ['GB', '06Cr17Ni12Mo2 / 022Cr17Ni12Mo2'],
      ['UNS', 'S31600 / S31603'],
    ],
    applications: [
      'Marine and coastal piping and structures',
      'Chemical and petrochemical process lines',
      'Pharmaceutical and high-purity process equipment',
      'Heat exchangers in brackish or chloride-bearing water',
      'Food processing where aggressive cleaning agents are used',
    ],
    industries: ['Oil & Gas', 'Chemical', 'Marine', 'Pharmaceutical', 'Food & Dairy', 'Power'],
    productIds: [1, 2, 3, 4, 6, 7, 8, 9, 10, 18, 19, 21, 23],
    faqs: [
      {
        question: 'Is 316 always better than 304?',
        answer:
          'Better in chlorides, not universally. The molybdenum in 316 buys pitting resistance and costs roughly 25–40% more. In dry indoor service, freshwater or architectural work away from the coast, 304 performs identically and specifying 316 simply raises the bill. Choose on the environment, not on the grade number.',
      },
      {
        question: 'What does the "L" mean and when do I need it?',
        answer:
          'L denotes low carbon — 0.030% maximum instead of 0.08%. It matters when the component is welded: lower carbon suppresses chromium carbide precipitation in the heat-affected zone and protects against intergranular attack. For welded pipe, fittings and fabricated assemblies specify 316L. Dual-certified 316/316L material, which meets both, is common and usually the practical choice.',
      },
      {
        question: 'Does 316 resist seawater indefinitely?',
        answer:
          'No. 316 is suitable for many marine applications but will pit in stagnant or warm seawater, particularly in crevices under gaskets and deposits. For continuous seawater immersion, super duplex or a nickel alloy is the correct selection.',
      },
    ],
  },

  {
    slug: 'duplex-2205',
    name: 'Duplex 2205',
    shortName: 'Duplex 2205',
    uns: 'S31803 / S32205',
    family: 'Duplex (austenitic-ferritic) stainless steel',
    tagline: 'Roughly double the yield strength of 304',
    summary:
      'Duplex 2205 has a roughly 50/50 austenite-ferrite microstructure, which gives it about twice the yield strength of standard austenitic grades together with markedly better resistance to chloride stress corrosion cracking. Its higher strength often allows a thinner wall for the same duty, which can offset the higher price per kilogram.',
    whenToUse:
      'Choose 2205 where 316 is marginal on chlorides, where stress corrosion cracking is a risk, or where higher strength allows a lighter section. It is widely specified for offshore, seawater handling, chemical process and pressure vessels. Note the temperature limits below before specifying it for hot or cryogenic service.',
    standards: [
      ['ASTM A790 / A928', 'Seamless and welded pipe'],
      ['ASTM A789', 'Tube'],
      ['ASTM A240 UNS S31803 / S32205', 'Plate, sheet and coil'],
      ['ASTM A276 / A479', 'Bar'],
      ['ASTM A815 WP31803 / WPS32205', 'Buttweld fittings'],
      ['ASTM A182 F51 / F60', 'Forged fittings and flanges'],
    ],
    chemistry: {
      columns: ['Element', 'S31803', 'S32205'],
      rows: [
        ['Carbon', '0.030 max', '0.030 max'],
        ['Chromium', '21.0 – 23.0', '22.0 – 23.0'],
        ['Nickel', '4.5 – 6.5', '4.5 – 6.5'],
        ['Molybdenum', '2.5 – 3.5', '3.0 – 3.5'],
        ['Nitrogen', '0.08 – 0.20', '0.14 – 0.20'],
        ['Manganese', '2.00 max', '2.00 max'],
        ['Phosphorus', '0.030 max', '0.030 max'],
        ['Sulphur', '0.020 max', '0.020 max'],
      ],
    },
    mechanical: {
      columns: ['Property', 'Duplex 2205', 'SS 316 for comparison'],
      rows: [
        ['Tensile strength', '620 MPa min', '515 MPa min'],
        ['Yield strength (0.2%)', '450 MPa min', '205 MPa min'],
        ['Elongation in 50 mm', '25% min', '40% min'],
        ['Hardness', '31 HRC max', '95 HRB max'],
        ['Density', '7.80 g/cm³', '8.00 g/cm³'],
        ['PREN (typical)', '≈ 35', '≈ 25'],
      ],
    },
    equivalents: [
      ['EN', '1.4462'],
      ['JIS', 'SUS 329J3L'],
      ['UNS', 'S31803 / S32205'],
      ['Common name', '2205, DSS 2205, Duplex 2205'],
    ],
    applications: [
      'Offshore and subsea piping',
      'Seawater cooling and desalination plant',
      'Chemical tankers and cargo handling',
      'Pressure vessels where strength allows a thinner wall',
      'Flue gas desulphurisation and pollution control',
    ],
    industries: ['Oil & Gas', 'Marine', 'Chemical', 'Water Treatment', 'Power'],
    productIds: [1, 23],
    faqs: [
      {
        question: 'What is the difference between S31803 and S32205?',
        answer:
          'S32205 is a tightened version of S31803, with narrower ranges for chromium, molybdenum and especially nitrogen (0.14–0.20% against 0.08–0.20%). The higher guaranteed nitrogen improves pitting resistance and the stability of the weld. Most modern 2205 is dual-certified to both; if corrosion performance is critical, specify S32205.',
      },
      {
        question: 'What temperature limits apply to Duplex 2205?',
        answer:
          'Duplex grades are generally limited to about 300°C in continuous service. Above roughly 300°C the ferrite phase suffers embrittlement, and prolonged exposure between about 600°C and 950°C precipitates sigma phase, which severely reduces toughness and corrosion resistance. Duplex is also not used for cryogenic service, where austenitic grades retain toughness.',
      },
      {
        question: 'Is Duplex 2205 harder to weld than 316?',
        answer:
          'It requires more control. Heat input and interpass temperature must be managed to maintain the austenite-ferrite phase balance, and the correct filler — typically 2209 — must be used. It is routine work for a qualified fabricator but is not a drop-in substitute for 316 welding procedure.',
      },
    ],
  },

  {
    slug: 'inconel',
    name: 'Inconel Alloys',
    shortName: 'Inconel',
    uns: 'N06600 / N06625 / N07718',
    family: 'Nickel-chromium superalloys',
    tagline: 'For heat, corrosion and pressure together',
    summary:
      'Inconel is a family of nickel-chromium alloys used where stainless steel fails: high temperature oxidation, aggressive acids, and combinations of heat, pressure and corrosion. The nickel base makes them essentially immune to chloride stress corrosion cracking. We supply Inconel in pipe, tube, bar, fittings, flanges and fasteners.',
    whenToUse:
      'Choose Inconel when service temperature exceeds the practical limit of austenitic stainless, when chloride stress corrosion cracking must be eliminated, or when the medium is aggressive enough to attack 316 and duplex. 625 is the general corrosion-resistant choice, 600 the high-temperature oxidation choice, 718 the high-strength precipitation-hardened choice.',
    standards: [
      ['ASTM B167 / B517', 'Alloy 600 pipe and tube'],
      ['ASTM B444 / B704', 'Alloy 625 pipe and tube'],
      ['ASTM B166 / B446', 'Bar and rod'],
      ['ASTM B168 / B443', 'Plate, sheet and strip'],
      ['ASTM B366', 'Buttweld fittings'],
      ['ASTM B564', 'Forged fittings and flanges'],
    ],
    chemistry: {
      columns: ['Element', 'Inconel 600', 'Inconel 625', 'Inconel 718'],
      rows: [
        ['Nickel', '72.0 min', '58.0 min', '50.0 – 55.0'],
        ['Chromium', '14.0 – 17.0', '20.0 – 23.0', '17.0 – 21.0'],
        ['Iron', '6.0 – 10.0', '5.0 max', 'Balance'],
        ['Molybdenum', '—', '8.0 – 10.0', '2.80 – 3.30'],
        ['Niobium + Tantalum', '—', '3.15 – 4.15', '4.75 – 5.50'],
        ['Titanium', '—', '0.40 max', '0.65 – 1.15'],
        ['Aluminium', '—', '0.40 max', '0.20 – 0.80'],
        ['Carbon', '0.15 max', '0.10 max', '0.08 max'],
      ],
    },
    mechanical: {
      columns: ['Property', 'Inconel 600', 'Inconel 625', 'Inconel 718 (aged)'],
      rows: [
        ['Tensile strength', '550 MPa min', '827 MPa min', '1275 MPa min'],
        ['Yield strength (0.2%)', '240 MPa min', '414 MPa min', '1034 MPa min'],
        ['Elongation', '30% min', '30% min', '12% min'],
        ['Density', '8.47 g/cm³', '8.44 g/cm³', '8.19 g/cm³'],
        ['Max continuous service', '≈ 1100 °C', '≈ 980 °C', '≈ 700 °C'],
      ],
    },
    equivalents: [
      ['UNS', 'N06600 / N06625 / N07718'],
      ['EN', '2.4816 / 2.4856 / 2.4668'],
      ['Werkstoff', 'NiCr15Fe / NiCr22Mo9Nb / NiCr19Fe19Nb5Mo3'],
    ],
    applications: [
      'Furnace and heat treatment components',
      'Offshore and subsea flowlines and tubing',
      'Chemical reactors and acid handling',
      'Gas turbine and aerospace hot sections',
      'Flare tips, burners and combustion hardware',
    ],
    industries: ['Oil & Gas', 'Petrochemical', 'Power', 'Aerospace', 'Chemical'],
    productIds: [1, 20, 22],
    faqs: [
      {
        question: 'Which Inconel grade should I specify?',
        answer:
          '625 is the general-purpose corrosion-resistant grade, combining seawater and acid resistance with good strength — the usual choice for offshore and chemical duty. 600 is for high-temperature oxidation resistance in furnace and heat-treatment service. 718 is precipitation hardened for high strength up to around 700°C and is the standard choice for turbine and high-load fastener applications. Send us the medium, temperature and pressure and we will confirm.',
      },
      {
        question: 'Why is Inconel so much more expensive than stainless steel?',
        answer:
          'It is 50–72% nickel against 8–14% in austenitic stainless, and nickel is the dominant cost. Molybdenum and niobium additions raise it further, and the alloys are harder to melt, form and machine. Where the service genuinely demands it the whole-life cost is usually lower than repeatedly replacing failed stainless components.',
      },
      {
        question: 'Is Inconel immune to chloride stress corrosion cracking?',
        answer:
          'High-nickel alloys are effectively immune to the chloride stress corrosion cracking that affects austenitic stainless steels — this is a principal reason for specifying them in seawater and chloride-bearing service. They remain subject to other corrosion mechanisms, so the selection should always be made against the specific medium.',
      },
    ],
  },

  {
    slug: 'monel',
    name: 'Monel Alloys',
    shortName: 'Monel',
    uns: 'N04400 / N05500',
    family: 'Nickel-copper alloys',
    tagline: 'For seawater and hydrofluoric acid',
    summary:
      'Monel is a nickel-copper alloy, roughly 67% nickel and 30% copper, with outstanding resistance to seawater, brine and hydrofluoric acid. It retains strength and toughness from cryogenic temperatures up to about 500°C. Monel 400 is the standard grade; K-500 is precipitation hardened for roughly three times the yield strength.',
    whenToUse:
      'Choose Monel 400 for seawater handling, brine, hydrofluoric acid and alkalis, where it outperforms stainless steel by a wide margin. Choose K-500 where the same corrosion resistance is needed together with high strength and galling resistance — pump shafts, valve stems, fasteners and propeller shafts.',
    standards: [
      ['ASTM B165', 'Alloy 400 seamless pipe and tube'],
      ['ASTM B127', 'Alloy 400 plate, sheet and strip'],
      ['ASTM B164', 'Alloy 400 and K-500 bar and rod'],
      ['ASTM B366', 'Buttweld fittings'],
      ['ASTM B564', 'Forged fittings and flanges'],
      ['ASTM F467 / F468', 'Nuts and bolts'],
    ],
    chemistry: {
      columns: ['Element', 'Monel 400', 'Monel K-500'],
      rows: [
        ['Nickel', '63.0 min', '63.0 min'],
        ['Copper', '28.0 – 34.0', '27.0 – 33.0'],
        ['Iron', '2.50 max', '2.00 max'],
        ['Manganese', '2.00 max', '1.50 max'],
        ['Aluminium', '—', '2.30 – 3.15'],
        ['Titanium', '—', '0.35 – 0.85'],
        ['Carbon', '0.30 max', '0.25 max'],
        ['Sulphur', '0.024 max', '0.010 max'],
      ],
    },
    mechanical: {
      columns: ['Property', 'Monel 400', 'Monel K-500 (aged)'],
      rows: [
        ['Tensile strength', '480 MPa min', '965 MPa min'],
        ['Yield strength (0.2%)', '170 MPa min', '690 MPa min'],
        ['Elongation', '35% min', '20% min'],
        ['Density', '8.80 g/cm³', '8.44 g/cm³'],
        ['Max continuous service', '≈ 540 °C', '≈ 480 °C'],
      ],
    },
    equivalents: [
      ['UNS', 'N04400 / N05500'],
      ['EN', '2.4360 / 2.4375'],
      ['Werkstoff', 'NiCu30Fe / NiCu30Al'],
    ],
    applications: [
      'Seawater piping, valves and pump components',
      'Hydrofluoric acid plant and alkylation units',
      'Marine propeller and pump shafts (K-500)',
      'Heat exchangers in brackish and salt water',
      'Crude oil distillation and sour service hardware',
    ],
    industries: ['Marine', 'Oil & Gas', 'Chemical', 'Petrochemical'],
    productIds: [1, 20, 22],
    faqs: [
      {
        question: 'What is the difference between Monel 400 and K-500?',
        answer:
          'K-500 adds aluminium and titanium and is precipitation hardened, which raises minimum yield strength from about 170 MPa to about 690 MPa while keeping essentially the same corrosion resistance. K-500 also resists galling better, which is why it is used for shafts, stems and fasteners. Monel 400 is more ductile and easier to form and weld.',
      },
      {
        question: 'Why is Monel used for hydrofluoric acid?',
        answer:
          'The nickel-copper composition is exceptionally resistant to HF across a wide range of concentrations and temperatures, where stainless steels corrode rapidly. This makes Monel a standard material for HF alkylation units in refineries. Always confirm against the specific concentration, temperature and aeration of your service.',
      },
      {
        question: 'Can Monel be used in place of stainless steel for seawater?',
        answer:
          'For flowing seawater Monel 400 performs very well and resists the pitting that affects 316. In stagnant or low-flow seawater it can suffer crevice attack, and it is attacked by strongly oxidising media such as nitric acid or ferric chloride. Selection should always be made against the actual service conditions.',
      },
    ],
  },

  {
    slug: 'titanium-grade-2',
    name: 'Titanium Grade 2',
    shortName: 'Titanium Gr 2',
    uns: 'R50400',
    family: 'Commercially pure titanium',
    tagline: 'Seawater and wet chlorine, at 56% the weight of steel',
    summary:
      'Titanium Grade 2 is unalloyed commercially pure titanium, the most widely used titanium grade in industrial plant. It offers outstanding resistance to seawater, wet chlorine, hypochlorite and oxidising acids, good formability and weldability, and a density of 4.51 g/cm³ — a little over half that of steel. It is the standard choice for condenser and heat exchanger tubing in seawater service.',
    whenToUse:
      'Choose Grade 2 where chlorides defeat stainless steel — seawater cooling, desalination, hypochlorite and bleaching plant — and where weight matters. It is not an all-purpose corrosion alloy: titanium is attacked by dry chlorine, by hydrofluoric acid at any concentration, and by strong reducing acids unless inhibited. Where high strength is needed rather than corrosion resistance, Grade 5 (Ti-6Al-4V) is the alloyed choice.',
    standards: [
      ['ASTM B265', 'Plate, sheet and strip'],
      ['ASTM B348', 'Bar and billet'],
      ['ASTM B338', 'Seamless and welded tube for condensers and heat exchangers'],
      ['ASTM B861 / B862', 'Seamless and welded pipe'],
      ['ASTM B363', 'Welding fittings'],
      ['ASTM B381', 'Forgings'],
      ['ASTM F467 / F468', 'Nuts and bolts'],
    ],
    chemistry: {
      columns: ['Element', 'Titanium Grade 2 (R50400)'],
      rows: [
        ['Titanium', 'Balance'],
        ['Oxygen', '0.25 max'],
        ['Iron', '0.30 max'],
        ['Carbon', '0.08 max'],
        ['Nitrogen', '0.03 max'],
        ['Hydrogen', '0.015 max'],
        ['Residuals, each / total', '0.1 max / 0.4 max'],
      ],
    },
    mechanical: {
      columns: ['Property', 'Titanium Grade 2', 'SS 316 for comparison'],
      rows: [
        ['Tensile strength', '345 MPa min', '515 MPa min'],
        ['Yield strength (0.2%)', '275 – 450 MPa', '205 MPa min'],
        ['Elongation in 50 mm', '20% min', '40% min'],
        ['Density', '4.51 g/cm³', '8.00 g/cm³'],
        ['Max continuous service in air', '≈ 425 °C', '≈ 870 °C'],
      ],
    },
    equivalents: [
      ['UNS', 'R50400'],
      ['EN / Werkstoff', '3.7035 (Ti2)'],
      ['JIS', 'Class 2 (TP 270)'],
      ['Common name', 'CP Ti Grade 2, Ti Gr 2'],
    ],
    applications: [
      'Condenser and heat exchanger tubing in seawater',
      'Desalination and coastal power plant',
      'Chlor-alkali and bleaching plant',
      'Anodising and plating racks and jigs',
      'Marine hardware and fasteners where weight matters',
    ],
    industries: ['Marine', 'Chemical', 'Power', 'Water Treatment', 'Aerospace'],
    productIds: [1, 7, 20, 22],
    faqs: [
      {
        question: 'What is the difference between Titanium Grade 2 and Grade 5?',
        answer:
          'Grade 2 is commercially pure titanium — unalloyed, with about 345 MPa tensile strength, readily formed and welded, and chosen for corrosion resistance. Grade 5 is Ti-6Al-4V, alloyed with aluminium and vanadium, reaching roughly 900 MPa and chosen for strength, principally in aerospace and high-load components. Grade 5 is harder to form and weld. For chemical and marine plant, Grade 2 is almost always the correct specification.',
      },
      {
        question: 'Where does titanium not work?',
        answer:
          'Titanium is attacked by dry chlorine gas, by hydrofluoric acid at any concentration, and by strong reducing acids such as hot concentrated hydrochloric or sulphuric unless they are inhibited by oxidising species. It also has a red-hot fire risk in pure oxygen. Titanium is exceptional in the right medium, and a poor choice in the wrong one — always confirm against your actual service chemistry.',
      },
      {
        question: 'Why is titanium priced per kilogram when it is so light?',
        answer:
          'Because the density is 4.51 g/cm³ against 8.00 for stainless, a kilogram of titanium yields roughly 1.8 times the volume of a kilogram of 316. Comparing price per kilogram alone therefore overstates the difference — compare on the finished component, not on raw rate. Our minimum order quantity applies by weight, so a small titanium requirement goes further than the same weight in steel.',
      },
    ],
  },

  {
    slug: 'stainless-steel-904l',
    name: '904L Stainless Steel',
    shortName: '904L',
    uns: 'N08904',
    family: 'Super austenitic stainless steel',
    tagline: 'Built for sulphuric acid',
    summary:
      '904L is a low-carbon, high-alloy austenitic stainless steel with 23–28% nickel, 4–5% molybdenum and a deliberate 1–2% copper addition. The copper is what distinguishes it: it gives resistance to sulphuric and phosphoric acid that ordinary austenitic grades cannot match, while the high nickel and molybdenum provide strong resistance to chloride pitting and stress corrosion cracking.',
    whenToUse:
      'Choose 904L where reducing acids — particularly sulphuric and phosphoric — attack 316, and where chloride stress corrosion cracking must also be controlled. If the duty is chloride resistance alone and higher strength would help, Duplex 2205 is usually more economical. If the medium is more aggressive still, a nickel alloy such as Inconel 625 or Hastelloy is the next step.',
    standards: [
      ['ASTM B677 / B673', 'Seamless and welded pipe'],
      ['ASTM B674', 'Welded tube'],
      ['ASTM B625', 'Plate, sheet and strip'],
      ['ASTM B649', 'Bar and wire'],
      ['ASTM A240 (UNS N08904)', 'Plate, sheet and coil'],
      ['ASTM A182 F904L', 'Forged fittings and flanges'],
    ],
    chemistry: {
      columns: ['Element', '904L (N08904)'],
      rows: [
        ['Carbon', '0.020 max'],
        ['Chromium', '19.0 – 23.0'],
        ['Nickel', '23.0 – 28.0'],
        ['Molybdenum', '4.0 – 5.0'],
        ['Copper', '1.0 – 2.0'],
        ['Manganese', '2.00 max'],
        ['Silicon', '1.00 max'],
        ['Phosphorus', '0.045 max'],
        ['Sulphur', '0.035 max'],
      ],
    },
    mechanical: {
      columns: ['Property', '904L', 'SS 316L for comparison'],
      rows: [
        ['Tensile strength', '490 MPa min', '485 MPa min'],
        ['Yield strength (0.2%)', '220 MPa min', '170 MPa min'],
        ['Elongation in 50 mm', '35% min', '40% min'],
        ['Density', '7.95 g/cm³', '8.00 g/cm³'],
        ['PREN (typical)', '≈ 35', '≈ 25'],
      ],
    },
    equivalents: [
      ['UNS', 'N08904'],
      ['EN / Werkstoff', '1.4539 (X1NiCrMoCu25-20-5)'],
      ['Common name', '904L, Alloy 904L, UNS N08904'],
    ],
    applications: [
      'Sulphuric and phosphoric acid plant',
      'Flue gas desulphurisation and scrubbers',
      'Pulp and paper bleaching equipment',
      'Seawater and brine handling',
      'Pickling lines and acid storage',
    ],
    industries: ['Chemical', 'Petrochemical', 'Power', 'Marine', 'Pharmaceutical'],
    productIds: [1, 6, 9],
    faqs: [
      {
        question: 'Why does 904L contain copper?',
        answer:
          'The 1–2% copper addition is deliberate and is the reason 904L exists. Copper markedly improves resistance to reducing acids, above all sulphuric acid across a wide range of concentrations, where standard austenitic grades corrode. Without the copper, 904L would behave much like a high-nickel version of 317L.',
      },
      {
        question: 'Is 904L better than Duplex 2205?',
        answer:
          'They solve different problems. 904L is better in reducing acids such as sulphuric and phosphoric. Duplex 2205 has roughly twice the yield strength, which often allows a thinner and cheaper section, and is generally more economical where the requirement is chloride resistance rather than acid resistance. Tell us the medium, concentration and temperature and we will advise which fits.',
      },
      {
        question: 'Is 904L magnetic?',
        answer:
          'No. 904L is fully austenitic and remains non-magnetic even after cold work, unlike 304 and 316 which can become weakly magnetic when formed or machined. This matters in instrumentation and in applications where magnetic permeability is specified.',
      },
    ],
  },
];

export const gradeBySlug = (slug) => grades.find((g) => g.slug === slug) ?? null;
