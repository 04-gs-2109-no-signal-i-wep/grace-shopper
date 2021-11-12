import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard({ image, title, description, button }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="240"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.length >= 30 ? description.slice(0, 30) + "..." : description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Link to={`/singleProduct/${id}`}><Button size="small">{button}</Button></Link> */}
        <Button size="small" variant="outlined">View More</Button>
      </CardActions>
    </Card>
  );
}