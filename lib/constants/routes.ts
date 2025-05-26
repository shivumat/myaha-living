export const routes = [
  '/',
  '/about',
  '/contact',
  '/products',
  '/products/:id',
  '/cart',
  '/checkout',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/orders',
  '/orders/:id',
  '/account',
  '/error',
];

export interface FooterRouteTypes {
  name: string;
  path: string;
  state: string;
  section: string;
}

export const footerRoutes: FooterRouteTypes[] = [
  { name: 'Our Story', path: '/', state: 'our_story', section: 'About Us' },
  { name: 'About Us', path: '/about-us', state: '', section: 'About Us' },
  { name: 'Privacy Policy', path: '/privacy', state: '', section: 'Policies' },
  {
    name: 'Cancellation and Refund',
    path: '/cancellation',
    state: '',
    section: 'Policies',
  },
  {
    name: 'Shipping and Delivery',
    path: '/shipping',
    state: '',
    section: 'Policies',
  },
  {
    name: 'Terms and Conditions',
    path: '/terms',
    state: '',
    section: 'Policies',
  },
  {
    name: 'Collaborate With Us',
    path: '/collaborate',
    state: '',
    section: 'Collaborate With Us',
  },
  { name: 'Contact Us', path: '/contact', state: '', section: 'About Us' },
];

export interface NavRouteTypes {
  name: string;
  path: string;
}

export const navRoutes: NavRouteTypes[] = [
  { name: 'HOME', path: '/' },
  { name: 'SHOP', path: '/products' },
  { name: 'ABOUT US', path: '/about-us' },
  { name: 'CONTACT US', path: '/contact' },
  { name: 'GIFT & BULK', path: '/gifting' },
];

export const mobileNavRoutes: NavRouteTypes[] = [
  { name: 'HOME', path: '/' },
  { name: 'SHOP ALL', path: '/products' },
  { name: 'SHOP BY CATEGORY', path: '/collections' },
  { name: 'SHOP BY MATERIAL', path: '/material' },
  { name: 'ABOUT US', path: '/about-us' },
  { name: 'CONTACT US', path: '/contact' },
  { name: 'GIFT & BULK', path: '/gifting' },
];

export const hideNavbarRoutes: string[] = ['/admin'];
export const hideFooterRoutes: string[] = [
  '/admin',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/cart',
  '/checkout',
  '/orders',
  '/orders/:id',
  '/account',
  '/error',
];
