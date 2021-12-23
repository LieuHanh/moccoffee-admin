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
  actGetAllCategoryAsync,
  actgetCategoryByNameAsync,
  actAddNewCategoryAsync,
  actEditCategoryAsync,
  actDeleteCategoryAsync // eslint-disable-next-line import/no-unresolved
} from 'src/store/action/category/actionAsync';
import { LoadingButton } from '@mui/lab';

CategoryDetail.propTypes = {
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

export default function CategoryDetail({ open, onClose, data, editMode, onEdit, onSaved }) {
  const classes = useStyles();
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };

  console.log('DATA: ', data);

  const handleOnChangeCategoryName = (e) => {
    const newCategory = {
      category_id: data.category_id,
      category_name: e.target.value
    };
    console.log('newcate:', newCategory);
    onEdit(newCategory);
  };

  const createAndUpdate = async () => {
    if (!isSaving) {
      if (!editMode) {
        const newCategory = { ...data };
        setIsSaving(true);
        const status = await dispatch(actAddNewCategoryAsync(newCategory));
        if (status === 200) {
          onClose(false);
          onSaved(`Added ${newCategory.category_name}`);
        }
        setIsSaving(false);
      } else {
        const newCategory = { ...data };
        console.log('data cate:', newCategory);
        setIsSaving(true);
        const status = await dispatch(actEditCategoryAsync(newCategory));
        console.log('add new:', status);
        if (status === 200) {
          onClose(false);
          onSaved(`Updated Category ${newCategory.category_id}`);
        }
        setIsSaving(false);
      }
    }
  };
  if (!data) return null;
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ width: '40%', height: '40%', marginLeft: '20%', marginTop: '20%' }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {editMode ? `Chỉnh sửa loại sản phẩm ${data.category_id}` : 'Tạo mới loại sản phẩm'}
            </Typography>
            <Button autoFocus color="inherit" onClick={createAndUpdate}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Stack sx={{ width: '50%', color: 'grey.500' }} spacing={2}>
          {isSaving && <LinearProgress color="success" />}
        </Stack>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50%' },
            display: 'flex',
            flexDirection: 'column'
          }}
          p={1}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            row={1}
            label="Tên loại sản phẩm"
            value={data.category_name}
            onChange={handleOnChangeCategoryName}
          />
        </Box>
      </Dialog>
    </div>
  );
}
