import Link from 'next/link';
import localforage from 'localforage';

const Welcome = props => {
  const handleUpload = () => {
    const fileElem = document.querySelector('#json');
    if (fileElem) {
      fileElem.click();
    }
  };

  const handleFiles = event => {
    console.log(event.target.files);
    event.target.files[0]
      .text()
      .then(file => localforage.setItem('wallet', JSON.parse(file)))
      .then(() => {
        console.log('success!');
        props.onUpload();
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <h1 className='text-center mt-12'>Welcome!</h1>
      <p className='mt-4 ml-4'>
        This is a Progressive Web Application that works offline after your
        first visit
      </p>
      <p className='mt-4 ml-4'>
        Note that all data you input is only available in your current browser.
        If you change or reinstall a browser or clear it's data all data will be
        lost without an option for recovery. For now you should use this
        application only if you don't need persistant data or if you just want
        to try out features that are already present.
      </p>
      <p className='mt-4 ml-4'>
        Begin by
        <Link href={'/operation'}>
          <span className='cursor-pointer text-blue-900'>
            {' '}
            adding something to your wallet
          </span>
        </Link>
      </p>
      <p className='mt-4 ml-4'>
        Or by{' '}
        <span className='cursor-pointer text-blue-900' onClick={handleUpload}>
          {' '}
          uploading existing antelope datafile
        </span>
      </p>
      <input
        onChange={handleFiles}
        style={{ display: 'none' }}
        type='file'
        name='json'
        id='json'
        accept='.ant'
      ></input>
    </>
  );
};

export default Welcome;
