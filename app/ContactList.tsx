'use client';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import useSWR from 'swr';

const fetcher = async (url: string) =>
  await fetch(url)
    .then((response) => response.json())
    .then((data) => data);

const ContactList = withPageAuthRequired(() => {
  const address = `/api/getContacts`;

  const { data, error } = useSWR(address, fetcher);

  if (error) {
    console.error('ERROR MESSAGE', error);
    return (
      <div className='text-red-500 text-md italic w-full max-w-lg shadow-md md:rounded-lg'>
        <p>Loading failed...</p>
      </div>
    );
  }

  if (!data)
    return (
      <div className='text-green-500 text-md italic w-full max-w-lg shadow-md md:rounded-lg'>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              TITLE
            </th>
            <th scope='col' className='px-6 py-3'>
              EMAIL
            </th>
            <th scope='col' className='px-6 py-3'>
              CONTENT
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length ? (
            data.map((c: any) => (
              // eslint-disable-next-line react/jsx-key
              <tr
                key={c.id}
                className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-mediu vb m text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {c.title}
                </th>
                <td className='px-6 py-4'>{c.email}</td>
                <td className='px-6 py-4'>{c.content}</td>
              </tr>
            ))
          ) : (
            <span className='px-4 text-md'>No results</span>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default ContactList;
