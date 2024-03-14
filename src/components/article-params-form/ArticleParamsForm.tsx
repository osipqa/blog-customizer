import { useState, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import { defaultArticleState, OptionType, ArticleStateType } from 'src/constants/articleProps';
import { useClose } from '../hooks/useClose'; // Импорт кастомного хука
import * as articleProps from 'src/constants/articleProps';
import { Text } from '../text/Text';

/**
 * Component props interface
 * @param setCurrentStyle - Function to update the current article style
 */
interface ArticleParamsFormProps {
	setCurrentStyle: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

/**
 * ArticleParamsForm component to handle article parameters
 * @param setCurrentStyle - Function to update the current article style
 */
export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ setCurrentStyle }) => {
	const [isOpened, setIsOpened] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const menuRef = useRef<HTMLFormElement>(null);

	// Применение кастомного хука useClose
	useClose({ isOpen: isOpened, onClose: () => setIsOpened(false), rootRef: menuRef });

	/**
	 * Toggle form visibility
	 */
	const toggleForm = () => {
		setIsOpened(!isOpened);
	};

	/**
	 * Handle form submission
	 * @param event - Form submission event
	 */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Submit form state
		setCurrentStyle(formState);
	};

	/**
	 * Reset form to default state
	 */
	const handleReset = () => {
		// Reset form to default state
		setCurrentStyle(defaultArticleState);
		setFormState(defaultArticleState);
	};

	// Apply styles based on form visibility [clsx]
	const containerClassName = `${styles.container} ${isOpened ? styles.container_open : ''}`;

	return (
		<>
			{/* Arrow button to toggle form visibility */}
			<ArrowButton onClick={toggleForm} isOpened={isOpened} />
			{/* Form container */}
			<aside className={containerClassName} ref={menuRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase family='open-sans'>
						Задайте параметры
					</Text>
					{/* Font Family Selector */}
					<Select
						selected={formState.fontFamilyOption}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
						options={articleProps.fontFamilyOptions}
						title='Font Family'
					/>
					{/* Font Size Radio Group */}
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
						options={articleProps.fontSizeOptions}
						title='Font Size'
					/>
					{/* Font Color Selector */}
					<Select
						selected={formState.fontColor}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontColor: value })
						}
						options={articleProps.fontColors}
						title='Font Color'
					/>
					{/* Separator */}
					<Separator />
					{/* Background Color Selector */}
					<Select
						selected={formState.backgroundColor}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, backgroundColor: value })
						}
						options={articleProps.backgroundColors}
						title='Background Color'
					/>
					{/* Content Width Selector */}
					<Select
						selected={formState.contentWidth}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, contentWidth: value })
						}
						options={articleProps.contentWidthArr}
						title='Content Width'
					/>
					{/* Bottom Container with Reset and Submit buttons */}
					<div className={styles.bottomContainer}>
						{/* Reset Button */}
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						{/* Submit Button */}
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};