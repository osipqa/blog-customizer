import arrowIcon from 'src/images/arrow.svg'; // Imports the arrow icon
import clsx from 'clsx'; // Imports the clsx library for conditional classnames
import styles from './ArrowButton.module.scss'; // Imports the component styles

/**
 * Props for the ArrowButton component
 * @param {function} onClick - Function to handle the button click event
 * @param {boolean} isOpened - Flag indicating whether the sidebar is open or closed
 */

export type ArrowButtonProps = {
	onClick: () => void;
	isOpened: boolean;
};

/**
 * ArrowButton component
 * @param {ArrowButtonProps} onClick - Function to handle the button click event
 * @param {ArrowButtonProps} isOpened - Flag indicating whether the sidebar is open or closed
 */

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	onClick,
	isOpened,
}) => {
	// Conditionally apply classes based on whether the sidebar is open or closed
	const buttonClass = clsx(styles.container, {
		[styles.container_open]: isOpened,
	}); // Adds 'container_open' class if sidebar is open
	const arrowClass = clsx(styles.arrow, {
		[styles.arrow_open]: isOpened,
	}); // Adds 'arrow_open' class if sidebar is open

	/*  js constuction
  let buttonClass = styles.container;
  let arrowClass = styles.arrow;

  if (isOpened) {
	  buttonClass += ` ${styles.container_open}`;
	  arrowClass += ` ${styles.arrow_open}`;
  }
*/

	return (
		// Button container with role, aria-label, tabIndex, and onClick handler
		<div
			role='button'
			aria-label='Toggle sidebar'
			tabIndex={0}
			className={buttonClass} // Applies conditional button class
			onClick={onClick}>
			{/* Arrow icon with conditional class */}
			<img src={arrowIcon} alt='Arrow icon' className={arrowClass} />
		</div>
	);
};
