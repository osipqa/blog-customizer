import { CSSProperties, useState, useEffect } from 'react'; // React essentials
import { Article } from './components/article/Article'; // Article component for rendering articles
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm'; // Form component for article parameters
import { defaultArticleState } from './constants/articleProps'; // Default article state
import './styles/index.scss'; // Global styles
import styles from './styles/index.module.scss'; // Module-specific styles

const App = () => {
    // State for managing the current styles
    const [currentStyle, setCurrentStyle] = useState(defaultArticleState);

    useEffect(() => {
        getComputedStyle(document.getElementById('root') as HTMLElement).getPropertyValue('--bg-color');
    }, []);

    return (
        <main
            className={`${styles.main}`}
            style={
                {
                    '--font-family': currentStyle.fontFamilyOption.value,
                    '--font-size': currentStyle.fontSizeOption.value,
                    '--font-color': currentStyle.fontColor.value,
                    '--container-width': currentStyle.contentWidth.value,
                    '--bg-color': currentStyle.backgroundColor.value,
                } as CSSProperties
            }>
            <ArticleParamsForm setCurrentStyle={setCurrentStyle} />
            <Article />
        </main>
    );
};

export default App;