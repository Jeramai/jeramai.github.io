import Image from 'next/image';
import { useCallback } from 'react';
import img from '/public/img/logo.svg';

export default function Logo() {
  const toLinkedIn = useCallback(() => {
    const url = 'https://www.linkedin.com/in/jeramai-faber-19a85410b/';
    window.open(url, '_blank').focus();
  }, []);

  return (
    <div className='absolute left-0 top-0 w-full p-12 select-none' onClick={toLinkedIn}>
      <Image src={img} alt='logo' width={65} height={65} className=' cursor-pointer' />
    </div>
  );
}
