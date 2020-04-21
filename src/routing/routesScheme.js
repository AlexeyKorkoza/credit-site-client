export const routesScheme = {
  auth: '/auth',
  clients: '/clients',
  clientsAdd: '/clients/add',
  clientsId: (id) => `/clients/${id}`,
  clientsIdRoute: '/clients/:id',
  loans: '/loans',
  loansAdd: '/loans/add',
  loansId: (id) => `/loans/${id}`,
  loansIdRoute: '/loans/:id',

  buildManagersId: (id) => `/managers/${id}`,
  managers: '/managers',
  managersIdRoute: '/managers/:id',
  managersAdd: '/managers/add',
  profile: '/profile',
};
