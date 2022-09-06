interface MinTableItem {
    id: string;
}

interface TableProps<T extends MinTableItem> {
    items: T[];
    headers: string[];
    onRowClick?: (id: string) => void;
}

export default function Table<T extends MinTableItem>({
    headers,
    items,
    onRowClick,
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto mt-4 relative sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                    {headers.map((header) => (
                        <th key={header} className="py-3 px-6">
                            {header}
                        </th>
                    ))}
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr
                            className="border-b bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600"
                            key={i}
                            onClick={() => onRowClick?.(item.id)}
                        >
                            {Object.values(item).map((val, i) => (
                                <td className="py-4 px-6" key={i}>
                                    {val?.toString()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
