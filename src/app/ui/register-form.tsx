'use client'; 
import { useState } from 'react';
import { FormEvent } from 'react';
import { z } from 'zod';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { registerUser } from '../lib/actions';



export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const FormSchema = z.object({
    username: z.string().min(2, {message:'Username must be as leeast 2 characters.'}),
    password: z.string().min(6, {message:'Password must be at least 6 characters.'})
  });


  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const username = formData.get('username') as string;
  //   const email = formData.get('email') as string;
  //   const password = formData.get('password') as string;

  //   const response = await fetch('/api/auth/register', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, email, password }),
  //   });

  //   if (response.ok) {
  //     console.log('Registration successful');
  //   } else {
  //     console.log('Registration failed');
  //   }
  // };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append('email',email);
    formData.append('password', password);

    try {
      const user = await registerUser(formData);
      console.log('User data', user)
      // router.push('/todo');
    } catch(err){
      console.error('Error logging in', err);
      setError('Does not match with the database');
    }
  }


  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
            Username:
            <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        <label>
            Email:
            <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label>
            Password:
            <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <button type="submit">Register</button>
        </form>
    </div>
  );
}
