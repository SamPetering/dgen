type Props = {
    text: string;
    onClick?: () => void;
};

const PrimaryButton = ({ text, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="bg-slate-600 p-2 hover:bg-slate-700 outline outline-2 outline-gray-300 text-gray-300 rounded"
        >
            {text}
        </button>
    );
};

export default PrimaryButton;
