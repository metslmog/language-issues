# Internationalization Issues Demo

A React application that demonstrates common internationalization (i18n) and localization (l10n) issues that occur when developers have an English-only mindset and don't properly globalize their applications.

## Features

This app demonstrates 5 key internationalization issues:

1. **Name Formats** - Assumes first name + last name structure, which doesn't work for all cultures
2. **Left-to-Right Layout** - Hardcoded left/right positioning breaks in RTL languages like Arabic
3. **Singular/Plural** - English-only pluralization (just adds 's') doesn't work for languages with complex plural rules
4. **Capitalization Rules** - Using `toUpperCase()` without locale breaks in languages like Turkish
5. **Sorting/Filtering** - ASCII-based string comparison doesn't handle accented characters or locale-specific sorting

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## How to Use

1. Use the language dropdown in the top right to switch between different locales
2. Try searching for users with names containing special characters (e.g., "García", "Al-Rashid")
3. Observe how the layout breaks when switching to Arabic (RTL)
4. Notice how sorting doesn't work correctly with accented characters
5. See how pluralization only works for English

## Note on UI Translation

**This demo focuses on technical i18n issues** (sorting, formatting, layout, capitalization) rather than UI text translation. The UI text remains in English to keep the focus on the underlying technical problems.

In a real webapp, you would also translate all UI text using libraries like:
- **react-i18next** (most popular) - `npm install react-i18next i18next`
- **react-intl** (Format.js) - `npm install react-intl`
- **next-i18next** or **next-intl** (if using Next.js)

See the code comments in `src/App.jsx` for detailed examples of how translations would be implemented.

## Locales Included

- English (en)
- Arabic (ar) - RTL language
- German (de)
- Chinese (zh)
- Japanese (ja)
- Turkish (tr) - for capitalization issues
- Pseudo Locale (pseudo) - for testing

## Code Comments

Each issue in the code is marked with:
- ❌ **BAD**: Shows the problematic code
- ✅ **GOOD**: Shows the recommended fix

## Solutions

To fix these issues, you should:

1. **Name Formats**: Use locale-aware name formatting or a full name field
2. **LTR Layout**: Use CSS logical properties (`margin-inline-start` instead of `margin-left`)
3. **Singular/Plural**: Use `Intl.PluralRules` or an i18n library like `react-i18next`
4. **Capitalization**: Use `String.prototype.toLocaleUpperCase(locale)`
5. **Sorting/Filtering**: Use `String.prototype.localeCompare(locale, options)`

## Technologies Used

- React 18
- Vite
- CSS3
