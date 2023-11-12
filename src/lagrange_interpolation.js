import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

function main() {
  const root = createRoot(document.getElementById('react-root'));
  root.render(<h1>Hello, world!</h1>);
}

main()
