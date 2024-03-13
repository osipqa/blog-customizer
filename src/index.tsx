/**
 * Entry point of the application.
 * Creates a root and renders the main App component.
 */

// Import statements for required libraries and components
import { createRoot } from 'react-dom/client'; // For rendering React components
import { StrictMode, CSSProperties, useState, useEffect } from 'react'; // React essentials
import clsx from 'clsx'; // Utility for conditional CSS class application

import { Article } from './components/article/Article'; // Article component for rendering articles
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm'; // Form component for article parameters
import { defaultArticleState } from './constants/articleProps'; // Default article state
import './styles/index.scss'; // Global styles
import styles from './styles/index.module.scss'; // Module-specific styles

// Get the root DOM element
const rootElement = document.getElementById('root') as HTMLDivElement;

// Create a root for rendering
const root = createRoot(rootElement);

/**
 * Main App component.
 * Manages the application state and renders the Article and ArticleParamsForm components.
 */

const App = () => {
	// State for managing the current styles
	const [currentStyle, setCurrentStyle] = useState(defaultArticleState);

	// Log the background color value to the console
	console.log(
		'Initial background color value:',
		defaultArticleState.backgroundColor.value
	);

	// Effect to log the applied background color
	useEffect(() => {
		console.log(
			'Applied background color:',
			getComputedStyle(rootElement).getPropertyValue('--bg-color')
		);
	}, [rootElement]);

	// Render the App component
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentStyle.fontFamilyOption.value,
					'--font-size': currentStyle.fontSizeOption.value,
					'--font-color': currentStyle.fontColor.value,
					'--container-width': currentStyle.contentWidth.value,
					'--bg-color': currentStyle.backgroundColor.value,
				} as CSSProperties
			}>
			{/* Pass setCurrentStyle as a prop to ArticleParamsForm */}
			<ArticleParamsForm setCurrentStyle={setCurrentStyle} />
			<Article />
		</div>
	);
};

// Render the App component within a StrictMode
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
