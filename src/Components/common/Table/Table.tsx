
import styles from "./infoBox.module.css";

export interface Column<T> {
    Header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    handleEdit?: (data: T) => void;
    handleDelete?: (data: T) => void;
}

export const Table = <T,>({ columns, data, handleEdit, handleDelete }: TableProps<T>): JSX.Element => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className={styles.th}>{column.Header}</th>
                    ))}
                    {(handleEdit || handleDelete) && <th className={styles.th}>Ações</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column, columnsIndex) => (
                            column.accessor == "Image" ? (
                                <td key={columnsIndex} className={styles.td}>
                                    <img src={item[column.accessor] as string} alt="Image" />
                                </td>
                            ) : (
                                <td key={columnsIndex} className={styles.td}>{item[column.accessor]}</td>
                            )
                        ))}
                        {(handleEdit || handleDelete) && (
                            <td className={styles.td}>
                            {handleEdit && <button onClick={() => handleEdit(item)}>Editar</button>}
                            {handleDelete && <button onClick={() => handleDelete(item)}>Excluir</button>}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};



                            

