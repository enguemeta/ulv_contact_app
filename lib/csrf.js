// file: lib/csrf.js

import { nextCsrf } from 'next-csrf';
import { Envs } from '@/utils/config';

const { csrf, setup } = nextCsrf({
  // eslint-disable-next-line no-undef
  secret: Envs.CSRF_SECRET,
});

export { csrf, setup };
