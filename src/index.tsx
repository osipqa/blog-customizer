// index.tsx

import { createRoot } from 'react-dom/client'; // For rendering React components
import { StrictMode } from 'react'; // React essentials
import App from './appfile'; // Import App component

// Get the root DOM element
const rootElement = document.getElementById('root') as HTMLDivElement;

// Create a root for rendering
const root = createRoot(rootElement);

// Render the App component within a StrictMode
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
