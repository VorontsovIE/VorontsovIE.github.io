import jQuery from "jquery";
import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

export function main() {
  console.log('here');
  const root = createRoot(document.getElementById('react-root'));
  root.render(<h1>Hello, world!</h1>);
}

jQuery(document).ready(main);
