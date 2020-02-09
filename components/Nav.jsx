import { useRouter } from 'next/router';
import NavItem from './NavItem';

//styles
const active = 'text-green-300 pointer-events-none';
const navList = 'flex justify-around h-16';
const nav = 'fixed bottom-0 w-screen';

const Nav = () => {
  const route = useRouter().pathname;

  return (
    <nav className={nav}>
      <ul className={navList}>
        <NavItem
          active={route === '/' ? active : ''}
          title={'Wallet'}
          href={'/'}
        />
        <NavItem
          active={route === '/operation' ? active : ''}
          title={'Operations'}
          href={'/operation'}
        />
        <NavItem
          active={route === '/log' ? active : ''}
          title={'Log'}
          href={'/log'}
        />
      </ul>
    </nav>
  );
};

export default Nav;
