import {
	Box,
	TextField,
	Button,
	Typography,
	Alert,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { useState, useRef } from "react";
export default function Register() {
	const nameRef = useRef();
	const handleRef = useRef();
	const passwordRef = useRef();
	const profileRef = useRef();
	const confirmPasswordRef = useRef();
	const [hasError, setHasError] = useState(false);
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
						const confirmPassword =
							confirmPasswordRef.current.value;

						if (
							!name ||
							!handle ||
							!password ||
							!profile ||
							!confirmPassword
						) {
							setHasError(true);
						} else {
							setHasError(false);
						}
					}}
				>
					{hasError && (
						<Alert severity="warning" sx={{ mb: 4 }}>
							Handle or Password Required!
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
						label="Profile"
						inputRef={profileRef}
					/>
					<TextField
						type="password"
						fullWidth
						sx={{ my: 4 }}
						label="Password"
						inputRef={passwordRef}
					/>

					<TextField
						type="password"
						fullWidth
						label="Confirm Password"
						inputRef={confirmPasswordRef}
					/>
					<Button
						sx={{ my: 4 }}
						type="submit"
						fullWidth
						variant="contained"
					>
						Register
					</Button>
				</form>
			</Box>
		</Box>
	);
}
