const TableHead = ({ columns }) => {
	return (
		<thead>
			<tr>
				{columns.map(({ label, accessor, sortable }) => {
					return <th key={accessor}>{label}</th>;
				})}
			</tr>
		</thead>
	);
};

export default TableHead;
