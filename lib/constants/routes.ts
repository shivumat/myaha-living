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
  { name: 'Contact Us', path: '/contact', state: '', section: 'About Us' },
  { name: 'Privacy Policy', path: '/policies', state: '', section: 'Policies' },
  {
    name: 'Returns, Refunds and Cancellation Policy',
    path: '/policies',
    state: 'terms',
    section: 'Policies',
  },
  {
    name: 'Shipping Policy',
    path: '/policies',
    state: 'terms',
    section: 'Policies',
  },
  {
    name: 'Terms and Conditions',
    path: '/policies',
    state: 'terms',
    section: 'Policies',
  },
  {
    name: 'Collaborate With Us',
    path: '/colaborate',
    state: 'terms',
    section: 'Collaborate With Us',
  },
];
