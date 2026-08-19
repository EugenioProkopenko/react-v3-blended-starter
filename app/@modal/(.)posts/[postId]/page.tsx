import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import PostPreviewClient from './PostPreview.client';
 import { fetchPostById } from '@/lib/api';


interface PostPreviewProps {
  params: Promise<{postId: string}>
}

export default async function PostPreview({ params }: PostPreviewProps) {
  const {postId} = await params
  const queryClient = new QueryClient()
   await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId)
   })
  
  
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
