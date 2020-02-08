// Child component for Nav
import Link from 'next/link';

const liStyled = 'block bg-red-500 flex-1 text-center';
const aStyled = 'flex h-full justify-center items-center';

const NavItem = props => {
  return (
    <li className={liStyled}>
      <Link href={props.href}>
        <a className={props.active + ' ' + aStyled}>{props.title}</a>
      </Link>
    </li>
  );
};

export default NavItem;
