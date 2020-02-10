import Link from 'next/link';

const Welcome = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <p>
        This is a Progressive Web Application that works offline after your
        first visit
      </p>
      <p>
        Note that all data you input is only available in your current browser.
        If you change or reinstall a browser or clear it's data all data will be
        lost without an option for recovery. For now you should use this
        application only if you don't need persistant data or if you just want
        to try out features that are already present.
      </p>
      <p>
        Begin by
        <Link href={'/operation'}> adding something to your wallet</Link>
      </p>
    </>
  );
};

export default Welcome;
