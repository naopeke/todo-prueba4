'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

type ProviderProps = {
    children: ReactNode;
    session?: any;
}

export default function Provider({children}: ProviderProps){
    return <SessionProvider>{children}</SessionProvider>
}