import { composeRenderProps, Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../../styles/FocusRing';

export interface ButtonProps extends AriaButtonProps {
    /** @default 'primary' */
    variant?: 'primary' | 'secondary' | 'destructive' | 'quiet'
}

let button = tv({
    extend: focusRing,
    base: "flex flex-row justify-center items-center w-fit h-fit p-2 rounded-xl",
    variants: {
        variant: {
            primary: 'bg-linear-to-br from-violet-200/50 via-violet-300/50 to-violet-400/50 border-2 border-neutral-600 hover:bg-neutral-600 hover:border-neutral-500 active:bg-neutral-900 active:border-t-0 active:border-b-2 active:border-neutral-700 aria-pressed:bg-neutral-900',
            secondary: 'bg-neutral-900 border-1 border-neutral-500 hover:bg-neutral-50 hover:text-neutral-950 hover:border-neutral-50',
            destructive: 'bg-rose-700 border-t-2 border-rose-600 hover:bg-rose-600 hover:border-rose-500 active:bg-rose-900 active:border-t-0 active:border-b-2 active:border-rose-700 aria-pressed:bg-rose-900 text-neutral-50',
            quiet: 'border-0 bg-transparent hover:bg-neutral-200 pressed:bg-neutral-300 text-neutral-800 dark:hover:bg-neutral-700 dark:pressed:bg-neutral-600 dark:text-neutral-100'
        },
        isDisabled: {
            true: 'border-transparent dark:border-transparent bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
        },
        isPending: {
            true: 'text-transparent'
        }
    },
    defaultVariants: {
        variant: 'primary'
    },
    compoundVariants: [
        {
            variant: 'quiet',
            isDisabled: true,
            class: 'bg-transparent dark:bg-transparent'
        }
    ]
});

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <AriaButton
            {...props}
            className={composeRenderProps(
                props.className,
                (className, renderProps) => button({...renderProps, variant: props.variant, className})
            )}
        >
            {composeRenderProps(props.children, (children, {isPending}) => (
                <>
                    {children}
                    {isPending && (
                        <span aria-hidden className="flex absolute inset-0 justify-center items-center">
                        <svg className="w-4 h-4 text-white animate-spin" viewBox="0 0 24 24" stroke={props.variant === 'secondary' || props.variant === 'quiet' ? 'light-dark(black, white)' : 'white'}>
                            <circle cx="12" cy="12" r="10" strokeWidth="4" fill="none" className="opacity-25" />
                            <circle cx="12" cy="12" r="10" strokeWidth="4" strokeLinecap="round" fill="none" pathLength="100" strokeDasharray="60 140" strokeDashoffset="0" />
                        </svg>
                        </span>
                    )}
                </>
            ))}
        </AriaButton>
    );
}

export default Button;