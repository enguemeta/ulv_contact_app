'use client';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import FormContact from '../Form';
import Header from '../Header';
import ContactList from '../ContactList';

const Contact = withPageAuthRequired(() => {
  return (
    <main className='py-8 px-48'>
      <div>
        <Header />
      </div>
      <div className='flex'>
        <div className='flex-none px-6 py-10 sm:rounded-lg'>
          <FormContact />
        </div>
        <div className='flex-1 w-64 px-6 py-10 sm:rounded-lg'>
          <ContactList />
        </div>
      </div>
    </main>
  );
});

export default Contact;
