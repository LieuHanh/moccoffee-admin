import React, { useState, useEffect, useRef } from 'react';
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
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { DropzoneArea } from 'material-ui-dropzone';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JoditEditor from 'jodit-react';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  actAddNewBannerAsync,
  actEditBannerAsync,
  actDeleteBannerAsync // eslint-disable-next-line import/no-unresolved
} from 'src/store/action/banner/actionAsync';
import { LoadingButton } from '@mui/lab';

BannerDetail.propTypes = {
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

const bannerTypeList = [
  {
    id: 1,
    value: 'Banner trang chủ'
  },
  {
    id: 2,
    value: 'Banner sản phẩm'
  },
  {
    id: 3,
    value: 'Banner quán cà phê'
  },
  {
    id: 4,
    value: 'Banner tin tức'
  },
  {
    id: 5,
    value: 'Banner giỏ hàng'
  }
];

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function BannerDetail({ open, onClose, data, editMode, onEdit, onSaved }) {
  const classes = useStyles();
  const [BannerImages, setBannerImages] = useState(data.Image);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };
  const editor = useRef(null);
  const config = {
    readonly: false,
    height: 400
  };
  console.log('DATA: ', data);

  const handleOnChangeBannerTitle = (e) => {
    const newBanner = {
      id: data.id,
      bannerId: data.bannerId,
      Title: e.target.value,
      Image: BannerImages
    };
    onEdit(newBanner);
  };
  const handleOnChange = (e) => {
    const newBannerType = e.target.value;
    const newBanner = { ...data, bannerId: newBannerType };
    console.log(newBannerType);
    onEdit(newBanner);
  };

  const createAndUpdate = async () => {
    if (!isSaving) {
      if (!editMode) {
        const newBanner = { ...data, Image: BannerImages };
        setIsSaving(true);
        const status = await dispatch(actAddNewBannerAsync(newBanner));
        if (status === 200) {
          onClose(false);
          onSaved(`Added ${newBanner.NewName}`);
        }
        setIsSaving(false);
      } else {
        const newBanner = { ...data, Image: BannerImages };
        setIsSaving(true);
        const status = await dispatch(actEditBannerAsync(newBanner));
        if (status === 200) {
          onClose(false);
          onSaved(`Updated Banner ${newBanner.NewId}`);
        }
        setIsSaving(false);
      }
    }
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {editMode ? `Update Banner ${data.NewId}` : 'Create new Banner'}
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
            id="outlined-select-currency"
            select
            label="Loại banner"
            value={data.bannerId}
            onChange={handleOnChange}
          >
            {bannerTypeList.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-required"
            label="Title"
            inputMode="numeric"
            value={data.Title}
            onChange={handleOnChangeBannerTitle}
          />
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneClass={classes.dropZone}
            value={data.Image}
            dropzoneText="Upload Banner images "
            filesLimit={3}
            onChange={(files) => setBannerImages(files)}
          />
        </Box>
      </Dialog>
    </div>
  );
}
