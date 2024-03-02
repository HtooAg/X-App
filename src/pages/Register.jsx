import {
	Box,
	TextField,
	Button,
	Typography,
	Alert,
	IconButton,
} from "@mui/material";

import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

import {
	Visibility as ShowPassIcon,
	VisibilityOff as HidePassIcon,
} from "@mui/icons-material";

export default function Register() {
	const nameRef = useRef();
	const handleRef = useRef();
	const passwordRef = useRef();
	const profileRef = useRef();

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { setAuth, setAuthUser } = useAuth();
	const navigate = useNavigate();
	return (
		<Box>
			<Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
				Register
			</Typography>
			<Box>
				<form
					sx={{ mt: 5 }}
					onSubmit={(e) => {
						e.preventDefault();
						const name = nameRef.current.value;
						const handle = handleRef.current.value;
						const password = passwordRef.current.value;
						const profile = profileRef.current.value;

						if (!name || !handle || !password || !profile) {
							setHasError(true);
							setErrorMessage("Handle or Password Required!");
							return false;
						}
						(async () => {
							const api = import.meta.env.VITE_API_URL;
							const res = await fetch(`${api}/register`, {
								method: "POST",
								body: JSON.stringify({
									name,
									handle,
									profile,
									password,
								}),
								headers: {
									"Content-Type": "application/json",
								},
							});
							if (!res.ok) {
								setErrorMessage((await res.json()).msg);
								setHasError(true);
								return false;
							}
							navigate("/login");
						})();
					}}
				>
					{hasError && (
						<Alert severity="warning" sx={{ mb: 4 }}>
							{setErrorMessage}
						</Alert>
					)}
					<TextField fullWidth label="Name" inputRef={nameRef} />
					<TextField
						fullWidth
						sx={{ my: 4 }}
						label="Handle"
						inputRef={handleRef}
					/>
					<TextField
						fullWidth
						label="Profile / Bio"
						inputRef={profileRef}
					/>
					<TextField
						fullWidth
						type={showPassword ? "text" : "password"}
						label="Password"
						inputRef={passwordRef}
						sx={{ my: 4 }}
						InputProps={{
							endAdornment: (
								<IconButton
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? (
										<HidePassIcon />
									) : (
										<ShowPassIcon />
									)}
								</IconButton>
							),
						}}
					/>

					<Button
						sx={{ mb: 4 }}
						type="submit"
						fullWidth
						variant="contained"
					>
						Register
					</Button>
					<Box sx={{ textAlign: "center" }}>
						<Link to="/login">login</Link>
					</Box>
				</form>
			</Box>
		</Box>
	);
}
