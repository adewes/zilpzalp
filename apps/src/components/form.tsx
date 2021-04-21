import React, { Component, PureComponent, ReactChild } from 'react';
import PropTypes from 'prop-types';
import classnames from 'helpers/classnames';
import { Button } from './button';
import './form.scss';

interface FormProps {
    children?: ReactChild;
    id?: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ className, onSubmit, children, id }: FormProps) => (
    <form
        className={classnames('kip-form', className)}
        id={id}
        onSubmit={e => {
            e.preventDefault();
            if (onSubmit !== undefined) onSubmit();
        }}
    >
        {children}
    </form>
);
Form.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    onSubmit: PropTypes.func,
};

interface FieldProps {
    children?: ReactChild;
    id?: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Field = ({ children }: FieldProps) => (
    <div className="bulma-field">{children}</div>
);
Field.propTypes = {
    children: PropTypes.node,
};

interface LabelProps {
    children?: ReactChild;
    className?: string;
    htmlFor?: string;
}

export const Label = ({
    children,
    htmlFor,
    className = 'bulma-label',
}: LabelProps) => (
    <label htmlFor={htmlFor} className={className}>
        {children}
    </label>
);
Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    htmlFor: PropTypes.string,
};

interface SubmitButtonProps {
    disabled?: boolean;
    children?: ReactChild;
}

export const SubmitButton = ({ disabled, children }: SubmitButtonProps) => (
    <button disabled={disabled}>{children}</button>
);
SubmitButton.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
};

interface ControlProps {
    children?: ReactChild;
    className?: string;
}

export const Control = ({ children, className }: ControlProps) => (
    <div className={classnames('bulma-control', className)}>{children}</div>
);
Control.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

interface SelectProps {
    children?: ReactChild;
    className?: string;
    defaultValue?: number | string;
    disabled?: boolean;
    items: { text: string; value: number | string }[];
    onChange: (value: string) => void;
}
export const Select = ({
    className,
    items,
    defaultValue,
    disabled = false,
    onChange,
}: SelectProps) => {
    const options = items.map(item => (
        <option key={item.value} value={item.value}>
            {item.text}
        </option>
    ));
    return (
        <div className={classnames('bulma-select', className)}>
            <select
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={e => onChange(e.target.value)}
            >
                {options}
            </select>
        </div>
    );
};
Select.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.node.isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
};

interface CheckboxProps {
    defaultChecked?: boolean;
    name?: string;
    value?: boolean;
    onChange: (checked: boolean) => void;
}
export const Checkbox = ({ name, onChange, defaultChecked }: CheckboxProps) => (
    <input
        type="checkbox"
        onChange={e => onChange(e.target.checked)}
        name={name}
        id={name}
        defaultChecked={defaultChecked}
    />
);
Checkbox.propTypes = {
    defaultChecked: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

interface InputProps {
    className?: string;
    forwardedRef?: React.Ref<HTMLInputElement>;
    value: string;
    onChange: (value: string) => void;
}

export class Input extends PureComponent<InputProps> {
    static defaultProps = {
        className: undefined,
    };

    static propTypes = {
        /** Class name to apply on the input */
        className: PropTypes.string,
        /** Returns the new value (not the event) on change */
        onChange: PropTypes.func.isRequired,
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
    };

    render() {
        const { forwardedRef, onEnter, ...props } = this.props;
        return (
            <input
                ref={forwardedRef}
                {...props}
                onKeyDown={e =>
                    onEnter &&
                    (e.key === 'Enter' || e.keyCode === 13) &&
                    onEnter(e.target.value)
                }
                className={classnames('kip-input', this.props.className)}
                onChange={this.handleChange}
            />
        );
    }
}

interface NumberInputProps {
    className?: string;
    forwardedRef?: React.Ref<HTMLInputElement>;
    type?: string;
    value: number;
    onChange: (value: number | undefined) => void;
}

interface NumberInputState {
    stringValue: string;
}

export class NumberInput extends Component<NumberInputProps, NumberInputState> {
    static propTypes = {
        value: PropTypes.any.isRequired,
        /** Returns the new value (not the event) on change */
        onChange: PropTypes.func.isRequired,
    };

    constructor(props: NumberInputProps) {
        super(props);
        this.state = {
            stringValue: props.value.toString(),
        };
    }

    handleChange = (value: string) => {
        this.setState({ stringValue: value });
        if (value === '') {
            this.props.onChange(undefined);
        } else {
            this.props.onChange(Number.parseFloat(value));
        }
    };

    render() {
        return (
            <Input
                type="number"
                {...this.props}
                value={this.state.stringValue}
                onChange={this.handleChange}
            />
        );
    }
}

interface TextAreaProps {
    className?: string;
    forwardedRef?: React.Ref<HTMLInputElement>;
    onChange: (value: string) => void;
}

export class TextArea extends PureComponent<TextAreaProps> {
    static defaultProps = {
        className: undefined,
    };

    static propTypes = {
        /** Class name to apply on the input */
        className: PropTypes.string,
        /** Returns the new value (not the event) on change */
        onChange: PropTypes.func.isRequired,
    };

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onChange(event.target.value);
    };

    render() {
        return (
            <textarea
                {...this.props}
                className={classnames('kip-textarea', this.props.className)}
                onChange={this.handleChange}
            />
        );
    }
}

interface FieldSetProps {
    children?: ReactChild;
    disabled?: boolean;
}

export const FieldSet = ({ children, disabled = false }: FieldSetProps) => (
    <fieldset disabled={disabled}>{children}</fieldset>
);
FieldSet.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
};

export const SubmitField = ({ onClick, disabled, title, ...props }) => (
    <Field>
        <Control>
            <Button
                className="bulma-button bulma-is-primary"
                disabled={disabled}
                onClick={onClick}
                htmlType="submit"
                {...props}
            >
                {title}
            </Button>
        </Control>
    </Field>
);
