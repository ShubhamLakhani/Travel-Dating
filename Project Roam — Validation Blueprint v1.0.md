# Project Roam — Validation Blueprint

**Version:** 1.0  
**Stage:** Pre-MVP Validation  
**Working concept:** Travel-first dating platform  
**Primary objective:** Determine whether there is enough real user demand, trust, behavioural intent, and destination density to justify building the mobile product.

---

# 1. Product Hypothesis

Project Roam is a travel-dating product that helps single travelers meet compatible people who will be in the same destination during overlapping travel dates.

Instead of primarily asking:

**“Who is near me right now?”**

Project Roam asks:

**“Who will be where I’m going, when I’m going?”**

The initial product is centered around a **Trip**, not simply the user's current GPS location.

Example:

**User A**
- Traveling to Bali
- December 4–12
- Solo traveler
- Looking for dating
- Interested in beaches, cafés and photography

**User B**
- Traveling to Bali
- December 7–16
- Solo traveler
- Compatible dating preferences
- Similar interests

Project Roam identifies that they have five overlapping days and can introduce them before they arrive.

---

# 2. Core Value Proposition

### Main message

**Meet someone going where you're going.**

### Supporting message

Connect with compatible singles before or during your next trip based on your destination, travel dates, interests and dating preferences.

### Primary differentiation

Traditional dating apps primarily use:

**User + Current Location**

Project Roam uses:

**User + Upcoming Trip + Dates + Dating Preferences + Travel Style**

---

# 3. Who We Are Validating First

We should not initially target every traveler.

Our first target segment is:

### Primary audience

Single solo leisure travelers approximately **22–35 years old** who are comfortable meeting new people while traveling.

We particularly want users who:

- Travel at least occasionally for leisure.
- Sometimes travel alone.
- Use or have used dating/social apps.
- Are comfortable meeting people online.
- Want romantic or dating experiences while traveling.
- Would consider meeting another traveler or a local.
- Plan some trips at least several days or weeks ahead.

### Secondary audience

Locals who are interested in dating travelers visiting their city.

Locals are important for marketplace liquidity, but the **traveler remains our initial acquisition focus**.

---

# 4. The Five Critical Hypotheses

These are the assumptions that need validation before we invest heavily in the application.

## H1 — Problem Hypothesis

Travelers already want to meet romantic partners while traveling, but current dating apps do not fully solve the experience.

### Questions we need answered

Do travelers currently use dating apps while traveling?

Do they start searching before arriving or only after arrival?

Do they experience problems related to timing, location, fake profiles, safety or irrelevant matches?

Would knowing someone's actual travel dates improve the experience?

### Evidence supporting H1

Repeated interviewees independently describe:

- Using dating apps during trips.
- Changing their location before traveling.
- Difficulty finding people who will actually be available.
- Matches disappearing before/after arrival.
- Safety concerns.
- Difficulty understanding another person's intentions.

### Evidence weakening H1

Most people say existing apps completely solve this problem and there is little reason to use a travel-specific product.

---

# 5. H2 — Trip-Based Discovery Hypothesis

Users are willing to add a destination and future travel dates in order to discover compatible singles.

This is the most important product hypothesis.

### What we test

Users see:

**Where are you going?**

Destination:
`Bali`

Dates:
`December 4 – December 12`

CTA:

**Find travel matches**

### Strong behaviour

The user enters a real upcoming trip.

### Weak behaviour

The user only views the landing page or says the idea sounds interesting.

### Stronger behaviour

The user:

1. Enters destination.
2. Adds real travel dates.
3. Views example matches.
4. Submits contact information.
5. Requests early access.

This represents significantly stronger intent than an email signup alone.

---

# 6. H3 — Trust & Safety Hypothesis

Travel-specific safety features materially increase users' willingness to meet people through Project Roam.

Potential safety mechanisms:

- Selfie/liveness verification.
- Optional identity verification.
- Approximate location instead of precise hotel location.
- Report and block.
- Trusted contact.
- Date-plan sharing.
- Check-in timer.
- Public meeting-place recommendations.
- Scam warnings.
- Moderation.

### What we want to learn

Which safety concerns prevent travelers from meeting strangers?

Which safety features actually increase trust?

Which features are especially important to women traveling alone?

Which features feel intrusive?

Safety may eventually become one of Project Roam's primary competitive advantages.

---

# 7. H4 — Marketplace Density Hypothesis

We can acquire enough compatible users traveling to the same destinations during overlapping periods.

This may be the biggest business risk.

Project Roam can have thousands of users and still fail if everyone is traveling somewhere different.

Therefore we measure:

## Trip Density

**Number of potentially compatible users within the same destination and travel window.**

Example:

500 users spread across 300 destinations = poor liquidity.

500 users with 100 visiting Bali during December = potentially useful liquidity.

The validation system must therefore collect:

- Destination.
- Arrival date.
- Departure date.
- Gender.
- Dating preference.
- Age range.
- Home country.

This allows us to estimate real marketplace density.

---

# 8. H5 — Willingness-to-Pay Hypothesis

A portion of users will eventually pay for premium travel-dating features.

We are **not trying to prove revenue immediately**.

First we prove demand.

However, interviews should investigate whether travelers already pay for dating-app premium features.

Potential premium features later include:

- Multiple upcoming trips.
- Advanced filters.
- See who liked you.
- Rewind.
- Incognito mode.
- Destination boost.
- Priority visibility.
- Longer pre-trip discovery window.

Safety features should **not** be premium.

---

# 9. Validation Experiment

The first validation product will be a responsive **single-page web application**.

It should feel like the beginning of Project Roam rather than a traditional startup landing page.

## Landing-page journey

### Step 1 — Hero

**Meet someone going where you're going.**

Connect with compatible singles before or during your next trip.

### Step 2 — Trip search

User enters:

**Destination**

**Arrival date**

**Departure date**

CTA:

**Find Travel Matches**

### Step 3 — Simulated results

Show realistic example profiles.

Example:

**Anna, 27**

Germany 🇩🇪

Bali  
Dec 6–14

**6 days overlap**

Photography  
Beaches  
Cafés

Solo traveler

Looking for dating.

### Step 4 — Value explanation

Briefly explain:

**Match before you travel**

**Meet people there at the same time**

**Know your shared interests**

**Meet more safely**

### Step 5 — Early access

Message:

**Want to see your real matches?**

Join Project Roam Early Access.

### Step 6 — Validation questionnaire

Collect the information required for validation.

---

# 10. Data We Collect

We should avoid asking too many questions before demonstrating value.

After the visitor sees example results, collect:

### Required

Email

Age range

Gender

Interested in

Home country

Destination

Arrival date

Departure date

Solo / friends / group

### Optional

How often do you travel?

Have you used dating apps while traveling?

Are you open to meeting locals?

Are you open to meeting other travelers?

What are you looking for?

- Casual dating
- Romantic connection
- Long-term possibility
- Open to seeing where it goes

Would you participate in a short product interview?

---

# 11. Important Analytics Events

We should measure the complete funnel.

### Event 1

`landing_view`

Visitor loads the page.

### Event 2

`destination_entered`

Visitor enters a destination.

### Event 3

`trip_dates_entered`

Visitor enters travel dates.

### Event 4

`find_matches_clicked`

Visitor actively attempts to see matches.

### Event 5

`sample_matches_viewed`

Visitor reaches simulated results.

### Event 6

`early_access_started`

Visitor begins signup.

### Event 7

`early_access_completed`

Visitor submits their details.

### Event 8

`real_trip_submitted`

Visitor provides a genuine future trip.

### Event 9

`interview_opt_in`

Visitor agrees to an interview.

These events become our first product funnel.

---

# 12. Validation Funnel

We track:

**Landing Visitors**

↓

**Destination Entered**

↓

**Travel Dates Added**

↓

**Find Matches Clicked**

↓

**Example Matches Viewed**

↓

**Early Access Started**

↓

**Early Access Completed**

↓

**Real Trip Submitted**

↓

**Interview Opt-In**

The most important events are:

**Find Matches Clicked**

and

**Real Trip Submitted**

These represent behaviour rather than passive interest.

---

# 13. Initial Success Benchmarks

These are internal validation targets, not universal industry benchmarks.

They give us an objective decision framework.

Assume our first test receives roughly:

**500–1,000 relevant visitors.**

### Strong early signal

More than ~30% enter a destination.

More than ~20% click **Find Matches**.

More than ~10–15% submit early-access information.

A meaningful portion submit genuine future trips.

At least several destinations begin showing repeated demand.

Interview responses consistently reveal the problem independently of our pitch.

### Extremely interesting signal

Users voluntarily share:

- A real destination.
- Real travel dates.
- Dating preferences.
- Contact information.

And multiple compatible users appear within overlapping destination/date combinations.

That means we're beginning to see marketplace formation rather than simple curiosity.

---

# 14. Do Not Overvalue These Metrics

These numbers can make us feel good but do not strongly validate the business:

Instagram followers.

Likes.

Landing-page views.

People telling us:

**“That's a cool idea.”**

Friends saying:

**“You should definitely build it.”**

Random survey respondents saying:

**“Yes, I would use this.”**

Our strongest validation comes from **behaviour**.

---

# 15. User Interview Plan

Target:

**20–30 relevant travelers initially.**

We want a mix of:

- Men.
- Women.
- Frequent travelers.
- Occasional solo travelers.
- Backpackers.
- Digital nomads.
- Dating-app users.
- Non-dating-app users.

Avoid only interviewing friends.

---

# 16. Interview Questions

Start by understanding existing behaviour.

### Travel behaviour

Tell me about your most recent solo or independent trip.

How often do you travel?

How far ahead do you usually plan?

Do you normally travel alone, with friends or both?

### Meeting people

How do you normally meet people while traveling?

Have you ever tried meeting someone romantically during a trip?

How did you meet them?

### Dating apps

Have you used Tinder, Bumble or another dating app while traveling?

Did you use it before arriving or after?

How well did it work?

What frustrated you?

Did you ever pay for a location/travel feature?

### Timing

Would it have been useful to know someone would be in your destination during exactly the same dates?

How early would you want to start talking?

One day before?

One week?

One month?

### Trust

What would make you nervous about meeting someone while traveling?

Would profile verification matter?

Would date sharing with a trusted contact matter?

What would make the product feel safer?

### Existing alternatives

What would make you use a separate travel-dating product instead of simply Tinder or Bumble?

### Product test

Only after discussing existing behaviour:

Explain Project Roam.

Then ask:

What is your first reaction?

What part seems most useful?

What part seems unnecessary?

What would stop you from using it?

Would you submit your next trip?

---

# 17. First Traffic Sources

Initially prioritize inexpensive research and organic acquisition.

Possible sources:

Travel communities.

Solo-travel communities.

Digital-nomad communities.

Backpacking communities.

Relevant Reddit communities where research posts are permitted.

Travel Facebook groups.

Hostel communities.

Instagram travel pages.

Micro travel creators.

University/international travel communities.

Local travel groups.

Small paid campaigns can be added once the funnel works.

---

# 18. Traffic Message

We should avoid leading with:

**“Download our amazing travel dating app.”**

During research, positioning can be:

**We're researching how solo travelers meet people and date while traveling.**

This attracts better research participants and reduces confirmation bias.

Once the validation landing page is ready, traffic can be sent directly into the trip-search experience.

---

# 19. Destination Analysis

Every submitted trip should feed a simple internal dashboard.

Example:

| Destination | Trips | Users | Date overlap |
|---|---:|---:|---:|
| Bali | 32 | 31 | High |
| Bangkok | 23 | 21 | Medium |
| Goa | 19 | 18 | Medium |
| Dubai | 11 | 11 | Low |
| Barcelona | 9 | 9 | Low |

Eventually also calculate:

**Compatible match density**

Not merely number of travelers.

Because:

100 men interested in women + zero compatible women

does not create marketplace liquidity.

---

# 20. First Launch Destination

We should not choose the first destination now.

Validation should determine it.

Potential candidates may include destinations commonly associated with international or solo travel, but the actual decision will use our data.

We should choose the destination with the strongest combination of:

User demand.

Overlapping trips.

Demographic balance.

Travel frequency.

Safety/manageability.

Acquisition access.

Local population.

Repeat travel demand.

---

# 21. Validation Decision Framework

After the experiment we make one of three decisions.

## GREEN — Proceed

Evidence shows:

People independently experience the problem.

Travelers submit real upcoming trips.

Conversion is meaningful.

Multiple users cluster around certain destinations.

Trust concerns appear solvable.

People clearly understand why Project Roam differs from normal dating apps.

### Decision

Proceed to MVP specification and prototype.

---

## YELLOW — Modify

People want the general concept but use cases differ from our assumption.

Possible examples:

Users overwhelmingly want friendship + dating.

Travelers prefer locals over travelers.

People want group experiences first.

Safety is more important than matching.

Pre-trip discovery matters more than in-destination discovery.

### Decision

Modify positioning and run another validation round.

---

## RED — Stop / Pivot

Evidence shows:

Users rarely submit real trips.

Existing dating apps already satisfy most users.

Interviewees show little real behaviour around travel dating.

Marketplace density appears extremely difficult.

Trust concerns make usage unlikely.

Acquisition appears prohibitively difficult.

### Decision

Do not build the full application.

Rework or abandon the concept.

---

# 22. What We Are NOT Building Yet

Do not spend time on:

Full React Native application.

Production backend.

Complex matching algorithm.

AI itinerary planner.

Travel booking.

Flights.

Hotels.

Events marketplace.

Social feed.

Stories.

Group trips.

Advanced subscriptions.

Full recommendation engine.

Video calling.

Large-scale infrastructure.

The validation stage exists specifically to avoid prematurely building these.

---

# 23. Validation Technology

The validation site can remain simple.

Suggested stack:

**Frontend:** Next.js + TypeScript

**Styling:** Tailwind CSS

**Database:** Supabase/PostgreSQL

**Analytics:** PostHog or equivalent product analytics

**Forms:** Custom form backed by Supabase

**Hosting:** Vercel

**Email:** Simple transactional/waitlist provider

We do not need a complicated backend yet.

---

# 24. Validation Dashboard

We should create a lightweight internal dashboard containing:

Total visitors.

Destination searches.

Find Matches clicks.

Early-access registrations.

Real trips.

Interview volunteers.

Most common destinations.

Upcoming travel months.

Gender/preferences distribution.

Traveler vs local interest.

Interview themes.

Conversion rates.

Potential match density.

---

# 25. Validation Timeline

### Phase A — Preparation

Finalize blueprint.

Finalize messaging.

Create landing-page user journey.

Create example profiles.

Create validation questionnaire.

Define analytics.

### Phase B — Build

Create responsive web app.

Connect database.

Implement analytics.

Build basic validation dashboard.

Test full funnel.

### Phase C — Research

Recruit initial interview participants.

Conduct interviews.

Begin sending relevant traffic.

Observe behaviour.

### Phase D — Analysis

Analyze funnel data.

Analyze trip clustering.

Analyze interview findings.

Identify strongest pain points.

Identify likely first destination.

### Phase E — Decision

Choose:

**Build**

**Modify and retest**

or

**Pivot**

---

# 26. The Main Question We Are Trying to Answer

Everything in this experiment ultimately answers:

> **Will enough single travelers intentionally share an upcoming trip in order to discover and meet compatible people who will be there at the same time?**

If the answer appears to be yes, we have a reason to build Project Roam.

If the answer is no, we need to understand why before spending significant time developing the app.

---

# 27. Current Status

### Completed

Concept defined.

Primary differentiation identified.

Initial target audience identified.

Core Trip model established.

Safety identified as a core pillar.

Validation strategy chosen.

Validation hypotheses defined.

### Next

Design the **Project Roam validation landing-page experience**.

That includes:

Hero.

Trip-search interaction.

Sample match results.

How-it-works section.

Safety section.

Early-access form.

Validation questions.

Analytics funnel.

Only after this is designed do we begin coding the validation website.