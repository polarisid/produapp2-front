import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	color: "white",
	bgcolor: "#000",
	border: "2px solid #ffffff",

	boxShadow: 24,
	p: 4,
};

export default function ModalComponent(props) {
	const { open, handleClose, title, description } = props;
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{title}
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					{description}
				</Typography>
			</Box>
		</Modal>
	);
}
