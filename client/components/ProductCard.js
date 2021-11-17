import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5b7b7a",
    },
  },
});

export default function ProductCard({ image, title, description, productId }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/products/${productId}`}>
        <CardActionArea>
          <CardMedia className="prod-card-img" component="img" height="240" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {title.length >= 16
                ? title.slice(0, 16) + '...'
                : title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.length >= 30
                ? description.slice(0, 30) + '...'
                : description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Link to={`/products/${productId}`}>
          <ThemeProvider theme={theme}>
            <Button size="small" variant="contained" color="primary">
              View More
            </Button>
          </ThemeProvider>
        </Link>
      </CardActions>
    </Card>
  );
}
