# Influencer Search Assignment

A modern influencer discovery platform built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

The application allows users to browse influencers across Instagram, YouTube, and TikTok, view profile details, and maintain a persistent list of selected creators.

## Live Demo


```text
https://creatordirectory.vercel.app/
```

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Zustand
- React Icons

---

## Features

### Search & Discovery

- Browse creators across Instagram, YouTube, and TikTok
- Search by username, handle, or full name
- Case-insensitive search
- Responsive filtering by platform

### Profile Details

- Dedicated profile detail pages
- External links to original social platforms
- Graceful handling for unavailable profile details
- Improved loading and error states

### Selected Profiles

- Add creators to a selected list
- Duplicate prevention
- Remove creators from the list
- Persistent state using localStorage
- Shared state management with Zustand

### UI Improvements

- Redesigned modern dark theme
- Improved visual hierarchy
- Better spacing and responsiveness
- Improved empty states and interactions
- Platform icons using React Icons

---

## Changes Made

### Bug Fixes

- Fixed YouTube search issues caused by missing username fields
- Improved handling for profiles without detail JSON files
- Fixed TypeScript deprecation warnings
- Removed unused dependencies
- Improved search behavior across different data formats

### UI/UX Improvements

- Redesigned the application with a modern dark theme
- Improved cards, buttons, search inputs, and layouts
- Added responsive improvements
- Enhanced loading and empty states
- Improved overall user experience

### State Management

- Added Zustand for global state management
- Implemented persistent selected profiles using localStorage
- Replaced the incomplete Add to List implementation

### Performance Improvements

- Reduced unnecessary renders using React best practices
- Improved component organization and code reuse
- Optimized filtering logic
- Removed unused code and dependencies

---

## Libraries Added

### Zustand

Used for:

- Global state management
- Persistent selected profiles
- Duplicate prevention
- Cross-page state sharing

### React Icons

Used to improve the platform filter UI and overall visual consistency.

---

## Assumptions Made

- Some creators intentionally do not have detailed profile JSON files.
- Missing profile details are handled gracefully instead of generating artificial data.
- Selected profiles should persist using browser localStorage.
- The Add to List functionality should be shared across all pages using global state.

---

## Trade-offs

- Zustand was chosen instead of more complex state management solutions because the application requirements are relatively lightweight.
- Kept animations minimal to prioritize performance and maintainability.
- Did not create additional profile data files for creators whose details were unavailable in the provided dataset.

---

## Future Improvements

Potential future enhancements include:

- Add automated tests using Vitest and React Testing Library
- Improve accessibility further with additional ARIA support
- Add drag-and-drop reordering for selected profiles
- Add micro-interactions and animations
- Support API-based data loading instead of static JSON files
- Improve mobile experience further

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/jash1734/wobb-intern-assignment
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run lint checks:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Project Structure

```text
src
├── assets
│   └── data
├── components
├── pages
├── store
├── types
└── utils
```

---

## Submission Checklist

- ✅ Application builds successfully using `npm run build`
- ✅ Application runs without errors
- ✅ Responsive UI improvements
- ✅ Zustand-based state management
- ✅ Persistent selected profiles
- ✅ Meaningful Git history
- ✅ Public GitHub repository
- ✅ Deployment support

---