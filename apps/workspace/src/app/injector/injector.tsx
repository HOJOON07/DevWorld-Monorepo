import { injectFactory } from '@devworld/shell-router';
import { routes } from '../routes/routes';

const inject = injectFactory({
  routes,
});

export default inject;
