/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  actGetAllCategoryAsync,
  actgetCategoryByNameAsync,
  actAddNewCategoryAsync,
  actEditCategoryAsync,
  actDeleteCategoryAsync
} from 'src/store/action/category/actionAsync';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../components/_dashboard/user';
import CategoryDetail from 'src/components/CategoryDetail';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'category_id', label: 'Mã loại sản phẩm', alignRight: false },
  { id: 'category_name', label: 'Tên loại sản phẩm', alignRight: false }
];

const blankCategory = {
  category_name: ''
};
// ----------------------------------------------------------------------

export default function Category() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [categoryBy, setCategoryBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(blankCategory);
  const [showSideBar, setShowSideBar] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
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
    dispatch(actGetAllCategoryAsync());
  }, []);

  const curentCategoryList = useSelector((state) => state.categoryReducer.categoryList);
  console.log('categoryList: ', curentCategoryList);

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const editCategory = (category) => {
    console.log(category);
    setSelectedCategory(category);
    setIsEdit(true);
    setShowSideBar(true);
  };

  const createCategory = () => {
    setSelectedCategory(blankCategory);
    setIsEdit(false);
    setShowSideBar(true);
  };

  const onEditting = (category) => {
    setSelectedCategory(category);
  };

  const onSaved = (messsae) => {
    dispatch(actGetAllCategoryAsync());
    setSavedMessage(messsae);
    setIsDelete(false);
    setOpenToast(true);
  };

  const deleteCategory = async (category) => {
    setIsDelete(true);
    const status = await dispatch(actDeleteCategoryAsync(category.category_id));
    if (status === 200) {
      dispatch(actGetAllCategoryAsync());
      console.log('STATUS: ', status);
      onSaved(`${category.category_name} is deleted`);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = categoryBy === property && category === 'asc';
    setCategory(isAsc ? 'desc' : 'asc');
    setCategoryBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = curentCategoryList.map((n) => n.name);
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
    console.log('Find category: ', event.target.value);
    setFilterName(event.target.value);
    dispatch(actgetCategoryByNameAsync(event.target.value));
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - curentCategoryList.length) : 0;
  return (
    <Page title="Loại sản phẩm | Mộc Coffee Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Loại sản phẩm
          </Typography>
          <Button
            onClick={createCategory}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm loại sản phẩm
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  category={category}
                  categoryBy={categoryBy}
                  headLabel={TABLE_HEAD}
                  rowCount={curentCategoryList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {curentCategoryList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.category_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.category_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.category_id}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row.category_name}</TableCell>
                          <TableCell align="right">
                            <Box>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  editCategory(row);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  deleteCategory(row);
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
                {curentCategoryList.length <= 0 && (
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
            count={curentCategoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <CategoryDetail
        open={showSideBar}
        onClose={closeSideBar}
        editMode={isEdit}
        data={selectedCategory}
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
