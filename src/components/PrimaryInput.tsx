import { FocusEvent } from 'react';

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
type Props = Pick<
    InputProps,
    'onChange' | 'id' | 'className' | 'placeholder' | 'type' | 'value' | 'name'
> & {
    variant?: 'text' | 'number';
    className?: string;
};
const defaultStyles =
    'appearance-none border border-3 border-slate-600 bg-slate-700 rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline';
const numberInputStyles =
    'w-20 appearance-none border border-1 border-slate-600 bg-slate-700 rounded- py-1 px-2 text-slate-300 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm  placeholder:italic';

const PrimaryInput = ({ variant, ...rest }: Props) => {
    const styles = variant === 'number' ? numberInputStyles : defaultStyles;
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => e.target.select();
    return (
        <input
            className={styles}
            placeholder="primary input"
            onFocus={handleFocus}
            {...rest}
        />
    );
};

export default PrimaryInput;
