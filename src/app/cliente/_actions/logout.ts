'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function logoutUser() {
    try {
        await signOut();
        redirect('/cliente');
    } catch (e) {
        throw e;
    }
}