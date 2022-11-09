import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const NumberCard = ({number, caption}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 50 }}  gutterBottom>
            {number}
        </Typography>
        <Typography sx={{ fontSize: 20 }}  gutterBottom>
            {caption}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NumberCard;