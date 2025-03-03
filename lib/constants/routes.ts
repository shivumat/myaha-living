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
  // { name: 'Our Story', path: '/', state: 'our_story', section: 'About Us' },
  { name: 'About Us', path: '/about-us', state: '', section: 'About Us' },
  { name: 'Contact Us', path: '/contact', state: '', section: 'About Us' },
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
    path: '/colaborate',
    state: '',
    section: 'Collaborate With Us',
  },
];

export interface NavRouteTypes {
  name: string;
  path: string;
}

export const navRoutes: NavRouteTypes[] = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/products' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact Us', path: '/contact' },
];
