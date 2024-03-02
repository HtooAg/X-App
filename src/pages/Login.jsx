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

export default function Login() {
	const handleRef = useRef();
	const passwordRef = useRef();

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
				Login
			</Typography>
			<Box>
				<form
					sx={{ mt: 5 }}
					onSubmit={(e) => {
						e.preventDefault();
						const handle = handleRef.current.value;
						const password = passwordRef.current.value;

						if (!handle || !password) {
							setHasError(true);
							setErrorMessage("Handle or Password Required!");
							return false;
						}
						(async () => {
							const api = import.meta.env.VITE_API_URL;
							const res = await fetch(`${api}/login`, {
								method: "POST",
								body: JSON.stringify({
									handle,
									password,
								}),
								headers: {
									"Content-Type": "application/json",
								},
							});
							if (!res.ok) {
								// setErrorMessage("Incorrect Handle or Password")
								setErrorMessage((await res.json()).msg);
								setHasError(true);
								return false;
							}
							const data = await res.json();
							localStorage.setItem("token", data.token);

							fetch(`${api}/verify`, {
								headers: {
									Authorization: `Bearer ${data.token}`,
								},
							})
								.then((res) => res.json())
								.then((user) => {
									setAuth(true);
									setAuthUser(user);
									navigate("/");
								});
						})();
					}}
				>
					{hasError && (
						<Alert severity="warning" sx={{ mb: 4 }}>
							{errorMessage}
						</Alert>
					)}
					<TextField fullWidth label="Handle" inputRef={handleRef} />
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
					<Button type="submit" fullWidth variant="contained">
						Login
					</Button>
					<Box sx={{ textAlign: "center", my: 4 }}>
						<Link to="/register">register</Link>
					</Box>
				</form>
			</Box>
		</Box>
	);
}
