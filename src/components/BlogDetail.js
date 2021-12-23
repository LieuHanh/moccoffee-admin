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
  actAddNewBlogAsync,
  actEditBlogAsync,
  actDeleteBlogAsync // eslint-disable-next-line import/no-unresolved
} from 'src/store/action/blog/actionAsync';
import { LoadingButton } from '@mui/lab';

BlogDetail.propTypes = {
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

export default function BlogDetail({ open, onClose, data, editMode, onEdit, onSaved }) {
  const classes = useStyles();
  const [blogImages, setBlogImages] = useState(data.Image);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };
  const editor = useRef(null);
  const [content, setContent] = useState(data.Description);
  const config = {
    readonly: false,
    height: 400
  };
  const handleUpdate = (event) => {
    const editorContent = event.target.value;
    setContent(editorContent);
  };
  console.log('DATA: ', data);
  console.log('Image anh: ', blogImages);
  console.log('cobtebt: ', content);

  const handleOnChangeBlogName = (e) => {
    const newBlog = {
      NewId: data.NewId,
      NewName: e.target.value,
      Title: data.Title,
      Description: content,
      NewStatus: data.NewStatus,
      Image: blogImages
    };
    onEdit(newBlog);
  };
  const handleOnChangeBlogTitle = (e) => {
    const newBlog = {
      NewId: data.NewId,
      NewName: data.NewName,
      Title: e.target.value,
      Description: content,
      NewStatus: data.NewStatus,
      Image: blogImages
    };
    onEdit(newBlog);
  };
  const handleOnChangeBlogStatus = (e) => {
    const newBlog = {
      NewId: data.NewId,
      NewName: data.NewName,
      Title: data.Title,
      Description: content,
      NewStatus: e.target.checked,
      Image: blogImages
    };
    onEdit(newBlog);
  };
  const handleOnChangeHomeStatus = (e) => {
    const newBlog = {
      NewId: data.NewId,
      NewName: data.NewName,
      Title: data.Title,
      Description: content,
      NewStatus: data.NewStatus,
      IsHome: e.target.checked,
      Image: blogImages
    };
    onEdit(newBlog);
  };

  const createAndUpdate = async () => {
    if (!isSaving) {
      if (!editMode) {
        const newBlog = { ...data, Image: blogImages, Description: content };
        setIsSaving(true);
        const status = await dispatch(actAddNewBlogAsync(newBlog));
        if (status === 200) {
          onClose(false);
          onSaved(`Added ${newBlog.NewName}`);
        }
        setIsSaving(false);
      } else {
        const newBlog = { ...data, Image: blogImages, Description: content };
        setIsSaving(true);
        const status = await dispatch(actEditBlogAsync(newBlog));
        if (status === 200) {
          onClose(false);
          onSaved(`Updated Blog ${newBlog.NewId}`);
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
              {editMode ? `Update blog ${data.NewId}` : 'Create new blog'}
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
            label="Blog name"
            value={data.NewName}
            onChange={handleOnChangeBlogName}
          />
          <TextField
            required
            id="outlined-required"
            label="Title"
            inputMode="numeric"
            value={data.Title}
            onChange={handleOnChangeBlogTitle}
          />
          <div>
            <p>New status</p>
            <input
              label="New status"
              type="checkbox"
              checked={data.NewStatus}
              onChange={handleOnChangeBlogStatus}
            />
          </div>
          <div>
            <p>Hiển thị trang chủ</p>
            <input type="checkbox" checked={data.IsHome} onChange={handleOnChangeHomeStatus} />
          </div>
          <div className="App">
            <p>Description</p>
            <JoditEditor
              ref={editor}
              value={data.Description}
              config={config}
              onBlur={(content) => setContent(content)}
            />
          </div>
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneClass={classes.dropZone}
            value={data.Image}
            dropzoneText="Upload blog images "
            filesLimit={3}
            onChange={(files) => setBlogImages(files)}
          />
        </Box>
      </Dialog>
    </div>
  );
}
