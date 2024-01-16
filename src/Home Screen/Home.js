import React from 'react';
import bgImg from '../Pics/bg-img.png';
import Dashboard from '../Dashboard';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className='flex min-h-full flex-1 flex-col h-screen'>
      <Dashboard isHome='true'/>


      <div style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '100% 80vh', backgroundPosition: 'center', height: '60vh', width: '100%', }} className="h-3/5">
      </div>
      <div className=" justify-end px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
          <div>
            <Link to='/chatlisthistory'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Chat with ReX
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
