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
  typography: {
    fontFamily: ['Work Sans'].join(','),
  },
  palette: {
    primary: {
      main: "#5b7b7a",
    },
  },
});

export default function ProductCard({ image, title, description, productId, isAdmin, inventoryQuantity}) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/products/${productId}`}>
          <CardActionArea>
            <CardMedia className="prod-card-img" component="img" height="250" image={image} alt={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {title.length >= 16
                  ? title.slice(0, 16) + '...'
                  : title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description.length >= 25
                  ? description.slice(0, 25) + '...'
                  : description}
              </Typography>
              {isAdmin ? (
                <Typography variant="body2" color="text.secondary">
                  Quantity: {inventoryQuantity}
                </Typography>
              ) : null
              }
            </CardContent>
            <CardActions>
              <Link to={`/products/${productId}`}>
                <Button size="small" variant="contained" color="primary">
                  View More
                </Button>
              </Link>
            </CardActions>
          </CardActionArea>
        </Link>
      </Card>
    </ThemeProvider>
  );
}

// const mapState = ({auth}) => ({
//   is_admin: auth.is_admin
// });

// const mapDispatch 