/**
 * Long-form, research-backed technical articles.
 *
 * Every article maps to products Ritvik Metal Impex actually stocks (see
 * src/data/products.js) so the blog builds topical authority around the
 * catalogue rather than generic filler.
 *
 * Block types supported by ArticlePage:
 *   { type: 'p',     text }
 *   { type: 'ul',    items: [] }
 *   { type: 'ol',    items: [] }
 *   { type: 'table', columns: [], rows: [[]] }
 *   { type: 'note',  title, text }
 */

export const articles = [
  /* ================================================================== */
  {
    slug: 'stainless-steel-304-vs-316',
    title: 'SS 304 vs SS 316: How to Choose the Right Stainless Steel Grade',
    seoTitle:
      'SS 304 vs 316 Stainless Steel: Differences & Uses',
    description:
      'Stainless steel 304 vs 316 compared: molybdenum, PREN pitting resistance, L-grades, temperature limits, and when the 316 price premium is worth paying.',
    keywords:
      'ss 304 vs 316, difference between 304 and 316 stainless steel, 316 vs 304 pipe, PREN stainless steel, ASTM A312 TP316L, stainless steel grade selection, 304 vs 316 price India, stainless steel supplier Mumbai',
    category: 'Grade Selection',
    readTime: '9 min read',
    datePublished: '2026-01-14',
    dateModified: '2026-08-02',
    image: '/images/products/pipes-tubes.jpg',
    relatedProductIds: [1, 2, 4, 6, 7, 9],
    intro:
      'SS 304 and SS 316 look identical, machine similarly and often sit side by side in a stockyard — yet specifying the wrong one is the single most common cause of premature corrosion failure in Indian process plants. The difference comes down to roughly 2% molybdenum, and to whether your service environment contains chlorides.',
    takeaways: [
      '316 adds 2–3% molybdenum, which is what buys chloride pitting and crevice corrosion resistance.',
      'PREN is ~18–20 for 304 and ~24–28 for 316 — a 20–40% improvement in pitting resistance.',
      '316 typically costs 20–30% more than 304; in clean, non-chloride service that premium buys nothing.',
      'The "L" suffix (304L / 316L) means low carbon — specify it for welded assemblies to avoid sensitisation.',
      'For seawater, brine or >1,000 ppm chlorides, neither grade is enough — move to duplex 2205 or super duplex 2507.',
    ],
    sections: [
      {
        id: 'chemistry',
        heading: 'The chemistry: what actually separates 304 from 316',
        blocks: [
          {
            type: 'p',
            text: 'Both grades are austenitic stainless steels built on the same iron–chromium–nickel foundation, and both rely on a self-healing chromium oxide passive layer for corrosion resistance. The functional difference is that 316 trades a little chromium for extra nickel and adds molybdenum.',
          },
          {
            type: 'table',
            columns: ['Element', 'Type 304 / 304L', 'Type 316 / 316L', 'Why it matters'],
            rows: [
              ['Chromium (Cr)', '18.0 – 20.0%', '16.0 – 18.0%', 'Forms the passive oxide film — the base of all corrosion resistance'],
              ['Nickel (Ni)', '8.0 – 10.5%', '10.0 – 14.0%', 'Stabilises the austenitic structure, improves formability and toughness'],
              ['Molybdenum (Mo)', '—', '2.0 – 3.0%', 'The decisive addition: resists chloride pitting and crevice attack'],
              ['Carbon (C)', '≤0.08% (≤0.030% for 304L)', '≤0.08% (≤0.030% for 316L)', 'Low carbon prevents chromium carbide precipitation during welding'],
              ['UNS number', 'S30400 / S30403', 'S31600 / S31603', 'Use on enquiries and MTCs to avoid grade ambiguity'],
            ],
          },
          {
            type: 'p',
            text: 'That molybdenum addition is also why 316 carries a price premium. Molybdenum and the extra nickel are both volatile-priced alloying elements, which is why the 304-to-316 spread widens and narrows through the year rather than staying fixed.',
          },
        ],
      },
      {
        id: 'pren',
        heading: 'PREN: putting a number on pitting resistance',
        blocks: [
          {
            type: 'p',
            text: 'The Pitting Resistance Equivalent Number condenses grade chemistry into a single comparable figure. The standard formula is PREN = %Cr + 3.3 × %Mo + 16 × %N. Higher is better, and the number is most useful as a ranking tool rather than an absolute design limit.',
          },
          {
            type: 'table',
            columns: ['Grade', 'Typical PREN', 'Practical chloride limit', 'Typical use'],
            rows: [
              ['304 / 304L', '18 – 20', 'Potable water, ambient indoor conditions', 'General fabrication, food, architectural, structural'],
              ['316 / 316L', '24 – 28', 'Up to roughly 1,000 ppm chlorides', 'Chemical process, coastal, pharma, marine splash zone'],
              ['Duplex 2205 (S31803/S32205)', '33 – 36', 'Brackish water, moderate brine', 'Process tanks, heat exchangers, onshore chemical'],
              ['Super Duplex 2507 (S32750)', '40 – 43', 'Natural seawater (~19,000 ppm Cl⁻)', 'Subsea, desalination, offshore, aggressive brine'],
            ],
          },
          {
            type: 'note',
            title: 'A common site mistake',
            text: 'PREN says nothing about temperature. Pitting resistance falls sharply as service temperature rises — a grade comfortable in 200 ppm chlorides at 25 °C can pit at the same concentration at 60 °C. Always evaluate chloride level and temperature together.',
          },
        ],
      },
      {
        id: 'l-grades',
        heading: 'Why the "L" suffix matters more than most buyers realise',
        blocks: [
          {
            type: 'p',
            text: 'When standard-carbon 304 or 316 is held in the 425–815 °C range — which happens in the heat-affected zone of every weld — chromium combines with carbon and precipitates as chromium carbide at the grain boundaries. Those boundaries are left locally depleted of chromium and become preferential corrosion sites. The phenomenon is called sensitisation, and the resulting failure is intergranular corrosion.',
          },
          {
            type: 'ul',
            items: [
              '304L / 316L cap carbon at 0.030%, which suppresses carbide precipitation — the default choice for any welded assembly.',
              'Dual-certified material (marked 304/304L or 316/316L) meets the low-carbon chemistry and the higher strength of the standard grade simultaneously, and is what most stockists actually hold.',
              '321 and 347 are the stabilised alternatives: titanium or niobium ties up the carbon instead. Prefer them over the L grades for sustained high-temperature service above about 500 °C.',
            ],
          },
          {
            type: 'p',
            text: 'For fabricated items such as buttweld fittings and welded pipe, ask for the low-carbon or dual-certified variant unless there is a specific strength reason not to. The cost difference is marginal; the failure cost is not.',
          },
        ],
      },
      {
        id: 'temperature',
        heading: 'Strength and temperature: where each grade stops',
        blocks: [
          {
            type: 'table',
            columns: ['Property', '304 / 304L', '316 / 316L'],
            rows: [
              ['Tensile strength (min)', '515 MPa', '515 MPa'],
              ['Yield strength, 0.2% (min)', '205 MPa (170 MPa for L)', '205 MPa (170 MPa for L)'],
              ['Elongation (min)', '40%', '40%'],
              ['Max continuous service', '~870 °C', '~925 °C'],
              ['Max intermittent service', '~870 °C', '~870 °C'],
              ['Magnetic response', 'Non-magnetic annealed; slightly magnetic when cold worked', 'Same behaviour'],
            ],
          },
          {
            type: 'p',
            text: 'Mechanically the two grades are near enough interchangeable — you do not specify 316 for strength. 316 does retain slightly better creep and elevated-temperature strength, but if high temperature is the driver rather than corrosion, 321 (stabilised) or 310 (oxidation resistant to ~1,100 °C) are the correct answers.',
          },
        ],
      },
      {
        id: 'selection',
        heading: 'A practical selection checklist',
        blocks: [
          {
            type: 'ol',
            items: [
              'Are chlorides present? Seawater, brine, coastal air, chlorinated water, many process streams and even some cleaning chemicals all count. If yes, start at 316L.',
              'What is the operating temperature? Above ~60 °C in a chloride environment, step up to duplex rather than relying on 316.',
              'Will it be welded and left as-welded? Specify the L grade or a stabilised grade (321/347).',
              'Is the item hygienic-service? Pharma, dairy and food lines almost always call for 316L with a controlled internal finish — electro-polished fittings and dairy fittings exist for exactly this reason.',
              'Is the exposure purely atmospheric and inland? 304 is very likely sufficient, and paying for 316 is money that adds no service life.',
              'Is there a stress corrosion cracking risk? Both austenitic grades are vulnerable to chloride SCC above roughly 60 °C under tensile stress. Duplex grades are markedly more resistant.',
            ],
          },
          {
            type: 'note',
            title: 'The rule of thumb',
            text: 'Specify 304 when the environment is clean and dry. Specify 316 the moment chlorides enter the picture. Move to duplex when chlorides and temperature or pressure combine.',
          },
        ],
      },
      {
        id: 'buying',
        heading: 'Buying either grade with confidence',
        blocks: [
          {
            type: 'p',
            text: 'Grade markings on the outside of a pipe are not proof of chemistry. When you order, insist on documentation that ties the physical material back to a heat number:',
          },
          {
            type: 'ul',
            items: [
              'A mill test certificate to EN 10204 3.1, issued by the manufacturer\'s QA function, showing heat-wise chemical and mechanical results.',
              'EN 10204 3.2 where the contract requires an independent third-party inspector to witness and countersign — expect additional cost and lead time.',
              'The governing product standard on the certificate: ASTM A312 for austenitic pipe, A403 for buttweld fittings, A182 for forged fittings and flanges, A240 for sheet and plate, A276/A479 for bars.',
              'Positive material identification (PMI) on site for critical lines — a handheld XRF will separate 316 from 304 in seconds by detecting molybdenum.',
            ],
          },
          {
            type: 'p',
            text: 'Ritvik Metal Impex supplies both grades across pipes and tubes, buttweld and forged fittings, flanges, sheets, plates, coils, bars and fasteners, with mill test certificates on every consignment and third-party inspection support where the project calls for it.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Is 316 stainless steel always better than 304?',
        answer:
          'No. 316 is better only where chlorides or aggressive chemicals are present. In clean, dry or inland atmospheric service, 304 delivers the same mechanical performance and the same service life at roughly 20–30% lower cost, so specifying 316 there simply raises project cost without adding value.',
      },
      {
        question: 'How can I tell 304 and 316 apart on site?',
        answer:
          'Visually you cannot — they look identical and both are non-magnetic in the annealed condition. Reliable identification requires either the mill test certificate traced to the heat number, or a handheld XRF analyser (PMI), which detects the 2–3% molybdenum present only in 316.',
      },
      {
        question: 'What does the "L" in 316L mean?',
        answer:
          'It denotes low carbon — a maximum of 0.030% rather than 0.08%. Low carbon prevents chromium carbide precipitation in the weld heat-affected zone, which would otherwise cause sensitisation and intergranular corrosion. Use L grades for welded fabrications.',
      },
      {
        question: 'How much more expensive is 316 than 304?',
        answer:
          'Typically 20–30% more per tonne, though the spread moves with nickel and molybdenum prices on the LME. For an accurate figure, ask for a current quotation against your specific size, form and quantity rather than working from an old percentage.',
      },
      {
        question: 'Can 316 stainless steel be used in seawater?',
        answer:
          'Only with caution and in intermittent or well-flushed exposure. In stagnant natural seawater, chloride levels around 19,000 ppm will pit 316 over time. For continuous seawater service, specify super duplex 2507 (UNS S32750), 6% moly grades, or a suitable nickel alloy.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'duplex-2205-vs-super-duplex-2507',
    title: 'Duplex 2205 vs Super Duplex 2507: A Material Selection Guide',
    seoTitle:
      'Duplex 2205 vs Super Duplex 2507: Which to Specify',
    description:
      'Duplex 2205 vs super duplex 2507: PREN, yield strength, chloride and temperature limits, welding precautions, and when the 30–50% premium pays off.',
    keywords:
      'duplex 2205 vs super duplex 2507, UNS S31803, UNS S32750, duplex stainless steel pipe, super duplex flanges, duplex steel supplier India, PREN duplex, duplex steel stockist Mumbai',
    category: 'Grade Selection',
    readTime: '8 min read',
    datePublished: '2026-02-06',
    dateModified: '2026-08-02',
    image: '/images/products/high-performance-alloys.jpg',
    relatedProductIds: [1, 2, 4, 6, 22],
    intro:
      'Duplex stainless steels give you roughly twice the yield strength of 304/316 with substantially better chloride resistance — which is why offshore, desalination and chemical projects specify them. But 2205 and 2507 are not interchangeable, and the cost gap between them is large enough that over-specifying is an expensive habit.',
    takeaways: [
      'Duplex is a roughly 50/50 austenite–ferrite microstructure — hence double the yield strength of austenitic grades.',
      '2205 (S31803/S32205) has a PREN of 33–36; super duplex 2507 (S32750) exceeds 40.',
      '2507 handles 2–3× the chloride level of 2205 at the same temperature, or the same chloride level 15–20 °C hotter.',
      'Super duplex costs roughly 30–50% more than 2205 — specify it only where the environment genuinely demands it.',
      'Both grades demand controlled heat input and correct annealing; poor welding practice destroys the phase balance.',
    ],
    sections: [
      {
        id: 'what-is-duplex',
        heading: 'What makes a stainless steel "duplex"',
        blocks: [
          {
            type: 'p',
            text: 'Austenitic grades such as 304 and 316 have a single-phase face-centred cubic structure. Duplex grades are deliberately balanced to hold approximately equal proportions of austenite and ferrite. That mixed microstructure delivers three things at once: the ferrite contributes high strength and resistance to chloride stress corrosion cracking, the austenite contributes toughness and general corrosion resistance, and the reduced nickel content makes the grade less exposed to nickel price swings than 316.',
          },
          {
            type: 'p',
            text: 'The practical consequence for a designer is wall thickness. With yield strength roughly double that of 316L, a duplex pipe or vessel can often be specified thinner for the same pressure — recovering a meaningful part of the higher per-kilogram price in reduced weight, smaller supports and lower welding volume.',
          },
        ],
      },
      {
        id: 'comparison',
        heading: '2205 and 2507 side by side',
        blocks: [
          {
            type: 'table',
            columns: ['Property', 'Duplex 2205 (S31803 / S32205)', 'Super Duplex 2507 (S32750)'],
            rows: [
              ['Chromium', '~22%', '~25%'],
              ['Nickel', '~5.5%', '~7%'],
              ['Molybdenum', '~3%', '~4%'],
              ['Nitrogen', '~0.17%', '~0.27%'],
              ['PREN', '33 – 36', '40 – 43'],
              ['Yield strength, 0.2% (min)', '450 MPa', '550 MPa'],
              ['Tensile strength (min)', '620 MPa', '795 MPa'],
              ['Chloride capability', 'Medium to high chloride; brackish water', 'Natural seawater (~19,000 ppm Cl⁻)'],
              ['Practical upper temperature', '~300 °C', '~300 °C'],
              ['Relative cost', 'Baseline', '30 – 50% higher'],
            ],
          },
          {
            type: 'note',
            title: 'S31803 or S32205?',
            text: 'Both are sold as "2205". S32205 is the modern, tightened version with higher guaranteed minimum nitrogen and chromium, which gives more consistent corrosion performance and better weldability. Where the specification allows either, ask your supplier for S32205 dual-certified material.',
          },
        ],
      },
      {
        id: 'when-2205',
        heading: 'When 2205 is the right answer',
        blocks: [
          {
            type: 'ul',
            items: [
              'Onshore chemical and petrochemical process piping where 316L is marginal on chlorides.',
              'Heat exchangers and process tanks handling brackish or moderately chlorinated water.',
              'Pulp and paper bleaching plant, where both chlorides and abrasion are present.',
              'Storage tanks and pressure vessels where the strength advantage allows a thinner shell.',
              'Structural and topside applications in coastal atmospheres.',
            ],
          },
          {
            type: 'p',
            text: 'In these environments 2205 typically delivers the required service life at a materially lower cost than super duplex, and it is far more widely stocked — which matters when you need delivery in days rather than months.',
          },
        ],
      },
      {
        id: 'when-2507',
        heading: 'When super duplex 2507 earns its premium',
        blocks: [
          {
            type: 'ul',
            items: [
              'Seawater cooling, firewater and subsea systems in continuous contact with untreated seawater.',
              'Desalination plants — high chloride concentration combined with elevated temperature.',
              'Offshore oil and gas: umbilicals, manifolds, risers and sour-service components.',
              'Concentrated brine handling and high-chloride evaporator duty.',
              'Any service where 2205 has already been shown to pit or crevice-corrode in practice.',
            ],
          },
          {
            type: 'p',
            text: 'The useful rule: 2507 buys you either 2–3× the chloride concentration at a given temperature, or approximately 15–20 °C more temperature headroom at a given chloride level. If your duty sits comfortably inside 2205\'s envelope, the extra 30–50% is not returning anything.',
          },
        ],
      },
      {
        id: 'fabrication',
        heading: 'Fabrication and welding: where duplex projects go wrong',
        blocks: [
          {
            type: 'p',
            text: 'Duplex performance depends entirely on maintaining the austenite–ferrite balance. Get the thermal cycle wrong and the phase ratio shifts or brittle intermetallic phases form, and the material you installed no longer behaves like the material you specified.',
          },
          {
            type: 'ul',
            items: [
              'Control heat input. Too low and the weld metal becomes excessively ferritic and loses toughness; too high and sigma phase can precipitate. Follow a qualified WPS.',
              'Avoid prolonged exposure between roughly 600 °C and 1,000 °C, where sigma phase forms — super duplex is considerably more sensitive here than 2205.',
              'Use over-alloyed filler metals (typically 2209 for 2205, 2594 for 2507) so weld metal corrosion resistance matches or exceeds the parent material.',
              'Solution anneal and water quench after hot forming, then pickle and passivate to restore the passive film.',
              'Verify ferrite content and corrosion performance where the specification calls for it — ASTM A923 and ASTM G48 testing are common project requirements on super duplex.',
            ],
          },
          {
            type: 'note',
            title: 'Buying tip',
            text: 'On super duplex enquiries, confirm up front whether the project requires ASTM A923 (intermetallic phase detection) and ASTM G48 Method A (pitting corrosion) test reports. These have to be planned into the mill order — retro-fitting them after material has shipped is slow and expensive.',
          },
        ],
      },
      {
        id: 'availability',
        heading: 'Availability, forms and sourcing in India',
        blocks: [
          {
            type: 'p',
            text: 'Duplex and super duplex are supplied in the same product forms as austenitic stainless: seamless and welded pipe (ASTM A790 / A928), buttweld fittings (ASTM A815), forged fittings and flanges (ASTM A182 F51 for 2205, F53/F55 for super duplex), plate and sheet (ASTM A240), and bars (ASTM A276 / A479).',
          },
          {
            type: 'p',
            text: 'Ritvik Metal Impex stocks and sources duplex UNS S31803/S32205 and super duplex UNS S32750/S32760 across pipes, fittings, flanges, plates and bars, supplied with mill test certificates and, where required, third-party inspection by agencies such as Bureau Veritas, TÜV, DNV, SGS and Lloyd\'s Register.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the main difference between duplex 2205 and super duplex 2507?',
        answer:
          'Super duplex 2507 contains more chromium (~25% vs ~22%), molybdenum (~4% vs ~3%) and nitrogen (~0.27% vs ~0.17%). This raises its PREN above 40 versus 33–36 for 2205, and lifts minimum yield strength from 450 MPa to 550 MPa — allowing 2507 to be used in natural seawater, where 2205 would eventually pit.',
      },
      {
        question: 'Is duplex stainless steel stronger than 316?',
        answer:
          'Yes, substantially. Duplex 2205 has a minimum yield strength of about 450 MPa against roughly 205 MPa for 316 — more than double. That often permits thinner walls for the same design pressure, which offsets part of the higher material price.',
      },
      {
        question: 'Can duplex stainless steel be welded like 316?',
        answer:
          'It can be welded with standard processes, but not with the same casual procedure. Duplex requires controlled heat input, over-alloyed filler (2209 for 2205, 2594 for 2507), interpass temperature control and a qualified WPS. Uncontrolled welding shifts the austenite–ferrite balance or precipitates sigma phase, both of which degrade corrosion resistance.',
      },
      {
        question: 'What is the maximum operating temperature for duplex stainless steel?',
        answer:
          'Around 300 °C in practice. Above roughly 300 °C, prolonged exposure risks 475 °C embrittlement and sigma phase formation, and most design codes do not permit duplex above this range. For higher-temperature service, use austenitic grades such as 321, 347 or 310.',
      },
      {
        question: 'Is super duplex worth the extra cost?',
        answer:
          'Only when the environment demands it — continuous seawater, desalination brine, subsea duty or sour service. In moderate-chloride onshore applications, 2205 delivers equivalent service life for 30–50% less, so the premium is only justified where 2205\'s chloride or temperature envelope is genuinely exceeded.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'buttweld-vs-socketweld-vs-threaded-fittings',
    title: 'Buttweld vs Socketweld vs Threaded Fittings: Choosing the Right Joint',
    seoTitle:
      'Buttweld vs Socketweld vs Threaded Pipe Fittings',
    description:
      'Buttweld, socketweld and threaded fittings compared: size ranges, ASME B16.9 and B16.11, Class 3000/6000/9000 and how to pick the right joint.',
    keywords:
      'buttweld vs socketweld fittings, socket weld vs threaded fittings, ASME B16.9, ASME B16.11, class 3000 6000 9000 fittings, forged fittings supplier, buttweld elbow supplier Mumbai, pipe fittings India',
    category: 'Piping Design',
    readTime: '8 min read',
    datePublished: '2026-03-11',
    dateModified: '2026-08-02',
    image: '/images/products/buttweld-fittings.jpg',
    relatedProductIds: [2, 3, 5, 18, 19, 4],
    intro:
      'Three joint types dominate industrial piping, and the choice between them is driven by line size, pressure, inspectability and whether the joint will ever need to come apart. Getting it wrong produces either an unnecessarily expensive piping system or a leak path in a line that should never have had one.',
    takeaways: [
      'Buttweld is the default above 2" NB: full-bore, radiographable, strongest and cleanest.',
      'Socketweld suits small-bore high-pressure lines up to about 2" NB but leaves a crevice and cannot be radiographed.',
      'Threaded joints are for low-pressure, non-critical or utility service, and where dismantling is required.',
      'Forged fitting pressure classes 3000#, 6000# and 9000# come from ASME B16.11; buttweld dimensions from ASME B16.9.',
      'Never use socketweld in a line with severe vibration, cyclic loading or hydrogen service without checking the code.',
    ],
    sections: [
      {
        id: 'buttweld',
        heading: 'Buttweld fittings: the process-piping default',
        blocks: [
          {
            type: 'p',
            text: 'A buttweld fitting is bevelled to match the pipe end and welded around the full circumference, producing a continuous, full-penetration joint with essentially the same bore as the pipe. Dimensions follow ASME B16.9, and the fitting inherits its pressure rating from the pipe wall thickness rather than carrying a separate class.',
          },
          {
            type: 'ul',
            items: [
              'Full bore — no restriction, no turbulence, minimal pressure drop.',
              'Radiographically inspectable, which is why code-critical lines specify it.',
              'No crevice at the joint, so no crevice corrosion initiation site.',
              'Available from 1/4" to 32" NB seamless and up to 48" NB and beyond welded, in schedules 5S to XXS.',
              'Common types: 45° and 90° elbows, equal and reducing tees, concentric and eccentric reducers, caps, stub ends, return bends, crosses.',
            ],
          },
          {
            type: 'p',
            text: 'The trade-off is fabrication effort. Buttweld joints require accurate bevelling, alignment and fit-up, a qualified welder and — usually — NDE. On a small-bore utility line that overhead is disproportionate; on a 12" NB process header it is exactly what you want.',
          },
        ],
      },
      {
        id: 'socketweld',
        heading: 'Socketweld fittings: strength in small bore',
        blocks: [
          {
            type: 'p',
            text: 'A socketweld fitting has a machined recess. The pipe is inserted, backed off approximately 1.5 mm from the shoulder to allow for thermal expansion, and fillet-welded on the outside. Dimensions and pressure classes come from ASME B16.11, and the fittings are forged rather than cast, giving better grain structure and mechanical strength.',
          },
          {
            type: 'table',
            columns: ['Class', 'Typical use', 'Notes'],
            rows: [
              ['3000#', 'Standard high-pressure small-bore process lines', 'Most commonly stocked class'],
              ['6000#', 'Higher pressure service', 'Often matched with heavier schedule pipe (XS/XXS)'],
              ['9000#', 'Extreme pressure, typically threaded and socketweld small bore', 'Specified on hydraulic and high-pressure instrument lines'],
            ],
          },
          {
            type: 'ul',
            items: [
              'Easier fit-up than buttweld — no bevelling, and the socket self-aligns the joint.',
              'Practical up to about 2" NB; beyond that, buttweld is more economical and more inspectable.',
              'The expansion gap is not optional: welding a bottomed-out pipe puts residual stress into the weld root and is a classic cause of cracking.',
              'The internal crevice between pipe OD and socket bore can trap process fluid, so socketweld is generally avoided in high-purity, hygienic and severely corrosive services.',
              'Cannot be radiographed — inspection is limited to visual and surface methods such as dye penetrant or magnetic particle.',
            ],
          },
        ],
      },
      {
        id: 'threaded',
        heading: 'Threaded (screwed) fittings: where dismantling matters',
        blocks: [
          {
            type: 'p',
            text: 'Threaded fittings use NPT or BSP threads and require no welding at all, which makes them the practical choice where hot work is prohibited, where the joint must be opened for maintenance, or on low-pressure utility and instrument lines. They share the ASME B16.11 pressure classes with socketweld fittings.',
          },
          {
            type: 'ul',
            items: [
              'No welding — installable by fitters without welder qualification, and safe in areas where hot work permits are difficult.',
              'Readily dismantled for maintenance, instrument replacement and calibration.',
              'Inherently a leak path: sealant or PTFE tape and correct make-up torque are essential.',
              'Threading reduces the effective wall, so threaded joints are derated relative to welded ones.',
              'Poor choice under vibration or thermal cycling — threads loosen and fatigue-crack at the first engaged thread.',
            ],
          },
          {
            type: 'note',
            title: 'Seal welding',
            text: 'Where a threaded connection is required but leak-tightness is critical, many specifications call for a seal weld over the completed thread. This retains ease of assembly while eliminating the leak path — but note it also eliminates the ability to dismantle.',
          },
        ],
      },
      {
        id: 'decision',
        heading: 'Quick decision matrix',
        blocks: [
          {
            type: 'table',
            columns: ['Criterion', 'Buttweld', 'Socketweld', 'Threaded'],
            rows: [
              ['Typical size range', '2" NB and above', 'Up to 2" NB', 'Up to 2" NB'],
              ['Governing dimensional standard', 'ASME B16.9', 'ASME B16.11', 'ASME B16.11'],
              ['Pressure capability', 'Highest — matches pipe', 'High (3000/6000/9000#)', 'Moderate (derated by threading)'],
              ['Radiographic inspection', 'Yes', 'No', 'No'],
              ['Crevice / dead leg', 'None', 'Yes, at the socket', 'Yes, at the threads'],
              ['Dismantling', 'Cut and re-weld', 'Cut and re-weld', 'Unscrew'],
              ['Installed cost, small bore', 'Higher', 'Moderate', 'Lowest'],
              ['Best for', 'Critical process lines, hazardous fluids', 'Small-bore high-pressure lines', 'Utility, instrument and low-pressure service'],
            ],
          },
        ],
      },
      {
        id: 'materials',
        heading: 'Material grades and what to state on your enquiry',
        blocks: [
          {
            type: 'p',
            text: 'All three fitting types are available across the same grade families, so specify the material standard alongside the joint type:',
          },
          {
            type: 'ul',
            items: [
              'Buttweld: ASTM A403 WP304/304L/316/316L/321/347 (stainless), A234 WPB (carbon steel), A234 WP1/WP5/WP9/WP11/WP22/WP91 (alloy), A815 (duplex), B366 (nickel alloys).',
              'Forged socketweld and threaded: ASTM A182 F304/F316/F321 (stainless), A105 (carbon steel), A350 LF2 (low-temperature carbon steel), A182 F5/F9/F11/F22/F91 (alloy).',
              'State size, schedule or class, end preparation, quantity, applicable NDE and certification level with the enquiry — it removes a full round of clarification emails.',
            ],
          },
          {
            type: 'p',
            text: 'Ritvik Metal Impex supplies buttweld fittings, forged socketweld and screwed fittings, stainless steel bends, ferrule fittings and electro-polished fittings for hygienic service, with mill test certificates and third-party inspection support.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'When should I use socketweld instead of buttweld fittings?',
        answer:
          'Use socketweld on small-bore lines, generally 2" NB and below, where high pressure is present and radiographic inspection is not required. Socketweld is faster to fit up because no bevelling or precise alignment is needed. Above 2" NB, buttweld becomes both more economical and more inspectable.',
      },
      {
        question: 'What is the 1.5 mm gap in a socket weld joint for?',
        answer:
          'The pipe is inserted fully then withdrawn about 1.5 mm before welding, leaving an expansion gap at the socket shoulder. Without it, thermal expansion during welding puts the weld root into tension and can crack the joint. It is a code requirement, not an installation preference.',
      },
      {
        question: 'What do Class 3000, 6000 and 9000 mean on forged fittings?',
        answer:
          'They are ASME B16.11 pressure classes for forged socketweld and threaded fittings. Higher class means heavier wall and higher allowable pressure; 3000# is the standard stock class, 6000# is used with heavier schedule pipe, and 9000# is reserved for extreme-pressure small-bore service.',
      },
      {
        question: 'Can threaded fittings be used in high-pressure service?',
        answer:
          'They are available in high pressure classes, but threading removes material and creates a leak path, so most process specifications restrict threaded joints to low-pressure, non-hazardous or utility lines. Where a threaded connection is unavoidable in critical service, a seal weld over the thread is normally specified.',
      },
      {
        question: 'Which fitting type is cheapest?',
        answer:
          'On small-bore lines, threaded is cheapest installed because it needs no welder or NDE, followed by socketweld and then buttweld. On larger lines the ranking reverses — buttweld becomes the most economical option and is often the only one permitted by the piping class.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'copper-tube-grades-and-standards',
    title: 'Copper Tubes, Strips and Wires: Grades, Standards and Applications',
    seoTitle:
      'Copper Tube Grades & Standards: B88, B280, B111',
    description:
      'Copper grades explained: ETP vs DHP, ASTM B88 Types K/L/M, B280 ACR tube, B111 condenser tube, temper, busbar strip and enamelled winding wire.',
    keywords:
      'copper tube grades, ASTM B88 type K L M, ASTM B280 ACR copper tube, ASTM B111 condenser tube, ETP copper C11000, DHP copper C12200, super enameled copper wire, copper strips busbar, copper tube supplier India',
    category: 'Non-Ferrous',
    readTime: '9 min read',
    datePublished: '2026-04-08',
    dateModified: '2026-08-02',
    image: '/images/products/copper-tubes.jpg',
    relatedProductIds: [11, 14, 15, 16, 17, 12, 13],
    intro:
      'Copper is specified for two very different reasons — its electrical and thermal conductivity, and its behaviour in water and refrigerant service. The grade and temper you need depend on which of those two you are buying it for, and the standards are easy to mix up.',
    takeaways: [
      'C11000 ETP copper maximises conductivity; C12200 DHP copper is deoxidised for brazing and water service.',
      'ASTM B88 covers plumbing water tube in Types K, L and M by wall thickness; B280 covers ACR tube for HVAC and refrigeration.',
      'ACR tube is sold by actual outside diameter, plumbing tube by nominal size — the two size conventions do not match.',
      'DHP copper resists hydrogen embrittlement, which is why ETP should not be brazed in a reducing atmosphere.',
      'Enamelled winding wire is specified by conductor size plus thermal class (155, 180, 200, 220 °C) and grade of build.',
    ],
    sections: [
      {
        id: 'grades',
        heading: 'The copper grades you will actually be quoted',
        blocks: [
          {
            type: 'table',
            columns: ['Grade', 'UNS', 'Key characteristic', 'Typical use'],
            rows: [
              ['ETP — Electrolytic Tough Pitch', 'C11000', '≥99.90% Cu, ~101% IACS conductivity, contains residual oxygen', 'Busbars, electrical conductors, strips, wire'],
              ['DHP — Phosphorus Deoxidised, High Residual P', 'C12200', 'Oxygen removed with phosphorus; excellent brazing and welding', 'Plumbing tube, ACR tube, heat exchangers'],
              ['DLP — Phosphorus Deoxidised, Low Residual P', 'C12000', 'Deoxidised with minimal conductivity loss', 'Applications needing both brazing and conductivity'],
              ['OFE / OFHC — Oxygen Free', 'C10100 / C10200', 'Oxygen-free, highest purity and hydrogen resistance', 'Vacuum, semiconductor, high-reliability electronics'],
            ],
          },
          {
            type: 'p',
            text: 'The distinction that catches people out is oxygen. ETP copper contains a small amount of residual oxygen as cuprous oxide. Heat it above roughly 400 °C in a hydrogen-bearing or reducing atmosphere and the hydrogen reacts with that oxide to form steam inside the metal, cracking it from within — hydrogen embrittlement. DHP copper has the oxygen chemically removed with phosphorus, which is exactly why plumbing and refrigeration tube, which is brazed on site, is made from C12200 rather than C11000.',
          },
          {
            type: 'note',
            title: 'The trade-off',
            text: 'That residual phosphorus in DHP lowers electrical conductivity to roughly 85% IACS against ETP\'s 101%. Use DHP where the tube will be brazed; use ETP where the job is carrying current.',
          },
        ],
      },
      {
        id: 'tube-standards',
        heading: 'Copper tube standards: B88, B280 and B111',
        blocks: [
          {
            type: 'p',
            text: 'Three ASTM specifications cover the great majority of copper tube purchased for building services and process plant, and they are not interchangeable.',
          },
          {
            type: 'table',
            columns: ['Standard', 'Covers', 'Sizing convention', 'Typical application'],
            rows: [
              ['ASTM B88', 'Seamless copper water tube', 'Nominal size; OD is 1/8" larger than nominal', 'Potable water, plumbing, general fluid lines'],
              ['ASTM B280', 'Seamless copper tube for air conditioning & refrigeration (ACR)', 'Actual outside diameter', 'HVAC, refrigeration field service, split AC lines'],
              ['ASTM B111', 'Copper and copper alloy seamless condenser tube and ferrule stock', 'Actual OD and wall gauge', 'Condensers, heat exchangers, evaporators'],
            ],
          },
          {
            type: 'p',
            text: 'ASTM B88 tube is graded by wall thickness rather than by grade, and the types are colour-coded in the trade:',
          },
          {
            type: 'ul',
            items: [
              'Type K — heaviest wall. Underground service lines, buried mains, high-pressure duty.',
              'Type L — medium wall. The general-purpose choice for interior water distribution and HVAC.',
              'Type M — thinnest of the pressure types. Low-pressure interior water lines where codes permit.',
              'DWV — drain, waste and vent. Non-pressure drainage only.',
            ],
          },
          {
            type: 'note',
            title: 'Do not substitute plumbing tube for ACR tube',
            text: 'B280 ACR tube is cleaned, dehydrated and capped or nitrogen-charged at the mill so that no moisture or oil enters the refrigerant circuit. B88 plumbing tube carries no such requirement. Using plumbing tube on a refrigeration line introduces moisture that will freeze at the expansion device and degrade the compressor oil.',
          },
        ],
      },
      {
        id: 'temper',
        heading: 'Temper: hard drawn, half hard and annealed',
        blocks: [
          {
            type: 'ul',
            items: [
              'Hard drawn (H58) — rigid straight lengths, higher strength, needs fittings at every direction change. Standard for exposed plumbing risers and busbar stock.',
              'Half hard (H55) — a compromise where limited forming is needed.',
              'Annealed / soft (O60) — supplied in coils, bendable by hand or with a former. Standard for ACR line sets, instrument lines and underground runs where joints are undesirable.',
            ],
          },
          {
            type: 'p',
            text: 'Temper affects allowable working pressure as well as formability, so always state it on the enquiry — "1/2 inch copper tube" without a temper and standard reference is not a specification a mill can price accurately.',
          },
        ],
      },
      {
        id: 'strips-profiles',
        heading: 'Copper strips, sections and busbar profiles',
        blocks: [
          {
            type: 'p',
            text: 'Beyond tube, copper is supplied as flat strip, rectangular busbar and drawn profiles. Here the driver is almost always conductivity, so ETP C11000 dominates, with oxygen-free grades used where reliability requirements are highest.',
          },
          {
            type: 'ul',
            items: [
              'Busbars for switchgear, panel boards, substations and electrolysis plant — supplied to size with edges radiused as required.',
              'Earthing strips and lightning protection tape.',
              'Copper sections and profiles for transformers, commutators, and current-carrying hardware.',
              'Copper strips for heat sinks, roofing, gaskets and pressed components.',
            ],
          },
          {
            type: 'p',
            text: 'When enquiring for busbar, quote the cross-section, temper, length, edge condition and any plating (tin or silver) requirement — plated busbar has a substantially longer lead time than bright copper.',
          },
        ],
      },
      {
        id: 'winding-wire',
        heading: 'Copper wire and super enamelled winding wire',
        blocks: [
          {
            type: 'p',
            text: 'Bare copper wire is specified simply by diameter, temper and grade. Enamelled — or "super enamelled" — winding wire adds a polymer insulation film, and this is where specification detail matters, because the enamel determines the thermal life of the motor or transformer it is wound into.',
          },
          {
            type: 'table',
            columns: ['Thermal class', 'Typical enamel', 'Typical application'],
            rows: [
              ['155 (Class F)', 'Polyester / modified polyester', 'General-purpose motors, small transformers'],
              ['180 (Class H)', 'Polyesterimide', 'Industrial motors, ballasts, higher-duty windings'],
              ['200 (Class C-ish)', 'Polyesterimide with polyamide-imide overcoat', 'Hermetic compressor motors, high-temperature duty'],
              ['220', 'Polyamide-imide topcoat systems', 'Traction motors, aerospace, severe thermal duty'],
            ],
          },
          {
            type: 'ul',
            items: [
              'State conductor diameter to the standard you work in — SWG, AWG or metric IEC 60317 sizes.',
              'State grade of build (Grade 1, 2 or 3), which sets the enamel film thickness and the breakdown voltage.',
              'State whether self-bonding or solderable enamel is required — it changes the mill product entirely.',
            ],
          },
        ],
      },
      {
        id: 'brass',
        heading: 'Where brass fits in',
        blocks: [
          {
            type: 'p',
            text: 'Brass is copper alloyed with zinc, and it is chosen when machinability, wear behaviour or cost matter more than pure conductivity. Free-cutting brass rod (typically CuZn39Pb3 / C38500) machines far faster than copper, which is why fittings, valve bodies, sanitary fittings and turned components are made from it. Admiralty and aluminium brass tubes are specified for condenser and heat-exchanger duty in water-cooled service.',
          },
          {
            type: 'ul',
            items: [
              'Brass rods — hex, round and square, for CNC-turned components, fasteners and fittings.',
              'Brass tubes — heat exchanger, condenser and decorative applications.',
              'Dezincification-resistant grades where potable water contact is prolonged.',
            ],
          },
          {
            type: 'p',
            text: 'Ritvik Metal Impex supplies copper tubes, copper tube sections, copper strips and profiles, copper wires, super enamelled copper wires, brass tubes and brass rods, sourced from established mills and despatched with test certificates.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between ETP and DHP copper?',
        answer:
          'ETP copper (C11000) retains residual oxygen and offers the highest electrical conductivity, around 101% IACS, making it ideal for busbars and conductors. DHP copper (C12200) has the oxygen removed using phosphorus, which makes it safe to braze and weld without hydrogen embrittlement, at the cost of conductivity falling to roughly 85% IACS. Tube for water and refrigerant service is DHP; electrical products are ETP.',
      },
      {
        question: 'Can I use ASTM B88 plumbing tube for an air conditioning line?',
        answer:
          'No. ACR tube to ASTM B280 is cleaned, dehydrated and sealed at the mill so no moisture or oil enters the refrigerant circuit, and it is sized by actual outside diameter rather than nominal size. Plumbing tube has neither the cleanliness requirement nor the same sizing, and using it introduces moisture that damages the expansion device and compressor.',
      },
      {
        question: 'What do Type K, L and M mean on copper tube?',
        answer:
          'They denote wall thickness under ASTM B88 for the same nominal size. Type K is the thickest and is used underground and for high pressure, Type L is the general-purpose interior choice, and Type M is the thinnest pressure type for low-pressure interior water lines. DWV is a separate, non-pressure drainage type.',
      },
      {
        question: 'How do I specify super enamelled copper wire?',
        answer:
          'Give the conductor diameter in your working standard (SWG, AWG or metric per IEC 60317), the thermal class of the enamel (155, 180, 200 or 220), the grade of build which sets film thickness, and any special requirement such as self-bonding or solderable enamel. Those four items are enough for a mill to quote accurately.',
      },
      {
        question: 'Which copper grade is used for busbars?',
        answer:
          'ETP copper C11000 is the standard busbar material because of its ~101% IACS conductivity. Oxygen-free grades C10100/C10200 are used where the busbar will be brazed or where the highest reliability is required, such as in vacuum or semiconductor equipment.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'mill-test-certificate-en-10204-ibr-guide',
    title: 'Mill Test Certificates, IBR and Third-Party Inspection: A Buyer\'s Guide',
    seoTitle:
      'EN 10204 3.1 vs 3.2 Mill Test Certificates & IBR',
    description:
      'What EN 10204 2.1, 2.2, 3.1 and 3.2 certificates prove, how to read an MTC, when IBR Forms III-A and III-C apply, and how third-party inspection works.',
    keywords:
      'EN 10204 3.1 vs 3.2, mill test certificate, MTC steel, IBR certificate Form IIIA IIIC, third party inspection agencies, heat number traceability, PMI testing, IBR approved pipe supplier India',
    category: 'Quality & Compliance',
    readTime: '8 min read',
    datePublished: '2026-05-20',
    dateModified: '2026-08-02',
    image: '/images/products/sheets-plates-coils.jpg',
    relatedProductIds: [1, 6, 4, 2, 8],
    intro:
      'Two consignments of "ASTM A312 TP316L pipe" can be priced 15% apart, and the gap is almost never the steel — it is the documentation and inspection behind it. Understanding what each certificate type actually guarantees is the fastest way to stop comparing quotations that are not comparable.',
    takeaways: [
      'EN 10204 defines the certificate types: 2.1 and 2.2 are non-specific, 3.1 and 3.2 are specific to your consignment.',
      'A 3.1 certificate is issued by the manufacturer\'s QA function, independent of production — the industry default.',
      'A 3.2 certificate is countersigned by an independent third-party inspector; expect extra cost and 2–4 weeks of lead time.',
      'Heat number traceability is the whole point — the number on the certificate must be stamped on the material.',
      'In India, steam service under the Indian Boiler Regulations needs IBR forms: Form III-A for pipes, Form III-C for fittings.',
    ],
    sections: [
      {
        id: 'en10204',
        heading: 'EN 10204: what each certificate type actually means',
        blocks: [
          {
            type: 'table',
            columns: ['Type', 'Name', 'Issued & validated by', 'Specific to your material?'],
            rows: [
              ['2.1', 'Declaration of compliance', 'Manufacturer', 'No — a statement, with no test results'],
              ['2.2', 'Test report', 'Manufacturer', 'No — results from non-specific inspection'],
              ['3.1', 'Inspection certificate 3.1', 'Manufacturer\'s authorised inspection representative, independent of the production department', 'Yes — results from your actual heat/batch'],
              ['3.2', 'Inspection certificate 3.2', 'Manufacturer\'s representative and an independent third-party inspector or the purchaser\'s representative', 'Yes — witnessed and countersigned'],
            ],
          },
          {
            type: 'p',
            text: 'The critical divide sits between 2.x and 3.x. A 2.1 or 2.2 document tells you what the product family generally achieves. A 3.1 or 3.2 certificate reports tests carried out on the specific heat of material being delivered to you, tied to a heat or cast number that is also stamped or marked on the product itself. For anything going into a pressure system, 3.1 should be your floor.',
          },
          {
            type: 'note',
            title: 'On terminology',
            text: '"MTC", "mill certificate", "test certificate" and "EN 10204 3.1" are used interchangeably in the trade, and that looseness hides real differences. Write the certificate type into your purchase order rather than asking for "an MTC" and hoping.',
          },
        ],
      },
      {
        id: 'reading',
        heading: 'How to read a mill test certificate',
        blocks: [
          {
            type: 'ol',
            items: [
              'Heat / cast number — the single most important field. It must match the marking on the pipe, plate or fitting. If it does not, the certificate does not belong to that material.',
              'Product standard and grade — for example ASTM A312 TP316L. Check that it matches your purchase order exactly, including the L suffix and any dual certification.',
              'Chemical composition — verify against the standard\'s limits, and specifically check molybdenum on 316 (2.0–3.0%) and carbon on L grades (≤0.030%).',
              'Mechanical properties — tensile, yield, elongation and, where applicable, hardness and impact values at the specified test temperature.',
              'Heat treatment condition — solution annealing temperature and quench method for austenitic and duplex products.',
              'Non-destructive testing — hydrostatic or eddy current test results for pipe, ultrasonic testing for plate and forgings.',
              'Additional tests where specified — intergranular corrosion (ASTM A262 Practice E), ferrite content, ASTM A923 and G48 for duplex.',
              'Signature and stamp — a 3.1 carries the manufacturer\'s inspection authority; a 3.2 also carries the third-party inspector\'s stamp and report number.',
            ],
          },
          {
            type: 'p',
            text: 'For processed items such as buttweld fittings, ask for the mother material certificate as well as the finished-product certificate. A fitting made by hot-forming a pipe inherits the chemistry of that pipe, and full traceability means being able to follow the chain back to the original heat.',
          },
        ],
      },
      {
        id: 'ibr',
        heading: 'IBR: the Indian requirement that surprises importers',
        blocks: [
          {
            type: 'p',
            text: 'The Indian Boiler Regulations, 1950 apply to boilers and boiler-connected piping used in India. Material for steam service under IBR is chemically the same as its ASTM equivalent — A106 Gr. B, A335 P11/P22, A516 Gr. 70 and so on — but it must be inspected during manufacture by an IBR-approved inspecting authority and issued on the prescribed forms.',
          },
          {
            type: 'ul',
            items: [
              'Form III-A — issued for pipes and tubes intended for IBR service.',
              'Form III-C — issued by a fitting manufacturer for fittings, countersigned by the approved inspecting authority.',
              'Form II — material used in boiler construction such as plates.',
              'Countersignature must come from an IBR-approved inspecting authority — a state boiler inspector or an approved agency.',
            ],
          },
          {
            type: 'note',
            title: 'Plan IBR at the enquiry stage',
            text: 'IBR inspection happens at the mill, during manufacture. It cannot be added to stock material after the fact — a pipe that was not witnessed and stamped at the mill cannot retrospectively become IBR material. If your project needs IBR, it must be on the enquiry, not on the delivery note.',
          },
        ],
      },
      {
        id: 'tpi',
        heading: 'Third-party inspection: what the agency actually does',
        blocks: [
          {
            type: 'p',
            text: 'Third-party inspection agencies act for the purchaser at the manufacturer\'s works. On a typical stage-wise inspection they will review the manufacturer\'s test plan against the specification, witness mechanical and corrosion testing, verify dimensions and markings, check heat number traceability, witness hydrostatic testing and then release the material for despatch under a report.',
          },
          {
            type: 'ul',
            items: [
              'Common agencies on Indian and export projects: Bureau Veritas, TÜV, DNV, SGS, Lloyd\'s Register, Intertek and RITES.',
              'Client and EPC in-house inspection is also common — for example L&T, NTPC, EIL, BHEL and Reliance, each with their own vendor approval and inspection regimes.',
              'The inspection release note (IRN) or release note for material (RNM) is the document that permits despatch — check it is issued before arranging transport.',
              'TPI is what converts a 3.1 certificate into a 3.2 certificate; it does not change the metal, it changes the level of independent assurance.',
            ],
          },
        ],
      },
      {
        id: 'procurement',
        heading: 'Getting this right in your enquiry',
        blocks: [
          {
            type: 'p',
            text: 'Most documentation disputes trace back to an enquiry that was silent on documentation. A complete enquiry line should state:',
          },
          {
            type: 'ul',
            items: [
              'Product, standard, grade and dimensional standard — e.g. "Pipe, ASTM A312 TP316L, seamless, 4" NB SCH 40S, ASME B36.19M".',
              'Quantity, length and end preparation.',
              'Certification level — EN 10204 3.1 or 3.2, and who the third party will be if 3.2.',
              'Any special tests — IGC per ASTM A262 Practice E, PMI, impact testing, ferrite count, ASTM A923/G48 for duplex.',
              'IBR requirement, if the material is for steam service in India.',
              'Marking requirements and packing standard for export consignments.',
            ],
          },
          {
            type: 'p',
            text: 'Ritvik Metal Impex supplies material with mill test certificates as standard, arranges IBR-certified material where the application requires it, and supports third-party inspection by agencies including Bureau Veritas, TÜV, DNV, SGS and Lloyd\'s Register, as well as client inspection by leading Indian EPC and PSU buyers.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between EN 10204 3.1 and 3.2 certificates?',
        answer:
          'A 3.1 certificate is issued and validated by the manufacturer\'s own inspection representative, who must be independent of the production department. A 3.2 certificate covers the same tests but is additionally witnessed and countersigned by an independent third-party inspector or the purchaser\'s representative. 3.2 costs more and typically adds two to four weeks of lead time.',
      },
      {
        question: 'Is a mill test certificate proof that the material is genuine?',
        answer:
          'Only when the heat number on the certificate matches the marking physically stamped on the material, and the certificate is a specific type 3.1 or 3.2. A type 2.1 declaration or 2.2 test report is not specific to your consignment. For critical service, back the paperwork with positive material identification (PMI) on receipt.',
      },
      {
        question: 'When is IBR certification required in India?',
        answer:
          'IBR applies to boilers and boiler-connected steam piping operating under the Indian Boiler Regulations, 1950. Material for such service must be inspected during manufacture by an IBR-approved inspecting authority and supplied with the prescribed forms — Form III-A for pipes and Form III-C for fittings.',
      },
      {
        question: 'Can IBR certification be arranged after the material is manufactured?',
        answer:
          'No. IBR inspection is a stage-wise activity carried out at the mill during manufacture, and the material is stamped at that point. Stock material that was not inspected and stamped at the mill cannot be certified retrospectively, so the requirement has to be stated at enquiry stage.',
      },
      {
        question: 'What is a heat number and why does it matter?',
        answer:
          'A heat or cast number identifies the specific batch of molten metal a product was made from. All chemical and mechanical test results on a 3.1 or 3.2 certificate relate to that heat. It is the link between a piece of steel in your yard and the test data that proves it meets specification, which is why it must appear both on the certificate and on the material.',
      },
    ],
  },
  /* ================================================================== */
  {
    slug: 'flange-types-pressure-classes-asme-b16-5',
    title: 'Flanges Explained: Types, Faces and Pressure Classes under ASME B16.5',
    seoTitle:
      'ASME B16.5 Flange Types, Classes & Faces Explained',
    description:
      'ASME B16.5 flanges: weld neck vs slip-on, Class 150 to 2500 ratings, RF vs FF vs RTJ faces, gasket pairing, materials and an enquiry checklist.',
    keywords:
      'ASME B16.5 flange, weld neck vs slip on flange, flange pressure class 150 300 600, RTJ vs raised face flange, blind flange, lap joint flange, ASME B16.47 large diameter flange, flange supplier Mumbai, flanges stockist India',
    category: 'Piping Design',
    readTime: '9 min read',
    datePublished: '2026-06-17',
    dateModified: '2026-08-13',
    image: '/images/products/flanges.jpg',
    relatedProductIds: [4, 2, 3, 7, 1],
    intro:
      'A flange is the joint you design in so the system can be taken apart again — for maintenance, for inspection, for replacing a valve. Choosing one means answering three separate questions: which type, which pressure class, and which face. Get any of the three wrong and the joint either leaks, does not bolt up, or costs far more than it needed to.',
    takeaways: [
      'ASME B16.5 covers NPS 1/2 to 24 in Classes 150, 300, 400, 600, 900, 1500 and 2500; above 24" the standard is ASME B16.47.',
      'Weld neck is the default for critical, high-pressure and cyclic service; slip-on is the economical choice for moderate duty.',
      'Class is a rating, not a pressure. Class 300 carbon steel holds roughly 740 psi at ambient against 285 psi for Class 150 — and both derate as temperature rises.',
      'Raised face (RF) is the general-service standard; flat face (FF) is for cast-iron and GRP equipment; RTJ is for high-pressure gas and sour service.',
      'Both halves of a joint must match on class, face and bolt pattern — flanges of the same nominal size in different classes will not mate.',
    ],
    sections: [
      {
        id: 'types',
        heading: 'The seven flange types and where each belongs',
        blocks: [
          {
            type: 'table',
            columns: ['Type', 'How it attaches', 'Best for', 'Watch out for'],
            rows: [
              ['Weld Neck', 'Butt weld to pipe via a long tapered hub', 'Critical, high-pressure, high-temperature and cyclic service', 'Highest cost; needs accurate bevelling and a bore matched to the pipe schedule'],
              ['Slip-On', 'Slides over the pipe, fillet welded inside and out', 'General service, moderate pressure, cost-sensitive work', 'Generally limited to Class 600; lower fatigue strength than weld neck'],
              ['Blind', 'Bolts on with no bore', 'Sealing a pipe end, vessel opening or future tie-in point', 'Thick sections in high classes get heavy — plan the lift'],
              ['Socket Weld', 'Pipe inserted into a socket, fillet welded outside', 'Small-bore high-pressure lines', 'Internal crevice; avoid in hygienic or severely corrosive service'],
              ['Threaded', 'Screwed onto a threaded pipe end', 'Low-pressure utility lines and areas where hot work is prohibited', 'Leak path at the threads; poor under vibration'],
              ['Lap Joint', 'Rotates freely over a stub end', 'Lines needing frequent dismantling, or dissimilar-metal savings', 'Needs a matching stub end; lower fatigue rating'],
              ['Reducing', 'Bolt pattern of the larger size, bore of the smaller', 'Changing size at an existing flanged connection', 'Not a substitute for a proper reducer where flow matters'],
            ],
          },
          {
            type: 'p',
            text: 'The lap joint deserves a mention buyers often miss. Because only the stub end touches the process fluid, the loose backing flange can be plain carbon steel while the stub end is stainless or a nickel alloy. On an exotic-alloy line, that split can take a meaningful amount out of the material cost.',
          },
        ],
      },
      {
        id: 'classes',
        heading: 'What "Class 150" actually means',
        blocks: [
          {
            type: 'p',
            text: 'A pressure class is a rating designation, not a pressure in psi. The allowable working pressure for a given class depends on the material group and, critically, on temperature — every class derates as the metal gets hotter. Two flanges of the same nominal size in different classes have different thicknesses, bolt circles, bolt counts and bolt sizes, so they physically cannot be bolted together.',
          },
          {
            type: 'table',
            columns: ['Class', 'Approx. carbon steel rating at ambient', 'Typical service'],
            rows: [
              ['150', '~285 psi (~20 bar)', 'Utility lines, low-pressure water, general plant service'],
              ['300', '~740 psi (~51 bar)', 'The workhorse class for process piping'],
              ['600', '~1,480 psi (~102 bar)', 'Higher-pressure hydrocarbon and steam service'],
              ['900 / 1500', '~2,220 / ~3,705 psi', 'High-pressure gas, wellhead and compressor lines'],
              ['2500', '~6,170 psi', 'Extreme pressure — typically small bore, often RTJ'],
            ],
          },
          {
            type: 'note',
            title: 'Always check the temperature column',
            text: 'The figures above are ambient. A Class 150 carbon steel flange rated around 285 psi at 38 °C falls to roughly 170 psi by 200 °C and keeps dropping. Read the pressure–temperature rating table in ASME B16.5 for your specific material group rather than working from the class number alone.',
          },
          {
            type: 'p',
            text: 'Above NPS 24 you leave ASME B16.5 entirely. Large-diameter flanges from NPS 26 to 60 are covered by ASME B16.47, which has two incompatible series — Series A (formerly MSS SP-44) and Series B (formerly API 605). They differ in bolt circle and thickness, so the series must be stated on the enquiry.',
          },
        ],
      },
      {
        id: 'faces',
        heading: 'Face types and the gaskets that go with them',
        blocks: [
          {
            type: 'ul',
            items: [
              'Raised Face (RF) — the industry default. A small raised area concentrates bolt load onto a narrower gasket area, improving sealing. Paired with spiral wound or flat ring gaskets.',
              'Flat Face (FF) — the full face contacts the gasket. Specified when mating to cast iron, GRP or other brittle equipment flanges, where a raised face would bend the flange and crack the casting.',
              'Ring Type Joint (RTJ) — a machined groove takes a solid metal ring gasket, usually oval or octagonal soft iron, low-carbon steel or stainless. The metal-to-metal seal is what high-pressure gas, sour service and wellhead applications require.',
              'Tongue and groove, male and female — specialised faces used where the gasket must be positively retained or prevented from contacting the process fluid.',
            ],
          },
          {
            type: 'note',
            title: 'The most expensive site mistake',
            text: 'Never bolt a raised face flange to a flat face cast-iron flange. The raised face acts as a fulcrum and the bolt load bends the cast flange until it cracks — usually during hydrotest, occasionally later. If the equipment side is FF, the pipe side must be FF with a full-face gasket.',
          },
        ],
      },
      {
        id: 'materials',
        heading: 'Material grades and how to match them',
        blocks: [
          {
            type: 'ul',
            items: [
              'Carbon steel — ASTM A105 for ambient and moderate temperature; ASTM A350 LF2 where low-temperature impact testing is required.',
              'Stainless steel — ASTM A182 F304/F304L/F316/F316L for corrosion resistance, F321/F347 for stabilised high-temperature service.',
              'Alloy steel — ASTM A182 F5, F9, F11, F22 and F91 for elevated temperature and creep service.',
              'Duplex and super duplex — ASTM A182 F51 (2205), F53 (2507) and F55 (S32760) for chloride-rich duty.',
              'Nickel alloys — ASTM B564 in Monel, Inconel and Hastelloy for aggressive chemical and high-temperature environments.',
            ],
          },
          {
            type: 'p',
            text: 'Match the flange material group to the pipe it is welded to, and match the bolting separately: ASTM A193 B7 studs with A194 2H nuts is the standard carbon and alloy steel combination, with B8/B8M for stainless service and L7/4L for low temperature. Bolting is where a well-specified flange order most often falls down.',
          },
        ],
      },
      {
        id: 'enquiry',
        heading: 'Writing a flange enquiry that can actually be priced',
        blocks: [
          {
            type: 'p',
            text: 'A flange line item is not complete until all seven of these are stated. Sending an enquiry without them guarantees a round of clarification emails before anyone can quote:',
          },
          {
            type: 'ol',
            items: [
              'Type — weld neck, slip-on, blind, socket weld, threaded, lap joint or reducing.',
              'Nominal size (NPS) — and for weld neck, the bore, which is set by the mating pipe schedule.',
              'Pressure class — 150, 300, 600, 900, 1500 or 2500.',
              'Facing — RF, FF or RTJ, plus the finish where it matters (serrated spiral, smooth) and the ring number for RTJ.',
              'Material specification and grade — for example ASTM A182 F316L, not just "stainless".',
              'Dimensional standard — ASME B16.5, or B16.47 Series A or B above NPS 24.',
              'Certification and testing — EN 10204 3.1 or 3.2, plus any PMI, impact, IGC or hardness requirement.',
            ],
          },
          {
            type: 'p',
            text: 'Ritvik Metal Impex supplies weld neck, slip-on, blind, socket weld, lap joint, spectacle, ring joint and orifice flanges from 1/2" to 24" NB in Class 150# to 2500#, in carbon steel, stainless steel, alloy steel, duplex and nickel alloy grades, with mill test certificates and third-party inspection support.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a weld neck and a slip-on flange?',
        answer:
          'A weld neck flange has a long tapered hub that is butt welded to the pipe, transferring stress smoothly into the pipe wall — which is why it is specified for high-pressure, high-temperature and cyclic service. A slip-on flange slides over the pipe and is fillet welded inside and out. It is cheaper and easier to align but has lower fatigue strength and is generally limited to Class 600 and below.',
      },
      {
        question: 'Does Class 150 mean the flange holds 150 psi?',
        answer:
          'No. Class is a rating designation, not a pressure. A Class 150 carbon steel flange is rated around 285 psi at ambient temperature, and that figure derates as temperature rises. Always read the pressure–temperature table in ASME B16.5 for the specific material group rather than reading the class number as a pressure.',
      },
      {
        question: 'Can I bolt a Class 150 flange to a Class 300 flange?',
        answer:
          'No. Different classes have different bolt circle diameters, bolt counts and bolt sizes, so the holes will not line up. Both halves of a flanged joint must share the same nominal size, pressure class and facing type.',
      },
      {
        question: 'When should I use an RTJ flange instead of a raised face flange?',
        answer:
          'RTJ is specified where a metal-to-metal seal is required — high-pressure gas service, sour service to NACE MR0175, and wellhead or high-temperature applications, typically from Class 600 upwards. Raised face with a spiral wound gasket remains the standard for general process service.',
      },
      {
        question: 'What standard covers flanges larger than 24 inches?',
        answer:
          'ASME B16.47, which covers NPS 26 to 60 in two incompatible series: Series A (formerly MSS SP-44) and Series B (formerly API 605). They differ in bolt circle and thickness, so the series must be specified on the enquiry — a Series A flange will not mate with a Series B flange.',
      },
    ],
  },
  /* ================================================================== */
  {
    slug: 'nickel-alloys-monel-inconel-hastelloy-guide',
    title: 'Nickel Alloys Compared: Monel 400, Inconel 625 and Hastelloy C-276',
    seoTitle: 'Monel 400 vs Inconel 625 vs Hastelloy C-276 Guide',
    description:
      'Monel 400, Inconel 625 and Hastelloy C-276 compared: chemistry, acid and seawater resistance, temperature limits, cost order and how to pick the right nickel alloy.',
    keywords:
      'Monel 400 vs Inconel 625, Hastelloy C276, nickel alloy selection guide, UNS N04400, UNS N06625, UNS N10276, Inconel 600 625 718, nickel alloy pipe fittings supplier, high performance alloys India, nickel alloy stockist Mumbai',
    category: 'Grade Selection',
    readTime: '10 min read',
    datePublished: '2026-07-22',
    dateModified: '2026-08-15',
    image: '/images/products/high-performance-alloys.jpg',
    relatedProductIds: [22, 1, 2, 4, 5, 8],
    intro:
      'When stainless steel and even super duplex stop coping, the next step is a nickel-base alloy. These are not interchangeable premium metals — each one was developed for a specific chemical enemy, and the cheapest correct choice is rarely the most expensive alloy on the shelf. Picking by reputation instead of by service environment is how projects end up paying four times the price for worse performance.',
    takeaways: [
      'There is no universally best nickel alloy. Match the alloy to the specific corrosive species, not to a general idea of "aggressive service".',
      'Monel 400 (Ni-Cu) owns seawater and hydrofluoric acid, but has no chromium and performs poorly in oxidising acids.',
      'Inconel 625 (Ni-Cr-Mo-Nb) is the all-rounder: high-temperature strength plus broad corrosion resistance.',
      'Hastelloy C-276 (Ni-Mo-Cr) is the reducing-acid specialist — hot hydrochloric, sulphuric and wet chlorine.',
      'Cost rises roughly Monel 400 < Inconel 625 < Hastelloy C-276, so over-specifying is expensive in a way stainless never is.',
    ],
    sections: [
      {
        id: 'why-nickel',
        heading: 'Why nickel alloys exist at all',
        blocks: [
          {
            type: 'p',
            text: 'Austenitic stainless steels protect themselves with a chromium oxide film. That film is excellent in oxidising conditions and in mildly aggressive service, but it breaks down in two situations: strong reducing acids, which dissolve it, and high chloride concentrations, which pit through it. Raise the temperature and both problems accelerate.',
          },
          {
            type: 'p',
            text: 'Nickel-base alloys solve this by making nickel the matrix rather than iron. Nickel is inherently resistant to reducing conditions and to chloride stress corrosion cracking, and it dissolves large amounts of chromium, molybdenum and other elements without going brittle. That lets metallurgists tune an alloy for a specific chemical environment — which is exactly why buying "a nickel alloy" without naming the grade means nothing.',
          },
        ],
      },
      {
        id: 'comparison',
        heading: 'The three workhorse grades side by side',
        blocks: [
          {
            type: 'table',
            columns: ['', 'Monel 400 (N04400)', 'Inconel 625 (N06625)', 'Hastelloy C-276 (N10276)'],
            rows: [
              ['Alloy system', 'Nickel–copper', 'Nickel–chromium–molybdenum–niobium', 'Nickel–molybdenum–chromium'],
              ['Nickel', '~63% min', '~58% min', '~57%'],
              ['Chromium', 'None', '20–23%', '14.5–16.5%'],
              ['Molybdenum', 'None', '8–10%', '15–17%'],
              ['Other', 'Cu 28–34%', 'Nb+Ta 3.15–4.15%', 'W 3–4.5%'],
              ['Signature strength', 'Seawater and hydrofluoric acid', 'High-temperature strength with broad corrosion resistance', 'Reducing acids and wet chlorine'],
              ['Practical temperature ceiling', '~480 °C', '~980 °C', '~1,040 °C (corrosion-limited well below this)'],
              ['Relative cost', 'Lowest of the three', 'Higher', 'Highest'],
            ],
          },
          {
            type: 'note',
            title: 'Trade names vs UNS numbers',
            text: 'Monel, Inconel, Incoloy and Hastelloy are trademarks, not specifications. Always order against the UNS number and the product standard — N04400, N06625, N10276 — so equivalent material from any approved mill can be supplied and there is no ambiguity on the certificate.',
          },
        ],
      },
      {
        id: 'monel',
        heading: 'Monel 400 — the seawater and HF specialist',
        blocks: [
          {
            type: 'p',
            text: 'Monel 400 is roughly two-thirds nickel and one-third copper. That combination gives outstanding resistance to flowing seawater, brine and alkaline media, and it is one of very few materials that handles hydrofluoric acid well across a wide concentration range. It also has excellent resistance to chloride stress corrosion cracking, the failure mode that limits 316 in hot chloride service.',
          },
          {
            type: 'ul',
            items: [
              'Seawater piping, heat exchangers, pump and valve components in marine and offshore service.',
              'Hydrofluoric acid alkylation units — a classic Monel 400 application in refineries.',
              'Caustic and alkaline process equipment.',
              'Crude distillation overhead systems where hydrochloric acid condenses.',
            ],
          },
          {
            type: 'note',
            title: 'Where Monel fails',
            text: 'Monel 400 contains no chromium, so it is poor in oxidising environments. Nitric acid, ferric and cupric salts, and oxidising acid mixtures will attack it rapidly. Stagnant seawater is also a problem — Monel relies on flow to maintain its film and can suffer pitting under deposits or in dead legs.',
          },
        ],
      },
      {
        id: 'inconel',
        heading: 'Inconel 625 — the versatile all-rounder',
        blocks: [
          {
            type: 'p',
            text: 'Inconel 625 combines chromium for oxidation resistance, molybdenum for pitting and crevice resistance, and niobium, which stiffens the matrix through solid-solution strengthening. The result is unusual: an alloy that keeps meaningful strength at temperatures where stainless steel has gone soft, while also resisting a wide range of chemical attack and seawater.',
          },
          {
            type: 'ul',
            items: [
              'Flare stacks, bellows, expansion joints and exhaust components in high-temperature service.',
              'Offshore headers, seawater manifolds and subsea hardware.',
              'Weld overlay and cladding on carbon steel vessels — a common way to get 625 performance at a fraction of the solid-alloy cost.',
              'Chemical process equipment handling mixed acids and oxidising conditions.',
              'Flue gas desulphurisation, where acidic chloride condensate attacks stainless.',
            ],
          },
          {
            type: 'p',
            text: 'Because 625 is strong as well as corrosion resistant, it is often the right answer when the design problem is mechanical and chemical at the same time. If the only problem is corrosion at moderate temperature, a cheaper alloy may do the same job.',
          },
        ],
      },
      {
        id: 'hastelloy',
        heading: 'Hastelloy C-276 — for reducing acids and wet chlorine',
        blocks: [
          {
            type: 'p',
            text: 'C-276 carries the highest molybdenum content of the three at 15–17%, with tungsten added and carbon kept very low. Molybdenum is what confers resistance to reducing acids, so C-276 handles hot hydrochloric and sulphuric acid, wet chlorine gas and hypochlorite — environments that destroy both stainless steel and Monel. Its low carbon and low silicon mean it can usually be welded and used in the as-welded condition without a post-weld solution anneal.',
          },
          {
            type: 'ul',
            items: [
              'Chlorination systems, hypochlorite bleaching and chlorine dioxide plant.',
              'Sulphuric and hydrochloric acid process equipment, including pickling lines.',
              'Flue gas desulphurisation scrubbers and ducting.',
              'Pharmaceutical and fine chemical reactors handling mixed and variable acid streams.',
              'Sour gas service with combined H₂S, CO₂ and chlorides.',
            ],
          },
          {
            type: 'note',
            title: 'The versatility premium',
            text: 'C-276 is often specified precisely because a plant does not know exactly what it will be handling — it tolerates both oxidising and reducing conditions, which is rare. That flexibility is real, but it is also the most expensive of the three. If your process chemistry is well defined and stable, a cheaper alloy frequently matches it in service life.',
          },
        ],
      },
      {
        id: 'others',
        heading: 'The other grades you will be quoted',
        blocks: [
          {
            type: 'table',
            columns: ['Grade', 'UNS', 'Why it gets specified'],
            rows: [
              ['Inconel 600', 'N06600', 'Ni-Cr for high-temperature oxidation and carburisation resistance; furnace and heat-treatment hardware'],
              ['Inconel 601', 'N06601', 'Added aluminium for superior oxidation resistance at very high temperature'],
              ['Inconel 718', 'N07718', 'Age-hardenable — very high strength; fasteners, springs, turbine and downhole components'],
              ['Incoloy 800/800H/800HT', 'N08800/N08810/N08811', 'Iron-nickel-chromium; heat exchanger and furnace tubing where creep matters'],
              ['Incoloy 825', 'N08825', 'Titanium-stabilised with Cu and Mo; sulphuric and phosphoric acid service at lower cost than 625'],
              ['Alloy 20 (Carpenter 20)', 'N08020', 'Purpose-built for sulphuric acid; often the economical answer before reaching for C-276'],
              ['Hastelloy C-22', 'N06022', 'Higher chromium than C-276; better in oxidising and mixed-acid service'],
              ['Titanium Gr. 2 / Gr. 7', 'R50400 / R52400', 'Not a nickel alloy, but the usual alternative in oxidising chlorides and seawater'],
            ],
          },
          {
            type: 'p',
            text: 'Incoloy 825 and Alloy 20 deserve particular attention from buyers. Both sit between stainless steel and the premium nickel alloys in both performance and price, and both are routinely skipped by specifiers who jump straight from 316L to C-276. On sulphuric and phosphoric acid duty they are frequently the correct and far cheaper answer.',
          },
        ],
      },
      {
        id: 'selection',
        heading: 'A selection method that avoids over-specifying',
        blocks: [
          {
            type: 'ol',
            items: [
              'Name the corrosive species precisely. "Acid" is not a specification — hydrochloric, sulphuric, nitric and hydrofluoric each point to a different alloy.',
              'Establish concentration and temperature together. Many alloys are fine in cold acid and fail in the same acid hot; corrosion rate roughly doubles for every 10 °C in many systems.',
              'Decide whether the environment is oxidising or reducing. Oxidising favours chromium (625, C-22, titanium); reducing favours molybdenum (C-276, Alloy 20).',
              'Check for chlorides and for hydrogen sulphide. Sour service brings NACE MR0175 / ISO 15156 requirements on hardness and heat treatment that constrain both grade and supply route.',
              'Establish the mechanical duty. If temperature and stress are both high, 625 or 718 may be required for strength even when a cheaper alloy would resist the chemistry.',
              'Consider clad or lined construction. Weld overlay of 625 or C-276 onto a carbon steel substrate delivers the same wetted surface for a fraction of the solid-alloy cost on large vessels.',
              'Confirm availability before committing. Exotic grades in unusual sizes carry long mill lead times; the second-best alloy in stock often beats the best one twenty weeks out.',
            ],
          },
          {
            type: 'note',
            title: 'Ask for corrosion data, not opinions',
            text: 'Alloy producers publish isocorrosion charts showing corrosion rate against acid concentration and temperature. For anything critical, select against those charts — or run coupon tests in the actual process stream — rather than against a general reputation for toughness.',
          },
        ],
      },
      {
        id: 'buying',
        heading: 'Buying nickel alloys with confidence',
        blocks: [
          {
            type: 'p',
            text: 'Nickel alloys cost many times what stainless does, which makes them the most attractive target for substitution and mis-declaration anywhere in the metals supply chain. Tighten your documentation accordingly:',
          },
          {
            type: 'ul',
            items: [
              'Order against UNS numbers and the correct product standard — ASTM B444 and B705 for 625 pipe and tube, B564 for forgings and flanges, B366 for fittings, B443 and B575 for plate and sheet, B164 for Monel rod.',
              'Insist on EN 10204 3.1 as a minimum, with heat number traceability; specify 3.2 with third-party witness on critical orders.',
              'Make positive material identification (PMI) a receiving-inspection requirement. Handheld XRF distinguishes these grades in seconds and is cheap relative to the material value.',
              'Specify corrosion testing where the standard offers it — ASTM G28 Method A for intergranular attack on nickel-chromium-molybdenum alloys is commonly required.',
              'For sour service, state NACE MR0175 / ISO 15156 compliance explicitly, including the hardness limit and delivery condition.',
              'Ask for the material condition: solution annealed, and for 718, the specific age-hardening treatment, since properties differ dramatically between conditions.',
            ],
          },
          {
            type: 'p',
            text: 'Ritvik Metal Impex supplies high-performance nickel alloys — Monel, Inconel, Incoloy, Hastelloy and titanium — as pipes and tubes, buttweld and forged fittings, flanges, ferrule fittings, valves, sheets, plates and bars, with mill test certificates, PMI on request and third-party inspection support from agencies including Bureau Veritas, TÜV, DNV, SGS and Lloyd\'s Register.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between Monel, Inconel and Hastelloy?',
        answer:
          'They are different alloy systems for different enemies. Monel 400 is nickel-copper with no chromium — best for seawater, alkalis and hydrofluoric acid. Inconel 625 is nickel-chromium-molybdenum-niobium — an all-rounder combining high-temperature strength with broad corrosion resistance. Hastelloy C-276 is nickel-molybdenum-chromium with the highest molybdenum of the three — the specialist for reducing acids such as hot hydrochloric and sulphuric, and for wet chlorine.',
      },
      {
        question: 'Which nickel alloy is best for seawater?',
        answer:
          'Monel 400 is the traditional choice for flowing seawater and is usually the most economical of the nickel alloys for that duty, though it needs flow and suffers under stagnant conditions or deposits. Inconel 625 performs better in stagnant seawater and in crevices, and is preferred for subsea and offshore hardware where the extra cost is justified.',
      },
      {
        question: 'Is Hastelloy C-276 always better than Inconel 625?',
        answer:
          'No. C-276 has more molybdenum and is better in reducing acids and wet chlorine, but 625 has more chromium and performs better in oxidising conditions and at high temperature, where it also retains greater strength. C-276 is also the more expensive of the two, so specifying it for oxidising or high-temperature duty can mean paying more for worse performance.',
      },
      {
        question: 'Can nickel alloys replace stainless steel everywhere?',
        answer:
          'Technically in most cases, but it is rarely economic. Nickel alloys cost several times more than 316L per kilogram. They are justified where stainless is genuinely failing — reducing acids, high chlorides at temperature, hydrofluoric acid, wet chlorine or sustained high-temperature service. In ordinary process duty, specifying nickel alloy over stainless buys no additional service life.',
      },
      {
        question: 'How do I verify that nickel alloy material is genuine?',
        answer:
          'Combine documentation with testing. Require an EN 10204 3.1 or 3.2 certificate whose heat number matches the marking on the material, order against the UNS number and product standard rather than a trade name, and make positive material identification with a handheld XRF analyser a receiving-inspection requirement. Given the value of these alloys, PMI on receipt is inexpensive insurance.',
      },
    ],
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);

export const articleSlugs = articles.map((a) => a.slug);
