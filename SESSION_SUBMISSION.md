# Call for Participation — Session Submission

**Session Type:** Presentation  
*(A focused talk sharing technology insights, research, industry trends, or career advancement strategies. 45 minutes total: 30 minutes presentation + 15 minutes Q&A. 1–2 presenters.)*

---

## Session Title* (max 100 characters)

**Localization Pitfalls: Building Apps That Work in Every Language**

*(Character count: 56)*

---

## Session Description* (max 1000 characters)

Software that works in one language often breaks when users switch locale: addresses appear in the wrong order, numbers and currency ignore local formats, text is cut mid-word, and icons offend or confuse. This session walks through a live product-catalog demo built to illustrate common internationalization (i18n) mistakes—address format assumptions, fixed-character truncation (e.g., German compound words), number/currency formatting, RTL layout, pluralization, capitalization, and culturally sensitive icons. You’ll see each issue in action, why it matters for global users, and how to fix it with locale-aware APIs and patterns (e.g., Intl.NumberFormat, Intl.PluralRules, logical CSS). Whether you’re shipping your first localized feature or hardening an existing product, you’ll leave with concrete checks and code patterns to avoid these pitfalls and build apps that truly work in every language.

*(Character count: ~680; under 1000)*

---

## Details* (max 5000 characters; outline for Presentation)

**Overview**  
This presentation uses a single-page product-catalog app (React + Vite) that deliberately exhibits multiple localization issues. The app supports several locales (e.g., English, Arabic, German, Chinese, Japanese, Turkish, pseudo-locale) so the audience can switch languages and see what breaks. Each issue is documented in an on-page “Internationalization Issues” panel with short explanations and recommended fixes.

**How we will engage the audience**

- **Live locale switching:** Attendees see the same UI in different languages; we highlight where layout, text, numbers, and icons fail or succeed.
- **Structured issue walkthrough:** We go through the catalog issue-by-issue (address format, truncation, number format, cultural icon, RTL, pluralization, capitalization, sorting) and invite questions after each cluster.
- **Before/after and “good vs bad” comments:** The codebase includes commented examples of the wrong approach (e.g., hardcoded en-US number format) and the right approach (e.g., Intl.NumberFormat(locale, ...)), so we can show the minimal code change needed to fix each issue.
- **Q&A (15 min):** We reserve time for audience questions, war stories from localized products, and discussion of tools (e.g., i18n libraries, pseudo-localization) and process (e.g., when to involve localization early).

**Information, skills, and perspectives attendees will gain**

- **Recognition of common i18n bugs:** Address order (e.g., Japan vs Western), number/currency formatting, text truncation (e.g., German compound words, CJK), RTL layout, plural rules, and locale-sensitive capitalization (e.g., Turkish İ/i).
- **Concrete fixes:** Use of Intl.NumberFormat(locale, ...), Intl.PluralRules, locale-aware truncation or word boundaries, logical CSS (e.g., margin-inline-start), and awareness of culturally sensitive icons (e.g., thumbs up).
- **Mindset:** Why “it works in English” is not enough, and how to design and review features with multiple locales in mind from the start.

**Frameworks, examples, demos, and research**

- **Demo:** The session centers on a live demo of the product-catalog app: switching locales, showing wrong address formats, truncated descriptions, fixed number format, RTL behavior, and icon choices. The app is self-contained and can be run locally or from a deployed URL.
- **Code:** We reference specific patterns in the codebase (e.g., formatPrice using a fixed locale vs the correct call with the current locale, truncation at a fixed character index vs locale-aware or word-boundary truncation).
- **APIs and standards:** Intl (NumberFormat, PluralRules, Collator), CSS logical properties, and brief mention of i18n libraries (e.g., react-i18next) for real-world use.
- **References:** We can point to common i18n guides (e.g., MDN Intl, W3C i18n) and the Unicode CLDR for locale data where relevant.

**Suggested timing (30 min presentation)**

- Intro and why i18n matters (2–3 min)
- Demo overview and locale switcher (2 min)
- Address format, truncation, number format, cultural icon (12–14 min)
- RTL, pluralization, capitalization, sorting (8–10 min)
- Summary, takeaways, and transition to Q&A (2–3 min)

---

## Session Pillar* (select 1)

**Train** — Skills-based learning focused on technical, professional, or leadership development.

---

## Session Pillar Tracks* (select 1 when Pillar = Train)

**Technical Deep Dives (AI/ML, Engineering, Data, Security, etc.)**  
*— or —*  
**Professional Skills & Communication**

*(Choose one per form.)*

---

## Audience level* (select 1)

**Mid-Career**  
*(Also suitable for Early Career and Senior/Executive as a refresher or first deep-dive into i18n.)*

---

## Notes for submission form

- **Session Participants:** 1–2 speakers (presentation type).
- Fill in speaker name(s), email(s), address, city, state, zip, country, phone, company/institution, title, biography, career level, and years of speaking experience as required by the form.
- Optional: LinkedIn URL, speaker photo; optional checkbox for consideration in other AnitaB.org programming (virtual/in-person Membership events, Local Community events, etc.).
