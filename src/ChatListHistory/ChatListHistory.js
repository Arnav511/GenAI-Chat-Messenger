import React, { useCallback, useEffect } from 'react'
import Dashboard from '../Dashboard'
import { Link, useNavigate } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import ReXLogo from '../Pics/radical_x_logo.png'

function ChatListHistory() {

    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    const [deleteMenu, setdeleteMenu] = useState(false)
    const deletebttnRef = useRef(null)

    const [currChat, setCurrChat] = useState('');

    const [chats, setChats] = useState([])

    const [shouldNavigate, setShouldNavigate] = useState(false);

    const [titleToDelete, setTitleToDelete] = useState('');

    const onDeleteBttnPress = useCallback((e) => {
        e.preventDefault();
        const t = e.currentTarget.id.slice(2);
        setTitleToDelete(t);
        setdeleteMenu(true);
    }, []);

    const DeleteChat = (e) => {
        e.preventDefault();
        const chatToDelete = chats.find(chat => chat.title === titleToDelete);
        const index = chats.indexOf(chatToDelete);
        chats.splice(index, 1);
        setChats(chats);
        localStorage.setItem('chats', JSON.stringify(chats));
        setEditMode(false);
        setdeleteMenu(false);
    }

    useEffect(() => {
        const chats = JSON.parse(localStorage.getItem('chats'))
        if (chats && chats.length > 0) {
            setChats(chats)
        }
    }, [])

    const [title, setTitle] = useState('')

    const cancelButtonRef = useRef(null)

    const onNewChat = (e) => {
        e.preventDefault();
        const strtMessage1 = {
            message: 'Hello Andrew!!!',
            type: 'ai'
        }
        const strtMessage2 = {
            message: 'What aspect of your career would you like guidence on?',
            type: 'ai'
        }

        const newChat = {
            title: title,
            messages: [strtMessage1, strtMessage2]
        }

        setChats([...chats, newChat]);
        setCurrChat(newChat.title);
        setOpen(false)

        setShouldNavigate(true);
    }

    const onChatSelect = (e) => {
        e.preventDefault();
        setCurrChat(e.currentTarget.id);
        setShouldNavigate(true);
    }

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats))
        // console.log("chats" + localStorage.getItem('chats'))
    }, [chats])

    useEffect(() => {
        localStorage.setItem('currChat', currChat)
        // console.log("currChat" + localStorage.getItem('currChat'))
    }, [currChat])

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/chat');
            setShouldNavigate(false);
        }
    }, [navigate, shouldNavigate]);

    return (
        <div className='flex flex-col h-screen bg-gray-100'>
            <Dashboard setEditMode={setEditMode} CurrEditMode={editMode} />

            <h1 className='text-lg px-10 py-3'>Your Chats</h1>

            <div className='flex flex-col flex-grow overflow-auto pr-5'>
                <ul className="divide-y divide-gray-100 px-5">
                    {chats.map((chat) => (
                        <div className="flex flex-row">
                            <Link to='/chat' className={`transition-all ease-in-out duration-300 ${editMode ? 'w-11/12' : 'w-full'}`}>
                                <button
                                    id={chat.title} className={`flex justify-between gap-x-6 m-3 p-5 w-full bg-white hover:bg-slate-50 rounded-2xl items-center`}
                                    onClick={onChatSelect}
                                >
                                    <div className="flex min-w-0 gap-x-4">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={ReXLogo} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm text-left font-semibold leading-6 text-gray-900">{chat.title}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{chat.messages[chat.messages.length - 1].message}</p>
                                        </div>
                                    </div>
                                    {/* <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                    {person.lastSeen ? (
                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                        </p>
                                    ) : (
                                        <div className="mt-1 flex items-center gap-x-1.5">
                                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            </div>
                                            <p className="text-xs leading-5 text-gray-500">Online</p>
                                        </div>
                                    )}
                                </div> */}
                                </button>
                            </Link>
                            {editMode && (
                                <button id={`DB${chat.title}`} className='flex justify-between gap-x-6 m-3 p-5 bg-red-600 items-center rounded-2xl hover:bg-red-500' onClick={onDeleteBttnPress}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>
                            )}
                        </div>
                    ))}
                </ul>
            </div>

            <div className=" justify-end px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-full bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => setOpen(true)}
                        >
                            Start a new Chat with ReX
                        </button>
                    </div>
                </div>
            </div>

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
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Give Title
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Please give a title to your chat
                                                    </p>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                        autoComplete="title"
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Link to='/chat' >
                                            <button
                                                type="button"
                                                disabled={title.trim() === ''}
                                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                onClick={onNewChat}
                                            >
                                                Start
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

            {/* Delete Chat Popup Menu */}
            <Transition.Root show={deleteMenu} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={deletebttnRef} onClose={setdeleteMenu}>
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
                                                    Delete Chat
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to delete this chat?
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
                                                onClick={DeleteChat}
                                            >
                                                Yes, Delete
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-100 hover:bg-indigo-50 p-4 m-1"
                                            onClick={() => setdeleteMenu(false)}
                                            ref={deletebttnRef}
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
        </div>
    )
}

export default ChatListHistory
