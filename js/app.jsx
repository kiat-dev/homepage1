import './bootstrap'; // Laravel bootstrap
import '../css/tialwind';   // Tailwind
import '../css/mine.css';  // your custom CSS
// import '../css/app.css';  // Tailwind CSS

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: async (name) => {
    // Lazy import (فقط صفحه‌ای که لازم است بارگذاری می‌شود)
    const pages = import.meta.glob('./Pages/**/*.jsx')
    const importPage = pages[`./Pages/${name}.jsx`]

    if (!importPage) {
      console.error(`Page not found: ${name}`)
      return
    }

    const page = await importPage()

    if (!page.default) {
      console.error(`Page "${name}" does not have a default export`, page)
      return
    }

    return page.default
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
