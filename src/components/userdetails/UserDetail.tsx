'use client'
import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';
import UserCard from './UserCard';

export default function UserDetail() {
  const params = useParams();
  const id = params?.userid;

  const router = useRouter();
  
  const handleNavigate = () => {
    router.push("/");
  };
  
  const { getUser, getAllUsers, user, users } = useUserStore();
  
  useEffect(() => {
    if (id) {
      getUser(String(id));
      getAllUsers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChangeUser = () => {
    if (!users || users.length === 0) return;

    const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];
    getUser(randomUser.id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          User details
        </h1>

        {user ? (
          <div className="space-y-6 flex flex-col items-center">
            <UserCard user={user} />

            <div className='flex gap-4'>
              <button
                onClick={handleChangeUser}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Change user
              </button>
              <button
                onClick={handleNavigate}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Back to home
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading user information...</p>
          </div>
        )}
      </div>
    </div>
  );
}