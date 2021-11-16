import React from 'react';
import AddProduct from './AddProduct';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Add a Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <AddProduct />
        </Box>
      </Modal>
    </>
  );
}
