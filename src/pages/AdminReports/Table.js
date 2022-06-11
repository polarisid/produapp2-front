import { useState } from "react";
import mockdata from "../data.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
	const [tableData, setTableData] = useState(mockdata);

	const columns = [
		{ label: "OS", accessor: "os", sortable: true },
		{ label: "Modelo", accessor: "model", sortable: false },
		{ label: "Técnico", accessor: "name", sortable: true },
		{ label: "Status", accessor: "status", sortable: true },
		{ label: "Status Final", accessor: "status", sortable: true },
		{ label: "Horário", accessor: "start_date", sortable: true },
	];

	return (
		<>
			<table className="table">
				<caption>
					Developers currently enrolled in this course, column headers are
					sortable.
				</caption>
				<TableHead columns={columns} />
				<TableBody columns={columns} tableData={tableData} />
			</table>
		</>
	);
};

export default Table;
