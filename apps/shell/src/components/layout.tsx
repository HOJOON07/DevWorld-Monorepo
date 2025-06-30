import { Button } from '@devworld/ui';
import { Link, Outlet } from 'react-router-dom';
import { appFeedBaseName } from '../constants/prefix';

const Layout = () => {
  // return (
  // <div>
  {
    /* <header>
        <div>
          <Link to='/'>Dev World</Link>
          <nav>
            <ul>
              <li>
                <Link to={`${appFeedBaseName}`}>피드 홈</Link>
              </li>
              <li>
                <Link to={`${appFeedBaseName}/1`}>피드 홈</Link>
              </li>
              <Button variant='default'>UI</Button>
            </ul>
          </nav>
        </div>
      </header> */
  }
  // </div>
  // );
  return <Outlet />;
};

export default Layout;
