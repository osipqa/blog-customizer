import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { clsx } from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import * as articleProps from 'src/constants/articleProps';

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
export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setCurrentStyle,
}) => {
	const [isOpened, setIsOpened] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const menuRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		/**
		 * Event listener to handle outside clicks and close the form
		 * @param event - Event object
		 */
		const closeHandler = (event: Event) => {
			// Close the form if clicked outside
			if (!menuRef.current?.contains(event.target as Node)) {
				setIsOpened(false);
			}
		};

		// Attach event listener on mount
		document.addEventListener('mousedown', closeHandler);
		// Detach event listener on unmount
		return () => {
			document.removeEventListener('mousedown', closeHandler);
		};
	}, []);

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
		console.log('Form state submitted:', formState);
		// Check if state is a function for potential async state updates
		typeof formState === 'function'
			? console.log('Value is a function, updating state...')
			: console.log('Value is not a function, updating state with:', formState);
	};

	/**
	 * Reset form to default state
	 */
	const handleReset = () => {
		// Reset form to default state
		setCurrentStyle(defaultArticleState);
		setFormState(defaultArticleState);
	};

	/* js consturction
const containerClassName = () => {
return isOpened ? `${styles.container} ${styles.container_open}` : styles.container;
};
*/

	// Apply styles based on form visibility [clsx]
	const containerClassName = clsx(styles.container, {
		[styles.container_open]: isOpened,
	});

	return (
		<>
			{/* Arrow button to toggle form visibility */}
			<ArrowButton onClick={toggleForm} isOpened={isOpened} />
			{/* Form container */}
			<aside className={containerClassName} ref={menuRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					{/* Font Family Selector */}
					<Select
						selected={formState.fontFamilyOption}
						onChange={(value: OptionType) =>
							setFormState({
								...formState,
								fontFamilyOption: value,
							})
						}
						options={articleProps.fontFamilyOptions}
						title='Font Family'
					/>
					{/* Font Size Radio Group */}
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(value: OptionType) =>
							setFormState({
								...formState,
								fontSizeOption: value,
							})
						}
						options={articleProps.fontSizeOptions}
						title='Font Size'
					/>
					{/* Font Color Selector */}
					<Select
						selected={formState.fontColor}
						onChange={(value: OptionType) =>
							setFormState({
								...formState,
								fontColor: value,
							})
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
							setFormState({
								...formState,
								backgroundColor: value,
							})
						}
						options={articleProps.backgroundColors}
						title='Background Color'
					/>
					{/* Content Width Selector */}
					<Select
						selected={formState.contentWidth}
						onChange={(value: OptionType) =>
							setFormState({
								...formState,
								contentWidth: value,
							})
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
