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
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import {
  actAddNewProductAsync,
  actEditProductAsync,
  actDeleteProductAsync
  // eslint-disable-next-line import/no-unresolved
} from 'src/store/action/product/actionAsync';
import { LoadingButton } from '@mui/lab';

ProductDetail.propTypes = {
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onSaved: PropTypes.func,
  data: PropTypes.object,
  categories: PropTypes.array
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

export default function ProductDetail({
  open,
  onClose,
  data,
  editMode,
  categories,
  onEdit,
  onSaved
}) {
  const classes = useStyles();
  const [productImages, setProductImages] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };

  console.log('DATA: ', categories);

  const handleOnChangeProductName = (e) => {
    const newProduct = {
      ProductId: data.ProductId,
      ProductName: e.target.value,
      Price: data.Price,
      ProductStatus: data.ProductStatus,
      CategoryId: data.CategoryId,
      Description: data.Description,
      isHot: data.isHot
    };
    onEdit(newProduct);
  };
  const handleOnChangeProductCategory = (e) => {
    const newProduct = {
      ProductId: data.ProductId,
      ProductName: data.ProductName,
      Price: data.Price,
      ProductStatus: data.ProductStatus,
      CategoryId: Number(e.target.value),
      Description: data.Description,
      isHot: data.isHot
    };
    onEdit(newProduct);
  };
  const handleOnChangeProductPrice = (e) => {
    const newProduct = {
      ProductId: data.ProductId,
      ProductName: data.ProductName,
      Price: Number(e.target.value),
      ProductStatus: data.ProductStatus,
      CategoryId: data.CategoryId,
      Description: data.Description,
      isHot: data.isHot
    };
    onEdit(newProduct);
  };
  const handleOnChangeProductStatus = (e) => {
    const newProduct = {
      ProductId: data.ProductId,
      ProductName: data.ProductName,
      Price: data.Price,
      CategoryId: data.CategoryId,
      ProductStatus: e.target.checked,
      isHot: data.isHot,
      Description: data.Description,
      ProductImagesFile: [productImages, setProductImages]
    };
    console.log('test check:', newProduct);
    onEdit(newProduct);
  };
  const handleOnChangeIsHotStatus = (e) => {
    const newProduct = {
      ProductId: data.ProductId,
      ProductName: data.ProductName,
      Price: data.Price,
      CategoryId: data.CategoryId,
      ProductStatus: data.ProductStatus,
      isHot: e.target.checked,
      Description: data.Description,
      ProductImagesFile: [productImages, setProductImages]
    };
    console.log('test check:', newProduct);
    onEdit(newProduct);
  };
  const handleOnChangeProductDescription = (e) => {
    const newProduct = {
      ProductId: data.ProductId,
      ProductName: data.ProductName,
      Price: data.Price,
      CategoryId: data.CategoryId,
      ProductStatus: data.ProductStatus,
      isHot: data.isHot,
      Description: e.target.value,
      ProductImagesFile: [productImages, setProductImages]
    };
    onEdit(newProduct);
  };

  const createAndUpdate = async () => {
    if (!isSaving) {
      if (!editMode) {
        const newProduct = { ...data, ProductImagesFile: productImages };
        setIsSaving(true);
        const status = await dispatch(actAddNewProductAsync(newProduct));
        if (status === 200) {
          onClose(false);
          onSaved(`Added ${newProduct.ProductName}`);
        }
        setIsSaving(false);
      } else {
        const newProduct = { ...data, ProductImagesFile: productImages };
        console.log('anh :', newProduct);
        setIsSaving(true);
        const status = await dispatch(actEditProductAsync(newProduct));
        if (status === 200) {
          onClose(false);
          onSaved(`Updated Product ${newProduct.ProductId}`);
        }
        setIsSaving(false);
      }
    }
  };

  if (categories.length <= 0) return null;

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {editMode ? `Chỉnh sửa sản phẩm ${data.ProductId}` : 'Thêm mới sản phẩm'}
            </Typography>
            <Button autoFocus color="inherit" onClick={createAndUpdate}>
              Save
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
            required
            id="outlined-required"
            label="Tên sản phẩm"
            value={data.ProductName}
            onChange={handleOnChangeProductName}
          />
          <TextField
            required
            id="outlined-required"
            label="Giá"
            inputMode="numeric"
            value={data.Price}
            onChange={handleOnChangeProductPrice}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Loại sản phẩm "
            value={data.CategoryId}
            onChange={handleOnChangeProductCategory}
          >
            {categories.map((option, index) => (
              <MenuItem key={index} value={option.category_id}>
                {option.category_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-multiline-static"
            label="Mô tả"
            multiline
            rows={4}
            variant="outlined"
            value={data.Description}
            onChange={handleOnChangeProductDescription}
          />
          <div>
            <p>Trạng thái sản phẩm</p>
            <input
              label="Product status"
              type="checkbox"
              defaultChecked={false}
              checked={data.ProductStatus}
              onChange={handleOnChangeProductStatus}
            />
          </div>
          <div>
            <p>Sản phẩm hot</p>
            <input
              label="Sản phẩm hot"
              type="checkbox"
              defaultChecked={false}
              checked={data.isHot}
              onChange={handleOnChangeIsHotStatus}
            />
          </div>
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneClass={classes.dropZone}
            value={productImages}
            // eslint-disable-next-line consistent-return
            dropzoneText="Upload product images "
            filesLimit={3}
            onChange={(files) => setProductImages(files)}
          />
        </Box>
      </Dialog>
    </div>
  );
}
