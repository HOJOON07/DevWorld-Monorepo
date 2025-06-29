import { Button } from '@devworld/ui';
import { Link, Outlet } from 'react-router-dom';
import { appFeedBasename } from '../constants/prefix';

const Layout = () => {
  return (
    <div>
      <header>
        <div>
          <Link to='/'>Dev World</Link>
          <nav>
            <ul>
              <li>
                <Link to={`${appFeedBasename}`}>피드 홈</Link>
              </li>
              <li>
                <Link to={`${appFeedBasename}/1`}>피드 홈</Link>
              </li>
              <Button variant='ghost'>UI</Button>
            </ul>
          </nav>
        </div>
      </header>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
