import { ChangeEventHandler } from 'react';
import PrimaryInput from './PrimaryInput';

const EditableValue = ({
    edit,
    value,
    onChange,
    name,
    label,
    numberInput,
    unit,
}: {
    edit: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    name: string;
    label: string;
    value: string | number;
    numberInput?: boolean;
    unit?: string;
}) => {
    return (
        <div className="flex gap-2 content-center">
            <div className="self-center">{label}:</div>
            {edit ? (
                <PrimaryInput
                    onChange={onChange}
                    value={value}
                    name={name}
                    placeholder={label}
                    variant={numberInput ? 'number' : 'text'}
                    type={numberInput ? 'number' : 'text'}
                />
            ) : (
                <div>{value}</div>
            )}
            {unit && <div className="self-center">{unit}</div>}
        </div>
    );
};

export default EditableValue;
