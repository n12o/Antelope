import Nav from './Nav';

export default function Layout(props) {
  return (
    <>
      <Nav></Nav>
      {props.children}
    </>
  );
}
