'use client';

import React, { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { Envs } from '@/utils/config';

type Env = {
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string | undefined;
};

const FormContact = withPageAuthRequired(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [lastContactCreated, setlastContactCreated] = useState('');
  const [captchaIsDone, setCaptchaIsDone] = useState(false);
  const [cookie, setCookie] = useCookies(['latest_contact_title']);

  const submitPost = async (d: any) => {
    const title = d.title;
    const email = d.email;
    const content = d.content;

    const data = await fetch(`api/createContact`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ title, email, content }),
    });
    const res = await data.json();

    setCookie('latest_contact_title', title, {
      path: '/',
      maxAge: 3600,
      sameSite: true,
      //httpOnly: true,
      secure: true,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('last_contact_created', JSON.stringify(email));
    }

    alert('Contact Successfully created');

    if (!res.ok) console.log(res.messge);
  };

  useEffect(() => {
    const item = window.localStorage.getItem('last_contact_created') || '';
    setlastContactCreated(item);
  }, []);

  function onChange() {
    setCaptchaIsDone(true);
  }

  return (
    <form
      onSubmit={handleSubmit(submitPost)}
      className='w-full max-w-lg shadow-sm shadow-md sm:rounded-lg bg-white py-10 px-10'
    >
      <div className='py-8'>
        <h2 className='py-2 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          SEND US A MESSAGE
        </h2>
        <hr></hr>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-title'
          >
            TITLE
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-title'
            type='text'
            placeholder='title'
            {...register('title', { required: true })}
          />
          {errors.title && errors.title.type == 'required' && (
            <p className='text-red-500 text-sm italic'>
              Please enter the title.
            </p>
          )}
        </div>
        <div className='w-full md:w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-email'
          >
            EMAIL
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-email'
            type='email'
            placeholder='email@me.com'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            })}
          />
          {errors.email && errors.email.type == 'required' && (
            <p className='text-red-500 text-sm italic'>
              Please enter the email.
            </p>
          )}
          {errors.email && errors.email.type == 'pattern' && (
            <p className='text-red-500 text-sm italic'>
              Email is in the wrong format.
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-content'
          >
            MESSAGE
          </label>
          <textarea
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-content'
            placeholder='Content'
            {...register('content', { required: true, maxLength: 200 })}
          />
          {errors.content && errors.content.type == 'required' && (
            <p className='text-red-500 text-sm italic'>
              Please enter the content.
            </p>
          )}
          {errors.content && errors.content.type == 'maxLength' && (
            <p className='text-red-500 text-sm italic'>
              Please enter a maximum 200 length content.
            </p>
          )}
          <p className='text-gray-600 text-xs italic'>Max length 200</p>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-2'>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <ReCAPTCHA
            sitekey={Envs.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            onChange={onChange}
          ></ReCAPTCHA>
          {captchaIsDone && (
            <button
              className='bg-cyan-500 shadow-sm shadow-cyan-500 py-1 px-2 rounded-md'
              type='submit'
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div>
        <hr />
        {cookie['latest_contact_title'] && (
          <p className='text-blue-500 text-md italic w-full max-w-lg'>
            Latest Content TITLE from cookies: {cookie['latest_contact_title']}
          </p>
        )}

        {lastContactCreated && (
          <p className='text-green-500 text-md italic w-full max-w-lg'>
            Latest Content EMAIL from LocalStorage: {lastContactCreated}
          </p>
        )}
      </div>
    </form>
  );
});
export default FormContact;
