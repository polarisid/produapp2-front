import styled from "styled-components";
import dayjs from "dayjs";
export default function MiniCard(props) {
	const { os, model, tecName, updateTime, createTime } = props;
	return (
		<MINICARD>
			<div className="flex">
				<h1>{os}</h1>

				<h1>{tecName}</h1>
			</div>
			<h1>{model}</h1>
			<h1>Tempo : Parcial /Total</h1>
			{updateTime
				? Math.floor(dayjs(new Date()).diff(updateTime, "minutes") / 60) +
				  "h" +
				  (dayjs(new Date()).diff(updateTime, "minutes") % 60) +
				  "m"
				: "0"}
			<b>/ </b>
			{createTime
				? Math.floor(dayjs(new Date()).diff(createTime, "minutes") / 60) +
				  "h" +
				  (dayjs(new Date()).diff(createTime, "minutes") % 60) +
				  "m"
				: "0"}
			<b> - </b>
			{createTime
				? Math.floor(dayjs(new Date()).diff(createTime, "days"))
				: "0"}
			<b> dias</b>
		</MINICARD>
	);
}

const MINICARD = styled.div`
	box-sizing: border-box;
	padding: 5px;
	margin: 5px;
	div.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;
	}
	background-color: #ffffff;
	color: #000;
	font-weight: bold;
	width: 98%;
	border-radius: 10px;
	border: 2px solid rgba(105, 105, 105, 0.5);
`;
