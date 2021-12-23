/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import Checkbox from '@material-ui/core/Checkbox';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// components
// eslint-disable-next-line import/no-unresolved
import {
  actGetAllProductAsync,
  actGetTotalProductAsync,
  actGetProductByNameAsync,
  actGetCategoryNameAsync,
  actDeleteProductAsync
} from 'src/store/action/product/actionAsync';
import { actGetAllCategoryAsync } from 'src/store/action/category/actionAsync';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../components/_dashboard/user';
import ProductDetail from 'src/components/ProductDetail';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'image', label: '', alignRight: false },
  { id: 'id', label: 'Mã sản phẩm', alignRight: false },
  { id: 'name', label: 'Tên sản phẩm', alignRight: false },
  { id: 'category', label: 'Loại sản phẩm', alignRight: false },
  { id: 'price', label: 'Giá', alignRight: false },
  { id: 'description', label: 'Mô tả', alignRight: false },
  { id: 'productStatus', label: 'Trạng thái sản phẩm', alignRight: false },
  { id: 'isHot', label: 'Sản phẩm hot', alignRight: false }
];

const blankProduct = {
  ProductName: '',
  Price: '',
  CategoryId: 1,
  Description: ''
};

// ----------------------------------------------------------------------

export default function Products() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [showSideBar, setShowSideBar] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(blankProduct);
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
    dispatch(actGetAllProductAsync(1));
    dispatch(actGetTotalProductAsync());
    dispatch(actGetCategoryNameAsync());
    dispatch(actGetAllCategoryAsync());
  }, []);

  const currentProductList = useSelector((state) => state.productReducer.productList);
  const totalProduct = useSelector((state) => state.productReducer.total);
  const categories = useSelector((state) => state.categoryReducer.categoryList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const pageNum = newPage + 1;
    dispatch(actGetAllProductAsync(pageNum));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    dispatch(actGetProductByNameAsync(event.target.value));
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setIsEdit(true);
    setShowSideBar(true);
  };

  const createProduct = () => {
    setSelectedProduct(blankProduct);
    setIsEdit(false);
    setShowSideBar(true);
  };

  const onEditting = (product) => {
    setSelectedProduct(product);
  };

  const onSaved = (messsae) => {
    if (isDelete || isEdit) {
      dispatch(actGetAllProductAsync(1));
    } else {
      dispatch(actGetAllProductAsync(1));
    }
    setSavedMessage(messsae);
    setIsDelete(false);
    setOpenToast(true);
  };

  const deleteProduct = async (product) => {
    setIsDelete(true);
    const status = await dispatch(actDeleteProductAsync(product.ProductId));
    if (status === 200) {
      dispatch(actGetAllProductAsync(page));
      console.log('STATUS: ', status);
      onSaved(`${selectedProduct.ProductName} is deleted`);
    }
  };

  if (categories.length <= 0) return null;
  return (
    <Page title="Sản phẩm | Mộc Coffee Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sản phẩm
          </Typography>
          <Button
            onClick={createProduct}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm sản phẩm
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder="Tìm kiếm ..."
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {currentProductList.map((row) => (
                    <TableRow
                      hover
                      key={row.ProductId}
                      tabIndex={-1}
                      role="checkbox"
                      selected={false}
                      aria-checked={false}
                    >
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            alt={row.ProductName}
                            src={process.env.REACT_APP_BASE_URL + row.ProductImages[0]}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {row.ProductId}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{row.ProductName}</TableCell>
                      <TableCell align="left">{row.CategoryName}</TableCell>
                      <TableCell align="left">{row.Price}</TableCell>
                      <TableCell align="left">{row.Description}</TableCell>
                      <TableCell align="center">
                        <input type="checkbox" checked={row.ProductStatus} />
                      </TableCell>
                      <TableCell align="center">
                        <input type="checkbox" checked={row.isHot} />
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            component="span"
                            onClick={() => {
                              editProduct(row);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            component="span"
                            onClick={() => {
                              deleteProduct(row);
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {currentProductList.length <= 0 && (
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
            rowsPerPageOptions={[]}
            component="div"
            count={totalProduct}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {showSideBar && (
        <ProductDetail
          open={showSideBar}
          onClose={closeSideBar}
          editMode={isEdit}
          data={selectedProduct}
          categories={categories}
          onEdit={onEditting}
          onSaved={onSaved}
        />
      )}
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
