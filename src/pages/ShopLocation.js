/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import { filter, isNull } from 'lodash';
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
  actGetAllShopAsync,
  actGetShopByNameAsync,
  actDeleteShopAsync
} from 'src/store/action/shop/actionAsync';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../components/_dashboard/user';
import ShopDetail from 'src/components/ShopDetail';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'avatar', label: '', alignRight: false },
  { id: 'id', label: 'Mã quán', alignRight: false },
  { id: 'Name', label: 'Tên quán', alignRight: false },
  { id: 'description', label: 'Mô tả', alignRight: false },
  { id: 'street', label: 'Đường', alignRight: false },
  { id: 'ward', label: 'Phường', alignRight: false },
  { id: 'district', label: 'Quận', alignRight: false },
  { id: 'city', label: 'Thành phố', alignRight: false }
];

const blankSkhop = {
  description: '',
  avatarFile: null,
  city: '',
  district: '',
  ward: '',
  wstreetard: '',
  lat: 0,
  lng: 0
};
// ----------------------------------------------------------------------

export default function Shop() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showSideBar, setShowSideBar] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
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
    dispatch(actGetAllShopAsync());
  }, []);

  const shopList = useSelector((state) => state.shopReducer.shopList);

  console.log('shopList: ', shopList);

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const editShop = (shop) => {
    console.log(shop);
    setSelectedShop(shop);
    setIsEdit(true);
    setShowSideBar(true);
  };

  const createShop = () => {
    setSelectedShop(blankSkhop);
    setIsEdit(false);
    setShowSideBar(true);
  };

  const onEditting = (product) => {
    setSelectedShop(product);
  };

  const onSaved = (messsae) => {
    dispatch(actGetAllShopAsync());
    setSavedMessage(messsae);
    setIsDelete(false);
    setOpenToast(true);
  };

  const deleteShop = async (shop) => {
    setIsDelete(true);
    const status = await dispatch(actDeleteShopAsync(shop.shopId));
    if (status === 200) {
      dispatch(actGetAllShopAsync());
      console.log('STATUS: ', status);
      onSaved(`${shop.shopName} is deleted`);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = shopList.map((n) => n.name);
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
    console.log('Find shop: ', event.target.value);
    setFilterName(event.target.value);
    dispatch(actGetShopByNameAsync(event.target.value));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shopList.length) : 0;
  return (
    <Page title="Shop | Mộc Coffee Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Shop
          </Typography>
          <Button
            onClick={createShop}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Shop
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
                  rowCount={shopList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {shopList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.shopId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.shopId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar
                                alt={row.shopName}
                                src={process.env.REACT_APP_BASE_URL + row.avatar}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row.shopId}</TableCell>
                          <TableCell align="left">{row.shopName}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{row.street}</TableCell>
                          <TableCell align="left">{row.ward}</TableCell>
                          <TableCell align="left">{row.district}</TableCell>
                          <TableCell align="left">{row.city}</TableCell>
                          <TableCell align="right">
                            <Box>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  editShop(row);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  deleteShop(row);
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
                {shopList.length <= 0 && (
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
            count={shopList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ShopDetail
        open={showSideBar}
        onClose={closeSideBar}
        editMode={isEdit}
        data={selectedShop}
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
