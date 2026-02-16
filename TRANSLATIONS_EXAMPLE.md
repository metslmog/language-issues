# How Translations Would Work in a Real App

This file shows how UI translations would be implemented alongside the technical i18n fixes demonstrated in this app.

## Example Translation Files

### `/locales/en.json`
```json
{
  "userDirectory": "User Directory",
  "searchUsers": "Search users...",
  "sortByName": "Sort by Name",
  "sortByCountry": "Sort by Country",
  "sortByRole": "Sort by Role",
  "usersFound": "{{count}} user found",
  "usersFound_plural": "{{count}} users found",
  "country": "Country",
  "role": "Role",
  "language": "Language",
  "issuesTitle": "Internationalization Issues Demonstrated"
}
```

### `/locales/ar.json` (Arabic - RTL)
```json
{
  "userDirectory": "دليل المستخدمين",
  "searchUsers": "البحث عن المستخدمين...",
  "sortByName": "ترتيب حسب الاسم",
  "sortByCountry": "ترتيب حسب البلد",
  "sortByRole": "ترتيب حسب الدور",
  "usersFound_zero": "لا يوجد مستخدم",
  "usersFound_one": "مستخدم واحد",
  "usersFound_two": "مستخدمان",
  "usersFound_few": "{{count}} مستخدمين",
  "usersFound_many": "{{count}} مستخدم",
  "usersFound_other": "{{count}} مستخدم",
  "country": "البلد",
  "role": "الدور",
  "language": "اللغة",
  "issuesTitle": "مشاكل التدويل الموضحة"
}
```

### `/locales/de.json` (German)
```json
{
  "userDirectory": "Benutzerverzeichnis",
  "searchUsers": "Benutzer suchen...",
  "sortByName": "Nach Name sortieren",
  "sortByCountry": "Nach Land sortieren",
  "sortByRole": "Nach Rolle sortieren",
  "usersFound": "{{count}} Benutzer gefunden",
  "country": "Land",
  "role": "Rolle",
  "language": "Sprache",
  "issuesTitle": "Demonstrierte Internationalisierungsprobleme"
}
```

## Implementation Example with react-i18next

### Setup (`src/i18n.js`)
```javascript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '../locales/en.json'
import arTranslations from '../locales/ar.json'
import deTranslations from '../locales/de.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
      de: { translation: deTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
```

### Usage in Components
```javascript
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation()
  
  const changeLanguage = (locale) => {
    i18n.changeLanguage(locale)
    // Also update technical formatting (sorting, etc.)
    setLocale(locale)
  }
  
  return (
    <div>
      <h1>{t('userDirectory')}</h1>
      <input placeholder={t('searchUsers')} />
      <select>
        <option>{t('sortByName')}</option>
        <option>{t('sortByCountry')}</option>
      </select>
      <p>{t('usersFound', { count: userCount })}</p>
    </div>
  )
}
```

## Key Points

1. **Two Separate Concerns:**
   - **UI Translation**: Changing text labels (handled by i18n libraries)
   - **Technical Formatting**: Sorting, capitalization, date/number formatting (handled by Intl APIs)

2. **Both Work Together:**
   - When locale changes, both translation AND technical formatting should update
   - Example: Arabic locale → UI text in Arabic + RTL layout + Arabic sorting rules

3. **Pluralization:**
   - Libraries like react-i18next handle complex plural rules automatically
   - Arabic has 6 plural forms (zero, one, two, few, many, other)
   - English only has 2 (one, other)

4. **Best Practices:**
   - Keep translation keys descriptive: `userDirectory` not `title`
   - Use interpolation for dynamic values: `{{count}} users`
   - Separate translation files per locale
   - Use translation management tools (Crowdin, Lokalise) for non-developers
