interface MinTableItem {
    id: string | number;
}

interface TableProps<T extends MinTableItem> {
    items: T[];
    headers: string[];
    onRowClick?: (id: string | number) => void;
    rightAction?: (id: string | number) => JSX.Element;
}

export default function Table<T extends MinTableItem>({
    headers,
    items,
    onRowClick,
    rightAction,
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto relative sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                    {headers.map((header) => (
                        <th key={header} className="py-3 px-6">
                            {header}
                        </th>
                    ))}
                    {rightAction && (
                        <th key="spacer" className="py-3 px-6 h-full" />
                    )}
                </thead>
                <tbody>
                    {items.map(({ id, ...itemNoId }, i) => (
                        <tr
                            className="border-b bg-gray-700 border-gray-600"
                            key={i}
                            onClick={() => onRowClick?.(id)}
                        >
                            {Object.values(itemNoId).map((val, i) => (
                                <td className="py-4 px-6" key={i}>
                                    {val as string}
                                </td>
                            ))}
                            {rightAction && (
                                <td
                                    className="py-4 px-6 flex justify-end"
                                    key={`rightAction${i}`}
                                >
                                    {rightAction(id)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
