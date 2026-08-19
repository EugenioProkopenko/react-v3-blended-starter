'use client';

 import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';

import { User } from '@/types/user';
import Modal from '@/components/Modal/Modal';

export default function PostPreviewClient() {

  const router = useRouter()


    const {postId} = useParams<{postId: string}>();

     const {data} = useQuery({
      queryKey: ['post', postId],
       queryFn: () => fetchPostById(postId),
       refetchOnMount: false
     })


  const handleClose = () => {
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
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>← Back</button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>

          <p className={css.content}>{data?.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
