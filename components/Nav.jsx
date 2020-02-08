import { useRouter } from 'next/router';
import NavItem from './NavItem';

const active = 'text-green-300 pointer-events-none';
const navList = 'flex justify-around h-16';
const nav = 'fixed bottom-0 w-screen';

const Nav = () => {
  const route = useRouter().pathname;

  return (
    <nav className={nav}>
      <ul className={navList}>
        <NavItem
          class={route === '/' ? active : ''}
          title={'Wallet'}
          href={'/'}
        />
        <NavItem
          class={route === '/operation' ? active : ''}
          title={'Operations'}
          href={'/operation'}
        />
        <NavItem
          class={route === '/log' ? active : ''}
          title={'Log'}
          href={'/log'}
        />
      </ul>
    </nav>
  );
};

export default Nav;
