import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useState, useRef } from "react";
export default function Login() {
	const handleRef = useRef();
	const passwordRef = useRef();
	const [hasError, setHasError] = useState(false);
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
					<TextField fullWidth label="Name" inputRef={handleRef} />
					<TextField
						type="password"
						fullWidth
						sx={{ my: 4 }}
						label="Password"
						inputRef={passwordRef}
					/>
					<Button type="submit" fullWidth variant="contained">
						Login
					</Button>
				</form>
			</Box>
		</Box>
	);
}
