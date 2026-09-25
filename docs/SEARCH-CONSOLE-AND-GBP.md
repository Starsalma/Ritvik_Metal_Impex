# Search Console, Bing and Google Business Profile

Step-by-step, for `www.ritvikmetalimpex.com`. Both need an account only the
business owner has, which is why neither could be done from the codebase.

---

## 1. Google Search Console

### Which property type

Google offers two. Pick based on whether you can edit DNS.

| | **Domain property** (recommended) | **URL-prefix property** |
|---|---|---|
| Verification | One DNS TXT record | HTML file, meta tag, GA, or DNS |
| Covers | `ritvikmetalimpex.com`, `www.`, http and https, all subdomains | Only the exact prefix you enter |
| Needs | Access to your domain registrar | Access to this repository |

**Use the Domain property if you can reach your DNS.** The site redirects
between apex and `www`, and a URL-prefix property only reports on the exact
prefix you enter — so a `www` property would miss anything indexed on the apex.

### Option A — Domain property (DNS TXT)

1. Go to `search.google.com/search-console`, sign in.
2. **Add property** → **Domain** → enter `ritvikmetalimpex.com` (no `www`, no
   `https://`).
3. Google shows a TXT record like
   `google-site-verification=AbCdEf123...`
4. In your domain registrar's DNS settings, add a **TXT** record:
   - Host / Name: `@` (or blank — registrars differ)
   - Value: the full string Google gave you
   - TTL: default
5. Save, wait 5–60 minutes for DNS to propagate, then click **Verify**.

Leave the record in place permanently. Deleting it un-verifies the property.

### Option B — URL-prefix property (HTML file)

Use this if DNS is not available to you. It is the easiest path given you
already control this repository.

1. Search Console → **Add property** → **URL prefix** →
   `https://www.ritvikmetalimpex.com`
2. Choose the **HTML file** method. Google gives you a file named something
   like `google1a2b3c4d5e6f7890.html`.
3. Put that file in the **`public/`** folder of this repository, unchanged.
   Everything in `public/` is copied to the site root on build, so it will be
   served at `https://www.ritvikmetalimpex.com/google1a2b....html` — exactly
   where Google looks.
4. Commit, then run `npm run deploy`.
5. Wait a minute or two for GitHub Pages, then click **Verify**.

Do not delete the file afterwards.

### After verification — do these three things

1. **Submit the sitemap.** Search Console → Sitemaps → enter `sitemap.xml` →
   Submit. It currently holds 84 URLs.
2. **Check Page Indexing** after a week or so. "Discovered – currently not
   indexed" on many pages is normal for a new site; "Page with redirect" or
   "Alternate page with canonical tag" appearing in bulk is not, and is worth
   telling me about.
3. **Request indexing** for the homepage and two or three grade pages via URL
   Inspection, to prompt the first crawl.

---

## 2. Bing Webmaster Tools

Worth ten minutes: Bing results feed ChatGPT search, so this matters for the
AI-visibility work.

1. `bing.com/webmasters`, sign in.
2. **Import from Google Search Console** — one click once GSC is verified, and
   it carries the verification and sitemap across.
3. If importing fails, verify with the same XML-file method: drop the
   `BingSiteAuth.xml` file into `public/` and deploy.

---

## 3. Google Business Profile

For "stainless steel supplier near me" and "in Mumbai", the Business Profile
outranks the website. It is free and it is the single highest-return item
outstanding.

### Setting it up

1. `business.google.com` → **Manage now** → search for "Ritvik Metal Impex"
   first, in case a profile already exists and needs claiming rather than
   creating.
2. Enter the business name **exactly** as it appears everywhere else:
   `Ritvik Metal Impex`. Do not append keywords — "Ritvik Metal Impex -
   Stainless Steel Supplier Mumbai" is a name-stuffing violation and profiles
   get suspended for it.
3. Address, exactly as on the website and your invoices:
   > Building No 16, 2nd Floor, Patel Mansion, 4th Kumbharwada,
   > Mumbai – 400004, Maharashtra, India
4. Phone: `+91 7073895597`. Website: `https://www.ritvikmetalimpex.com`
5. **Primary category:** `Steel distributor`.
   Secondary categories worth adding: `Metal supplier`, `Steel fabricator`
   (only if you genuinely fabricate), `Pipe supplier`, `Exporter`.
6. Verification is usually by video call or postcard for a trade address. Have
   your GST registration (`27EPNPK9821R1ZR`) and signage visible.
7. Set your real opening hours. I have deliberately left `site.openingHours`
   empty in the code rather than guess — send them over and I will add them to
   the website's structured data so the two agree.

### Photos

You already have the ones that matter. Upload the stockyard photographs —
the 316L circles, round bars, stud bolts, buttweld elbows, channels and
angles. Profiles with real photographs of actual stock get materially more
enquiries than those with logos alone. Add the shopfront and the interior too;
Google weights those for local ranking.

---

## The description — paste this in

Google Business Profile allows 750 characters. This is 747 — measured, not
estimated — and uses only facts already published on the website. It claims
nothing about company age, turnover or certifications we cannot evidence.

```
Ritvik Metal Impex is a Mumbai-based supplier, stockist and exporter of industrial metals and alloys. We stock stainless steel, alloy steel, duplex, nickel alloy, copper and brass in pipes and tubes, buttweld and forged fittings, flanges, sheets, plates and coils, bars, channels and angles, fasteners and valves.

Grades held include SS 304 and 316, Duplex 2205, Inconel, Monel, Titanium Grade 2 and 904L. Every consignment carries a mill test certificate to EN 10204 3.1, traceable to the heat number. IBR certification and third-party inspection can be arranged on request.

Minimum order quantity is 5 kg. Ready stock dispatches in 1 to 3 working days. We supply across India and export to the Middle East, Europe, the USA and South East Asia.
```

### Shorter version, 317 characters

For directory listings and anywhere with a tighter limit.

```
Mumbai-based supplier, stockist and exporter of stainless steel, duplex,
nickel alloy, copper and brass — pipes, fittings, flanges, plates, bars,
channels, fasteners and valves. Grades include SS 304 and 316, Duplex 2205,
Inconel, Monel, Titanium Grade 2 and 904L. Mill test certificates supplied.
Minimum order 5 kg.
```

### Why it is written this way

- **No superlatives.** "Leading", "premier" and "one of the largest" are
  unverifiable, and technical buyers discount them.
- **No founding year or client count**, because nobody has confirmed either.
  Send them and I will add them here and to the website's schema.
- **Grades and the MOQ are stated early**, because that is what a purchase
  officer scans for and what filters out enquiries you do not want.
- **No keyword stuffing and no URLs.** Google discourages links in the
  description and stuffing risks suspension.

---

## Keeping NAP consistent

Name, address and phone must match **character for character** across the
website, Google Business Profile, IndiaMART, TradeIndia and every directory.
Inconsistent NAP is one of the commonest reasons local rankings stall. The
authoritative version lives in `src/data/site.js`; copy from there.
