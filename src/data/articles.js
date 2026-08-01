/**
 * Long-form editorial content for the Knowledge Hub (/blog).
 *
 * Each article is a buying / specification guide written around the product
 * range Ritvik Metal Impex actually stocks, so the content, the internal links
 * and the commercial intent all point at the same pages.
 *
 * Block types understood by ArticlePage:
 *   { type: 'p',       text }
 *   { type: 'list',    ordered?, items: [] }
 *   { type: 'table',   headers: [], rows: [[]], caption? }
 *   { type: 'callout', title, text }
 *   { type: 'quote',   text }
 */

export const articles = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'ss-304-vs-ss-316-which-stainless-steel-grade-to-choose',
    title: 'SS 304 vs SS 316: Which Stainless Steel Grade Should You Actually Buy?',
    metaTitle: 'SS 304 vs SS 316 Stainless Steel: Complete Selection Guide (2026)',
    metaDescription:
      'SS 304 vs SS 316 compared on composition, PREN, corrosion resistance, temperature limits, weldability and price. A practical grade-selection guide for pipes, fittings, flanges and bars from a Mumbai stockist.',
    keywords:
      'ss 304 vs ss 316, 304 vs 316 stainless steel, difference between 304 and 316, stainless steel grade selection, 316L pipe, 304L pipe, PREN value stainless steel, stainless steel supplier Mumbai',
    excerpt:
      'The most expensive mistake in a piping package is not buying the wrong size — it is buying the wrong grade. Here is how 304, 304L, 316, 316L, 321 and Duplex 2205 actually differ, and how to pick between them without over-specifying.',
    image: '/images/products/pipes-tubes.jpg',
    category: 'Material Selection',
    readTime: 11,
    publishedAt: '2026-06-18',
    updatedAt: '2026-08-01',
    relatedProducts: [
      'stainless-steel-pipes-and-tubes',
      'buttweld-pipe-fittings',
      'industrial-flanges',
      'stainless-steel-round-square-hex-bars',
    ],
    intro:
      'Ask ten buyers what separates SS 304 from SS 316 and nine will say "316 has molybdenum". That is correct, and it is also where most grade decisions go wrong — because molybdenum only matters if your service environment contains the thing molybdenum protects against. Over-specify and you pay 25–40% more per tonne for corrosion resistance you will never use. Under-specify and you replace a line in eighteen months. This guide walks through how the two grades differ chemically, what that does in service, and where the other austenitic grades — 304L, 316L, 321, 347 and Duplex 2205 — fit in.',
    sections: [
      {
        id: 'composition',
        heading: 'The chemistry: what actually changes between 304 and 316',
        blocks: [
          {
            type: 'p',
            text: 'Both grades are austenitic stainless steels — non-magnetic in the annealed condition, face-centred cubic, and hardenable only by cold work rather than heat treatment. The difference is a deliberate 2–3% molybdenum addition in 316, balanced by slightly higher nickel to keep the structure austenitic.',
          },
          {
            type: 'table',
            caption: 'Indicative composition limits per ASTM A240 / A312 (wt %)',
            headers: ['Element', 'SS 304', 'SS 304L', 'SS 316', 'SS 316L'],
            rows: [
              ['Carbon (max)', '0.08', '0.030', '0.08', '0.030'],
              ['Chromium', '18.0 – 20.0', '18.0 – 20.0', '16.0 – 18.0', '16.0 – 18.0'],
              ['Nickel', '8.0 – 10.5', '8.0 – 12.0', '10.0 – 14.0', '10.0 – 14.0'],
              ['Molybdenum', '—', '—', '2.00 – 3.00', '2.00 – 3.00'],
              ['Manganese (max)', '2.00', '2.00', '2.00', '2.00'],
            ],
          },
          {
            type: 'p',
            text: 'Note the trade-off that catches people out: 316 has *less* chromium than 304, not more. Its superiority is not general oxidation resistance — it is specifically resistance to localised pitting and crevice attack in chloride-bearing environments, which is what the molybdenum delivers.',
          },
          {
            type: 'callout',
            title: 'The one number worth memorising: PREN',
            text: 'Pitting Resistance Equivalent Number = %Cr + 3.3 × %Mo + 16 × %N. Typical values: SS 304 ≈ 18–19, SS 316 ≈ 24–26, Duplex 2205 ≈ 34–36, Super Duplex 2507 ≈ 42+. A higher PREN means the alloy tolerates a higher chloride concentration and temperature before pitting initiates. It is a ranking tool, not a design limit — but it settles most 304-vs-316 arguments in one line.',
          },
        ],
      },
      {
        id: 'when-304',
        heading: 'When SS 304 is the correct — and cheaper — answer',
        blocks: [
          {
            type: 'p',
            text: '304 remains the workhorse of the stainless world for good reason: it covers roughly 60–70% of industrial demand, it is the most widely stocked grade in every size and form, and it is the cheapest austenitic grade with genuine corrosion resistance. Specify it with confidence for:',
          },
          {
            type: 'list',
            items: [
              'Potable water, demineralised water and low-chloride process water systems.',
              'Compressed air, nitrogen, steam condensate and general utility piping.',
              'Structural and architectural fabrication — handrails, cladding, frames, brackets.',
              'Food and dairy equipment handling non-acidic, non-brine products.',
              'Furnace and heat-treatment fixtures operating in dry air below about 870°C intermittent.',
              'General machining stock for shafts, spacers, pins and fastener blanks.',
            ],
          },
          {
            type: 'p',
            text: 'A useful working rule from field experience: if the chloride content of the process fluid stays below roughly 200 ppm at ambient temperature, and there is no seawater, no de-icing salt exposure and no coastal salt spray, 304 will normally outlast the equipment it is installed in. Above that, the calculation changes quickly — chloride tolerance falls sharply as temperature rises, which is why a 304 line that is perfectly stable at 25°C can pit within months at 60°C at the same concentration.',
          },
        ],
      },
      {
        id: 'when-316',
        heading: 'When you genuinely need SS 316 or 316L',
        blocks: [
          {
            type: 'p',
            text: 'The molybdenum in 316 repairs the passive chromium-oxide film faster when chloride ions break it down locally. That single mechanism is why 316 dominates in these applications:',
          },
          {
            type: 'list',
            items: [
              'Marine and coastal installations, splash zones and any plant within a few kilometres of the sea — Mumbai, Chennai, Kandla, Jamnagar and Vizag plants routinely default to 316 for this reason alone.',
              'Chemical and petrochemical process lines carrying acids, chlorides, brines or solvents.',
              'Pharmaceutical, biotech and API equipment, where 316L is effectively the industry default and is usually specified together with an electropolished surface finish.',
              'Desalination, effluent treatment and cooling-water systems using brackish or recirculated water.',
              'Pulp, paper and textile bleaching lines with chlorine-based chemistry.',
              'Food processing involving brine, vinegar, tomato, citrus or high-salt products.',
            ],
          },
          {
            type: 'callout',
            title: '316 is not a licence to ignore chlorides',
            text: 'Even 316 has limits. Chloride stress corrosion cracking (CSCC) attacks austenitic grades above roughly 50–60°C in the presence of tensile stress and chlorides, and 316 buys you only modest headroom over 304. Where CSCC is a credible risk, the correct step up is a duplex grade (2205, PREN ≈ 35) or a high-nickel alloy — not a thicker wall of 316.',
          },
        ],
      },
      {
        id: 'l-grades',
        heading: 'The "L" question: when low carbon is worth paying for',
        blocks: [
          {
            type: 'p',
            text: 'The L in 304L and 316L means carbon capped at 0.030% instead of 0.08%. The purpose is narrow but important. When standard-carbon austenitic steel is held between roughly 425°C and 815°C — which happens in the heat-affected zone of every weld — chromium carbides precipitate at the grain boundaries. That locally strips chromium from the surrounding metal, leaving a sensitised zone that corrodes preferentially. The failure mode is intergranular corrosion, and it shows up as cracking parallel to the weld weeks or months after commissioning.',
          },
          {
            type: 'p',
            text: 'Practical guidance:',
          },
          {
            type: 'list',
            items: [
              'Welded assemblies, especially in wall thicknesses above about 5 mm where post-weld solution annealing is impractical — specify L grade.',
              'Corrosive service plus welding — specify L grade, and ask for an ASTM A262 Practice E (Strauss test) result on the Mill Test Certificate.',
              'Bolted, machined or mechanically joined components with no welding — standard carbon is fine and marginally stronger.',
              'Sustained service above about 500°C — avoid L grades; their lower carbon reduces creep strength. Use 321 (titanium-stabilised) or 347 (niobium-stabilised) instead, which resist sensitisation without sacrificing high-temperature strength.',
            ],
          },
          {
            type: 'p',
            text: 'In practice most mills now supply dual-certified material — marked 304/304L or 316/316L — that simultaneously meets the low carbon limit of the L grade and the higher mechanical minimums of the standard grade. If your enquiry allows it, dual-certified stock is almost always the commercially smarter buy because it satisfies both specifications from one heat.',
          },
        ],
      },
      {
        id: 'comparison',
        heading: 'Side-by-side: 304, 316, 321 and Duplex 2205',
        blocks: [
          {
            type: 'table',
            caption: 'Indicative properties in the annealed condition. Verify against the governing ASTM/EN specification for your order.',
            headers: ['Property', 'SS 304', 'SS 316', 'SS 321', 'Duplex 2205'],
            rows: [
              ['PREN (approx.)', '18–19', '24–26', '17–19', '34–36'],
              ['Min. tensile strength', '515 MPa', '515 MPa', '515 MPa', '620 MPa'],
              ['Min. yield (0.2%)', '205 MPa', '205 MPa', '205 MPa', '450 MPa'],
              ['Max. continuous service temp.', '~870°C', '~870°C', '~900°C', '~300°C'],
              ['Chloride pitting resistance', 'Low', 'Good', 'Low', 'Excellent'],
              ['Relative cost (304 = 1.0)', '1.0', '1.25 – 1.4', '1.4 – 1.6', '1.6 – 2.0'],
              ['Common pipe standard', 'A312 TP304', 'A312 TP316', 'A312 TP321', 'A790 UNS S31803'],
            ],
          },
          {
            type: 'p',
            text: 'Duplex 2205 deserves a closer look than it usually gets in Indian tendering. Its yield strength is roughly double that of 316, which frequently allows a thinner wall for the same design pressure. On large-bore lines that thickness saving can offset most of the price premium per kilogram — and you get PREN 35 corrosion performance as a bonus. Run the numbers on a weight basis before dismissing it on a rate basis.',
          },
        ],
      },
      {
        id: 'standards',
        heading: 'Matching grade to the right product standard',
        blocks: [
          {
            type: 'p',
            text: 'A grade name alone is not a specification. "316 pipe" tells a supplier nothing about whether you need seamless or welded, boiler-quality or general service, or which dimensional tolerance applies. Quote the product standard alongside the grade:',
          },
          {
            type: 'table',
            headers: ['Product form', 'Governing standard', 'Typical designation'],
            rows: [
              ['Seamless & welded pipe', 'ASTM A312 / A358', 'TP304L, TP316L, TP321'],
              ['Boiler & heat exchanger tube', 'ASTM A213 / A249', 'TP304H, TP316L'],
              ['General service tubing', 'ASTM A269 / A270', 'TP316L (sanitary: A270)'],
              ['Buttweld fittings', 'ASTM A403 + ASME B16.9', 'WP304L, WP316L'],
              ['Forged fittings', 'ASTM A182 + ASME B16.11', 'F304L, F316L (Class 3000/6000/9000)'],
              ['Flanges', 'ASTM A182 + ASME B16.5 / B16.47', 'F304L, F316L (Class 150 – 2500)'],
              ['Bars', 'ASTM A276 / A479', '304, 316, 316L, 410'],
              ['Sheet, plate & coil', 'ASTM A240', '304, 316L, 321, 2205'],
            ],
          },
          {
            type: 'callout',
            title: 'A complete enquiry line looks like this',
            text: '"ASTM A312 TP316L seamless pipe, 4 inch NB, Schedule 40S, solution annealed and pickled, random lengths, EN 10204 3.1 MTC, IGC test per ASTM A262 Practice E." Everything the mill and the inspector need is in one sentence — and you will get a firm price the same day instead of three rounds of clarification.',
          },
        ],
      },
      {
        id: 'buying',
        heading: 'Buying notes: cost, availability and avoiding counterfeit grades',
        blocks: [
          {
            type: 'p',
            text: 'Stainless pricing is dominated by the alloy surcharge — nickel and molybdenum move with LME and the surcharge tracks them monthly. That is why a 316 quotation from March and one from August can differ by 15% on identical material with no change in base price. When you compare offers, always compare on the same quotation date.',
          },
          {
            type: 'p',
            text: 'Grade substitution is a real risk in the Indian secondary market. The most common swaps are 202 supplied as 304 (202 uses manganese in place of much of the nickel and corrodes visibly within months outdoors), and 316 supplied where 316L was ordered. Two cheap defences:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Insist on Positive Material Identification (PMI) by handheld XRF at the time of dispatch or receipt. It takes seconds per piece and will immediately expose a 202-for-304 substitution and a missing molybdenum content.',
              'Require an EN 10204 3.1 Mill Test Certificate that is traceable to the heat number physically marked on the material — and actually check that the heat number on the paperwork matches the stamp on the pipe.',
            ],
          },
          {
            type: 'p',
            text: 'A magnet is not a grade test, despite the persistent myth. Annealed 304 and 316 are both essentially non-magnetic, but cold-worked 304 becomes noticeably magnetic, and plenty of genuine 304 will attract a magnet after bending or machining. The test tells you about the processing history, not the chemistry.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is SS 316 always better than SS 304?',
        a: 'No. SS 316 is better in chloride-bearing environments — seawater, brine, coastal air, many process chemicals — because of its 2–3% molybdenum. In clean water, air, steam and general structural service, 304 performs identically and costs 25–40% less. 316 also has slightly lower chromium than 304, so it is not superior in every respect.',
      },
      {
        q: 'What is the price difference between SS 304 and SS 316?',
        a: 'SS 316 typically costs 25–40% more than SS 304 for the same product form, driven by its higher nickel content and the 2–3% molybdenum addition. The exact gap moves monthly with the alloy surcharge, which tracks LME nickel and molybdenum prices, so compare quotations issued on the same date.',
      },
      {
        q: 'When should I specify 316L instead of 316?',
        a: 'Specify 316L whenever the component will be welded and cannot be solution annealed afterwards — typically wall thicknesses above about 5 mm — or whenever the welded assembly will see corrosive service. The 0.030% maximum carbon prevents chromium carbide precipitation in the heat-affected zone and the intergranular corrosion that follows. For continuous service above roughly 500°C, use 321 or 347 rather than an L grade.',
      },
      {
        q: 'Can I tell 304 from 316 with a magnet?',
        a: 'No. Both grades are essentially non-magnetic when annealed, and both become magnetic after cold work such as bending, machining or roll forming. The only reliable field check is Positive Material Identification with a handheld XRF analyser, which reads the molybdenum content directly.',
      },
      {
        q: 'What does PREN mean and what value do I need?',
        a: 'PREN (Pitting Resistance Equivalent Number) = %Cr + 3.3 × %Mo + 16 × %N. It ranks alloys by resistance to chloride pitting. SS 304 is around 18, SS 316 around 25, Duplex 2205 around 35 and Super Duplex 2507 above 42. As a rough guide, ambient seawater service needs PREN above 32–35; general chloride-bearing process water is usually served by PREN 25.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'buttweld-vs-socketweld-vs-threaded-pipe-fittings',
    title: 'Buttweld vs Socketweld vs Threaded Fittings: Choosing the Right Joint',
    metaTitle: 'Buttweld vs Socketweld vs Threaded Pipe Fittings — Selection Guide',
    metaDescription:
      'Compare buttweld (ASME B16.9), forged socketweld and threaded (ASME B16.11) pipe fittings on pressure class, size range, cost, inspection and failure modes. Practical selection guide for process piping.',
    keywords:
      'buttweld vs socketweld fittings, threaded pipe fittings, ASME B16.9, ASME B16.11, forged fittings class 3000 6000 9000, pipe fitting selection, buttweld fittings supplier Mumbai',
    excerpt:
      'Buttweld, socketweld and threaded fittings are not interchangeable — each has a size ceiling, a pressure class logic and a characteristic failure mode. A field-oriented comparison with the code rules that govern the choice.',
    image: '/images/products/buttweld-fittings.jpg',
    category: 'Piping Design',
    readTime: 10,
    publishedAt: '2026-06-29',
    updatedAt: '2026-08-01',
    relatedProducts: [
      'buttweld-pipe-fittings',
      'forged-socketweld-screwed-fittings',
      'stainless-steel-bends',
      'industrial-flanges',
    ],
    intro:
      'Most piping specifications settle this question with a single line — "socketweld up to 1½ inch, buttweld 2 inch and above" — and for the majority of plants that line is correct. But it is a summary of engineering reasoning, not a rule of nature, and knowing the reasoning tells you when the line does not apply: in cyclic service, in sanitary systems, in high-vibration instrument tubing, and in any line where the inspection budget matters more than the fabrication budget.',
    sections: [
      {
        id: 'buttweld',
        heading: 'Buttweld fittings: the full-bore standard for 2 inch and above',
        blocks: [
          {
            type: 'p',
            text: 'A buttweld fitting is bevelled at each end and welded directly to a matching bevel on the pipe, producing a continuous full-penetration joint. Dimensionally it is governed by ASME B16.9, and the wall thickness follows the pipe schedule — Sch 5S through XXS — so the bore is uninterrupted through the fitting.',
          },
          {
            type: 'p',
            text: 'That continuity is the whole point. There is no crevice, no annular gap, no change in flow area and no stress concentration at the joint. It gives you:',
          },
          {
            type: 'list',
            items: [
              'The lowest pressure drop of any fitting type — critical on long runs and pump suction lines.',
              'The best fatigue performance, because the joint has no built-in geometric notch.',
              'Full volumetric inspectability: the weld can be radiographed or ultrasonically tested end to end.',
              'A smooth internal bore that can be pigged, polished, drained and cleaned in place.',
            ],
          },
          {
            type: 'p',
            text: 'The costs are fabrication-side. Buttwelding requires bevel preparation, accurate alignment and fit-up, a qualified welder, root-pass control (usually GTAW with argon back-purging on stainless to prevent sugaring), and NDT. Below about 2 inch NB, that effort per joint stops being justifiable — the joints get more numerous, alignment gets fiddlier, and radiography of a ¾ inch weld is disproportionately expensive.',
          },
          {
            type: 'callout',
            title: 'Long radius vs short radius',
            text: 'Long radius (1.5D) elbows are the default: gentler flow transition, lower pressure drop, lower erosion at the extrados. Short radius (1D) elbows exist for congested layouts where the space simply is not there, and they cost you a measurably higher pressure drop and faster wear in erosive service. For pigged pipelines, 3D and 5D bends are required so the pig can negotiate the turn. Do not let a piping draughtsman substitute 1D for 1.5D purely to fit a drawing.',
          },
        ],
      },
      {
        id: 'socketweld',
        heading: 'Socketweld fittings: strong, compact, and easy to get wrong',
        blocks: [
          {
            type: 'p',
            text: 'A socketweld fitting is a forging with a machined recess. The pipe slides into the socket and a fillet weld is laid around the outside. Dimensions and pressure classes follow ASME B16.11, and the fittings are made to ASTM A182 (stainless and alloy) or ASTM A105 (carbon steel), in Class 3000, 6000 and 9000.',
          },
          {
            type: 'p',
            text: 'The appeal is practical: no bevelling, self-aligning, no root pass, no back-purging, no filler metal falling into the bore. A competent fitter can make a sound socketweld joint far faster than a buttweld joint, which is why small-bore utility, instrument and drain piping is overwhelmingly socketweld.',
          },
          {
            type: 'callout',
            title: 'The 1.6 mm gap that causes most socketweld failures',
            text: 'ASME B31.3 requires an expansion gap — commonly about 1.6 mm (1/16 inch) — between the pipe end and the bottom of the socket. Bottoming the pipe out and then welding traps thermal expansion stress at the weld root, and the joint cracks in service. The standard field method is to insert the pipe fully, pull it back roughly 1.6 mm, mark it, then weld. It is the single most common socketweld defect and it is entirely avoidable.',
          },
          {
            type: 'p',
            text: 'Understand the limitations too. The socket creates a crevice between pipe OD and socket bore — an ideal site for crevice corrosion and for product entrapment, which is exactly why socketweld fittings are prohibited in sanitary and high-purity systems. The fillet weld also acts as a stress raiser, so ASME B31.3 restricts socketweld construction in severe cyclic service. And the joint cannot be volumetrically inspected: you get liquid penetrant or magnetic particle examination of the surface, and nothing more.',
          },
          {
            type: 'table',
            caption: 'Forged fitting pressure classes (ASME B16.11) and the pipe schedules they normally pair with',
            headers: ['Class', 'Typical matching schedule', 'Typical application'],
            rows: [
              ['Class 3000', 'Sch 80 / 80S', 'General utility, instrument and drain piping'],
              ['Class 6000', 'Sch 160', 'High-pressure process, steam, hydraulic lines'],
              ['Class 9000', 'XXS', 'Severe high-pressure service, hydraulic power units'],
            ],
          },
        ],
      },
      {
        id: 'threaded',
        heading: 'Threaded (screwed) fittings: where they still belong',
        blocks: [
          {
            type: 'p',
            text: 'Threaded fittings use NPT (ASME B1.20.1) or BSP taper threads and are covered by the same ASME B16.11 classes as socketweld. They need no welding at all, which makes them the right answer in three situations: where hot work is prohibited or impractical, where the joint must be dismantled routinely for maintenance or instrument calibration, and in low-pressure utility, plumbing and fire-protection work.',
          },
          {
            type: 'p',
            text: 'Against that, the thread cuts into the pipe wall — a Sch 40 pipe threaded to NPT can lose 30–50% of its wall at the root of the thread — so the joint is the weakest point in the line by design. Threaded joints also loosen under vibration and thermal cycling, and they leak more readily than any welded alternative. Most process specifications either ban them outright above Class 150 service or require them to be seal-welded, which sacrifices the dismantlability that was the reason to use them in the first place.',
          },
          {
            type: 'p',
            text: 'For instrumentation, there is a better option than threads: ferrule (compression) fittings. A two-ferrule design swages onto the tube OD to give a leak-tight, vibration-resistant, fully dismantlable connection without cutting into the wall — which is why impulse lines, analyser panels and hydraulic control circuits use them almost universally.',
          },
        ],
      },
      {
        id: 'comparison',
        heading: 'Decision table',
        blocks: [
          {
            type: 'table',
            headers: ['Criterion', 'Buttweld', 'Socketweld', 'Threaded'],
            rows: [
              ['Standard', 'ASME B16.9', 'ASME B16.11', 'ASME B16.11'],
              ['Usual size range', '2" NB and above', '¼" – 4" NB', '¼" – 4" NB'],
              ['Joint strength', 'Equal to pipe', 'High, but notched', 'Reduced by thread depth'],
              ['Pressure capability', 'Matches pipe schedule', 'Class 3000 – 9000', 'Class 3000 – 6000'],
              ['Pressure drop', 'Lowest', 'Slight step at socket', 'Slight step at thread'],
              ['Volumetric NDT possible', 'Yes (RT / UT)', 'No (surface PT/MT only)', 'Not applicable'],
              ['Cyclic / vibration service', 'Best', 'Restricted by B31.3', 'Poor'],
              ['Sanitary / high purity', 'Yes, with ID grinding', 'No — crevice', 'No'],
              ['Dismantlable', 'No', 'No', 'Yes'],
              ['Installed cost per joint', 'Highest', 'Moderate', 'Lowest'],
            ],
          },
        ],
      },
      {
        id: 'materials',
        heading: 'Getting the material grade right across the joint',
        blocks: [
          {
            type: 'p',
            text: 'A fitting must be metallurgically compatible with the pipe it joins, not merely similar. The standard pairings:',
          },
          {
            type: 'list',
            items: [
              'ASTM A312 TP316L pipe → ASTM A403 WP316L buttweld fittings → ASTM A182 F316L forged fittings and flanges.',
              'ASTM A106 Gr. B carbon steel pipe → ASTM A234 WPB buttweld fittings → ASTM A105 forged fittings.',
              'ASTM A335 P11/P22/P91 alloy steel pipe → ASTM A234 WP11/WP22/WP91 → ASTM A182 F11/F22/F91.',
              'ASTM A790 duplex pipe → ASTM A815 WPS31803 → ASTM A182 F51/F53.',
            ],
          },
          {
            type: 'p',
            text: 'Two practical cautions. First, mixing standard-carbon and low-carbon grades across a weld (316 fitting onto 316L pipe) undermines the reason the L grade was specified — the sensitisation risk simply moves to the fitting side. Second, Cr-Mo alloy grades such as P11, P22 and P91 require preheat and post-weld heat treatment; P91 in particular is unforgiving of PWHT deviations, and a joint that misses its tempering cycle will not show a defect on radiography but will fail on creep years later.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'When should I use socketweld instead of buttweld fittings?',
        a: 'Socketweld is the normal choice for small-bore piping up to about 1½ or 2 inch NB, where the fit-up and inspection cost of buttwelding cannot be justified per joint. Above 2 inch NB, buttweld is standard. Avoid socketweld in sanitary or high-purity systems (the socket forms a crevice) and in severe cyclic service, which ASME B31.3 restricts.',
      },
      {
        q: 'What is the required gap in a socketweld joint?',
        a: 'ASME B31.3 requires an expansion gap of approximately 1.6 mm (1/16 inch) between the pipe end and the bottom of the socket before welding. Bottoming out the pipe traps thermal expansion stress at the weld root and is one of the most common causes of socketweld cracking in service.',
      },
      {
        q: 'What is the difference between Class 3000, 6000 and 9000 forged fittings?',
        a: 'The class is the pressure rating designation under ASME B16.11. Class 3000 fittings are normally used with Sch 80/80S pipe, Class 6000 with Sch 160, and Class 9000 with XXS pipe. Higher classes have thicker bodies and deeper sockets, and are used for high-pressure process, steam and hydraulic service.',
      },
      {
        q: 'Are threaded pipe fittings acceptable in process piping?',
        a: 'Only in limited situations. Threading removes 30–50% of the pipe wall at the thread root, and threaded joints loosen under vibration and thermal cycling. Most process specifications restrict them to low-pressure utility service, or require seal welding. Where a dismantlable connection is genuinely needed, flanged joints (large bore) or ferrule compression fittings (instrument tubing) are better engineering choices.',
      },
      {
        q: 'Can buttweld fittings be inspected non-destructively?',
        a: 'Yes — that is one of their main advantages. A buttweld joint is a full-penetration weld that can be examined volumetrically by radiography or ultrasonic testing. Socketweld fillet joints cannot be volumetrically inspected; only surface methods such as liquid penetrant or magnetic particle examination apply.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'how-to-read-a-mill-test-certificate-en-10204',
    title: 'How to Read a Mill Test Certificate Before You Accept a Steel Consignment',
    metaTitle: 'How to Read a Mill Test Certificate (EN 10204 3.1) — Buyer Checklist',
    metaDescription:
      'A line-by-line guide to reading an EN 10204 3.1 Mill Test Certificate for stainless steel: heat numbers, chemistry, mechanical results, heat treatment condition, IGC and hydro tests — plus how to spot a fabricated MTC.',
    keywords:
      'mill test certificate, EN 10204 3.1, MTC 3.1 vs 3.2, material test certificate stainless steel, heat number traceability, ASTM A262 practice E, PMI testing, third party inspection India',
    excerpt:
      'An MTC is the only evidence that the metal in your yard is the metal you paid for. Most buyers file it unread. Here is exactly what each block on the certificate should say, and the five checks that catch a forged document in under two minutes.',
    image: '/images/products/sheets-plates-coils.jpg',
    category: 'Quality & Compliance',
    readTime: 12,
    publishedAt: '2026-07-09',
    updatedAt: '2026-08-01',
    relatedProducts: [
      'stainless-steel-sheets-plates-coils',
      'stainless-steel-pipes-and-tubes',
      'alloy-steel-bars',
      'high-performance-nickel-alloys',
    ],
    intro:
      'Grade substitution in the metals trade is rarely dramatic. Nobody delivers mild steel painted silver. What actually happens is quieter: 202 invoiced as 304, standard-carbon material supplied against an L-grade order, or a heat number on the paperwork that exists nowhere on the material. The Mill Test Certificate is the control that catches all three — but only if somebody reads it against the purchase order before the truck is unloaded.',
    sections: [
      {
        id: 'en-10204-types',
        heading: 'First, know which type of certificate you actually asked for',
        blocks: [
          {
            type: 'p',
            text: 'EN 10204 defines four types of inspection document, and they are not degrees of quality — they differ in who performed the tests and who signs for them. Ordering "with test certificate" without naming the type is how buyers end up with a Type 2.2 when they needed a 3.1.',
          },
          {
            type: 'table',
            headers: ['Type', 'What it is', 'Tests performed on', 'Signed by'],
            rows: [
              ['2.1', 'Declaration of compliance with the order', 'No test results stated', 'Manufacturer'],
              ['2.2', 'Test report', 'Non-specific inspection (any production)', 'Manufacturer'],
              ['3.1', 'Inspection certificate 3.1', 'Specific inspection — the delivered heat/lot', "Manufacturer's authorised representative, independent of production"],
              ['3.2', 'Inspection certificate 3.2', 'Specific inspection — the delivered heat/lot', "Manufacturer's representative AND purchaser's representative or a nominated third party"],
            ],
          },
          {
            type: 'callout',
            title: 'The distinction that matters commercially',
            text: 'A 2.2 report may quote results from a different production run of the same grade — perfectly legal, and worthless as traceability. A 3.1 certificate reports the actual test results for the actual heat you received, validated by someone independent of the production department. For any pressure-containing, code-stamped or safety-critical application, 3.1 is the minimum, and a 3.1 is not acceptable where the purchase order specified 3.2.',
          },
        ],
      },
      {
        id: 'anatomy',
        heading: 'The eight blocks on a genuine MTC, and what each must show',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Header and identification — mill name and works address, certificate number and date, your purchase order number, and the delivered quantity. If your PO number is missing, the certificate was not raised against your order.',
              'Product description — the governing specification and grade in full (e.g. ASTM A312 TP316L), dimensions, schedule or thickness, quantity and length. Check every field against your PO line, not just the grade.',
              'Heat / cast / lot number — the single most important field. This is the traceability key that links paper to metal, and it must be physically marked on the material by stamping, stencilling or a durable tag.',
              'Chemical composition — the actual ladle analysis for that heat, element by element, with the specification limits alongside. Every reported element must fall inside its limit.',
              'Mechanical properties — tensile strength, 0.2% proof (yield) stress, elongation, and where applicable hardness and impact (Charpy) values with test temperature.',
              'Heat treatment condition — for austenitic stainless this must state solution annealed with the temperature and quench method. ASTM A312 requires it, and an MTC that omits it is incomplete.',
              'Special and NDT tests — hydrostatic test pressure or the eddy current alternative, flattening or flaring test, intergranular corrosion test to ASTM A262, ultrasonic or radiographic examination where specified.',
              'Declaration and signature — the statement that the material complies with the order, the EN 10204 type, and the name, designation and signature of the authorised representative.',
            ],
          },
        ],
      },
      {
        id: 'chemistry',
        heading: 'Reading the chemistry block: what to check, in order',
        blocks: [
          {
            type: 'p',
            text: 'Do not skim this block. Three specific checks, in this sequence:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Carbon against the grade you ordered. If the PO says 316L, carbon must be 0.030% maximum. A reported 0.055% is 316, not 316L — a legitimate grade, but the wrong one, and it will sensitise in the heat-affected zone of your welds.',
              'Molybdenum for any 316 order. It must be between 2.00% and 3.00%. A blank or a trace value means you are looking at 304-family material against a 316 order.',
              'Nickel and manganese together. This is the 202-substitution check. Genuine 304 carries 8–10.5% nickel with manganese below 2%. Grade 202 replaces nickel with manganese — typically 4–6% nickel and 7.5–10% manganese. A certificate showing 4% nickel and 8% manganese against a 304 order is the substitution, in writing.',
            ],
          },
          {
            type: 'p',
            text: 'Two supporting checks worth the extra thirty seconds. For 321 and 347, verify the stabiliser ratio — titanium should be at least five times the carbon content for 321, and niobium at least ten times for 347; below that the grade will not resist sensitisation as intended. For duplex grades, compute PREN from the reported chemistry (%Cr + 3.3 × %Mo + 16 × %N) and confirm it clears the value your specification demands, because a 2205 heat at the bottom of every element range can fall short of a specified PREN 35.',
          },
        ],
      },
      {
        id: 'five-checks',
        heading: 'Five checks that expose a fabricated certificate',
        blocks: [
          {
            type: 'p',
            text: 'Forged MTCs circulate widely — usually a genuine certificate from a real mill, with the quantities, dimensions or heat numbers edited. These checks cost minutes and catch most of them:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Match the heat number on the paper to the heat number physically marked on the material. Every piece, not one sample. A mismatch, a missing stamp or a freshly painted-over marking ends the inspection there.',
              'Check that the reported values are not suspiciously round. Real test data looks like 0.021% C, 17.34% Cr, 542 MPa. A certificate reporting 0.02%, 17.5% and 550 MPa across every field has been typed, not measured.',
              'Verify internal consistency. Tensile strength must exceed yield strength by a plausible margin — for annealed austenitic stainless typically 515–690 MPa tensile against 205–350 MPa yield. Yield at 480 MPa on annealed 304 is not a strong heat, it is a fabricated number.',
              'Confirm the certificate is traceable to a real mill. Legitimate mills publish a certificate verification portal or will confirm a certificate number by email. Ask. A supplier who resists a five-minute verification call is telling you something.',
              'Run PMI on receipt. A handheld XRF analyser reads chromium, nickel and molybdenum in seconds and settles the question independently of any paperwork. For critical orders, PMI 100% of pieces rather than a sample.',
            ],
          },
          {
            type: 'callout',
            title: 'Where third-party inspection earns its fee',
            text: 'For project material, an inspection agency — Bureau Veritas, TÜV, SGS, DNV, Lloyd\'s Register or the client\'s own TPI — witnesses the tests at the mill and countersigns, which converts a 3.1 into a 3.2. The cost is a small fraction of one rejected consignment, and for IBR, ASME code and export orders it is generally mandatory rather than optional.',
          },
        ],
      },
      {
        id: 'special-tests',
        heading: 'Special tests worth specifying at enquiry stage',
        blocks: [
          {
            type: 'p',
            text: 'These tests are only performed if the purchase order calls for them. Adding them after the material is rolled means re-testing, delay, or nothing at all:',
          },
          {
            type: 'list',
            items: [
              'ASTM A262 Practice E (Strauss test) — the standard intergranular corrosion check for austenitic stainless. Specify it on any welded, corrosive-service order.',
              'Hydrostatic test — required by ASTM A312 for pipe unless replaced by the non-destructive electric (eddy current) test. The certificate should state which was performed and at what pressure.',
              'Charpy V-notch impact testing at the design minimum temperature — mandatory for low-temperature service such as LPG, ethylene and cryogenic lines.',
              'Ferrite number for duplex and for austenitic weld overlays, where the ferrite-austenite balance governs both corrosion and mechanical performance.',
              'Positive Material Identification (PMI) by XRF, reported piece by piece.',
              'IBR (Indian Boiler Regulations) Form III-C for any material entering a boiler or steam circuit in India — this must be arranged at the mill and cannot be issued retrospectively.',
              'Surface roughness (Ra) measurement for sanitary and electropolished components, with the reported value against the ASME BPE limit.',
            ],
          },
        ],
      },
      {
        id: 'receipt-checklist',
        heading: 'A ten-minute goods-inward routine',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Pull the MTC and the purchase order side by side before unloading begins.',
              'Confirm the EN 10204 type on the certificate matches what the PO demanded.',
              'Match heat numbers on the certificate to the markings on the material, piece by piece.',
              'Verify carbon, chromium, nickel, molybdenum and manganese against the ordered grade.',
              'Confirm the heat treatment condition is stated — solution annealed for austenitic stainless.',
              'Check that every specified special test appears with an actual result, not a blank.',
              'Run PMI on a defined sample, or 100% for critical service.',
              'Verify dimensions, wall thickness and ovality against tolerance; measure, do not eyeball.',
              'Photograph the heat number markings before the material enters the store — traceability evidence disappears the moment pieces are cut.',
              'File the MTC against the heat number, not the invoice number. When a failure investigation starts three years later, the heat number is the only key anyone will have.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between EN 10204 3.1 and 3.2 certificates?',
        a: 'Both report specific inspection results for the delivered heat. A 3.1 certificate is validated by the manufacturer\'s authorised representative, who must be independent of the production department. A 3.2 certificate is additionally countersigned by the purchaser\'s representative or a nominated third-party inspection agency who witnessed the tests. A 3.1 is not acceptable where the purchase order specified 3.2.',
      },
      {
        q: 'What is a heat number and why does it matter?',
        a: 'A heat (or cast, or lot) number identifies the specific batch of molten metal the material was poured from. It is the key that links the Mill Test Certificate to the physical material, which must carry the same number stamped, stencilled or tagged on it. Without a matching heat number there is no traceability, and the certificate proves nothing about what was delivered.',
      },
      {
        q: 'How can I tell if a mill test certificate is fake?',
        a: 'Check five things: that the heat number on the paper matches the marking on the material; that reported values are not suspiciously round numbers; that tensile and yield values are internally consistent for the grade and condition; that the certificate can be verified with the issuing mill; and independently, run Positive Material Identification with a handheld XRF analyser on receipt.',
      },
      {
        q: 'Is a Type 2.2 test report acceptable for process piping?',
        a: 'Generally no. A 2.2 report is based on non-specific inspection, meaning the results may come from a different production run of the same grade rather than from your material. For pressure-containing, code-stamped or safety-critical applications, EN 10204 3.1 is the minimum acceptable document.',
      },
      {
        q: 'Which tests must I specify at enquiry stage rather than after delivery?',
        a: 'Anything performed at the mill: ASTM A262 Practice E intergranular corrosion testing, Charpy impact testing at the design temperature, ferrite number, hydrostatic test pressure, IBR Form III-C certification, and third-party witness inspection. These cannot be added retrospectively — asking after the material is rolled means re-testing at your cost, or no certificate at all.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'copper-brass-cupronickel-heat-exchanger-tube-selection',
    title: 'Copper, Brass or Cupronickel? Choosing Heat Exchanger and Condenser Tubes',
    metaTitle: 'Copper vs Brass vs Cupronickel Heat Exchanger Tubes — Selection Guide',
    metaDescription:
      'Compare DHP and ETP copper, Admiralty brass, Aluminium brass and 90/10 & 70/30 cupronickel tubes for condensers and heat exchangers — conductivity, seawater velocity limits, ASTM B111 and failure modes.',
    keywords:
      'copper tubes vs brass tubes, admiralty brass condenser tube, aluminium brass tube, cupronickel 90/10 tube, ASTM B111, heat exchanger tube material selection, copper tube supplier Mumbai, DHP copper tube',
    excerpt:
      'Thermal conductivity is where tube selection starts and almost never where it ends. Erosion-corrosion velocity limits, ammonia attack and water chemistry decide which copper alloy survives — here is how they compare.',
    image: '/images/products/copper-tubes.jpg',
    category: 'Non-Ferrous Metals',
    readTime: 10,
    publishedAt: '2026-07-17',
    updatedAt: '2026-08-01',
    relatedProducts: [
      'copper-tubes',
      'brass-tubes',
      'copper-sections-and-profiles',
      'copper-strips-and-bronze-profiles',
    ],
    intro:
      'Copper alloys have held their position in heat transfer for over a century for one reason: nothing else combines high thermal conductivity, good formability, biofouling resistance and acceptable cost in the same package. But "copper alloy" spans a range from pure DHP copper to 70/30 cupronickel, and the difference between choosing right and choosing conveniently is usually measured in condenser retubing outages.',
    sections: [
      {
        id: 'conductivity',
        heading: 'Start with the trade-off: conductivity versus durability',
        blocks: [
          {
            type: 'p',
            text: 'Alloying copper always costs thermal conductivity. The elements that make an alloy tolerate seawater, higher velocity and mechanical stress are the same elements that scatter electrons and phonons in the lattice. Every tube selection is a position on that curve.',
          },
          {
            type: 'table',
            caption: 'Indicative properties. Verify against the applicable ASTM specification and your design conditions.',
            headers: ['Alloy', 'UNS', 'Thermal conductivity (W/m·K)', 'Typical max. water velocity', 'Relative cost'],
            rows: [
              ['DHP Copper', 'C12200', '~340', '~1.2 m/s (fresh water)', '1.0'],
              ['ETP Copper', 'C11000', '~390', '~1.2 m/s (fresh water)', '1.0'],
              ['Admiralty Brass', 'C44300', '~110', '~1.5 m/s', '1.0 – 1.1'],
              ['Aluminium Brass', 'C68700', '~100', '~2.4 m/s', '1.1 – 1.2'],
              ['Cupronickel 90/10', 'C70600', '~50', '~3.0 m/s', '1.6 – 2.0'],
              ['Cupronickel 70/30', 'C71500', '~30', '~3.5 – 4.5 m/s', '2.2 – 2.8'],
            ],
          },
          {
            type: 'p',
            text: 'Read that table in the right direction. Conductivity falls by more than a factor of ten from ETP copper to 70/30 cupronickel, while the tolerable water velocity roughly triples. In a seawater condenser, the velocity limit is the binding constraint — a highly conductive tube that thins out from erosion-corrosion in three years is not a good heat exchanger. In a clean closed-circuit cooler, conductivity wins and copper is the correct answer.',
          },
          {
            type: 'callout',
            title: 'Velocity limits are not just about erosion',
            text: 'These figures are two-sided constraints. Exceed the maximum and the protective oxide film is stripped faster than it re-forms, producing the characteristic horseshoe-shaped erosion-corrosion pits on the inlet side. Fall below roughly 0.9–1.0 m/s and silt deposits, biofouling settles and under-deposit corrosion begins. Condenser tubes fail from running too slowly at least as often as from running too fast.',
          },
        ],
      },
      {
        id: 'copper-grades',
        heading: 'Copper grades: DHP, ETP and OFHC are not interchangeable',
        blocks: [
          {
            type: 'p',
            text: 'The three common copper grades differ in oxygen and phosphorus content, and that difference decides how they behave when heated.',
          },
          {
            type: 'list',
            items: [
              'DHP Copper (C12200) — deoxidised with 0.015–0.040% phosphorus. The residual phosphorus removes the oxygen that causes hydrogen embrittlement, which makes DHP the grade for anything brazed, welded or soldered. It is the standard for plumbing, HVAC-R, medical gas and heat exchanger tube. Its conductivity is about 10–15% below ETP, and that is the price of weldability.',
              'ETP Copper (C11000) — electrolytic tough pitch, minimum 99.90% copper, conductivity at or above 100% IACS. The highest-conductivity commercial grade and the default for busbars, conductors and electrical windings. It contains residual oxygen, so heating above roughly 400°C in a hydrogen-bearing atmosphere causes hydrogen embrittlement — do not braze it in an uncontrolled flame.',
              'OFHC Copper (C10100/C10200) — oxygen-free, produced under a controlled atmosphere. Specified for high-vacuum equipment, cryogenics, particle accelerators, semiconductor processing and high-frequency applications where outgassing or oxygen inclusions are unacceptable. It costs a clear premium and is over-specification for ordinary heat transfer or electrical work.',
            ],
          },
          {
            type: 'p',
            text: 'The practical mistake is ordering ETP for a brazed assembly because the conductivity number looked better on paper. Brazed ETP joints embrittle; the tube then cracks at the joint in service. Where the assembly involves any torch work, DHP is the correct grade.',
          },
        ],
      },
      {
        id: 'brass-tubes',
        heading: 'Brass condenser tubes: Admiralty and Aluminium brass',
        blocks: [
          {
            type: 'p',
            text: 'Adding zinc to copper improves strength and cost but introduces dezincification — selective leaching of zinc that leaves a porous, mechanically useless copper residue behind an apparently intact tube wall. Condenser brasses solve this with small inhibitor additions, typically 0.02–0.06% arsenic, antimony or phosphorus.',
          },
          {
            type: 'list',
            items: [
              'Admiralty Brass (C44300) — 71% Cu, 28% Zn, 1% Sn, arsenical inhibited. The traditional condenser tube for fresh water, brackish water and clean seawater at moderate velocity, up to about 1.5 m/s. Widely used in power station auxiliary condensers and refinery coolers.',
              'Aluminium Brass (C68700) — 77% Cu, 21% Zn, 2% Al, also arsenical. The 2% aluminium forms a tenacious protective film that raises the tolerable velocity to around 2.4 m/s, making it the standard seawater condenser brass where flow rates rule out Admiralty.',
              'Naval Brass (C46400) — 60% Cu, 39% Zn, 1% Sn. A structural rather than a tube alloy — tube sheets, baffles, marine hardware and fasteners.',
            ],
          },
          {
            type: 'callout',
            title: 'The ammonia rule for brass tubes',
            text: 'Copper-zinc alloys are highly susceptible to stress corrosion cracking in ammonia and ammonium compounds — the classic "season cracking" failure. Any exchanger in fertiliser plants, ammonia refrigeration circuits, or steam service with hydrazine or amine dosing should avoid brass entirely. Cupronickel or titanium is the correct substitution. This one factor disqualifies brass from more applications than velocity ever does.',
          },
        ],
      },
      {
        id: 'cupronickel',
        heading: 'Cupronickel: when seawater is unavoidable',
        blocks: [
          {
            type: 'p',
            text: 'Nickel additions of 10% or 30% transform copper\'s seawater behaviour. Both grades resist chloride pitting, tolerate significantly higher velocities, and retain copper\'s natural resistance to macrofouling — a genuine operating advantage over titanium and stainless in seawater, where fouling drives cleaning frequency and pressure drop.',
          },
          {
            type: 'list',
            items: [
              '90/10 Cupronickel (C70600) — the general-purpose marine alloy. Seawater piping, shipboard systems, offshore firewater and cooling, desalination heat recovery. Tolerates roughly 3 m/s and is markedly more economical than 70/30.',
              '70/30 Cupronickel (C71500) — higher nickel, higher strength, higher velocity tolerance (around 3.5–4.5 m/s) and better resistance to impingement and to polluted, sulphide-bearing seawater. Specified for main seawater condensers, naval systems and high-duty desalination service.',
            ],
          },
          {
            type: 'p',
            text: 'One commissioning caution that costs plants real money: cupronickel develops its protective film over roughly the first two to three months of exposure to clean, aerated seawater. Exposing new tubes to polluted, stagnant or sulphide-bearing water during that period — which is exactly what happens when a plant sits idle after hydrotesting with harbour water — permanently compromises the film and dramatically shortens tube life. Commission with clean water, and keep the system either flowing or fully drained. Never leave stagnant seawater in new cupronickel tubes.',
          },
        ],
      },
      {
        id: 'specification',
        heading: 'Specifying the tube: standards, tolerances and tests',
        blocks: [
          {
            type: 'table',
            headers: ['Standard', 'Scope'],
            rows: [
              ['ASTM B111 / B111M', 'Copper and copper-alloy seamless condenser tubes and ferrule stock'],
              ['ASTM B88', 'Seamless copper water tube (Types K, L, M)'],
              ['ASTM B68', 'Seamless copper tube, bright annealed'],
              ['ASTM B280', 'Seamless copper tube for air conditioning and refrigeration field service'],
              ['ASTM B135', 'Seamless brass tube'],
              ['EN 12449 / EN 1057', 'European equivalents for copper and copper alloy tube'],
              ['IS 191 / IS 410', 'Indian standards for copper and brass'],
            ],
          },
          {
            type: 'p',
            text: 'A complete condenser tube enquiry should state: alloy and UNS number, ASTM specification, OD and wall thickness with tolerance, temper (annealed, light drawn or hard drawn), length, whether tubes are straight or U-bent, and the tests required. For U-tubes, specify stress relief after bending — cold bending leaves residual tensile stress that, combined with an ammonia or sulphide trace, initiates stress corrosion cracking at the bend.',
          },
          {
            type: 'p',
            text: 'Tests worth calling for on condenser tube: eddy current examination of 100% of tube length (the standard screening method for wall defects), hydrostatic or pneumatic test, flattening and flaring or expansion tests, grain size, and residual stress testing — the mercurous nitrate test to ASTM B154 or the ammonia vapour test to ASTM B858 — for any brass tube that will be expanded into a tube sheet.',
          },
        ],
      },
      {
        id: 'quick-selection',
        heading: 'Quick selection summary',
        blocks: [
          {
            type: 'table',
            headers: ['Service', 'Recommended alloy', 'Why'],
            rows: [
              ['HVAC-R, refrigeration, medical gas', 'DHP Copper C12200', 'High conductivity, brazes without embrittlement'],
              ['Electrical busbar, windings, conductors', 'ETP Copper C11000', 'Highest conductivity (≥100% IACS)'],
              ['High vacuum, cryogenic, semiconductor', 'OFHC Copper C10200', 'No oxygen inclusions or outgassing'],
              ['Fresh / brackish water condenser', 'Admiralty Brass C44300', 'Inhibited against dezincification, economical'],
              ['Seawater condenser, moderate-high velocity', 'Aluminium Brass C68700', 'Protective Al film, ~2.4 m/s tolerance'],
              ['Seawater piping, offshore, desalination', '90/10 Cupronickel C70600', 'Chloride resistance plus antifouling'],
              ['Main seawater condenser, polluted water', '70/30 Cupronickel C71500', 'Highest velocity and impingement resistance'],
              ['Any ammonia-bearing service', 'Cupronickel (never brass)', 'Brass suffers ammonia stress corrosion cracking'],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Which is better for heat exchangers, copper or brass tubes?',
        a: 'Copper conducts heat roughly three times better than brass, so in clean fresh water and closed-circuit service copper wins. Brass — specifically inhibited Admiralty or Aluminium brass — is preferred where water velocity, brackish or seawater chemistry, or mechanical strength would erode a copper tube. In practice the water chemistry and velocity decide the alloy; conductivity only breaks ties.',
      },
      {
        q: 'What is the maximum water velocity for condenser tubes?',
        a: 'As indicative design guidance: around 1.2 m/s for copper, 1.5 m/s for Admiralty brass, 2.4 m/s for Aluminium brass, 3.0 m/s for 90/10 cupronickel and 3.5–4.5 m/s for 70/30 cupronickel. There is also a minimum — below roughly 0.9 m/s, silt and biofouling deposit and cause under-deposit corrosion. Confirm limits against the tube manufacturer\'s data for your specific water chemistry.',
      },
      {
        q: 'Why should brass tubes not be used in ammonia service?',
        a: 'Copper-zinc alloys are highly susceptible to stress corrosion cracking in ammonia and ammonium compounds, a failure mode historically known as season cracking. Fertiliser plants, ammonia refrigeration circuits and steam systems dosed with hydrazine or amines should use cupronickel or titanium tubes instead.',
      },
      {
        q: 'What is the difference between DHP and ETP copper tube?',
        a: 'DHP copper (C12200) is deoxidised with 0.015–0.040% phosphorus, which prevents hydrogen embrittlement during brazing, soldering and welding — making it the grade for plumbing, HVAC and heat exchanger tube. ETP copper (C11000) has higher conductivity (≥100% IACS) and is used for electrical conductors, but contains residual oxygen and can embrittle if heated in a hydrogen-bearing atmosphere.',
      },
      {
        q: 'Which standard applies to condenser and heat exchanger tubes?',
        a: 'ASTM B111 covers copper and copper-alloy seamless condenser tubes and ferrule stock, and is the usual governing specification. ASTM B88 covers copper water tube, ASTM B280 covers ACR tube for refrigeration, and ASTM B135 covers seamless brass tube. EN 12449 and IS 191 / IS 410 are the European and Indian equivalents.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'flange-selection-guide-types-pressure-classes-facings',
    title: 'Flange Selection Guide: Types, Pressure Classes and Facings Explained',
    metaTitle: 'Industrial Flange Selection Guide — Types, Classes & Facings (ASME B16.5)',
    metaDescription:
      'Weld neck, slip-on, blind, socket weld, lap joint and RTJ flanges compared. How ASME B16.5 pressure classes work, why ratings drop with temperature, and how to specify facing, finish and gaskets correctly.',
    keywords:
      'flange selection guide, weld neck vs slip on flange, ASME B16.5, flange pressure class 150 300 600, RTJ flange, raised face flange finish, ASTM A182 F316 flanges, flanges supplier Mumbai',
    excerpt:
      'A flange is three decisions, not one: type, class and facing. Get any of them wrong and the joint leaks — here is how each is decided, and why a Class 150 flange is not rated for 150 psi.',
    image: '/images/products/flanges.jpg',
    category: 'Piping Design',
    readTime: 11,
    publishedAt: '2026-07-24',
    updatedAt: '2026-08-01',
    relatedProducts: [
      'industrial-flanges',
      'industrial-fasteners-nut-bolts',
      'buttweld-pipe-fittings',
      'industrial-valves',
    ],
    intro:
      'Flanged joints exist because piping has to be taken apart — for valve replacement, exchanger cleaning, instrument calibration and equipment removal. They are also, statistically, where process plants leak. Almost every one of those leaks traces back to a decision made at specification stage rather than at the spanner: the wrong flange type for the loading, the wrong class for the temperature, or a facing and gasket combination that never had a chance.',
    sections: [
      {
        id: 'types',
        heading: 'The six flange types and what each is actually for',
        blocks: [
          {
            type: 'list',
            items: [
              'Weld Neck — a long tapered hub butt-welded to the pipe. The taper transfers stress gradually from flange to pipe, and the bore matches the pipe bore exactly. This is the only flange type suitable for high pressure, high temperature, cyclic loading and severe service, and it is the only one that can be fully radiographed. It costs the most and it is worth it on any critical line.',
              'Slip-On — slides over the pipe OD and is fillet welded inside and out. Cheaper, forgiving of cut-length error, and much faster to align. Fatigue strength is roughly a third of a weld neck, and the internal fillet weld creates a discontinuity in the bore. Correct for low-pressure utility, water and air service; wrong for cyclic or high-temperature duty.',
              'Blind — a solid disc that closes off a flanged opening. Used to terminate lines, close vessel nozzles and provide future tie-in points. Note that a blind flange carries the highest bending stress of any flange type at a given class and size, because the whole pressure area is unsupported.',
              'Socket Weld — the pipe seats in a counterbore and is fillet welded externally. Similar to slip-on in cost and speed but with better strength, and restricted to small bore. The same 1.6 mm expansion gap rule as socketweld fittings applies.',
              'Lap Joint — a two-piece assembly of a stub end (welded to the pipe) plus a loose backing flange that rotates freely. Two situations justify it: frequent dismantling where bolt-hole alignment is a nuisance, and expensive alloy systems where only the stub end need be in the alloy while the backing flange is carbon steel — a substantial saving on nickel alloy and duplex lines.',
              'Threaded (Screwed) — screwed onto a threaded pipe end, no welding. Reserved for low-pressure service and locations where hot work is prohibited. Not permitted in cyclic service or where thermal shock is expected.',
            ],
          },
          {
            type: 'callout',
            title: 'Rule of thumb that survives most audits',
            text: 'Weld neck for anything above Class 300, above 200°C, in cyclic or vibrating service, or in hydrocarbon and toxic duty. Slip-on for water, air and low-pressure utility. Lap joint where dismantling is routine or the alloy is expensive. If in doubt, weld neck — the price difference is small next to the cost of one leak investigation.',
          },
        ],
      },
      {
        id: 'pressure-class',
        heading: 'Pressure class: the number that is routinely misread',
        blocks: [
          {
            type: 'p',
            text: 'Flange classes under ASME B16.5 — 150, 300, 400, 600, 900, 1500 and 2500 — are designations, not pressure ratings. A Class 150 flange is not rated for 150 psi. The class is an index into a pressure-temperature rating table, and the actual allowable pressure depends on both the class and the material group, and falls as temperature rises.',
          },
          {
            type: 'table',
            caption: 'Indicative maximum working pressure, ASTM A105 carbon steel (Group 1.1), bar gauge. Always verify against the current edition of ASME B16.5 for your material group.',
            headers: ['Temperature', 'Class 150', 'Class 300', 'Class 600', 'Class 900'],
            rows: [
              ['38°C (100°F)', '19.6', '51.1', '102.1', '153.2'],
              ['200°C', '13.8', '43.8', '87.6', '131.4'],
              ['300°C', '10.2', '39.8', '79.6', '119.5'],
              ['400°C', '6.5', '34.7', '69.4', '104.2'],
              ['450°C', '4.6', '28.8', '57.5', '86.3'],
            ],
          },
          {
            type: 'p',
            text: 'Two consequences follow, and both catch people out. First, a Class 150 carbon steel flange loses roughly two-thirds of its ambient capability by 400°C — plenty of steam lines have been specified at Class 150 on the basis of the cold hydrotest pressure and found wanting at operating temperature. Second, material group matters: austenitic stainless (Group 2.x) has a different and generally flatter derating curve than carbon steel, so you cannot read across from a carbon steel table to an F316 flange.',
          },
          {
            type: 'p',
            text: 'Size range also splits by standard. ASME B16.5 covers ½ inch to 24 inch NB. Above that, ASME B16.47 applies, in two non-interchangeable series — Series A (formerly MSS SP-44) and Series B (formerly API 605). Series A and Series B flanges of the same nominal size and class have different bolt circles and will not mate. Always state the series on large-bore enquiries.',
          },
        ],
      },
      {
        id: 'facings',
        heading: 'Facing and surface finish: where the seal actually happens',
        blocks: [
          {
            type: 'list',
            items: [
              'Raised Face (RF) — the default. A raised platform concentrates bolt load onto a smaller gasket area, raising the seating stress. Standard for the great majority of process service.',
              'Flat Face (FF) — the full face is machined flat, used when mating to cast iron or other brittle equipment flanges, where a raised face would bend and crack the mating flange. Requires a full-face gasket.',
              'Ring Type Joint (RTJ) — a machined groove takes a solid metal ring (oval or octagonal, per ASME B16.20) that seals by plastic deformation, metal to metal. The standard for high pressure, high temperature and sour service — Class 900 and above, wellheads, and most API 6A equipment.',
              'Tongue and Groove / Male and Female — the gasket is fully confined, preventing blowout. Found in older plants and specific chemical services.',
            ],
          },
          {
            type: 'p',
            text: 'Surface finish is specified, not incidental. A standard raised face carries a serrated concentric or spiral finish of 3.2–6.3 µm Ra (125–250 µin) — the serrations bite into a soft gasket and resist blowout. A smooth finish (0.8–1.6 µm Ra) is specified for metal and PTFE gaskets that cannot flow into serrations. Getting this wrong is a classic cause of persistent weeping: a PTFE envelope gasket on a serrated face will never seal properly, no matter how hard the joint is torqued.',
          },
          {
            type: 'callout',
            title: 'Gasket, bolting and flange are one system',
            text: 'A spiral wound gasket with the wrong filler, a stud bolt of insufficient grade, or an uncontrolled tightening pattern will leak on a perfectly specified flange. Match the three: spiral wound (ASME B16.20) with ASTM A193 B7 studs and A194 2H nuts for general service; Inconel-wound gaskets and B8M studs for stainless high-temperature duty; RTJ rings one hardness grade softer than the flange material so the ring, not the groove, deforms.',
          },
        ],
      },
      {
        id: 'materials',
        heading: 'Material selection and matching to the pipe',
        blocks: [
          {
            type: 'table',
            headers: ['Flange material', 'Specification', 'Pairs with'],
            rows: [
              ['Carbon steel', 'ASTM A105', 'A106 Gr. B / A53 pipe, general service'],
              ['Low-temperature carbon steel', 'ASTM A350 LF2', 'Cryogenic and low-temperature service'],
              ['Stainless steel', 'ASTM A182 F304/F304L/F316/F316L', 'A312 stainless pipe, corrosive service'],
              ['Stabilised stainless', 'ASTM A182 F321 / F347', 'High-temperature stainless systems'],
              ['Alloy steel', 'ASTM A182 F5 / F11 / F22 / F91', 'A335 P-grade Cr-Mo piping, steam and refinery'],
              ['Duplex / super duplex', 'ASTM A182 F51 / F53 / F55', 'A790 duplex pipe, offshore and seawater'],
              ['Nickel alloys', 'ASTM B564 (Monel, Inconel, Hastelloy)', 'Severe corrosion and high-temperature service'],
            ],
          },
          {
            type: 'p',
            text: 'For low-temperature service, A350 LF2 is not simply "carbon steel with a different number" — it carries mandatory Charpy V-notch impact testing at the design minimum temperature, and that impact data must appear on the Mill Test Certificate. Accepting an A105 flange against an LF2 line item because the chemistry looks similar removes the entire basis of the low-temperature qualification.',
          },
        ],
      },
      {
        id: 'checklist',
        heading: 'A complete flange enquiry',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Flange type — weld neck, slip-on, blind, socket weld, lap joint or threaded.',
              'Nominal size and, for weld neck, the matching pipe schedule so the bore is machined correctly.',
              'Pressure class — and for sizes above 24 inch, the ASME B16.47 series (A or B).',
              'Material specification and grade, e.g. ASTM A182 F316L.',
              'Facing type and surface finish, e.g. raised face, 125–250 µin serrated.',
              'Dimensional standard — ASME B16.5, ASME B16.47 Series A/B, EN 1092-1 or DIN.',
              'Certification — EN 10204 3.1 or 3.2 MTC, and any impact, PMI, hardness or NACE MR0175 requirement.',
              'Any additional treatment — hot-dip galvanising, PTFE coating, cladding or overlay.',
            ],
          },
          {
            type: 'p',
            text: 'One final point that ends more compatibility disputes than any other: ASME and EN/DIN flanges of nominally equivalent size and rating are not interchangeable. Bolt circles, bolt counts and hole diameters differ, and a DN 100 PN 16 flange will not mate with a 4 inch Class 150. On any project with mixed-origin equipment, state the standard explicitly on every line item.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a weld neck and a slip-on flange?',
        a: 'A weld neck flange has a tapered hub butt-welded to the pipe, transferring stress gradually and matching the pipe bore exactly — it suits high pressure, high temperature and cyclic service and can be fully radiographed. A slip-on flange slides over the pipe and is fillet welded inside and out; it is cheaper and faster to fit but has roughly a third of the fatigue strength, so it belongs on low-pressure utility service.',
      },
      {
        q: 'Does a Class 150 flange mean it is rated for 150 psi?',
        a: 'No. The class is a designation that indexes into the ASME B16.5 pressure-temperature rating tables. An ASTM A105 carbon steel Class 150 flange is rated to about 19.6 bar at 38°C, but only around 6.5 bar at 400°C. The allowable pressure depends on both the material group and the temperature, and always falls as temperature rises.',
      },
      {
        q: 'When should I use an RTJ flange instead of a raised face flange?',
        a: 'Ring Type Joint flanges are used for high pressure and high temperature service — typically Class 900 and above — and for sour or hydrogen service, wellheads and API 6A equipment. The metal ring seals by plastic deformation against the machined groove, giving a more reliable seal than a compressed gasket at extreme conditions.',
      },
      {
        q: 'Can ASME and DIN/EN flanges be bolted together?',
        a: 'No. ASME B16.5 and EN 1092-1 / DIN flanges of nominally equivalent size and rating have different bolt circle diameters, bolt counts and hole sizes, so they will not mate. Similarly, ASME B16.47 Series A and Series B flanges of the same size and class are not interchangeable with each other. Always state the dimensional standard and series on every enquiry line.',
      },
      {
        q: 'What surface finish should a raised face flange have?',
        a: 'A standard raised face uses a serrated concentric or spiral finish of 3.2–6.3 µm Ra (125–250 µin), which grips soft and spiral wound gaskets and resists blowout. A smooth finish of 0.8–1.6 µm Ra is specified for metal jacketed and PTFE gaskets that cannot conform to serrations. Using a PTFE gasket against a serrated face is a common cause of persistent leaks.',
      },
    ],
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);

export const articleCategories = [...new Set(articles.map((a) => a.category))];
