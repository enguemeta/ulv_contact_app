'use client';
import React from 'react';
import Header from './Header';

export default function Home() {
  return (
    <main className='py-8 px-48'>
      <div>
        <Header></Header>
      </div>
      <div>
        <h1 className=' text-gray-500 dark:text-gray-400 px-6 py-10 shadow-md sm:rounded-lg'>
          BIENVENU DANS NOTRE SIMPLE APPLICATION DE CONTACT SÉCURISÉE
        </h1>
      </div>
    </main>
  );
}
