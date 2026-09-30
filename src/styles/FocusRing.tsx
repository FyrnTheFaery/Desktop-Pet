import { tv } from "tailwind-variants";

// Currently not used
export const focusRing = tv({
    base: 'outline outline-neutral-900 dark:outline-neutral-50 forced-colors:outline-[Highlight]',
    variants: {
        isFocusVisible: {
            false: 'outline-0',
            true: 'outline-2'
        }
    }
});