# Auto Service Scheduler Frontend - AI Pair Programming Guide

## Project Overview

This is a React/TypeScript frontend application for an automotive service scheduling system. The app enables users to view workshops, schedule appointments for their vehicles, and receive confirmations in either English or Portuguese.

## Architecture

- **Component Structure**: React functional components with hooks (useEffect, useState, useCallback)
- **Routing**: React Router v7 for navigation between workshop list, appointment form, and success pages
- **Internationalization**: Custom i18n solution using TypeScript and React hooks
- **External Dependencies**: React-Select for enhanced dropdowns, HTML2Canvas for screenshots

## Key Development Patterns

### Internationalization (i18n)

- Language detection & switching uses `useLanguage` hook in `src/hooks/useLanguage.ts`
- Translations stored as key-value pairs in `src/i18n/{en-US.ts,pt-BR.ts}`
- Components use `getTranslations(language)` to access appropriate strings
- Language switcher appears in the top-right corner of main components

```typescript
const { language, changeLanguage } = useLanguage();
const t = getTranslations(language);
// Usage: t['form.title']
```

### API Communication

- Services in `src/services/` handle backend communication
- All API calls include language header: `'Accept-Language': language`
- Error handling follows pattern of try/catch with fallbacks to hardcoded data

```typescript
// API call pattern used throughout the codebase
try {
  const response = await ServiceName.methodName(params, workshop, language);
  setStateData(response);
} catch (error) {
  console.error('Error message:', error);
  // Fallback handling
} finally {
  setIsLoading(false);
}
```

### Component Structure

- Page components (`WorkshopList`, `AppointmentForm`, `AppointmentSuccess`) contain their own language selector
- Form controls use React-Select for searchable dropdowns
- Data loading states are tracked with dedicated loading flags

### Data Flow

1. User selects workshop from `WorkshopList`
2. `AppointmentForm` loads service types & vehicle catalog from respective services
3. On form submission, appointment data is sent to backend via `AppointmentService`
4. On success, user is redirected to `AppointmentSuccess` with appointment details

## Development Workflow

### Getting Started

```bash
npm install
npm start
```

### Build for Production

```bash
npm run build
```

### Testing

```bash
npm test
```

## Common Development Tasks

### Adding a New Translation Key

1. Add the key to both `src/i18n/en-US.ts` and `src/i18n/pt-BR.ts`
2. Use it in components with `t['your.new.key']`

### Creating a New Component

1. Create file in `src/components/`
2. Import required hooks and services
3. Include language handling if user-facing: `const { language } = useLanguage(); const t = getTranslations(language);`

### Adding a New API Endpoint

1. Add appropriate types in `src/types/`
2. Create/update service in `src/services/`
3. Include language parameter in API calls: `language: Language = 'pt-BR'`