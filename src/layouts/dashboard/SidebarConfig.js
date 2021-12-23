import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const sidebarConfig = [
  {
    currentUserId: 1,
    title: 'Loại sản phẩm',
    path: '/category',
    icon: getIcon(shoppingBagFill)
  },
  {
    currentUserId: 1,
    title: 'Sản phẩm',
    path: '/product',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Đơn hàng',
    path: '/order',
    icon: getIcon(peopleFill)
  },
  {
    currentUserId: 1,
    title: 'Quán cà phê',
    path: '/shop',
    icon: getIcon(fileTextFill)
  },
  {
    currentUserId: 1,
    title: 'Nhân viên',
    path: '/user',
    icon: getIcon(lockFill)
  },
  {
    currentUserId: 1,
    title: 'Tin tức',
    path: '/blog',
    icon: getIcon(fileTextFill)
  },
  {
    currentUserId: 1,
    title: 'Banner',
    path: '/banner',
    icon: getIcon(fileTextFill)
  }
];

export default sidebarConfig;
