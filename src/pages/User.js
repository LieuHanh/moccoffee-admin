/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
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
  actGetAllUserAsync,
  actGetUserByNameAsync,
  actDeleteUserAsync
} from 'src/store/action/user/actionAsync';
import { actGetAllShopAsync } from 'src/store/action/shop/actionAsync';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../components/_dashboard/user';
import UserDetail from 'src/components/UserDetail';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Mã nhân viên', alignRight: false },
  { id: 'Name', label: 'Tên nhân viên', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'userName', label: 'Tên đăng nhập', alignRight: false },
  { id: 'passwordHash', label: 'Mật khẩu', alignRight: false }
];

const blanlUser = {
  fulName: '',
  userName: '',
  email: '',
  passwordHash: ''
};
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showSideBar, setShowSideBar] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  useEffect(() => {
    dispatch(actGetAllUserAsync());
    dispatch(actGetAllShopAsync());
  }, []);

  const userList = useSelector((state) => state.userReducer.userList);
  const shopList = useSelector((state) => state.shopReducer.shopList);
  console.log('userList: ', userList);

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const editUser = (user) => {
    console.log(user);
    setSelectedUser(user);
    setIsEdit(true);
    setShowSideBar(true);
  };

  const createUser = () => {
    setSelectedUser(blanlUser);
    setIsEdit(false);
    setShowSideBar(true);
  };

  const onEditting = (product) => {
    setSelectedUser(product);
  };

  const onSaved = (messsae) => {
    dispatch(actGetAllUserAsync());
    setSavedMessage(messsae);
    setIsDelete(false);
    setOpenToast(true);
  };

  const deleteUser = async (user) => {
    setIsDelete(true);
    const status = await dispatch(actDeleteUserAsync(user.userId));
    if (status === 200) {
      dispatch(actGetAllUserAsync());
      console.log('STATUS: ', status);
      onSaved(`${selectedUser.fullName} is deleted`);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.name);
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
    console.log('Find user');
    setFilterName(event.target.value);
    dispatch(actGetUserByNameAsync(event.target.value));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;
  return (
    <Page title="User | Mộc Coffee Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Nhân viên
          </Typography>
          <Button
            onClick={createUser}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm nhân viên
          </Button>
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
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {userList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.userId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.userId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.userId}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row.fullName}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.userName}</TableCell>
                          <TableCell align="left">{row.passwordHash}</TableCell>
                          <TableCell align="right">
                            <Box>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  editUser(row);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  deleteUser(row);
                                }}
                              >
                                <DeleteOutlineIcon />
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
                {userList.length <= 0 && (
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
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <UserDetail
        open={showSideBar}
        onClose={closeSideBar}
        editMode={isEdit}
        data={selectedUser}
        shopList={shopList}
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
