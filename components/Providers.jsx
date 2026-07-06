'use client';

import { useEffect, useState } from 'react';
import ThemeProvider from './ThemeProvider';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}