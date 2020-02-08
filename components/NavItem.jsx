// Child component for Nav
import Link from 'next/link';

const style = 'block bg-red-500 flex-1 text-center';

const NavItem = props => {
  return (
    <li className={style}>
      <Link href={props.href}>
        <a className={props.class}>{props.title}</a>
      </Link>
    </li>
  );
};

export default NavItem;
