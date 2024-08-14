'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    console.log('Session', session);
    console.log('Status', status)

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }



    return(
        <header className="py-3">
            <nav className="flex justify-between">
                {session?.user?.id ? (
                <>
                    <div>
                        <Link title="App Title" href="/" className="text-pink-600 font-extrabold text-xl ml-5">MoTo-Do</Link>
                    </div>
                    <div>
                        <Link className={`link ${pathname === '/about' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/about">
                            About
                        </Link>
                        <Link className={`link ${pathname === '/todo' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/todo">
                            Todo
                        </Link>
                        <button title="Login" onClick={handleLogout} className="mr-5 ml-5 font-semibold">
                            Logout
                        </button>
                    </div>
                </>

                ) : (
                <>
                    <div>
                        <Link title="App Title" href="/" className="text-pink-600 font-extrabold text-xl ml-5">MoTo-Do</Link>
                    </div>
                    <div>
                        <Link className={`link ${pathname === '/about' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/about">
                            About
                        </Link>
                        <Link title="Login" href="/login" className="mr-5 ml-5 font-semibold">
                            Login
                        </Link>
                    </div>
                </>
                )
                } 
               
            </nav>
        </header>
    )
}