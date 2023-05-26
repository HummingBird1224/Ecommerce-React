import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductCard() {

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardMedia
				component="img"
				height="100"
				image="/static/images/cards/paella.jpg"
				alt="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="edit-icon">
					<EditIcon />
				</IconButton>
				<IconButton aria-label="share">
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
