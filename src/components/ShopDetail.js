import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  actAddNewShopAsync,
  actEditShopAsync,
  actDeleteShopAsync
  // eslint-disable-next-line import/no-unresolved
} from 'src/store/action/shop/actionAsync';

ShopDetail.propTypes = {
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onSaved: PropTypes.func,
  data: PropTypes.object
};

const useStyles = makeStyles(() => ({
  '.MuiDropzoneArea-root': {
    width: '50%'
  },
  dropZone: {
    width: '50% !important',
    marginTop: 32,
    fullWidth: 'true'
  }
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ShopDetail({ open, onClose, data, editMode, onEdit, onSaved }) {
  console.log('SELECTED DATA: ', data);
  const classes = useStyles();
  const [shopImages, setShopImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [value, setValue] = React.useState(Date.now());
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };

  console.log('DATA: ', data);

  const handleOnChangeShopName = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: e.target.value,
      description: data.description,
      avatarFile: shopImages,
      city: data.city,
      district: data.district,
      ward: data.ward,
      street: data.street,
      lat: data.lat,
      lng: data.lng
    };
    onEdit(newShop);
  };

  const handleOnChangeStreet = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: data.shopName,
      description: data.description,
      avatarFile: shopImages,
      city: data.city,
      district: data.district,
      ward: data.ward,
      street: e.target.value,
      lat: data.lat,
      lng: data.lng
    };
    onEdit(newShop);
  };

  const handleOnChangeWard = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: data.shopName,
      description: data.description,
      avatarFile: shopImages,
      city: data.city,
      district: data.district,
      ward: e.target.value,
      street: data.street,
      lat: data.lat,
      lng: data.lng
    };
    onEdit(newShop);
  };

  const handleOnChangeDistrict = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: data.shopName,
      description: data.description,
      avatarFile: shopImages,
      city: data.city,
      district: e.target.value,
      ward: data.ward,
      street: data.street,
      lat: data.lat,
      lng: data.lng
    };
    onEdit(newShop);
  };

  const handleOnChangeCity = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: data.shopName,
      description: data.description,
      avatarFile: shopImages,
      city: e.target.value,
      district: data.district,
      ward: data.ward,
      street: data.street,
      lat: data.lat,
      lng: data.lng
    };
    onEdit(newShop);
  };

  const handleOnChangeLatitude = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: data.shopName,
      description: data.description,
      avatarFile: shopImages,
      city: data.city,
      district: data.district,
      ward: data.ward,
      street: data.street,
      lat: e.target.value,
      lng: data.lng
    };
    onEdit(newShop);
  };

  const handleOnChangeLongitude = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: data.shopName,
      description: data.description,
      avatarFile: shopImages,
      city: data.city,
      district: data.district,
      ward: data.ward,
      street: data.street,
      lat: data.lat,
      lng: e.target.value
    };
    onEdit(newShop);
  };

  const handleOnChangeDescription = (e) => {
    const newShop = {
      shopId: data.shopId,
      shopName: data.shopName,
      description: e.target.value,
      avatarFile: shopImages,
      city: data.city,
      district: data.district,
      ward: data.ward,
      street: data.street,
      lat: data.lat,
      lng: data.lng
    };
    onEdit(newShop);
  };

  const createAndUpdate = async () => {
    if (!isSaving) {
      if (!editMode) {
        const newShop = {
          shopName: data.shopName,
          description: data.description,
          avatarFile: shopImages,
          city: data.city,
          district: data.district,
          ward: data.ward,
          street: data.street,
          lat: data.lat,
          lng: data.lng
        };
        setIsSaving(true);
        const status = await dispatch(actAddNewShopAsync(newShop));
        if (status === 200) {
          onClose(false);
          onSaved(`Added ${newShop.shopName}`);
        }
        setIsSaving(false);
      } else {
        console.log('ADD');
        const newShop = {
          shopId: data.shopId,
          shopName: data.shopName,
          description: data.description,
          avatarFile: shopImages,
          city: data.city,
          district: data.district,
          ward: data.ward,
          street: data.street,
          lat: data.lat,
          lng: data.lng
        };

        console.log(newShop);
        setIsSaving(true);
        const status = await dispatch(actEditShopAsync(newShop));
        if (status === 200) {
          onClose(false);
          onSaved(`Updated Shop ${newShop.userId}`);
        }
        setIsSaving(false);
      }
    }
  };
  if (!data) return null;
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {editMode ? `Chỉnh sửa quán cà phê ${data.shopId}` : 'Thêm một quán cà phê mới'}
            </Typography>
            <Button autoFocus color="inherit" onClick={createAndUpdate}>
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          {isSaving && <LinearProgress color="success" />}
        </Stack>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50%' },
            display: 'flex',
            flexDirection: 'column'
          }}
          p={5}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={data.shopName}
            required
            id="outlined-required"
            label="Tên cửa hàng cà phê"
            onChange={handleOnChangeShopName}
          />
          <TextField
            value={data.street}
            required
            id="outlined-required"
            label="Đường"
            onChange={handleOnChangeStreet}
          />
          <TextField
            value={data.ward}
            required
            id="outlined-required"
            label="Phường"
            onChange={handleOnChangeWard}
          />
          <TextField
            value={data.district}
            required
            id="outlined-required"
            label="Quận"
            onChange={handleOnChangeDistrict}
          />
          <TextField
            value={data.city}
            required
            id="outlined-required"
            label="Thành phố"
            onChange={handleOnChangeCity}
          />
          <TextField
            value={data.lat}
            required
            id="outlined-required"
            label="Latitude"
            onChange={handleOnChangeLatitude}
          />
          <TextField
            value={data.lng}
            required
            id="outlined-required"
            label="Longitude"
            onChange={handleOnChangeLongitude}
          />
          <TextField
            value={data.description}
            required
            id="outlined-required"
            label="Mô tả"
            onChange={handleOnChangeDescription}
          />
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneClass={classes.dropZone}
            // eslint-disable-next-line consistent-return

            dropzoneText="Upload shop images "
            filesLimit={1}
            onChange={(files) => {
              console.log('FILE CHNAGE: ', files);
              setShopImages(files);
            }}
          />
        </Box>
      </Dialog>
    </div>
  );
}
