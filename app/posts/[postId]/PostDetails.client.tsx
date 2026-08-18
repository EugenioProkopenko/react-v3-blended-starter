'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';


export default function PostDetailsClient() {
  const router = useRouter()


    const {postId} = useParams<{postId: string}>();

     const {data} = useQuery({
      queryKey: ['post', postId],
       queryFn: () => fetchPostById(postId),
       refetchOnMount: false
     })


  const handleClickBack = () => {
    router.back()




  };
  const [user, setUser] = useState<User | null>(null)  

  useEffect(() => {

    if(!data) return
    const fn = async () => {
      const response =  await fetchUserById(data.userId)
      setUser(response)
    };
    fn();
  }, [data]);

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn} onClick={handleClickBack}>← Back</button>

            <div className={css.post}>
              <div className={css.wrapper}>
                <div className={css.header}>
                  <h2>{data?.title}</h2>
                </div>

                <p className={css.content}>{data?.body}</p>
              </div>
              <p className={css.user}>Author: {user?.name ?? 'Loading...'}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
