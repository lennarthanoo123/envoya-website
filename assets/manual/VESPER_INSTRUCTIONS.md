# Manual Auto-Update Instructions for Vesper

## When to update the manual

Every time a new version of Lead Machine is released, as part of the release process:

1. **Update `MANUAL_CONTENT.md`** — add new features, update changed functionality, update the version number and changelog section at the bottom
2. **Run the regeneration script:**
   ```
   cd /Users/lennart/projects/envoya-website/assets/manual
   python3 update-manual.py
   ```
3. **Commit and push:**
   ```
   git add -A && git commit -m "docs: update manual to vX.X.X" && git push
   ```
4. Cloudflare Pages auto-deploys on push — live at https://envoya.tech/assets/manual/ within ~1 minute.

---

## What to update per change type

| Change type | Action |
|-------------|--------|
| New feature | Add to relevant section in MANUAL_CONTENT.md + update changelog |
| Changed UI | Update screenshot reference + description in relevant section |
| New module | Add full new `## SECTION_NAME` block with all sub-headers |
| Bug fix (user-visible) | Update relevant section if behavior changed |
| Internal only | Skip — no user-facing doc update needed |
| New integration | Add row to INTEGRATIONS section + setup steps |
| New report | Add row to REPORTS section |

---

## Section format in MANUAL_CONTENT.md

```markdown
## SECTION_NAME
Brief intro paragraph.

**Screenshot:** screen-filename.jpg  (omit if no screenshot)

**Key concept / heading:**
- Bullet point details
- More details

**Another heading:**
Content here.
```

Sections that map to the HTML manual:
- WELCOME → hero section
- SETUP_WIZARD → #setup-wizard
- CONNECTING_GMAIL → #connecting-gmail
- CONNECTING_APOLLO → #connecting-apollo
- ICP_CONFIGURATION → #icp-config
- DASHBOARD → #dashboard
- PULL_LEADS → #pull-leads
- LEADS_TABLE → #leads
- LEAD_DETAIL → #lead-detail
- EMAIL_GENERATION → #email-generation
- MEETINGS → #meetings
- NURTURE → #nurture
- AI_ENGINE → #ai-engine
- REPORTS → #reports
- SCRIPT_WRITER → #script-writer
- CAMPAIGNS → #campaigns
- SETTINGS → #settings
- INTEGRATIONS → #integrations
- CHANGELOG → #changelog

---

## Screenshots

Screenshots live at: `/Users/lennart/projects/envoya-website/assets/`
They're referenced in HTML as: `../screen-NAME.jpg`

When a new screenshot is added:
1. Place it in `/Users/lennart/projects/envoya-website/assets/screen-NAME.jpg`
2. Reference it in the relevant MANUAL_CONTENT.md section as `**Screenshot:** screen-NAME.jpg`
3. Run update-manual.py

---

## The update-manual.py script

The script reads MANUAL_CONTENT.md and regenerates index.html with the full design preserved.
It lives at: `/Users/lennart/projects/envoya-website/assets/manual/update-manual.py`

Run it from the manual directory:
```bash
cd /Users/lennart/projects/envoya-website/assets/manual
python3 update-manual.py
```

---

## Release checklist addition

When doing a Lead Machine release, the manual update is step N in the release checklist.
See MEMORY.md for the full release checklist.
