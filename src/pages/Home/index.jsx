import api from "../../services/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import CardBox from "../../components/workspace/CardBox";
import CardRectangle from "../../components/workspace/CardRectangle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const HomePage = () => {
	const navigate = useNavigate();
	const { token } = useAuth();
	const [workspaces, setWorkspaces] = useState([]);
	useEffect(() => {
		if (!token) {
			navigate("/");
		}
		try {
			async function getData() {
				const items = await api.getWorkpace(token);
				console.log(items);
				return items;
			}
			setWorkspaces(getData());
		} catch {
			console.log("erro");
		}
	}, []);

	return (
		<Container>
			<section className="formSection">
				<p>Avaliações e reparos</p>
				<form>
					<Input placeholder="Os" />
					<Input placeholder="Modelo" />
					<Button>Cadastrar Nova Avalição</Button>
				</form>
			</section>

			<div class="divider"></div>
			<section class="avaliations">
				<CardBox
					os={4162587447}
					model={"SM-P615"}
					status={"AVALIATION"}
					Entrada={"12/10/2021 12h40"}
					elapsedTime={"2 minutos"}
				/>
				<CardBox
					os={4162587447}
					model={"SM-A525"}
					status={"AVALIATION"}
					Entrada={"12/10/2021 12h40"}
					elapsedTime={"2 minutos"}
				/>
			</section>
			<p>Aparelhos pendentes</p>
			<div class="divider"></div>
			<section class="pendings">
				<CardRectangle
					os={4162587447}
					model={"SM-P615"}
					status={"AVALIATION"}
					Entrada={"12/10/2021 12h40"}
					elapsedTime={"2 minutos"}
				/>
				<CardRectangle
					os={4162587447}
					model={"SM-A525"}
					status={"AVALIATION"}
					Entrada={"12/10/2021 12h40"}
					elapsedTime={"2 minutos"}
				/>
			</section>
		</Container>
	);
};

const Container = styled.div`
	section.avaliations {
		display: flex;
		gap: 10px;
	}
	div.divider {
		width: 100%;
		height: 1px;
		background-color: #585858;
		margin: 10px 0;
	}
	section.formSection {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;
export default HomePage;
