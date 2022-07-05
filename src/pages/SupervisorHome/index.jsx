import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import CardBox from "../../components/workspace/CardBox";
import CardRectangle from "../../components/workspace/CardRectangle";
import Button from "../../components/form/Button";
import ModalComponent from "../../components/Modal/index";
import TopBarAdmin from "../../components/TopBarAdmin";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Container } from "./styles";

const SupervisorPage = () => {
	const [newItem, setNewItem] = useState({ os: "", model: "" });
	const [search, setSearch] = useState({ os: "" });
	const navigate = useNavigate();
	const { token } = useAuth();
	const [workspaces, setWorkspaces] = useState(false);
	const [pendings, setPendings] = useState(false);
	const [opens, setOpens] = useState([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	setInterval(() => {
		setWorkspaces(!workspaces);
	}, 60000);

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
		var user = jwt_decode(token);
		if (user.role === "USER") navigate("/home");
		if (user.role === "OQC") navigate("/oqc/home");
		try {
		} catch {
			console.log("erro");
		}
	}, [workspaces]);

	async function handleSearchOs(e) {
		e.preventDefault();
		try {
			const itemsPending = await api.searchItemByOs(token, search.os);
			setPendings(itemsPending.data);
			console.log(itemsPending.data);
			setSearch({ os: "" });
		} catch {
			console.log("erro");
			handleOpen();
		}
	}
	async function handleSubmit(e) {
		e.preventDefault();
		console.log(newItem);
		try {
			const res = await api.createItem(newItem, token);
			setNewItem({ os: "", model: "" });
			setWorkspaces(!workspaces);
		} catch (err) {
			console.log(err);
			handleOpen();
		}
	}

	return (
		<>
			<TopBarAdmin />
			{!opens ? (
				<Container>
					<div className="loading">Carregando...</div>
				</Container>
			) : (
				<>
					<ModalComponent
						title="Ocorreu um erro"
						open={open}
						handleClose={handleClose}
						description="Verifique se a OS esta duplicada no sistema. Se não estiver,
						entre em contato com o suporte!"
					/>

					<Container>
						<section className="formSection">
							<p>Avaliações e reparos</p>
							<form onSubmit={handleSubmit}>
								<input
									placeholder="Ordem de Serviço"
									type="number"
									required
									value={newItem.os}
									name="os"
									onChange={(e) =>
										setNewItem({ ...newItem, [e.target.name]: e.target.value })
									}
								/>
								<input
									placeholder="Modelo"
									value={newItem.model}
									name="model"
									required
									onChange={(e) =>
										setNewItem({ ...newItem, [e.target.name]: e.target.value })
									}
								/>
								<Button type="submit">Adicionar</Button>
							</form>
						</section>

						<div className="divider"></div>
						<section className="avaliations">
							{opens ? (
								opens.map((item, key) => (
									<CardBox
										key={key}
										setWorkspaces={setWorkspaces}
										workspaces={workspaces}
										id={item.id}
										os={item.os}
										model={item.model}
										status={item.status}
										createTime={item.createTime}
										elapsedTime={item.elapsedTime}
										updateTime={item.updateTime}
									/>
								))
							) : (
								<></>
							)}
						</section>
						<section className="formSection">
							<p>Pesquisa por OS</p>
							<form onSubmit={handleSearchOs}>
								<input
									placeholder="Ordem de Serviço"
									type="number"
									required
									value={search.os}
									name="os"
									onChange={(e) =>
										setSearch({ ...search, [e.target.name]: e.target.value })
									}
								/>

								<Button type="submit">Pesquisar</Button>
							</form>
						</section>

						<div className="divider"></div>
						<section className="pendings">
							{pendings ? (
								pendings.map((item, key) => (
									<CardRectangle
										userChanged={item.userChanged}
										key={key}
										setWorkspaces={setWorkspaces}
										workspaces={workspaces}
										id={item.id}
										os={item.os}
										model={item.model}
										status={item.status}
										createTime={item.createTime}
										// elapsedTime={item.elapsedTime}
									/>
								))
							) : (
								<></>
							)}
						</section>
					</Container>
				</>
			)}
		</>
	);
};

export default SupervisorPage;
