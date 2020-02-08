import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  let route = useRouter().pathname;

  return (
    <nav>
      <ul className={'nav'}>
        <li>
          <Link href='/'>
            <a className={(route === '/' ? 'active' : '') + ' link'}>Home</a>
          </Link>
        </li>
        <li>
            <Link href="/contact">
            <a className={(route === '/contact' ? 'active' : '') + ' link'}>Contact Us</a>
            </Link>
        </li>
        <li>
          <a>Hello there</a>
        </li>
        <li>
          <a>Hello there</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
