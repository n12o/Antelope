import Nav from './Nav';

const shell = 'absolute inset-0 bg-teal-400';
const page = 'absolute inset-0 mb-16 overflow-auto';

export default function Layout(props) {
  return (
    <div lang='en' className={shell}>
      <Nav />
      <div className={page}>{props.children}</div>
    </div>
  );
}
