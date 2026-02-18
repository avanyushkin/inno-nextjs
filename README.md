# NextJS Shop App

A modern web application built with Next.js, Zustand for state management, and HeroUI components. This project simulates a real online store using the DummyJSON API for products and user authentication.

## Demo Credentials
username: emilys
password: emilyspass

## Tech Stack
* Framework: Next.js, React, TypeScript
* State Management: Zustand (with persist middleware for localStorage)
* UI Library: HeroUI, Tailwind CSS, Lucide React
* Data Fetching: Native Fetch API, DummyJSON REST API
* Routing: Next.js App Router (file-based routing, dynamic routes)

## Getting Started
### 1. Install dependencies
```
npm install
```
### 2. Run development server
```
npm run dev
```

## Server-side rendering 
Home Products Page: Implemented using SSR (Server-Side Rendering) strategy for optimal SEO and faster initial page load

## Next.js and Vite Comparison
There are 2 main differencies between NextJS and Vite.
- First one is that NextJS has many rendering stratagies (SSR, SSG, ISR, CSR), when Vite has only CSR
- Second one is that NextJS has built-in routing, when Vite uses React Router
