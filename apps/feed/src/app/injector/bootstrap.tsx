import inject from './injector';
import '../styles/styles.css';

inject({
  routerType: 'browser',
  rootElement: document.getElementById('app-feed')!,
});
