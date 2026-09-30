import React from 'react';
import { Separator as AriaSeparator, type SeparatorProps as AriaSeparatorProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: 'bg-neutral-300 dark:bg-neutral-600 forced-colors:bg-[ButtonBorder] border-none',
  variants: {
    orientation: {
      horizontal: 'h-px w-full my-1',
      vertical: 'w-px min-h-8 h-full mx-1'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

const Separator: React.FC<AriaSeparatorProps> = (props) => {
    return (
        <AriaSeparator
        {...props}
        className={styles({orientation: props.orientation, className: props.className})} />
    );
}

export default Separator;