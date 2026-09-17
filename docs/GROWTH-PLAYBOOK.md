# Getting enquiries: what actually moves the needle

Written for Ritvik Metal Impex. Honest about what the website can and cannot do
on its own.

---

## First, three corrections

These matter because plans built on them will fail.

**1. The site does not show prices.** There is no price field in
`src/data/products.js`, no `offers` node in the product schema, and the homepage
FAQ says explicitly that pricing is quote-based. That was a deliberate decision —
schema.org rejects an offer without a price, and publishing invented prices for
alloy products whose cost moves with nickel and moly surcharges would be worse
than publishing none. **If you want prices on the site, that is a real feature to
build, not something already there.** See "Should you publish prices?" below.

**2. The product photos are not yours.** They are stock images that shipped with
the original template. The watermarked photos you have shared in chat arrive as
pictures Claude can look at, not as files on disk, so they cannot be written into
the repository from a conversation. They need to be added to
`public/images/products/` — by you via git, or by attaching them as files.

**3. A website alone will not produce IndiaMART-volume enquiries.** IndiaMART
sells you *demand*, not a website. That difference is the whole of the next
section.

---

## How IndiaMART and TradeIndia actually generate enquiries

Understanding this stops you expecting the wrong thing from your own site.

They are **lead marketplaces**, not directories:

1. **They own the demand.** They rank for tens of thousands of buying keywords
   because they have millions of pages and decades of domain authority. A buyer
   searching "ss 316 pipe supplier mumbai" lands on IndiaMART, not on you.
2. **A buyer posts one requirement, they sell it to 3–5 suppliers.** The same
   enquiry is sold several times. You are quoting against the others by design.
3. **Their "Get Best Price" button is the product.** It is a lead-capture form,
   not a price. Buyers click it precisely because no price is shown.
4. **Paid placement decides who appears.** Free listings sit below paid ones.
   Enquiry volume tracks the package you buy, not the quality of your listing.
5. **They call the buyer within minutes** and route a verified lead on.

**What this means for you:** IndiaMART gives volume and competition. Your own
site gives fewer but better enquiries, no per-lead cost, and buyers who chose you
specifically. Run both. Use IndiaMART for volume now; build the site as the asset
that stops you renting your leads forever.

**What is worth copying from them:**
- Enquiry capture on *every* product page, not just a contact page. (Done.)
- Asking for quantity up front — it qualifies the buyer instantly. (Done.)
- Responding in minutes, not days. This is the single biggest factor. (See below.)
- Specification tables, because technical buyers search by grade and size. (Done.)

**What is not worth copying:** fake "Get Best Price" theatre, and inflated
"years in business" or client-count numbers. Technical buyers verify claims, and
a false one on a certification page loses the order.

---

## Should you publish prices?

Genuinely debatable for metals. The honest trade-offs:

**Arguments for:** price-transparent pages convert better, win long-tail searches
("ss 304 pipe price per kg"), and filter out buyers who cannot afford you.

**Arguments against:** alloy surcharges move weekly; a stale price loses trust or
forces you to honour a bad number; competitors see your margin; and for
grade/size/schedule/quantity-dependent products a single price is meaningless.

**Recommended middle path,** which is what most successful technical suppliers do:

- Publish **indicative price ranges** per product with a visible "as of" date and
  a clear note that the final price depends on grade, size and quantity.
- Keep the quote form as the primary action.
- Drive it from one `price` field per product so updating is a single edit.

That is a real feature and a genuinely good SEO play — "price" searches are high
intent. Say the word and it can be built, including valid `Offer` schema with
`priceValidUntil` so Google shows the range.

**Do not** publish a fixed price you will not honour.

### This is now built — but switched off

`src/data/pricing.js` holds an indicative range per product, and the product
pages, listing cards, specification tables, FAQ and `AggregateOffer` schema all
read from it.

**Every range in that file is an unverified placeholder.** They were written to
give the feature a working shape, not by anyone who knows your costs. Nothing
renders until an entry is marked `verified: true`, so the live site is unchanged
until you say otherwise.

To publish one:

1. Open `src/data/pricing.js`, replace `min` and `max` with your own figures.
2. Check `unit` and `basis` match how you actually quote that line.
3. Set `verified: true`.
4. Update `PRICE_AS_OF` to the date you checked.

`npm run check:prices` lists what is live and what is still a placeholder.

Do them a few at a time rather than all at once. Everything downstream follows
automatically: the homepage FAQ switches from "we don't publish prices" to
"indicative ranges, reviewed as of …", and the schema starts carrying
`lowPrice`/`highPrice` so Google can show the range in the result.

Revisit `PRICE_AS_OF` monthly. A range dated eight months ago is worse than no
range — it tells a buyer the page is abandoned.

---

## What actually takes a B2B metals site to "fully optimised"

Roughly in order of impact. The site currently sits at the end of stage 1.

### Stage 1 — Technical foundation ✅ mostly done
Per-page metadata, structured data, sitemap, internal linking, CTAs on every
page, specification tables, mobile, code-splitting, AI-crawler access. See
`SEO.md`.

**Still open:** 17 undersized product images, Search Console verification,
Google Business Profile, analytics.

### Stage 2 — Indexation and measurement (do this next; it is free)
Nothing below can be judged without it.

1. Verify the site in **Google Search Console**, submit `sitemap.xml`.
2. Same in **Bing Webmaster Tools** — Bing feeds ChatGPT search.
3. Claim the **Google Business Profile**. For "near me" and "in Mumbai" searches
   this outranks the website itself. Add real photos, hours, and the exact NAP
   from `src/data/site.js`.
4. Install **GA4** and set the enquiry form as a conversion.
5. Wait 4–6 weeks. Indexation is not instant.

### Stage 3 — Content depth (the compounding one)
Search demand in metals is overwhelmingly long-tail and grade-specific. Seven
guides and 22 product pages is a start; competitors who dominate have 200+ pages.

The highest-value pages you do not yet have, each mapping to real search demand:
- One page per **grade × form**: "SS 316L Seamless Pipe", "SS 304 Buttweld Elbow",
  "ASTM A105 Slip-On Flange". This is how buyers search. It is also how you go
  from 22 product pages to 150 without inventing anything — the specification
  data already exists.
- **Size/weight charts** as standalone pages ("SS pipe weight chart").
- **City pages** — but only real ones. "Stainless steel supplier in Pune" is
  worth writing if you genuinely supply Pune and can say something specific
  (delivery time, a project). Thin templated city pages get filtered.
- **Industry pages**: "Metals for Pharmaceutical Plants".

### Stage 4 — Authority
Rankings in this sector track backlinks and brand mentions more than on-page
work. Realistic sources: industry directories, supplier lists of your mills,
trade association membership, Indian trade portals, and being quoted in
engineering publications.

### Stage 5 — Conversion and speed of response
Most enquiries are lost here, not in search.

- **Respond within 15 minutes during business hours.** B2B research consistently
  finds the first responder wins a large majority of the time. This beats every
  SEO change on this list.
- Quote in a consistent format with certification stated.
- Follow up twice. Most suppliers never follow up once.
- Track enquiry → quote → order in the `status` column already on the
  `enquiries` table, so you can see where deals die.

---

## The honest answer on "rank first"

No one can guarantee a #1 ranking, and anyone who does is selling something.
What is realistic:

- **Brand searches** ("Ritvik Metal Impex") — you should rank #1 quickly.
- **Long-tail technical** ("ASTM A312 TP316L chemical composition") — reachable
  in 3–6 months with the content in stage 3.
- **Local** ("stainless steel supplier Kumbharwada") — reachable with a Google
  Business Profile.
- **Head terms** ("stainless steel pipe supplier") — competing with IndiaMART,
  JustDial and 20-year-old domains. Years, not months, and possibly never.

The winning strategy is not to fight for head terms. It is to own hundreds of
specific technical queries that each bring a handful of buyers who know exactly
what they want. Those convert far better anyway.

---

## Prompts for continuous improvement

Paste these into Claude Code. Each is scoped so the work is verifiable.

**Weekly — regression check**
```
Audit the site for SEO regressions: crawl every route in the sitemap with a
headless browser and report any page with a title over 60 chars, a description
over 160, more than one h1, a missing or wrong canonical, invalid JSON-LD, a
broken internal link, or an og:image under 1200px on the long edge. Fix what you
find, show me before/after measurements, and commit.
```

**Monthly — content expansion**
```
Using the specification data in src/data/specifications.js, add grade-specific
product pages for the five highest-search-volume grade/form combinations we do
not yet cover. Research real search demand first. Each page needs its own
specification tables, FAQ, internal links and CTA. Do not invent technical
values — cite the governing standard, and tell me if you cannot verify one.
```

**Monthly — conversion**
```
Review the enquiries table in Supabase for the last 30 days. Which pages produce
enquiries and which produce none? Which get no product context attached? Suggest
three specific changes to improve enquiry rate, implement the one with the best
effort-to-impact ratio, and explain your reasoning.
```

**Quarterly — competitive**
```
Compare our product pages against the top three ranking competitors for our five
most important keywords. What technical content do they have that we do not?
Build the highest-value gaps. Flag anything they publish that looks inaccurate
rather than copying it.
```

**Any time — performance**
```
Run a Core Web Vitals audit on the homepage and a product page at mobile
throttling. Report LCP, CLS and INP with numbers, fix the largest regression,
and show the measurement before and after.
```

### How to get good results from these

- **Ask for measurements, not adjectives.** "Report the numbers before and
  after" prevents work that sounds done but is not.
- **Say "tell me if you cannot verify it."** In a technical catalogue, an
  invented dimension is worse than a missing one. A Class 3000 fitting is not
  rated for 3000 psi — most supplier sites say it is, and that error came within
  one step of being published here.
- **One outcome per prompt.** "Improve SEO" produces scattered edits.
- **Ask what it could not do.** Several reference sites and your image folder
  were unreachable from the build environment; that is only useful to you if it
  is said plainly.

---

## The definition of "completely optimised"

There isn't one — it is maintenance, not a finish line. But there is a
meaningful bar, and it is measurable:

- [ ] Every page indexed in Search Console, no coverage errors
- [ ] No page over the SERP title/description limits *(automated, currently passing)*
- [ ] Valid structured data on every template *(currently passing)*
- [ ] Core Web Vitals "Good" on mobile for the homepage and product pages
- [ ] Every product photo ≥1200px, owned by you, watermarked
- [ ] Google Business Profile claimed, with reviews
- [ ] 100+ indexed pages targeting distinct technical queries
- [ ] Enquiries tracked from first visit through to order
- [ ] Median first response under 15 minutes in business hours
- [ ] A named owner for the above

Items 1, 6, 8, 9 and 10 are yours. Items 2, 3, 4, 5 and 7 are buildable here.

---

## What to do this month, in order

1. **Get the product photos in.** Blocks image SEO entirely, and stock photos on
   a supplier site cost trust with technical buyers.
2. **Verify Search Console and claim the Google Business Profile.** Free, an
   afternoon, and prerequisite to measuring anything.
3. **Fix response time.** No code involved; the largest single conversion lever.
4. **Then** commission stage-3 content.

Doing 4 before 1–3 is the common and expensive mistake.
