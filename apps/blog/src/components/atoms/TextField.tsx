import * as React from 'react';
import { classNames } from 'utils/helpers';

export type TextFieldOwnProps = {
  label?: string;
};

type TextFieldProps = TextFieldOwnProps & React.ComponentPropsWithoutRef<'input'>;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, name, type = 'text', className, ...rest }, forwardedRef) => (
    <div>
      {label && (
        <label htmlFor={id || name} className="mb-2 block font-semibold">
          {label}
        </label>
      )}
      <input
        {...rest}
        ref={forwardedRef}
        id={id || name}
        name={name}
        type={type}
        className={classNames(
          'bg-secondary border-secondary focus-ring block w-full rounded py-1 px-3 shadow-sm',
          className ?? '',
        )}
      />
    </div>
  ),
);

TextField.displayName = 'TextField';
