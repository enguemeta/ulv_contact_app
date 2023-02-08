'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function emailVerified() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();
  const updateSession = searchParams.get('updateSession');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    if (updateSession === 'true') {
      axios.get('/api/refreshToken').then((data) => {
        if (data) setRefreshed(true);
      });
    }
  }, [updateSession]);

  return (
    <div className='container px-20 py-4  justify-between mx-auto'>
      <h1> Your Email is Verified!</h1>
      {refreshed && (
        <a href={'/'} className='py-2 pl-3 pr-4 text-blue-700 hover:scale-155'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='w-8 h-8'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
          Go to Home
        </a>
      )}
    </div>
  );
}
