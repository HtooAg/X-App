import {
	Box,
	Typography,
	Card,
	CardContent,
	CardActionArea,
	IconButton,
	Button,
	ButtonGroup,
	Avatar,
} from "@mui/material";

import {
	MoreVert as MenuIcon,
	FavoriteBorder as LikeIcon,
	Comment as CommentIcon,
} from "@mui/icons-material";
import { blue, green, grey, pink } from "@mui/material/colors";
import { useEffect, useState } from "react";

import { format } from "date-fns";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const api = import.meta.env.VITE_API_URL;
			const res = await fetch(`${api}/posts`);
			const data = await res.json();

			setPosts(data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<Box>
			{isLoading ? (
				<Box>Loading ...</Box>
			) : (
				posts.map((post) => <PostCard post={post} />)
			)}
		</Box>
	);
}

function PostCard({ post }) {
	return (
		<Card sx={{ my: 5 }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
						<Avatar
							sx={{
								width: 75,
								height: 75,
								background: blue[500],
							}}
						>
							P
						</Avatar>
						<Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2,
								}}
							>
								<Typography>{post.owner.name}</Typography>
								<Typography
									sx={{ color: green[500], fontSize: 14 }}
								>
									- {format(post.created, "MMM d, Y")}
								</Typography>
							</Box>
							<Typography sx={{ color: grey[500], fontSize: 16 }}>
								{post.owner.handle}
							</Typography>
						</Box>
					</Box>
					<IconButton>
						<MenuIcon />
					</IconButton>
				</Box>
				<CardActionArea>
					<Typography sx={{ py: 2, px: 1 }}>{post.body}</Typography>
				</CardActionArea>
				<Box sx={{ display: "flex", justifyContent: "space-around" }}>
					<ButtonGroup>
						<IconButton>
							<LikeIcon sx={{ color: pink[500] }} />
						</IconButton>
						<Button variant="text">
							{post.likes ? post.likes.length : 0}
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton>
							<CommentIcon sx={{ color: blue[500] }} />
						</IconButton>
						<Button variant="text">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
