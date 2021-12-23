/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Label from 'src/components/Label';
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
import { actGetAllBannerAsync, actDeleteBannerAsync } from 'src/store/action/banner/actionAsync';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../components/_dashboard/user';
import BannerDetail from 'src/components/BannerDetail';
import { actGetAllBanner } from 'src/store/action/banner/action';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Image', label: 'Hình ảnh', alignRight: false },
  { id: 'id', label: 'Mã banner', alignRight: false },
  { id: 'bannerId', label: 'Loại banner', alignRight: false },
  { id: 'Title', label: 'Tiêu đề', alignRight: false }
];

const blankBanner = {
  Title: ''
};
// ----------------------------------------------------------------------

export default function Banner() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [banner, setBanner] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [bannerBy, setBannerBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBanner, setSelectedBanner] = useState(blankBanner);
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
    dispatch(actGetAllBannerAsync());
  }, []);

  const curentBannerList = useSelector((state) => state.bannerReducer.bannerList);
  console.log('bannerList: ', curentBannerList);

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const editBanner = (banner) => {
    console.log(banner);
    setSelectedBanner(banner);
    setIsEdit(true);
    setShowSideBar(true);
  };

  const createBanner = () => {
    setSelectedBanner(blankBanner);
    setIsEdit(false);
    setShowSideBar(true);
  };

  const onEditting = (banner) => {
    setSelectedBanner(banner);
  };

  const onSaved = (messsae) => {
    dispatch(actGetAllBannerAsync());
    setSavedMessage(messsae);
    setIsDelete(false);
    setOpenToast(true);
  };

  const deleteBanner = async (banner) => {
    setIsDelete(true);
    const status = await dispatch(actDeleteBannerAsync(banner.id));
    if (status === 200) {
      dispatch(actGetAllBannerAsync());
      console.log('STATUS: ', status);
      onSaved(`${banner.id} is deleted`);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = bannerBy === property && banner === 'asc';
    setBanner(isAsc ? 'desc' : 'asc');
    setBannerBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = curentBannerList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - curentBannerList.length) : 0;
  return (
    <Page title="Blog | Mộc Coffee Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Banner
          </Typography>
          <Button
            onClick={createBanner}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm Banner
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  banner={banner}
                  bannerBy={bannerBy}
                  headLabel={TABLE_HEAD}
                  rowCount={curentBannerList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {curentBannerList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar
                                alt={row.Title}
                                src={process.env.REACT_APP_BASE_URL + row.Image}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.id}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            {row.bannerId === 1 && <Label>Banner trang chủ</Label>}
                            {row.bannerId === 2 && <Label>Banner sản phẩm</Label>}
                            {row.bannerId === 3 && <Label>Banner quán cà phê</Label>}
                            {row.bannerId === 4 && <Label>Banner tin tức</Label>}
                            {row.bannerId === 5 && <Label>Banner giỏ hàng</Label>}
                          </TableCell>
                          <TableCell align="left">{row.Title}</TableCell>
                          <TableCell align="right">
                            <Box>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  editBanner(row);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                component="span"
                                onClick={() => {
                                  deleteBanner(row);
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
                {curentBannerList.length <= 0 && (
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
            count={curentBannerList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <BannerDetail
        open={showSideBar}
        onClose={closeSideBar}
        editMode={isEdit}
        data={selectedBanner}
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
