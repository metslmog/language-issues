import React, { useState, useMemo } from 'react'
import { MdThumbUpOffAlt, MdThumbUpAlt } from 'react-icons/md'
import './App.css'

// Import translation files
import enTranslations from './locales/en.json'
import arTranslations from './locales/ar.json'
import deTranslations from './locales/de.json'
import trTranslations from './locales/tr.json'

// Locale configurations
const locales = {
  en: { name: 'English', dir: 'ltr' },
  ar: { name: 'العربية (Arabic)', dir: 'rtl' },
  de: { name: 'Deutsch (German)', dir: 'ltr' },
  tr: { name: 'Türkçe (Turkish)', dir: 'ltr' }
}

const translations = {
  en: enTranslations,
  ar: arTranslations,
  de: deTranslations,
  tr: trTranslations,
}

const t = (key, locale, params = {}) => {
  const translation = translations[locale]?.[key] || translations.en[key] || key
  return translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
    return params[paramKey] || match
  })
}

// Catalog items with address format and truncation issues
// Address: Japan uses postal-first, big-to-small (postal → prefecture → city → street)
// Some items have long German descriptions to demonstrate truncation (word cut mid-way)
const catalogItems = [
  { id: 1, name: 'Wireless Mouse', price: 29.99, category: 'Electronics', recommended: true, address: { street: '123 Tech Blvd', city: 'Austin', state: 'TX', postalCode: '78701', country: 'USA' }, description: 'Ergonomic wireless mouse with long battery life.' },
  { id: 2, name: 'Mechanical Keyboard', price: 89.99, category: 'Electronics', recommended: true, address: { street: '45 Innovation Way', city: 'Munich', state: 'Bavaria', postalCode: '80331', country: 'Germany' }, description: 'Cherry MX switches. Sturdy build.' },
  { id: 3, name: 'Desk Lamp', price: 44.99, category: 'Office', recommended: false, address: { street: '1-2-3 Shibuya', city: 'Shibuya-ku', state: 'Tokyo', postalCode: '150-0002', country: 'Japan', postalFirst: true }, description: 'LED desk lamp with adjustable brightness. Saves energy.' },
  { id: 4, name: 'Notebook Set', price: 12.99, category: 'Office', recommended: false, address: { street: '78 Station Road', city: 'London', state: 'England', postalCode: 'EC1A 1BB', country: 'UK' }, description: 'Set of 3 A4 notebooks. Recycled paper.' },
  { id: 5, name: 'Monitor Stand', price: 59.99, category: 'Office', recommended: true, address: { street: '〒100-0001 東京都千代田区千代田1-1', city: 'Chiyoda-ku', state: 'Tokyo', postalCode: '100-0001', country: 'Japan', postalFirst: true }, description: 'Height-adjustable monitor stand. Reduces neck strain.' },
  { id: 6, name: 'USB-C Hub', price: 49.99, category: 'Electronics', recommended: false, address: { street: '200 Commerce St', city: 'San Francisco', state: 'CA', postalCode: '94108', country: 'USA' }, description: '7-in-1 USB-C hub with HDMI and SD card.' },
  // Long German description to demonstrate truncation: in DE locale this gets cut mid-word when we use fixed character truncation
  { id: 7, name: 'Headphones', price: 129.99, category: 'Electronics', recommended: true, address: { street: 'Kurfürstendamm 101', city: 'Berlin', state: 'Berlin', postalCode: '10711', country: 'Germany' }, description: 'Over-ear noise-cancelling headphones. Sturdy build.', descriptionDe: 'Over-ear noise-cancelling headphones. Die Geschwindigkeitsbegrenzungsüberwachungskamera ist ein Beispiel für lange deutsche Wörter.' },
  { id: 8, name: 'Webcam', price: 79.99, category: 'Electronics', recommended: false, address: { street: '15 Rue de la Paix', city: 'Paris', state: 'Île-de-France', postalCode: '75002', country: 'France' }, description: '1080p webcam with built-in microphone.' },
]

// Truncation length — causes German long words to be cut in the middle
const DESCRIPTION_TRUNCATE_LENGTH = 55

// Thumbs up icon — filled or outline (cultural icon issue: can be misinterpreted)
const ThumbsUpIcon = ({ filled, title, 'aria-label': ariaLabel }) => (
  <span
    className={`thumbs-up-icon thumbs-up-icon--${filled ? 'filled' : 'outline'}`}
    title={title}
    aria-label={ariaLabel}
    role="img"
  >
    {filled ? <MdThumbUpAlt size={20} aria-hidden /> : <MdThumbUpOffAlt size={20} aria-hidden />}
  </span>
)

function App() {
  const [locale, setLocale] = useState('en')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const currentLocale = locales[locale]

  // ISSUE: Address Format — Assumes Western order (street, city, state, postal) everywhere
  // Japan and others use postal-first, big-to-small: 〒postal → prefecture → city → street
  // ❌ BAD: Always using Western order — switch to Japanese locale and see Japan addresses look wrong
  const formatAddress = (item) => {
    const a = item.address
    // ✅ GOOD would be: if (a.postalFirst && a.country === 'Japan') return `〒${a.postalCode} ${a.state} ${a.city} ${a.street}`
    return `${a.street}, ${a.city}, ${a.state} ${a.postalCode}`
  }

  // ISSUE: Truncation — Fixed character count cuts German compound words (and can break CJK graphemes)
  // In German, long words like Geschwindigkeitsbegrenzungsüberwachungskamera get split mid-word
  const truncateDescription = (item) => {
    const text = locale === 'de' && item.descriptionDe ? item.descriptionDe : item.description
    if (text.length <= DESCRIPTION_TRUNCATE_LENGTH) return text
    // ❌ BAD: Truncating at fixed index can cut a word in half (German) or a character (CJK)
    return text.slice(0, DESCRIPTION_TRUNCATE_LENGTH) + '…'
  }

  // Capitalization without locale (e.g. Turkish İ/i)
  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  // ISSUE: Number/currency format — Always using one locale's format
  // ❌ BAD: Prices stay in en-US format ($1,234.56) even when language is German (expect 1.234,56 $) or French (1 234,56 $)
  // FIX: Use Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }) so decimal/thousand separators and symbol position follow the locale
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  const filteredAndSortedItems = useMemo(() => {
    let filtered = catalogItems.filter(item => {
      const search = searchTerm.toLowerCase()
      const name = item.name.toLowerCase()
      const cat = item.category.toLowerCase()
      const desc = (item.descriptionDe && locale === 'de' ? item.descriptionDe : item.description).toLowerCase()
      return name.includes(search) || cat.includes(search) || desc.includes(search)
    })

    filtered.sort((a, b) => {
      if (sortBy === 'name') return (a.name > b.name) ? 1 : -1
      if (sortBy === 'category') return (a.category > b.category) ? 1 : -1
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'liked') return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0) // Liked (recommended=true) first
      return 0
    })

    return filtered
  }, [searchTerm, sortBy, locale])

  const getItemCountText = (count) => {
    try {
      const rules = new Intl.PluralRules(locale)
      const plural = rules.select(count)
      const key = `itemFound_${plural}`
      const text = translations[locale]?.[key] || translations[locale]?.itemFound_other || translations.en.itemFound_other
      return `${count} ${text}`
    } catch (e) {
      if (count === 1) return `1 ${t('itemFound_one', locale)}`
      return `${count} ${t('itemFound_other', locale)}`
    }
  }

  return (
    <div className="app" dir={currentLocale.dir}>
      <header className="header">
        <h1>{t('productCatalog', locale)}</h1>
        <div className="locale-selector">
          <label htmlFor="locale-select">{t('language', locale)}:</label>
          <select
            id="locale-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
          >
            {Object.entries(locales).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="main-content">
        <div className="controls">
          <input
            type="text"
            placeholder={t('searchProducts', locale)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">{t('sortByName', locale)}</option>
            <option value="category">{t('sortByCategory', locale)}</option>
            <option value="price">{t('sortByPrice', locale)}</option>
            <option value="liked">{t('sortByLiked', locale)}</option>
          </select>
        </div>

        <div className="results-count">
          {getItemCountText(filteredAndSortedItems.length)}
        </div>

        <div className="catalog-grid">
          {filteredAndSortedItems.map(item => (
            <div key={item.id} className="product-card">
              <div className="product-header">
                <span className="product-name">{item.name}</span>
                {/* ISSUE: Cultural icon — Thumbs up (filled = recommended) can be misinterpreted / offensive in some cultures. */}
                <ThumbsUpIcon
                  filled={item.recommended}
                  title={item.recommended ? t('recommended', locale) : t('notRecommended', locale)}
                  aria-label={item.recommended ? t('recommended', locale) : t('notRecommended', locale)}
                />
              </div>

              <div className="product-price">
                {formatPrice(item.price)}
              </div>

              <div className="product-details">
                <span className="label">{t('category', locale)}:</span>
                <span className="value">{capitalize(item.category)}</span>
                <span className="label">{t('shipsFrom', locale)}:</span>
                <span className="value address-value">{formatAddress(item)}</span>
                <span className="label">{t('description', locale)}:</span>
                <span className="value description-value">{truncateDescription(item)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="issues-panel">
          <h2>{t('issuesTitle', locale)}</h2>
          <ul>
            <li>
              <strong>{t('addressFormat', locale)}:</strong> {t('addressFormatDesc', locale)}
            </li>
            <li>
              <strong>{t('truncation', locale)}:</strong> {t('truncationDesc', locale)}
            </li>
            <li>
              <strong>{t('culturalIcon', locale)}:</strong> {t('culturalIconDesc', locale)}
            </li>
            <li>
              <strong>{t('numberFormat', locale)}:</strong> {t('numberFormatDesc', locale)}
            </li>
            <li>
              <strong>{t('ltrLayout', locale)}:</strong> {t('ltrLayoutDesc', locale)}
            </li>
            <li>
              <strong>{t('singularPlural', locale)}:</strong> {t('singularPluralDesc', locale)}
            </li>
            <li>
              <strong>{t('capitalization', locale)}:</strong> {t('capitalizationDesc', locale)}
            </li>
            <li>
              <strong>{t('sortingFiltering', locale)}:</strong> {t('sortingFilteringDesc', locale)}
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
