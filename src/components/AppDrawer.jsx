import {
	Drawer,
	Box,
	Avatar,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemButton,
	ListItemText,
	Divider,
} from "@mui/material";

import {
	Person as ProfileIcon,
	Home as HomeIcon,
	PersonAdd as RegisterIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
} from "@mui/icons-material";

import { useUIState } from "../providers/UIStateProvider";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { pink, blue, grey } from "@mui/material/colors";

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer } = useUIState();
	const { auth, setAuth, authUser, setAuthUser } = useAuth();
	const navigate = useNavigate();
	return (
		<Drawer
			anchor="left"
			open={openDrawer}
			onClose={() => setOpenDrawer(false)}
		>
			<Box sx={{ width: 350 }}>
				<Box
					sx={{
						height: 200,
						bgcolor: "banner.background",
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
						p: 3,
					}}
				>
					{auth && (
						<>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Avatar
									sx={{
										width: 98,
										height: 98,
										background: pink[500],
									}}
								>
									{authUser.name[0]}
								</Avatar>
								<Box sx={{ ml: 3 }}>
									<Typography
										sx={{
											fontSize: 21,
											fontWeight: "bold",
											color: blue[500],
										}}
									>
										{authUser.name}
									</Typography>
									<Typography
										sx={{ color: grey[600], fontSize: 16 }}
									>
										@{authUser.handle}
									</Typography>
								</Box>
							</Box>
						</>
					)}
				</Box>
				<List sx={{ mx: 2 }}>
					{auth && (
						<>
							<ListItem disablePadding>
								<ListItemButton
									disableRipple
									onClick={() => {
										navigate("/");
										setOpenDrawer(false);
									}}
								>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary="Home" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton
									disableRipple
									onClick={() => {
										navigate("/profile");
										setOpenDrawer(false);
									}}
								>
									<ListItemIcon>
										<ProfileIcon />
									</ListItemIcon>
									<ListItemText primary="Profile" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton disableRipple>
									<ListItemIcon>
										<LogoutIcon />
									</ListItemIcon>
									<ListItemText
										primary="Logout"
										onClick={() => {
											setAuth(false);
											setAuthUser({});
											setOpenDrawer(false);
											localStorage.removeItem("token");
										}}
									/>
								</ListItemButton>
							</ListItem>
						</>
					)}

					{!auth && (
						<>
							<ListItem disablePadding>
								<ListItemButton
									disableRipple
									onClick={() => {
										navigate("/register");
										setAuth(false);
										setOpenDrawer(false);
									}}
								>
									<ListItemIcon>
										<RegisterIcon />
									</ListItemIcon>
									<ListItemText primary="Register" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton
									disableRipple
									onClick={() => {
										navigate("/login");
										setOpenDrawer(false);
									}}
								>
									<ListItemIcon>
										<LoginIcon />
									</ListItemIcon>
									<ListItemText primary="Login" />
								</ListItemButton>
							</ListItem>
						</>
					)}
				</List>
			</Box>
		</Drawer>
	);
}
