import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from './chikLazyBaseQuery';

export { baseQuery };

export default createApi({
  reducerPath: 'chikApi',
  baseQuery,
  endpoints: () => ({}),
});
