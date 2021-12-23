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
  actGetAllBlogAsync,
  actGetBlogByNameAsync,
  actDeleteBlogAsync
} from 'src/store/action/blog/actionAsync';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../components/_dashboard/user';
import BlogDetail from 'src/components/BlogDetail';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Image', label: 'Hình ảnh', alignRight: false },
  { id: 'NewId', label: 'Mã tin tức', alignRight: false },
  { id: 'NewName', label: 'Tên tin tức', alignRight: false },
  { id: 'Title', label: 'Tiêu đề', alignRight: false },
  { id: 'NewStatus', label: 'Trạng thái', alignRight: false },
  { id: 'IsHome', label: 'Hiển thị trang chủ', alignRight: false }
];

const blankBlog = {
  createdBy: '',
  createdDate: null,
  modifieldBy: '',
  modifieldDate: null
};
// ----------------------------------------------------------------------

export default function Blog() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [blog, setBlog] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [blogBy, setBlogBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBlog, setSelectedBlog] = useState(blankBlog);
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
    dispatch(actGetAllBlogAsync());
  }, []);

  const curentblogList = useSelector((state) => state.blogReducer.blogList);
  console.log('blogList: ', curentblogList);

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const editBlog = (blog) => {
    console.log(blog);
    setSelectedBlog(blog);
    setIsEdit(true);
    setShowSideBar(true);
  };

  const createBlog = () => {
    setSelectedBlog(blankBlog);
    setIsEdit(false);
    setShowSideBar(true);
  };

  const onEditting = (blog) => {
    setSelectedBlog(blog);
  };

  const onSaved = (messsae) => {
    dispatch(actGetAllBlogAsync());
    setSavedMessage(messsae);
    setIsDelete(false);
    setOpenToast(true);
  };

  const deleteBlog = async (blog) => {
    setIsDelete(true);
    const status = await dispatch(actDeleteBlogAsync(blog.newId));
    if (status === 200) {
      dispatch(actGetAllBlogAsync());
      console.log('STATUS: ', status);
      onSaved(`${blog.newName} is deleted`);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = blogBy === property && blog === 'asc';
    setBlog(isAsc ? 'desc' : 'asc');
    setBlogBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = curentblogList.map((n) => n.name);
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
    console.log('Find blog: ', event.target.value);
    setFilterName(event.target.value);
    dispatch(actGetBlogByNameAsync(event.target.value));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - curentblogList.length) : 0;
  return (
    <Page title="Blog | Mộc Coffee Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            News
          </Typography>
          <Button
            onClick={createBlog}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Blog
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder="Search blog..."
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  blog={blog}
                  blogBy={blogBy}
                  headLabel={TABLE_HEAD}
                  rowCount={curentblogList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {curentblogList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.NewId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.NewId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar
                                alt={row.NewName}
                                src={process.env.REACT_APP_BASE_URL + row.Image}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.NewId}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row.NewName}</TableCell>
                          <TableCell align="left">{row.Title}</TableCell>
                          <TableCell align="center">
                            <input type="checkbox" checked={row.NewStatus} />
                          </TableCell>
                          <TableCell align="center">
                            <input type="checkbox" checked={row.IsHome} />
                          </TableCell>
                          <TableCell align="right">
                            <Box>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  editBlog(row);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  deleteBlog(row);
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
                {curentblogList.length <= 0 && (
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
            count={curentblogList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <BlogDetail
        open={showSideBar}
        onClose={closeSideBar}
        editMode={isEdit}
        data={selectedBlog}
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
