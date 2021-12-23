import React, { useState } from 'react';
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
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  actAddNewOrderAsync,
  actEditOrderAsync // eslint-disable-next-line import/no-unresolved
} from 'src/store/action/order/actionAsync';
import { ListHead, ListToolbar } from './_dashboard/user';
import Scrollbar from './Scrollbar';
import Label from './Label';

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'orderId', label: 'Order Id', alignRight: false },
  { id: 'productName', label: 'Product name', alignRight: false },
  { id: 'productSize', label: 'Size', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'qty', label: 'Quantity', alignRight: false },
  { id: 'decription', label: 'Note', alignRight: false }
];

OrderDetail.propTypes = {
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onSaved: PropTypes.func,
  data: PropTypes.object
};

const useStyles = makeStyles(() => ({
  '.MuiDropzoneArea-root': {
    width: '100%'
  },
  dropZone: {
    width: '100% !important',
    marginTop: 32,
    fullWidth: 'true'
  }
}));

const orderStatusList = [
  {
    id: 1,
    value: 'Open'
  },
  {
    id: 2,
    value: 'Shipping'
  },
  {
    id: 3,
    value: 'Cancel'
  },
  {
    id: 4,
    value: 'Closed'
  }
];

const paymentMethods = [
  {
    id: true,
    value: 'Đã thanh toán'
  },
  {
    id: false,
    value: 'Chưa thanh tóan'
  }
];

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function OrderDetail({
  open,
  onClose,
  data,
  shopList,
  currentUserId,
  editMode,
  onEdit,
  onSaved
}) {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [orderStatus, setOrderStatus] = useState(orderStatusList[0].id);
  const [paymentMenthod, setPaymentMenthod] = useState(paymentMethods[0].id);

  const classes = useStyles();
  const [productImages, setOrderImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [value, setValue] = React.useState(Date.now());
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };

  console.log('DATA: ', data);

  const handleOnChange = (e) => {
    const newStatus = orderStatusList.find((x) => x.id === e.target.value).value;
    const order = { ...data, orderStatus: newStatus };
    console.log(order);
    onEdit(order);
  };

  const handleOnChangeShopId = (e) => {
    const order = { ...data, coffeeId: Number(e.target.value) };
    onEdit(order);
  };

  const handleOnChangeReasonCancle = (e) => {
    const order = { ...data, reasonCancle: e.target.value };
    onEdit(order);
  };

  const createAndUpdate = async () => {
    if (!isSaving) {
      if (!editMode) {
        const newOrder = {
          userName: data.userName,
          fullName: data.fullName,
          email: data.email,
          passwordHash: data.passwordHash
        };
        setIsSaving(true);
        const status = await dispatch(actAddNewOrderAsync(newOrder));
        if (status === 200) {
          onClose(false);
          onSaved(`Added ${newOrder.userName}`);
        }
        setIsSaving(false);
      } else {
        const newOrder = { ...data, paymentStatus: paymentMenthod, empId: currentUserId };
        setIsSaving(true);
        const status = await dispatch(actEditOrderAsync(newOrder));
        if (status === 200) {
          onClose(false);
          onSaved(`Updated order ${newOrder.id}`);
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
              {editMode ? `Update order ${data.id}` : 'Create new user'}
            </Typography>
            <Button autoFocus color="inherit" onClick={createAndUpdate}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          {isSaving && <LinearProgress color="success" />}
        </Stack>
        <Container>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 },
              display: 'flex',
              flexDirection: 'column',
              width: '100%'
            }}
            direction="row"
            spacing={2}
            pt={5}
            marginBottom={2}
            noValidate
            autoComplete="off"
          >
            <Stack direction="row">
              <TextField
                disabled
                xs={{ flex: 1 }}
                value={data.orderType}
                required
                id="outlined-required"
                label="Loại hóa đơn"
              />
              <TextField
                disabled
                xs={{ flex: 1 }}
                value={data.custName}
                required
                id="outlined-required"
                label="Tên khách hàng"
              />
              <TextField
                disabled
                xs={{ flex: 1 }}
                value={data.custphone}
                required
                id="outlined-required"
                label="Số điện thoại khách hàng"
              />
              <TextField
                disabled
                xs={{ flex: 1 }}
                value={data.custEmail}
                required
                id="outlined-required"
                label="Email khách hàng"
              />
            </Stack>
            <Stack direction="row">
              <TextField
                disabled
                value={data.custAddress}
                required
                id="outlined-required"
                label="Địa chỉ khách hàng"
              />
              <TextField
                disabled
                value={data.empId}
                required
                id="outlined-required"
                label="Mã nhân viên"
              />
              <TextField
                value={data.coffeeId}
                select
                disabled
                required
                id="outlined-required"
                label="Quán cà phê"
                onChange={handleOnChangeShopId}
              >
                {shopList.map((option, index) => (
                  <MenuItem key={index} value={option.shopId}>
                    {option.shopName}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row">
              <TextField
                disabled
                value={data.numTable}
                required
                id="outlined-required"
                label="Số bàn"
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Trạng thái thanh toán "
                value={data.paymentStatus}
                onChange={(e) => {
                  setPaymentMenthod(e.target.value);
                }}
              >
                {paymentMethods.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Trạng thái hóa đơn"
                value={orderStatusList.find((x) => x.value === data.orderStatus).id}
                onChange={handleOnChange}
              >
                {orderStatusList.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="outlined-required"
                label="Lí do hủy"
                inputMode="numeric"
                value={data.reasonCancle}
                onChange={handleOnChangeReasonCancle}
              />
            </Stack>
          </Box>

          <Typography sx={{ mt: 2, flex: 1 }} variant="h6" component="div">
            Order detail list
          </Typography>
          <Card sx={{ mt: 2 }}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    numSelected={selected.length}
                  />
                  <TableBody>
                    {data.orderDetail
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, key) => {
                        const isItemSelected = selected.indexOf(row.orderId) !== -1;

                        return (
                          <TableRow
                            hover
                            key={key}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell component="th" scope="row">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {row.id}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{row.orderId}</TableCell>
                            <TableCell align="left">{row.productName}</TableCell>
                            <TableCell align="left">{row.productSize}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">{row.qty}</TableCell>
                            <TableCell align="left">{row.decription}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        </Container>
      </Dialog>
    </div>
  );
}
