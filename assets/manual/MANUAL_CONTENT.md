# Lead Machine Manual — Source Content
# Version: 1.4.6
# Last Updated: 2026-04-01
# This file is the canonical content source. Edit here, then run `python3 update-manual.py` to regenerate index.html.

---

## META
- version: 1.4.6
- last_updated: April 1, 2026
- product: Lead Machine
- company: Envoya

---

## WELCOME
Lead Machine is an AI-powered B2B outbound sales tool by Envoya. It finds the right leads, scores them against your ICP, and generates personalized email variants — so your team shows up to more meetings with less manual work.

**Getting started:**
- New customers: begin with the Setup Wizard
- Daily use: Dashboard → Pull Leads → Generate Emails → Log Meetings
- Advanced: Nurture, AI Engine, Reports, Script Writer, Campaigns

---

## SETUP_WIZARD
Lead Machine's Setup Wizard walks you through everything needed to go from a fresh account to live outreach. Takes ~15 minutes.

**Prerequisites:**
- Apollo API key (from apollo.io → Settings → API)
- Gmail account for sending
- Your ICP: target industry, company size, job titles

**Steps:**
1. Create your organization — workspace name, primary sender company
2. Connect Gmail — Google OAuth, send/compose only
3. Connect Apollo — paste API key, system runs test search
4. Define your ICP — industries, company sizes, job titles, geography
5. Configure Value Proposition — 2–3 sentences, what you offer and for whom
6. Add reference clients — optional but recommended for social proof in emails
7. Pull your first leads — test batch of 5–10 to confirm everything works

---

## CONNECTING_GMAIL
Lead Machine uses Google OAuth to send emails. It requests only send and compose access — never reads your inbox.

**Authorization flow:**
1. Settings → Integrations → Gmail → Connect Gmail Account
2. Choose the sending Google account
3. Grant: "Send email on your behalf" and "Compose email drafts"
4. Redirected back — green checkmark confirms connection

**Permissions:**
- Send emails: YES
- Create drafts: YES
- Read inbox: NEVER
- Delete emails: NEVER
- Access contacts/calendar: NEVER

**Note:** Reconnect if you change your Google password — OAuth tokens are invalidated.

---

## CONNECTING_APOLLO
Apollo.io is the lead database. Your API key gives Lead Machine search and enrichment access.

**Finding your key:**
1. Log in to apollo.io
2. Settings → API → copy master API key
3. Paste into Lead Machine → Settings → Integrations → Apollo → Verify & Save

**Credit usage:**
- Company/people search: FREE (no credits)
- Email enrichment: 1 credit per lead
- Credits only consumed AFTER you approve the draft batch

---

## ICP_CONFIGURATION
Your Ideal Customer Profile defines who Lead Machine searches for and how it scores leads.

**Dimensions:**
- Industries — with percentage weights (e.g., Fintech 40%, Retail 30%)
- Company size — min/max employee range
- Job titles — multiple target titles
- Geography — country/region filter
- Exclusion list — competitors and existing contacts
- Sector weights — fine-tune scoring (1–10 scale per sector)

**ICP Score (1–10):**
- 8–10: Strong match → prioritize, generate email immediately
- 5–7: Partial match → review manually
- 1–4: Weak match → skip or archive

**Note:** ICP weights are automatically adjusted by the AI Engine based on conversion data.

---

## DASHBOARD
The daily command center. Open each morning to see pipeline status and what needs attention.

**Screenshot:** screen-dashboard.jpg

**KPI Cards:**
- Total leads — all leads across all statuses
- Emails sent — total outreach dispatched
- Meeting rate — % of emailed leads who converted to a meeting
- Meetings held — meetings that took place
- Pipeline value — estimated contract value from proposals/clients

**Pipeline Funnel:**
Stages: New → Email 1 → Email 2 → Email 3 → Replied → Meeting → Proposal → Client
AI Analysis panel below funnel surfaces drop-off insights and conversion suggestions.

**Daily Quest:**
Gamified daily goals — pull leads, send emails, log meeting outcomes.
XP system, streak counter, badges.
Use it as your morning checklist.

**Daily Fuel:**
3 intelligence items: recent news on top prospects, industry signals, LinkedIn activity.
Use for email hooks or meeting talking points.

**Email Sequence Performance:**
Cards per sequence step (Email 1, Email 2, Email 3) showing open rate, reply rate, AI effectiveness assessment.

---

## PULL_LEADS
How new prospects enter the pipeline. Searches Apollo using your ICP, scores results, presents draft for review.

**Screenshot:** screen-pull-leads.jpg
**Screenshot:** screen-apollo-preview.jpg

**Steps:**
1. Click "Pull New Leads" from Dashboard or Leads page
2. Choose batch strategy (Exploit / Explore / Wildcard)
3. Set batch size (typically 10–25)
4. Watch live progress: Search → Filter → Score → Deduplicate → Draft
5. Review draft list — approve, skip, or approve all

**Batch Strategies:**
- Exploit: high ICP match, similar to past wins → use for volume days
- Explore: adjacent segments, slightly outside main ICP → use for testing new markets
- Wildcard: broader search, loose ICP criteria → use for discovery

**Deduplication:** Automatic. Leads already in pipeline (by email or LinkedIn URL) never appear in drafts.

**Apollo Preview:** Click any draft lead to see full company details, ICP signals, funding rounds, LinkedIn.

**Credit note:** Enrichment only happens after approval — drafts are free.

---

## LEADS_TABLE
All active prospects in one place. Search, filter, sort, take action.

**Screenshot:** screen-leads.jpg

**Columns:** Name/Company, Title, ICP Score, Status, Last Activity, Actions (Email / LinkedIn / Archive)

**Filters:**
- Full-text search (name, company, title, email)
- Status filter (show only specific pipeline stage)
- ICP score filter (minimum threshold)
- Campaign filter (multi-campaign workspaces)

**Pipeline Stages:**
- New — approved, no email sent
- Email 1 — first email sent
- Email 2 — follow-up after no reply
- Email 3 — final sequence email
- Replied — lead responded
- Meeting — meeting scheduled/held
- Proposal — proposal sent
- Client — deal closed
- Archived — not a fit or unsubscribed

---

## LEAD_DETAIL
Full profile for a single prospect. Pipeline position, emails, company intel, AI signals, notes, deals.

**Screenshot:** screen-lead-detail.jpg
**Screenshot:** screen-lead-intelligence.jpg

**Pipeline Stage Tracker:**
Horizontal bar at top: New → Email 1 → Email 2 → Email 3 → Replied → Meeting → Proposal → Client
Click any stage to manually advance. Advances automatically when emails are marked sent.

**Tabs:**
- Overview — company info, ICP score breakdown, Apollo data, LinkedIn link
- Notes — free-text notes for call notes and context
- Deals — deal value, stage, probability, next steps
- Activity — chronological feed of all actions

**Email CTAs:**
Current/next step button highlighted. Past steps shown as sent with timestamp.

**Lead Intelligence Panel:**
AI-generated signals: recent company news, LinkedIn activity, funding announcements, trigger events.
Use V1 (Actueel) email variant to incorporate these signals.

---

## EMAIL_GENERATION
Core AI feature. Generates 3 distinct email variants per lead, tailored by role, company, industry, and intelligence signals.

**Screenshot:** screen-email-writer.jpg
**Screenshot:** screen-email-generated.jpg
**Screenshot:** screen-email-generating.jpg

**Three Variants:**
- V1 Actueel (News-based): References a recent company event or signal. Best when Lead Intelligence has fresh data.
- V2 Thematisch (Theme-based): Ties offer to a broad industry challenge or trend. Best when no specific news hook.
- V3 Rol/Sector (Role/Sector): Speaks to the lead's job title and function pain points. Always relevant default.

**AI Reasoning:** Expandable panel per variant explaining: signals used, reference client selected, logic behind opening hook.

**Reply Probability:** Estimated % reply likelihood based on historical performance of similar emails to similar profiles. Higher-probability variants shown first.

**Actions:**
- Copy to clipboard — subject + body in one click
- Open in Gmail — pre-fills Gmail compose with subject and body
- Translate EN↔NL — toggle all three variants simultaneously
- Regenerate — new attempt at a variant using same signals

**Sending flow:**
1. Generate emails from Lead Detail CTA button
2. Pick best variant, edit if desired
3. Open in Gmail → add recipient → send
4. Mark as Sent in Lead Machine → pipeline stage advances

**Important:** Always mark as sent. Lead Machine doesn't read Gmail — it only knows about sends you manually mark.

---

## MEETINGS
Track every intro call, pitch, and follow-up. Log outcomes, sync with Google Calendar.

**Screenshot:** screen-meetings.jpg

**Meeting Statuses:**
- To schedule — lead replied positively, meeting not yet booked
- Scheduled — calendar invite sent
- Held — meeting took place, outcome logged
- No-show — lead didn't attend

**Logging a meeting:**
1. Move lead to Meeting stage
2. Set date/time, format (Zoom/Teams/physical), pre-meeting notes
3. After meeting: mark Held, select outcome
4. Add meeting notes (feeds into AI Engine)

**Google Calendar integration:**
Creates calendar events for scheduled meetings. Events in primary calendar under Envoya Lead Machine label.

**Outcome types:**
- Positive interest → stay in Meeting, schedule next call
- Proposal requested → advance to Proposal stage
- Follow-up required → stay in Meeting, set reminder
- Not a fit → Archive with reason
- Referred elsewhere → Archive with referral note

---

## NURTURE
Keeps warm leads alive. Tracks touches, surfaces re-engagement signals, prompts when timing is right.

**Qualifying leads for Nurture:**
- Replied "not right now" or "check back in Q3"
- Meeting outcome was "follow up in X months"
- Manually added (strong ICP match not ready yet)

**Nurture Signals:**
- Job change — lead moved company or got promoted
- Company news — funding, product launch, expansion
- Time-based trigger — "check back" date has passed
- LinkedIn activity — lead posted relevant content

**Re-engagement flow:**
Signal fires → lead appears in Nurture queue with signal highlighted → generate re-engagement email (AI uses signal as hook) or dismiss.

---

## AI_ENGINE
Self-improving layer. Monitors what's working, adjusts ICP weights, surfaces insights.

**Screenshot:** screen-ai-engine.jpg

**Learning cycle triggers:**
- After every 5 logged meeting outcomes
- Weekly (whichever comes first)

**What it analyzes:**
- Conversion by ICP dimension (industry, title, company size)
- Email variant performance (which V1/V2/V3 got replies for which lead type)
- Signal accuracy (whether intelligence signals correlated with better replies)
- Sequence performance (which email step recovers most leads)

**Reviewing learnings:**
Timeline of learning events with human-readable summaries.
Accept, reject, or manually override any learning.
Rejected learnings are noted — system learns from your override.

**Training timeline:**
Visual timeline of learning events, data used, resulting ICP weight changes.

**Important:** Log meeting outcomes within 24 hours. The more consistently you log, the faster the AI improves.

---

## REPORTS
Structured view of pipeline health, email performance, and conversion trends.

**Available Reports:**
- Pipeline Funnel — volume per stage, drop-off rates, avg time per stage
- Email Performance — per-variant reply rates, best subject lines, performance by industry
- Conversion Metrics — lead-to-meeting, meeting-to-proposal, proposal-to-client rates
- ICP Performance — conversion rates broken down by ICP dimension
- Activity Log — full chronological log, filterable by date range and lead

**Features:**
- Custom date ranges
- Campaign filter (multi-brand)
- Export as CSV or PDF

---

## SCRIPT_WRITER
Campaign messaging framework. The creative brief the AI Email Writer works from.

**Components:**
- Value Proposition — core "what we do and for whom" in 2–3 sentences
- VP Variants — angle-specific versions (per industry, company type, etc.)
- Reference clients — library of client names + sectors for social proof
- Hooks library — tested opening hooks, can add your own
- CTA variants — different call-to-action phrasings to test

**Best practice:** Review every 4–6 weeks. Update VP when offering evolves. Add new reference clients as deals close.

**Tip:** Specific beats generic. "We help B2B SaaS companies with 50–300 employees extract value from CRM data" > "we help companies with AI."

---

## CAMPAIGNS
Multiple outreach programs with distinct ICPs, messaging, and sender accounts in one workspace.

**When to use:**
- Running outreach for two brands (e.g., Brush AI and Jungle Minds)
- Testing a new vertical with separate messaging
- Sending from different Gmail addresses per campaign

**Campaign Settings:**
- Campaign name (internal label)
- Sender account (which connected Gmail)
- ICP config (overrides workspace default)
- Script Writer (campaign-specific VP and reference clients)
- Sector weights (independent per campaign)
- Exclusion list
- Status (Active / Paused / Archived)

**Reporting:** Filter Reports by campaign to compare performance across outreach programs.

---

## SETTINGS
Workspace configuration, users, notifications.

**Organization:**
- Workspace name
- Default timezone
- Default language (EN or NL)
- Subscription / billing

**User Roles:**
- Admin — full access including settings, billing, user management
- Member — leads and email generation; no billing or user management

**Notifications:**
- Daily quest reminder (configurable time)
- Nurture signal fired
- AI Engine learning cycle completed
- Meeting reminder (1 hour before)

---

## INTEGRATIONS
All managed in Settings → Integrations.

**Gmail OAuth:** Required. Powers email send/compose, Gmail pre-fill.
**Apollo API:** Required. Powers lead search, enrichment, company data.
**Brave Search API:** Recommended. Powers real-time news and web signals for Lead Intelligence.
**Google Calendar:** Optional. Meeting sync, calendar event creation.

**Getting Brave Search API key:**
1. Go to api.search.brave.com
2. Sign up (free tier = several thousand queries/month)
3. Create API subscription key
4. Settings → Integrations → Brave Search → paste and save

---

## CHANGELOG

### v1.4.6 — April 1, 2026
- AI Engine learning cycle now runs after every 5 logged meeting outcomes (was weekly-only)
- Email Writer: reply probability estimates per variant with historical confidence range
- Lead Intelligence: improved signal relevance scoring via Brave Search API
- Nurture: new LinkedIn activity trigger
- Dashboard: Daily Fuel now shows 3 intelligence items (was 2) with source links
- Pull Leads: draft approval redesigned with inline Apollo preview
- Reports: new ICP Performance report
- Campaigns: sector weights now configurable per campaign
- Email Writer: EN↔NL translation on all three variants simultaneously
- General: dark mode rendering improvements (Safari, Firefox)
- Performance: leads table 40% faster for 500+ lead workspaces

### v1.4.5 — March 14, 2026
- Script Writer: VP variants now support per-industry overrides
- Meetings: Google Calendar sync bidirectional (cancellations reflected)
- Leads table: bulk-action toolbar for batch status changes
- AI Engine: training timeline shows before/after ICP weight comparison
- Bug fix: Gmail compose handles special characters correctly

### v1.4.0 — February 2026
- Multi-campaign support
- Lead Intelligence panel added to Lead Detail
- Nurture module launched (beta)
- Daily Quest gamification system
- Batch strategies (Exploit / Explore / Wildcard)
