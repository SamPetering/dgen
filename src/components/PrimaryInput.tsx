type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
type Props = Pick<
    InputProps,
    'onChange' | 'id' | 'className' | 'placeholder' | 'type' | 'value'
> & {
    variant?: '1';
};
const PrimaryInput = ({ variant, ...rest }: Props) => {
    return (
        <input
            className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="primary input"
            type="text"
            {...rest}
        />
    );
};

export default PrimaryInput;
