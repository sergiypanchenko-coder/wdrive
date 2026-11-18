# Council session: 18 November 2026

Run with `prompts/agent-council.md`.

## Question

Wubber has a working app but no real rides yet. Should the team switch off demo mode and run a live pilot in Torino this winter, and if so, under what conditions?

## Evidence (pulled from the Supabase database and the code on 18 Nov 2026)

- Ride requests: 2 total, both cancelled, both on 16 Oct 2026 (team test rides). Average distance 4.8 km.
- Completed rides: 0. Feedback answers: 0, so there is no data yet on H3, H4 or H6.
- Drivers signed up: 0. Verified: 0.
- Accounts: 3 riders, 1 team.
- Emergency alerts: 0.
- App setting `demoRides: true`: bookings currently run a simulated driver on the phone.
- Fare quote (`app.js:916`): pegged to "roughly what UberX charges in Torino (5 km, 14 min ≈ €15–20), then €1–2 more", so a 5 km, 14 min ride is quoted at €17–22. The team sets the final price by hand.
- Survey options: safety (safer / same / less safe); frequency (weekly / few a month / monthly / rarely); price (same / +€1 / +€2 / +€3 or more / only if cheaper).
- Built: booking on a Torino map, PIN to start the ride, live trip sharing, emergency button (shows 112, alerts the team; does not call anyone), driver application and in-person verification, team dashboard with spreadsheet export, English/Italian, privacy notice, Play Store listing drafted.

---

## Round 1: Opening statements

### The Believer

1. **The product is ready; the only missing piece is the people.** Booking, PIN, live sharing, emergency alert, driver verification and the dashboard all exist and work end to end in test. Demo mode is a switch, not a project.
2. **The need is specific and felt.** Getting home late at night is a real worry for many women in a university city like Torino (assumption, but it is the founding insight, and H3 exists to test it). Wubber's offer is narrow and easy to say: "a verified woman drives you home."
3. **The trust features are concrete, not marketing.** The driver can't start the ride without the rider's PIN, a friend can watch the trip, and every driver was checked in person. These are things a rider can see in the app.
4. **The pilot is cheap to run.** Manual matching is a feature at this size: the team can learn every ride's story. A few drivers and a few dozen riders from ESCP and the Politecnico are enough to get first readings on H3, H4 and H6 (assumption).
5. **Zero data is the strongest argument to go live.** Every week in demo mode teaches nothing. The risk of a small, controlled pilot is lower than the risk of polishing an app no one has used.

### The Skeptic

Risks, ranked by severity × likelihood:

1. **No drivers (severe, likely).** Zero drivers have applied. A woman holding an Italian NCC licence, with her own vehicle, willing to work nights for a student pilot, is a rare person (assumption). Without her there is no pilot. *Cheapest test:* try to sign 3 verified drivers in 3 weeks before announcing anything to riders.
2. **Legal exposure (severe, uncertain).** (a) Hiring only women may breach EU and Italian equal-treatment law unless an exception applies (assumption: needs a lawyer). (b) NCC rides in Italy follow their own rules on where bookings are taken and where cars wait (assumption: needs checking against the current national and Torino rules). (c) Who is liable if something goes wrong on a ride: the students, ESCP, the driver? *Cheapest test:* one hour with a mobility/employment lawyer or the ESCP legal office, written answer before the first real ride.
3. **The safety promise is bigger than the safety system (severe, medium).** The emergency button doesn't call anyone; it relies on a team member watching the dashboard at 2 a.m. If an alert is missed on a "safety-first" service, the damage to riders and to the project is serious. *Cheapest test:* run three night-time fire drills with the team phone and time the response.
4. **The price anchor is probably wrong (medium, likely).** The fare formula is pegged to "UberX in Torino", but UberX-style rides with private drivers are not how Uber works in Italy, where it mostly uses licensed NCC and taxi drivers (assumption: check). The real alternatives are taxis, Wetaxi, FreeNow, itTaxi, night buses and walking (assumption). €17–22 for 5 km may be far above what students will pay. *Cheapest test:* note the real taxi app quotes for 10 typical routes on a Friday night.
5. **The data will flatter us (medium, likely).** First riders will be friends of the founders, surveyed right after a free or friendly ride, by the people who built it. "Felt safer" and "would ride monthly" will be high and won't predict real behaviour. *Cheapest test:* count repeat paid bookings, not survey answers, and track riders who are not friends of the team separately.

### The Investor

1. **There is no traction to judge.** Zero completed rides, zero drivers. Today this is a well-built prototype and a hypothesis. I don't price prototypes; I price evidence.
2. **The unit economics are thin (assumption).** At ~€18 a ride with the driver keeping ~80%, Wubber earns ~€3.60. At night, demand comes in peaks, so a driver might do ~2 rides an hour at best. To pay a driver fairly and make money, you need dense demand on a few nights a week, plus a small team doing manual matching that costs nothing only because students do it unpaid.
3. **The moat, if there is one, is trust plus a network of drivers.** The app is copyable in weeks. A trusted brand among Torino women and a pool of verified women drivers the big apps don't have would be harder to copy, but neither exists yet.
4. **The market is real but narrow.** Night rides by women in one Italian city is a small start (assumption). The interesting version is a "trusted night rides" brand that can expand to Milan, Bologna and other student cities, or a B2B product sold to universities, clubs and employers who want to get women home safely.
5. **Stance: would pass today. I'd take a meeting after a live pilot with 50+ completed rides by riders who aren't friends, 30%+ coming back within a month, and at least 5 active drivers. Then a pre-seed of €150–250k, conditional on a legal opinion on the women-only model.**

---

## Round 2: Cross-examination

**Believer → Skeptic:** If the legal and driver risks are real, isn't the right response to test them now with a small live pilot, rather than keep everything in demo mode?
**Skeptic:** Yes, test them now, but the order matters. The legal question and the driver count must be answered *before* any rider gets in a car, because a missed emergency or an unlawful hiring rule can't be undone by a later survey. I'm not against going live; I'm against going live on hope.

**Believer → Investor:** You want 50 rides and 30% return rate. Isn't that exactly what a live pilot would produce, so shouldn't you be pushing them to start?
**Investor:** I am pushing them to start, but a pilot built to impress investors and a pilot built to learn are different. I'd rather see 50 honest rides at real prices than 200 free rides to friends. Charge from day one.

**Skeptic → Believer:** You say the pilot is cheap. Who is awake with the dashboard at 2:30 a.m. on a Saturday, every Saturday, for two months?
**Believer:** Fair hit. Today, nobody is scheduled. The pilot has to run on fixed nights only (e.g. Thursday to Saturday, 22:00–03:00) with a named team member on duty each night, or it shouldn't run.

**Skeptic → Investor:** If the B2B or university route is the real business, why test the consumer app at all?
**Investor:** Because a university will only buy what students already use and trust. The consumer pilot is the evidence for the B2B pitch. But the team should talk to ESCP and one Torino university about funding rides now, in parallel; it could pay for the pilot.

**Investor → Believer:** Where do the first 5 drivers come from, by name?
**Believer:** We don't have names yet. Likely channels: NCC operators and cooperatives in Torino, women already driving for taxi or NCC companies, and women's associations (assumption). That's a gap.

**Investor → Skeptic:** What single result would make you say "this works"?
**Skeptic:** Riders who don't know the team booking a second paid ride on their own, within a month. Survey answers come second.

---

## Round 3: What would change their minds

**Believer:** If after 3 weeks of real effort we can't sign 3 verified drivers, or the lawyer says women-only drivers is unlawful with no workable exception, I'd stop calling this a pilot-ready product and change the model first.

**Skeptic:** A written legal answer, 3+ verified drivers with real NCC licences, and a tested night-time emergency response would turn me from "not yet" into "go, small and paid".

**Investor:** 50+ completed paid rides, 30%+ of non-friend riders rebooking within a month, and a price that leaves a driver ~€20+/hour after costs.

---

## Round 4: The Judge's ruling

**VERDICT: GO WITH CONDITIONS.** Switch off demo mode for a small paid pilot, but only after three gates are passed.

**CONFIDENCE: medium.** All three agents agree the product is ready and that more demo time teaches nothing. Confidence isn't higher because there is no rider, driver or price data at all: every claim about demand, safety perception and price is an assumption.

**WHAT DECIDED IT:**
1. *Skeptic:* driver supply and legality are the risks that kill the project, and both can be checked cheaply before any rider is put at risk.
2. *Believer:* the app is ready, and staying in demo mode has a real cost: zero learning.
3. *Investor:* charge real prices from the first ride and judge on repeat bookings, not survey answers.

**WHAT WE STILL DON'T KNOW:**
- Whether a women-only driver model is lawful in Italy, and under which structure (employee, NCC partner, cooperative).
- Whether any licensed women NCC drivers will work nights for this pilot, and at what pay.
- What riders will actually pay compared with taxi apps on the same routes (the €17–22 quote is pegged to an Uber price that may not apply in Italy).
- Whether demand outside the team's own network exists at all.

**NEXT STEPS:**
1. **Legal check.** Owner: founder. Deadline: 2 weeks. Pass: a written opinion (lawyer or ESCP legal office) covering women-only drivers, the NCC rules for app bookings, and liability/insurance on pilot rides.
2. **Driver gate.** Owner: operations lead. Deadline: 3 weeks. Pass: 3 drivers verified in person with valid NCC licences who agree to cover fixed nights (Thu–Sat, 22:00–03:00).
3. **Safety drill.** Owner: team on night duty. Deadline: 3 weeks. Pass: in 3 drills at night, an emergency alert is seen and acted on within 2 minutes, and there is a written plan for who calls whom.
4. **Price check.** Owner: whoever owns pricing. Deadline: 1 week. Pass: real Friday-night taxi app quotes for 10 typical routes, and the fare formula re-anchored to them.
5. **Live pilot.** Owner: whole team. Deadline: weeks 4–10. Pass: 50+ completed paid rides; 30%+ of riders who aren't friends of the team rebook within 30 days; H3 "safer" ≥ 70% and H4 "monthly or more" ≥ 50% among those riders.

**KILL CRITERIA:**
- The legal opinion says women-only drivers isn't workable → pivot (e.g. "women drivers preferred", or a women-led driver network open to all riders, or a B2B safe-ride service) before launching.
- Fewer than 3 verified drivers after 3 weeks → stop the consumer pilot; explore partnering with an existing NCC or taxi cooperative instead.
- After 6 weeks live, under 15% of non-friend riders rebook, or most price answers are "only if cheaper" → stop or rethink the offer.

**DISSENT (the Investor):** Even if all gates pass, the business earns about €3–4 a ride and runs on unpaid student time. A successful pilot proves people want it, not that it can make money. The team should test a university or employer paying for rides in parallel, because that may be the only way the numbers work.
