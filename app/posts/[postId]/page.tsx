import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';

import { Metadata } from 'next';


interface PostDetailsProps {
  params: Promise<{postId: string}>
}

export async function generateMetadata({ params }: PostDetailsProps): Promise<Metadata> {
   const { postId } = await params
   const post = await fetchPostById(postId)
   return {
    title: `Post: ${post.title}`,
    description: post.body.slice(0, 30),
    openGraph: {
      title: `Post: ${post.title}`,
      description: post.body.slice(0, 100),
      url: `https://notehub.com/notes/${postId}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
  }
}

const PostDetails = async ({ params }: PostDetailsProps) => {
  const { postId } = await params
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}

export default PostDetails;
