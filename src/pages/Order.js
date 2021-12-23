/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Snackbar,
  Alert,
  IconButton,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// components
// eslint-disable-next-line import/no-unresolved
import {
  actGetAllOrderAsync,
  actGetOrderByNameAsync,
  actDeleteOrderAsync
} from 'src/store/action/order/actionAsync';
import { actGetUserByNameAsync } from 'src/store/action/user/actionAsync';
import { actGetAllShopAsync } from 'src/store/action/shop/actionAsync';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
import OrderDetail from 'src/components/OrderDetail';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Mã đơn hàng', alignRight: false },
  { id: 'orderType', label: 'Loại đơn hàng', alignRight: false },
  { id: 'orderStatus', label: 'Trạng thái đơn hàng', alignRight: false },
  { id: 'custName', label: 'Tên khách hàng', alignRight: false },
  { id: 'custphone', label: 'Số điện thoại khách hàng', alignRight: false },
  { id: 'paymentStatus', label: 'Trạng thái thanh toán', alignRight: false },
  { id: 'paymentMethod', label: 'Phương thức thanh toán', alignRight: false }
];

const blanlOrder = {
  fulName: '',
  orderName: '',
  email: '',
  passwordHash: ''
};

export default function Order() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showSideBar, setShowSideBar] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };
  const currentUserId = useSelector((state) => state.userReducer.currentUser.userId);
  console.log('hafffff: ', currentUserId);
  useEffect(() => {
    dispatch(actGetUserByNameAsync(currentUserId));
    dispatch(actGetAllOrderAsync(currentUserId));
    dispatch(actGetAllShopAsync());
  }, []);
  const orderList = useSelector((state) => state.orderReducer.orderList);
  const shopList = useSelector((state) => state.shopReducer.shopList);
  console.log('orderList: ', orderList);

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const editOrder = (order) => {
    console.log(order);
    setSelectedOrder(order);
    setIsEdit(true);
    setShowSideBar(true);
  };

  const createOrder = () => {
    setSelectedOrder(blanlOrder);
    setIsEdit(false);
    setShowSideBar(true);
  };

  const onEditting = (product) => {
    setSelectedOrder(product);
  };

  const onSaved = (messsae) => {
    dispatch(actGetAllOrderAsync(currentUserId));
    setSavedMessage(messsae);
    setIsDelete(false);
    setOpenToast(true);
  };

  const deleteOrder = async (order) => {
    setIsDelete(true);
    const status = await dispatch(actDeleteOrderAsync(order.orderId));
    if (status === 200) {
      dispatch(actGetAllOrderAsync());
      console.log('STATUS: ', status);
      onSaved(`${selectedOrder.fullName} is deleted`);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    console.log('Find order');
    setFilterName(event.target.value);
    dispatch(actGetOrderByNameAsync(event.target.value));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;
  return (
    <Page title="Order | Mộc Coffee Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Đơn hàng
          </Typography>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder="Tìm kiếm..."
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {orderList
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
                          <TableCell align="left">
                            {row.orderType === `1` ? `Đặt online` : `Mua tại quán`}
                          </TableCell>
                          <TableCell align="left">
                            {row.orderStatus === 'Closed' && <Label color="success">Closed</Label>}
                            {row.orderStatus === 'Open' && <Label color="default">Open</Label>}
                            {row.orderStatus === 'Shipping' && <Label color="info">Shipping</Label>}
                            {row.orderStatus === 'Cancel' && <Label color="error">Cancel</Label>}
                          </TableCell>
                          <TableCell align="left">{row.custName}</TableCell>
                          <TableCell align="left">{row.custphone}</TableCell>
                          {row.paymentStatus && (
                            <TableCell align="left">
                              <Label color="success">Đã thanh toán</Label>
                            </TableCell>
                          )}
                          {!row.paymentStatus && (
                            <TableCell align="left">
                              {' '}
                              <Label color="default">Chưa thanh toán</Label>
                            </TableCell>
                          )}
                          <TableCell align="left">{row.paymentMethod}</TableCell>
                          <TableCell align="right">
                            <Box>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  editOrder(row);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {orderList.length <= 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orderList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <OrderDetail
        open={showSideBar}
        onClose={closeSideBar}
        editMode={isEdit}
        data={selectedOrder}
        shopList={shopList}
        currentUserId={currentUserId}
        onEdit={onEditting}
        onSaved={onSaved}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {savedMessage}
        </Alert>
      </Snackbar>
    </Page>
  );
}
