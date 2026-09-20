# Where the leads actually come from

Written for Ritvik Metal Impex. The companion to `GROWTH-PLAYBOOK.md`, which
covers SEO and content. This one is about turning traffic into enquiries and
enquiries into orders.

---

## The uncomfortable arithmetic

A B2B industrial site converts at roughly **1–3%** of visitors into enquiries.
At 2%, to get **20 enquiries a month** you need about **1,000 relevant visitors
a month**. "Relevant" is doing the work in that sentence — a visitor searching
"stainless steel price today" is not a buyer.

So there are only three levers, and they multiply:

```
    enquiries  =  traffic  ×  conversion rate  ×  qualification
```

Most suppliers pour everything into the first and ignore the other two. The
second and third are cheaper and faster to move.

---

## Who the right customer actually is

You cannot target "anyone who buys steel". Your catalogue already tells you who
your buyer is. Four distinct groups, in descending order of how well the
current site serves them:

### 1. The maintenance / MRO buyer — your best fit today
A plant engineer or purchase officer who needs a specific item now: a few
flanges, some socket weld fittings, a length of pipe to finish a shutdown job.

- **Order size:** small, often 5–50 kg. Your 5 kg MOQ is built for this.
- **How they search:** exact specification — "ASTM A182 F316 socket weld elbow
  3000 class 1 inch".
- **What wins them:** having the item in stock, a fast quote, an MTC.
- **Why they matter:** they reorder. A maintenance buyer who has a good
  experience comes back every quarter for years. This is the highest-value
  customer relative to how hard they are to win, and the current site — with
  specification tables and a low MOQ — is already aimed at them.

### 2. The fabricator / job shop
Buys to a drawing for a client project. Needs a quantity of one grade in
several sizes.

- **Order size:** medium, recurring but project-driven.
- **How they search:** grade and form — "ss 304 pipe supplier mumbai".
- **What wins them:** price, delivery date, cutting and drilling services.

### 3. The EPC / project buyer
Buys against a line list for a plant. Large, tendered, long cycle.

- **Order size:** large, infrequent, competitive.
- **What wins them:** vendor approval, third-party inspection, IBR, documented
  QA. Your TPI and certification content speaks to this buyer.
- **Reality:** a website rarely wins these directly. It gets you shortlisted
  after someone has already heard of you.

### 4. The export buyer
Overseas trader or contractor, chiefly Gulf, South East Asia, Africa.

- **What wins them:** export documentation, seaworthy packing, LC terms,
  responsiveness across time zones, and English-language technical clarity.
- **Where they look:** Google, Alibaba, trade portals, LinkedIn.

**Practical conclusion:** aim the site squarely at groups 1 and 2. They search
in specification language, they decide quickly, and they reorder. Groups 3 and
4 are worth serving but will not come from SEO alone.

---

## The single biggest lever: response time

B2B research consistently finds the first supplier to respond wins a large
share of the business — often cited around 35–50%. In metals, where several
suppliers are quoting the same enquiry, it is decisive.

This costs nothing and beats every other item in this document.

**What to put in place:**

- A target of **under 15 minutes** during business hours, and say so on the
  site — "we reply to enquiries within 15 minutes during business hours" is a
  conversion line in its own right, *provided it is true*.
- WhatsApp notification is already wired up (`docs/NOTIFICATIONS.md`) — it just
  needs the CallMeBot key.
- A holding reply is still a reply. "Received, we have the 316L in stock, firm
  price within two hours" stops them contacting the next supplier.
- An out-of-hours auto-response with a realistic next-morning commitment.

**Measure it.** The `enquiries` table has `handled_at`. Median time from
`created_at` to `handled_at` is the single number to watch.

---

## What actually converts a visitor

In rough order of impact for a metals site:

1. **Stock availability.** "In stock, dispatch in 2 days" converts far better
   than any amount of company history. If you can show even approximate stock
   status per grade, do it.
2. **A price signal.** The ranges built in `src/data/pricing.js` are switched
   off pending your figures. Buyers who cannot form a rough idea of cost often
   leave rather than ask.
3. **Specification depth.** Already strong. A buyer who finds the exact grade,
   schedule and standard trusts you before contacting you.
4. **Real photographs.** Now on six products. A technical buyer can tell stock
   photography instantly, and it reads as a trading front.
5. **Certification.** MTC, IBR, TPI — already covered well.
6. **A short form.** Every extra field costs submissions. The current form asks
   for name, contact, quantity and specification, which is the right minimum.
7. **Multiple contact routes.** Form, WhatsApp, phone, email. Indian industrial
   buyers overwhelmingly prefer WhatsApp — it is already on every page.

---

## Where real buyers come from, ranked by cost per lead

### Free, and the highest return
- **Google Business Profile.** Still not claimed. For "stainless steel supplier
  near me" and "in Mumbai" this outranks the website. Add real photos — you now
  have them — and collect reviews. Highest return of anything on this list.
- **Search Console + Bing Webmaster.** Not verified yet. Nothing can be
  measured or improved until they are.
- **Existing customers.** Referral and reorder are the cheapest leads in this
  industry and most suppliers never systematically ask.

### Paid, and predictable
- **Google Ads on specification keywords.** Not "steel supplier" — bid on
  "astm a312 tp316l pipe supplier", "socket weld fitting 3000 class". Low
  volume, low competition, high intent. A small daily budget on 20–30 exact
  phrases produces qualified enquiries.
- **IndiaMART / TradeIndia paid listing.** Immediate volume, competitive,
  per-lead cost. Worth running while the site's organic position builds.

### Slow, and compounding
- **Content depth.** See `GROWTH-PLAYBOOK.md` stage 3.
- **LinkedIn.** Where EPC and project buyers are. Posting actual stock photos,
  dispatches and certifications reaches them; generic company updates do not.
- **Trade directories and association listings.** Also build the backlinks that
  organic ranking depends on.

---

## Qualifying: fewer, better enquiries

More enquiries is not the goal. More *orders* is. Three changes worth making:

1. **State the MOQ prominently.** Already done at 5 kg. It filters out
   retail-sized enquiries before they cost anyone time.
2. **Ask for quantity and grade on the form.** Already done. An enquiry without
   a quantity is usually not a buyer.
3. **Track outcomes.** The `enquiries` table has a `status` column that nobody
   is filling in. Without it you cannot tell which pages produce orders rather
   than noise — and that is the difference between optimising and guessing.

---

## The 30-day plan

**Week 1 — free and immediate**
- [ ] Claim the Google Business Profile, add the real photographs
- [ ] Verify Search Console and Bing Webmaster, submit the sitemap
- [ ] Set the 15-minute response target and tell the sales team
- [ ] Finish WhatsApp notifications (CallMeBot key from the receiving handset)

**Week 2 — make the site convert**
- [ ] Review and verify the price ranges, then switch them on
- [ ] Add stock-availability wording where it is true
- [ ] Send photographs for the 15 products still on stock images

**Week 3 — start measuring**
- [ ] Install GA4, set the enquiry form as a conversion
- [ ] Start filling in `status` on every enquiry
- [ ] Record median response time as a baseline

**Week 4 — buy some traffic while organic builds**
- [ ] Google Ads on 20–30 exact specification phrases, small daily budget
- [ ] Review which pages produced enquiries; write more of what worked

---

## How to know it is working

Track five numbers monthly. Nothing else matters much:

| Metric | Where from | What good looks like |
|---|---|---|
| Relevant visitors | GA4 / Search Console | Rising month on month |
| Enquiry rate | enquiries ÷ visitors | 1–3% |
| Median response time | `created_at` → `handled_at` | Under 15 min in hours |
| Quote-to-order rate | `status` column | Know it, then improve it |
| Cost per order | ad spend ÷ orders | Falling |

If enquiries are flat, the answer is in which of these five is stuck — and you
cannot tell without measuring them.
