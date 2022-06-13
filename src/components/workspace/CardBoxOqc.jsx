import styled from "styled-components";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";
export default function CardBoxOqc(props) {
	const { token } = useAuth();
	const { workspaces, setWorkspaces } = props;

	async function handleChangeStatus(e) {
		try {
			await api.changeStatus(token, e.target.id, {
				status: e.target.value.toString(),
			});
			setWorkspaces(!workspaces);
		} catch (err) {
			console.log(err.toJSON());
		}
	}

	return (
		<StyledDiv>
			<h1>
				<b>OS:</b>
				{props.os}
			</h1>
			<h1>
				<b>Modelo:</b>
				{props.model}
			</h1>
			<h1>
				<b>Status:</b>
			</h1>
			<div className="select-dropdown">
				<select
					name="hall"
					id={props.id}
					value={props.status}
					onChange={handleChangeStatus}
				>
					<option value="OQCPass">OQC Pass</option>
					<option value="OQCFail">OQC FAIL</option>
					<option disabled value="Finished">
						Finalizado
					</option>
				</select>
			</div>
			<h1>
				<b>Entrada</b> {dayjs(props.createTime).format("HH:mm")} -{" "}
				{dayjs(props.createTime).format("DD/MM")}
			</h1>

			<h1>
				<b>Tempo: </b>
				{props.updateTime
					? Math.floor(
							dayjs(new Date()).diff(props.createTime, "minutes") / 60
					  ) +
					  "h" +
					  (dayjs(new Date()).diff(props.createTime, "minutes") % 60) +
					  "m"
					: "0"}
			</h1>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	color: #000;
	.select-dropdown,
	.select-dropdown * {
		margin: 0;
		padding: 0;
		position: relative;
		box-sizing: border-box;
	}
	.select-dropdown {
		position: relative;
		background-color: #f5ffd1;
		border-radius: 4px;
	}
	.select-dropdown select {
		font-size: 1rem;
		font-weight: normal;
		/* max-width: 100%; */
		padding: 4px 10px 4px 10px;
		border: none;
		background-color: transparent;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
	.select-dropdown select:active,
	.select-dropdown select:focus {
		outline: none;
		box-shadow: none;
	}
	.select-dropdown:after {
		content: "";
		position: absolute;
		top: 50%;
		right: 8px;
		width: 0;
		height: 0;
		margin-top: -2px;
		border-top: 5px solid #aaa;
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
	}

	h1 {
		font-size: 18px;
		margin-top: 10px;
	}
	b {
		font-weight: 600;
		margin-right: 20px;
	}
	font-size: 08px;
	background-color: #e7ff90;
	border-radius: 4px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
	padding: 16px;
	margin-bottom: 16px;
	width: 300px;
`;
