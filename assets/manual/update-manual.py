#!/usr/bin/env python3
"""
Lead Machine Manual Regenerator
================================
Reads MANUAL_CONTENT.md and regenerates index.html with full Envoya branding.

Usage:
    cd /Users/lennart/projects/envoya-website/assets/manual
    python3 update-manual.py

The script preserves the full design — just update MANUAL_CONTENT.md with new
content, then run this to get a fresh index.html.
"""

import re
import sys
from pathlib import Path
from datetime import date

CONTENT_FILE = Path(__file__).parent / "MANUAL_CONTENT.md"
OUTPUT_FILE  = Path(__file__).parent / "index.generated.html"

# ── Parse MANUAL_CONTENT.md ──────────────────────────────────────────────────

def parse_content(text: str) -> dict:
    """Parse MANUAL_CONTENT.md into a dict of section_name → raw_markdown."""
    sections = {}
    current_section = None
    current_lines = []

    for line in text.splitlines():
        # Top-level ## headers are section markers
        m = re.match(r'^## ([A-Z_]+)\s*$', line)
        if m:
            if current_section:
                sections[current_section] = "\n".join(current_lines).strip()
            current_section = m.group(1)
            current_lines = []
        elif current_section is not None:
            current_lines.append(line)

    if current_section:
        sections[current_section] = "\n".join(current_lines).strip()

    return sections


def extract_meta(sections: dict) -> dict:
    """Extract version and last_updated from META section."""
    meta = {"version": "1.0.0", "last_updated": str(date.today())}
    if "META" not in sections:
        return meta
    for line in sections["META"].splitlines():
        if line.startswith("- version:"):
            meta["version"] = line.split(":", 1)[1].strip()
        elif line.startswith("- last_updated:"):
            meta["last_updated"] = line.split(":", 1)[1].strip()
    return meta


# ── Markdown → HTML helpers ──────────────────────────────────────────────────

def md_inline(text: str) -> str:
    """Convert inline markdown (bold, code, links) to HTML."""
    # Bold
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    # Italic
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    # Inline code
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    # Links
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    return text


def section_md_to_html(md: str, section_id: str) -> str:
    """Convert a section's markdown content to HTML body."""
    html_parts = []
    lines = md.splitlines()
    i = 0

    # Detect screenshots
    screenshot_map = {}
    for line in lines:
        m = re.match(r'\*\*Screenshot:\*\* (screen-[\w-]+\.jpg)', line)
        if m:
            screenshot_map[m.group(1)] = True

    # Build section-specific HTML (simplified but robust converter)
    in_list = False
    in_table = False
    table_rows = []

    def flush_list():
        nonlocal in_list
        if in_list:
            html_parts.append('</ul>')
            in_list = False

    def flush_table():
        nonlocal in_table, table_rows
        if in_table and table_rows:
            thtml = '<table class="doc-table"><thead>'
            header = table_rows[0]
            thtml += '<tr>' + ''.join(f'<th>{c}</th>' for c in header) + '</tr>'
            thtml += '</thead><tbody>'
            for row in table_rows[2:]:  # skip separator row
                thtml += '<tr>' + ''.join(f'<td>{md_inline(c)}</td>' for c in row) + '</tr>'
            thtml += '</tbody></table>'
            html_parts.append(thtml)
            table_rows = []
            in_table = False

    while i < len(lines):
        line = lines[i]

        # Screenshot reference
        m = re.match(r'\*\*Screenshot:\*\* (screen-[\w-]+\.jpg)', line)
        if m:
            flush_list(); flush_table()
            fname = m.group(1)
            alt = fname.replace('screen-', '').replace('.jpg', '').replace('-', ' ').title()
            html_parts.append(f'''
<div class="screenshot-wrap">
  <img src="../{fname}" alt="Lead Machine — {alt}" loading="lazy" />
  <div class="screenshot-caption">Lead Machine — {alt}</div>
</div>''')
            i += 1
            continue

        # H3
        if line.startswith('### '):
            flush_list(); flush_table()
            html_parts.append(f'<h3>{md_inline(line[4:])}</h3>')
            i += 1
            continue

        # H4
        if line.startswith('#### '):
            flush_list(); flush_table()
            html_parts.append(f'<h4>{md_inline(line[5:])}</h4>')
            i += 1
            continue

        # Bold heading (standalone **text:**)
        if re.match(r'^\*\*[^*]+:\*\*\s*$', line):
            flush_list(); flush_table()
            html_parts.append(f'<h3>{md_inline(line)}</h3>')
            i += 1
            continue

        # Table
        if '|' in line and line.strip().startswith('|'):
            flush_list()
            if not in_table:
                in_table = True
                table_rows = []
            cells = [c.strip() for c in line.strip().strip('|').split('|')]
            # Skip separator rows
            if not all(re.match(r'^[-:]+$', c) for c in cells if c):
                table_rows.append(cells)
            i += 1
            continue
        else:
            if in_table:
                flush_table()

        # Unordered list item
        if line.startswith('- '):
            flush_table()
            if not in_list:
                html_parts.append('<ul style="list-style:none;padding:0;margin:12px 0;">')
                in_list = True
            content = md_inline(line[2:])
            html_parts.append(f'<li style="display:flex;gap:10px;padding:5px 0;font-size:13.5px;color:var(--text-sec);"><span style="color:var(--indigo-light);flex-shrink:0;">→</span><span>{content}</span></li>')
            i += 1
            continue

        # Numbered list item
        m = re.match(r'^(\d+)\. (.+)', line)
        if m:
            flush_list(); flush_table()
            num = m.group(1)
            content = md_inline(m.group(2))
            html_parts.append(f'''<div class="step">
  <div class="step-num">{num}</div>
  <div class="step-body"><p>{content}</p></div>
</div>''')
            i += 1
            continue

        # Blank line
        if line.strip() == '':
            flush_list()
            if not in_table:
                i += 1
                continue

        # Normal paragraph
        if line.strip() and not in_table:
            flush_list()
            html_parts.append(f'<p>{md_inline(line.strip())}</p>')

        i += 1

    flush_list()
    flush_table()
    return '\n'.join(html_parts)


# ── Section builders ─────────────────────────────────────────────────────────

SECTION_CONFIG = [
    # (section_id, section_key, tag_label, tag_group, h2_title)
    ("setup-wizard",      "SETUP_WIZARD",       "Getting Started", "Getting Started", "Setup Wizard"),
    ("connecting-gmail",  "CONNECTING_GMAIL",   "Getting Started", "Getting Started", "Connecting Gmail"),
    ("connecting-apollo", "CONNECTING_APOLLO",  "Getting Started", "Getting Started", "Connecting Apollo"),
    ("icp-config",        "ICP_CONFIGURATION",  "Getting Started", "Getting Started", "ICP Configuration"),
    ("dashboard",         "DASHBOARD",          "Daily Workflow",  "Daily Workflow",  "Dashboard"),
    ("pull-leads",        "PULL_LEADS",         "Daily Workflow",  "Daily Workflow",  "Pulling New Leads"),
    ("leads",             "LEADS_TABLE",        "Daily Workflow",  "Daily Workflow",  "Leads Table"),
    ("lead-detail",       "LEAD_DETAIL",        "Daily Workflow",  "Daily Workflow",  "Lead Detail"),
    ("email-generation",  "EMAIL_GENERATION",   "Daily Workflow",  "Daily Workflow",  "Email Generation"),
    ("meetings",          "MEETINGS",           "Daily Workflow",  "Daily Workflow",  "Meetings"),
    ("nurture",           "NURTURE",            "Advanced Features", "Advanced",      "Nurture"),
    ("ai-engine",         "AI_ENGINE",          "Advanced Features", "Advanced",      "AI Engine &amp; Learnings"),
    ("reports",           "REPORTS",            "Advanced Features", "Advanced",      "Reports"),
    ("script-writer",     "SCRIPT_WRITER",      "Advanced Features", "Advanced",      "Script Writer"),
    ("campaigns",         "CAMPAIGNS",          "Advanced Features", "Advanced",      "Campaigns"),
    ("settings",          "SETTINGS",           "Reference",       "Reference",      "Settings"),
    ("integrations",      "INTEGRATIONS",       "Reference",       "Reference",      "Integrations"),
    ("changelog",         "CHANGELOG",          "Reference",       "Reference",      "Changelog"),
]


def build_section_html(sec_id, sec_key, tag, group, title, content_md):
    body = section_md_to_html(content_md, sec_id)
    return f'''
      <section class="doc-section" id="{sec_id}">
        <div class="section-tag">{tag}</div>
        <h2>{title}</h2>
        {body}
      </section>
      <div class="section-divider"></div>
'''


# ── Full HTML template ───────────────────────────────────────────────────────

def build_html(sections: dict, meta: dict) -> str:
    version = meta["version"]
    last_updated = meta["last_updated"]

    # Build all content sections
    content_html = ""
    for sec_id, sec_key, tag, group, title in SECTION_CONFIG:
        md = sections.get(sec_key, f"*Content for {sec_key} not yet written.*")
        content_html += build_section_html(sec_id, sec_key, tag, group, title, md)

    # Read the existing index.html and inject updated content
    # For simplicity: we regenerate the full file from the template below
    return HTML_TEMPLATE.format(
        version=version,
        last_updated=last_updated,
        content_sections=content_html,
    )


# ── HTML Template ─────────────────────────────────────────────────────────────
# This is a minimal template — the full-featured one is kept in index.html
# When run, this regenerates index.html from MANUAL_CONTENT.md.
# The template below is identical in design to the manually crafted index.html.

HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lead Machine Docs — Envoya</title>
  <meta name="description" content="Complete documentation for Lead Machine v{version} — AI-powered B2B outbound sales by Envoya." />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 40 40\\'%3E%3Crect width=\\'40\\' height=\\'40\\' rx=\\'8\\' fill=\\'%230F172A\\'/%3E%3Ccircle cx=\\'20\\' cy=\\'20\\' r=\\'4\\' fill=\\'%236366F1\\'/%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    /* [Regenerated by update-manual.py from MANUAL_CONTENT.md] */
    /* Full styles identical to hand-crafted index.html */
    *, *::before, *::after {{ margin: 0; padding: 0; box-sizing: border-box; }}
    :root {{
      --indigo: #6366F1; --indigo-soft: #818CF8; --indigo-light: #A5B4FC;
      --indigo-glow: rgba(99,102,241,0.15); --bg: #0F172A; --surface: #111827;
      --surface-2: #1E293B; --surface-3: #273348; --border: rgba(99,102,241,0.18);
      --border-soft: rgba(255,255,255,0.07); --text: #F1F5F9; --text-sec: #CBD5E1;
      --text-dim: #94A3B8; --text-faint: #64748B; --sidebar-w: 272px; --header-h: 56px;
    }}
    html {{ scroll-behavior: smooth; }}
    body {{ background: var(--bg); color: var(--text); font-family: \\'Inter\\', sans-serif; font-size: 15px; line-height: 1.7; -webkit-font-smoothing: antialiased; }}
    a {{ color: var(--indigo-light); text-decoration: none; }}
    .topbar {{ position: fixed; top: 0; left: 0; right: 0; height: var(--header-h); background: rgba(15,23,42,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 24px; z-index: 100; gap: 16px; }}
    .topbar-logo {{ display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; color: var(--text); }}
    .topbar-divider {{ width: 1px; height: 20px; background: var(--border-soft); }}
    .topbar-product {{ font-size: 14px; color: var(--text-dim); }}
    .topbar-badges {{ margin-left: auto; display: flex; align-items: center; gap: 10px; }}
    .badge {{ display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }}
    .badge-indigo {{ background: rgba(99,102,241,0.15); color: var(--indigo-light); border: 1px solid rgba(99,102,241,0.3); }}
    .badge-green {{ background: rgba(16,185,129,0.12); color: #6EE7B7; border: 1px solid rgba(16,185,129,0.25); }}
    .topbar-date {{ font-size: 12px; color: var(--text-faint); }}
    .layout {{ display: flex; padding-top: var(--header-h); min-height: 100vh; }}
    .sidebar {{ width: var(--sidebar-w); flex-shrink: 0; position: fixed; top: var(--header-h); left: 0; bottom: 0; overflow-y: auto; border-right: 1px solid var(--border); background: var(--surface); padding: 24px 0 40px; scrollbar-width: thin; }}
    .sidebar-group-label {{ padding: 6px 20px 4px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-faint); }}
    .sidebar-link {{ display: flex; align-items: center; gap: 9px; padding: 6px 20px; font-size: 13.5px; color: var(--text-dim); border-left: 2px solid transparent; transition: all 0.15s; }}
    .sidebar-link:hover {{ color: var(--text); background: rgba(99,102,241,0.07); }}
    .sidebar-link.active {{ color: var(--indigo-light); background: var(--indigo-glow); border-left-color: var(--indigo); }}
    .sidebar-divider {{ height: 1px; background: var(--border-soft); margin: 10px 20px; }}
    .main {{ margin-left: var(--sidebar-w); flex: 1; }}
    .content {{ max-width: 860px; padding: 56px 64px 120px; }}
    .doc-hero {{ margin-bottom: 64px; padding-bottom: 48px; border-bottom: 1px solid var(--border-soft); }}
    .doc-hero h1 {{ font-size: 36px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }}
    .doc-hero p {{ font-size: 16px; color: var(--text-sec); max-width: 600px; }}
    .doc-hero-meta {{ margin-top: 24px; display: flex; gap: 16px; font-size: 13px; color: var(--text-faint); }}
    .doc-section {{ margin-bottom: 80px; padding-top: 8px; }}
    .section-tag {{ display: inline-flex; padding: 3px 10px; background: var(--indigo-glow); border: 1px solid rgba(99,102,241,0.25); border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--indigo-light); margin-bottom: 12px; }}
    .doc-section h2 {{ font-size: 26px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }}
    .doc-section h3 {{ font-size: 17px; font-weight: 600; color: var(--text); margin: 36px 0 12px; }}
    .doc-section p {{ color: var(--text-sec); margin-bottom: 14px; }}
    .screenshot-wrap {{ margin: 28px 0 36px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: var(--surface-2); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }}
    .screenshot-wrap img {{ width: 100%; display: block; }}
    .screenshot-caption {{ padding: 10px 16px; font-size: 12px; color: var(--text-faint); border-top: 1px solid var(--border-soft); background: var(--surface); }}
    .section-divider {{ height: 1px; background: linear-gradient(90deg, var(--border) 0%, transparent 100%); margin: 64px 0; }}
    .doc-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13.5px; }}
    .doc-table th {{ text-align: left; padding: 10px 14px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-faint); border-bottom: 1px solid var(--border); }}
    .doc-table td {{ padding: 12px 14px; border-bottom: 1px solid var(--border-soft); color: var(--text-sec); vertical-align: top; }}
    code {{ font-size: 12.5px; background: var(--surface-2); color: var(--indigo-light); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-soft); }}
    .step {{ display: flex; gap: 16px; margin-bottom: 20px; }}
    .step-num {{ width: 28px; height: 28px; background: var(--indigo-glow); border: 1px solid rgba(99,102,241,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--indigo-light); flex-shrink: 0; margin-top: 2px; }}
    .step-body {{ flex: 1; }}
    .doc-footer {{ padding: 40px 64px; border-top: 1px solid var(--border-soft); color: var(--text-faint); font-size: 13px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }}
    section {{ scroll-margin-top: calc(var(--header-h) + 24px); }}
    @media (max-width: 768px) {{ .sidebar {{ display: none; }} .main {{ margin-left: 0; }} .content {{ padding: 32px 24px 80px; }} }}
  </style>
</head>
<body>
<header class="topbar">
  <a href="https://envoya.tech" class="topbar-logo">
    <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#0F172A"/><circle cx="20" cy="20" r="18" stroke="#818CF8" stroke-width="0.8" stroke-dasharray="2.5 2.5" opacity="0.5"/><circle cx="20" cy="20" r="4" fill="#6366F1"/><circle cx="20" cy="20" r="2.2" fill="#fff"/></svg>
    Envoya
  </a>
  <div class="topbar-divider"></div>
  <span class="topbar-product">Lead Machine Docs</span>
  <div class="topbar-badges">
    <span class="badge badge-indigo">v{version}</span>
    <span class="badge badge-green">Latest</span>
    <span class="topbar-date">Last updated: {last_updated}</span>
  </div>
</header>

<div class="layout">
  <nav class="sidebar">
    <div class="sidebar-group">
      <div class="sidebar-group-label">Getting Started</div>
      <a class="sidebar-link" href="#welcome">Welcome</a>
      <a class="sidebar-link" href="#setup-wizard">Setup Wizard</a>
      <a class="sidebar-link" href="#connecting-gmail">Connecting Gmail</a>
      <a class="sidebar-link" href="#connecting-apollo">Connecting Apollo</a>
      <a class="sidebar-link" href="#icp-config">ICP Configuration</a>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-group">
      <div class="sidebar-group-label">Daily Workflow</div>
      <a class="sidebar-link" href="#dashboard">Dashboard</a>
      <a class="sidebar-link" href="#pull-leads">Pulling New Leads</a>
      <a class="sidebar-link" href="#leads">Leads Table</a>
      <a class="sidebar-link" href="#lead-detail">Lead Detail</a>
      <a class="sidebar-link" href="#email-generation">Email Generation</a>
      <a class="sidebar-link" href="#meetings">Meetings</a>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-group">
      <div class="sidebar-group-label">Advanced Features</div>
      <a class="sidebar-link" href="#nurture">Nurture</a>
      <a class="sidebar-link" href="#ai-engine">AI Engine &amp; Learnings</a>
      <a class="sidebar-link" href="#reports">Reports</a>
      <a class="sidebar-link" href="#script-writer">Script Writer</a>
      <a class="sidebar-link" href="#campaigns">Campaigns</a>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-group">
      <div class="sidebar-group-label">Reference</div>
      <a class="sidebar-link" href="#settings">Settings</a>
      <a class="sidebar-link" href="#integrations">Integrations</a>
      <a class="sidebar-link" href="#changelog">Changelog</a>
    </div>
  </nav>

  <main class="main">
    <div class="content">
      <div id="welcome" style="margin-bottom: 64px; padding-bottom: 48px; border-bottom: 1px solid var(--border-soft);">
        <div style="display:flex;gap:10px;margin-bottom:20px;">
          <span class="badge badge-indigo">Documentation</span>
          <span class="badge badge-green">v{version}</span>
        </div>
        <h1 style="font-size:36px;font-weight:700;letter-spacing:-0.02em;margin-bottom:16px;">Lead Machine Manual</h1>
        <p style="font-size:16px;color:var(--text-sec);max-width:600px;">Everything you need to run a high-performance B2B outbound operation — from setting up your ICP to analysing what\'s working. Built for sales reps who want fewer manual steps and more meetings on the calendar.</p>
        <div style="margin-top:24px;display:flex;gap:16px;font-size:13px;color:var(--text-faint);">
          <span>Last updated: {last_updated}</span>
          <span>·</span>
          <a href="#changelog">v{version} changelog</a>
          <span>·</span>
          <a href="https://envoya.tech">envoya.tech</a>
        </div>
      </div>

      {content_sections}

    </div>
    <footer class="doc-footer">
      <div>© 2026 Envoya · Lead Machine v{version}</div>
      <div style="display:flex;gap:20px;"><a href="https://envoya.tech">envoya.tech</a><a href="https://envoya.tech/privacy">Privacy Policy</a></div>
    </footer>
  </main>
</div>

<script>
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".sidebar-link[href^=\\"#\\"]");
  function updateActive() {{
    let current = "";
    sections.forEach(s => {{ if (s.getBoundingClientRect().top <= 80) current = s.id; }});
    links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
  }}
  window.addEventListener("scroll", updateActive, {{passive: true}});
  updateActive();
</script>
</body>
</html>'''


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    if not CONTENT_FILE.exists():
        print(f"ERROR: {CONTENT_FILE} not found.")
        sys.exit(1)

    text = CONTENT_FILE.read_text(encoding="utf-8")
    sections = parse_content(text)
    meta = extract_meta(sections)

    print(f"Generating manual for Lead Machine v{meta['version']}...")
    print(f"Sections found: {', '.join(sections.keys())}")

    html = build_html(sections, meta)
    OUTPUT_FILE.write_text(html, encoding="utf-8")

    size_kb = OUTPUT_FILE.stat().st_size / 1024
    print(f"✓ Written to {OUTPUT_FILE} ({size_kb:.1f} KB)")
    print(f"  Version: {meta['version']}")
    print(f"  Last updated: {meta['last_updated']}")
    print()
    print("Next: git add -A && git commit -m 'docs: update manual' && git push")


if __name__ == "__main__":
    main()
