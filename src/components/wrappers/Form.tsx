import { type FormProps as AriaFormProps, Form as AriaForm } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const Form: React.FC<AriaFormProps> = (props) => {
  return <AriaForm {...props} className={twMerge('flex flex-col gap-6', props.className)} />;
};

export default Form;