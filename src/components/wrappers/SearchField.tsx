import {
    SearchField as AriaSearchField,
    type SearchFieldProps as AriaSearchFieldProps,
    type ValidationResult
} from 'react-aria-components/SearchField';
import {Description, FieldError, FieldGroup, Input, Label} from './Field';
import { composeTailwindRenderProps } from '../../utils/ComposeTailwindRenderProps';
import { FieldButton } from './FieldButton';
import { Icon } from '@iconify/react';

export interface SearchFieldProps extends AriaSearchFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
}

export function SearchField({
    label,
    description,
    errorMessage,
    placeholder,
    ...props
}: SearchFieldProps) {
    return (
        <AriaSearchField
        {...props}
        className={composeTailwindRenderProps(
            props.className,
            'group flex flex-col gap-1 min-w-[40px] font-sans max-w-full'
        )}>
        {label && <Label>{label}</Label>}
        <FieldGroup>
            <Icon icon="material-symbols:search-rounded"/>
            <Input
                placeholder={placeholder}
                className="pl-2 [&::-webkit-search-cancel-button]:hidden"
            />
            <FieldButton className="mr-1 w-6 group-empty:invisible">
                <Icon aria-hidden icon="material-symbols:close-rounded"/>
            </FieldButton>
        </FieldGroup>
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
        </AriaSearchField>
    );
}