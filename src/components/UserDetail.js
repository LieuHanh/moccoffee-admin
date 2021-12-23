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
  actAddNewUserAsync,
  actEditUserAsync
  // eslint-disable-next-line import/no-unresolved
} from 'src/store/action/user/actionAsync';
import { LoadingButton } from '@mui/lab';

UserDetail.propTypes = {
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

const roleMethods = [
  {
    id: 0,
    value: 'Nhân viên'
  },
  {
    id: 1,
    value: 'Quản lý'
  }
];

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function UserDetail({ open, onClose, editMode, data, shopList, onEdit, onSaved }) {
  const classes = useStyles();
  const [productImages, setUserImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [value, setValue] = React.useState(Date.now());
  const [role, setRole] = useState(roleMethods[0].id);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };

  console.log('DATA: ', shopList);

  const handleOnChange = (e) => {
    const roleStatus = roleMethods.find((x) => x.id === e.target.value).id;
    const newUser = { ...data, role: roleStatus };
    console.log(newUser);
    onEdit(newUser);
  };

  const handleOnChangeUserName = (e) => {
    const newUser = {
      userId: data.userId,
      userName: e.target.value,
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.passwordHash,
      emp_birthday: data.emp_birthday,
      emp_gender: data.emp_gender,
      coffeeShopId: data.coffeeShopId,
      role: data.role
    };
    onEdit(newUser);
  };

  const handleOnChangeFullName = (e) => {
    const newUser = {
      userId: data.userId,
      userName: data.userName,
      fullName: e.target.value,
      email: data.email,
      passwordHash: data.passwordHash,
      emp_birthday: data.emp_birthday,
      emp_gender: data.emp_gender,
      coffeeShopId: data.coffeeShopId,
      role: data.role
    };
    onEdit(newUser);
  };

  const handleOnChangeEmail = (e) => {
    const newUser = {
      userId: data.userId,
      userName: data.userName,
      fullName: data.fullName,
      email: e.target.value,
      passwordHash: data.passwordHash,
      emp_birthday: data.emp_birthday,
      emp_gender: data.emp_gender,
      coffeeShopId: data.coffeeShopId,
      role: data.role
    };
    onEdit(newUser);
  };

  const handleOnChangePassword = (e) => {
    const newUser = {
      userId: data.userId,
      userName: data.userName,
      fullName: data.fullName,
      email: data.email,
      passwordHash: e.target.value,
      emp_birthday: data.emp_birthday,
      emp_gender: data.emp_gender,
      coffeeShopId: data.coffeeShopId,
      role: data.role
    };
    onEdit(newUser);
  };

  const handleOnChangeEmpBirthDay = (e) => {
    const newUser = {
      userId: data.userId,
      userName: data.userName,
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.passwordHash,
      emp_birthday: e.target.value,
      emp_gender: data.emp_gender,
      coffeeShopId: data.coffeeShopId,
      role: data.role
    };
    onEdit(newUser);
  };

  const handleOnChangeEmpGender = (e) => {
    const newUser = {
      userId: data.userId,
      userName: data.userName,
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.passwordHash,
      emp_birthday: data.emp_birthday,
      emp_gender: e.target.value,
      coffeeShopId: data.coffeeShopId,
      role: data.role
    };
    onEdit(newUser);
  };

  const handleOnChangeShopId = (e) => {
    const newUser = {
      userId: data.userId,
      userName: data.userName,
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.passwordHash,
      emp_birthday: data.emp_birthday,
      emp_gender: data.emp_gender,
      coffeeShopId: Number(e.target.value),
      role: data.role
    };
    onEdit(newUser);
  };

  const createAndUpdate = async () => {
    if (!isSaving) {
      if (!editMode) {
        const newUser = { ...data };
        setIsSaving(true);
        const status = await dispatch(actAddNewUserAsync(newUser));
        if (status === 200) {
          onClose(false);
          onSaved(`Added ${newUser.userName}`);
        }
        setIsSaving(false);
      } else {
        const newUser = { ...data };
        setIsSaving(true);
        const status = await dispatch(actEditUserAsync(newUser));
        if (status === 200) {
          onClose(false);
          onSaved(`Updated User ${newUser.userId}`);
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
              {editMode ? `Update user ${data.userId}` : 'Create new user'}
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
            value={data.fullName}
            required
            id="outlined-required"
            label="Họ và tên"
            onChange={handleOnChangeFullName}
          />
          <TextField
            value={data.userName}
            required
            id="outlined-required"
            label="Tên đăng nhập"
            onChange={handleOnChangeUserName}
          />
          <TextField
            value={data.email}
            required
            id="outlined-required"
            label="Email"
            onChange={handleOnChangeEmail}
          />
          <TextField
            value={data.passwordHash}
            required
            id="outlined-required"
            label="Mật khẩu"
            onChange={handleOnChangePassword}
          />
          <TextField
            value={data.emp_birthday}
            required
            id="outlined-required"
            label="Ngày sinh"
            onChange={handleOnChangeEmpBirthDay}
          />
          <TextField
            value={data.emp_gender}
            required
            id="outlined-required"
            label="Giới tính"
            onChange={handleOnChangeEmpGender}
          />
          <TextField
            value={data.coffeeShopId}
            select
            required
            id="outlined-required"
            label="Cửa hàng cà phê"
            onChange={handleOnChangeShopId}
          >
            {shopList.map((option, index) => (
              <MenuItem key={index} value={option.shopId}>
                {option.shopName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Phân quyền"
            value={data.role}
            onChange={handleOnChange}
          >
            {roleMethods.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Dialog>
    </div>
  );
}
