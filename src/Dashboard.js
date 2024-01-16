import React, { useRef, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReXLogo from './Pics/radical_x_logo.png'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    { name: 'ReX' },
]


function Dashboard({ isHome = false, setEditMode, CurrEditMode }) {

    const location = useLocation();
    const navigate = useNavigate();

    const cancelButtonRef = useRef(null)

    const [open, setOpen] = useState(false)

    const onEndSession = () => {
        setOpen(false);
        window.location.href = 'http://localhost:3000/chatlisthistory';
    }

    const EditMode = () => {
        if (location.pathname === '/chatlisthistory') {
            navigate('/chatlisthistory')
        }
        setEditMode(!CurrEditMode);
    }

    const goBack = () => {
        const currentPage = window.location.href;
        if (currentPage === 'http://localhost:3000/chat') {
            navigate('/chatlisthistory')
        }
        else if (currentPage === 'http://localhost:3000/chatlisthistory') {
            navigate('/')
        }
        else if (currentPage === 'http://localhost:3000/activity') {
            navigate('/chatlisthistory')
        }
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <>
                <div className="mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        </div>
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                {!isHome &&
                                    <button
                                        className="h-auto w-auto p-2 rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        onClick={goBack}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                        </svg>
                                    </button>
                                }

                            </div>
                            <div className="sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                'text-gray-300 ',
                                                'rounded-md px-3 py-2 text-lg font-medium'
                                            )}
                                            aria-current={'page'}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Search</span>
                                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                            </button> */}

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={ReXLogo}
                                            alt=""
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="/activity"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Activity
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left disabled:opacity-50')}
                                                    onClick={EditMode}
                                                    disabled={window.location.href !== 'http://localhost:3000/chatlisthistory'}
                                                >
                                                    Edit Chats
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left disabled:opacity-50')}
                                                    // onClick={() => window.location.href = 'http://localhost:3000/chatlisthistory'}
                                                    onClick={() => setOpen(true)}
                                                    disabled={window.location.href !== 'http://localhost:3000/chat'}
                                                >
                                                    End Session
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </Disclosure.Button>
                        ))}
                    </div>
                </Disclosure.Panel>
            </>


            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg w-80">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="flex flex-col items-center">
                                            <img
                                                className="h-40 w-40 rounded-full"
                                                src={ReXLogo}
                                                alt=""
                                            />
                                            <div className="mt-8 text-center">
                                                <Dialog.Title as="h1" className="text-2xl font-semibold leading-6 text-gray-900">
                                                    End Session
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to end your current session?
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 flex flex-col sm:px-6">
                                        <Link to='/chat'>
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed p-4 m-1"
                                                onClick={onEndSession}
                                            >
                                                Yes, End Session
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-100 hover:bg-indigo-50 p-4 m-1"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </Disclosure>
    )
}

export default Dashboard
