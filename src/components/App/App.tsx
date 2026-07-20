import Section from '../Section/Section';
import Container from '../Container/Container';

import { getPhotos } from '../../services/photos';
import Form from '../Form/Form';
import toast, { Toaster } from 'react-hot-toast';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import { useState } from 'react';
import type { Photo } from '../../types/photo';

export default function App() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const handleSabmit = async (query: string) => {
    try {
      const data = await getPhotos(query);
      if (data.length === 0) {
        toast.error('По вашому запиту нічого не знайдено');
        return;
      }
      setPhotos(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Section>
        <Container>
          <Form onSabmit={handleSabmit} />
          {photos && photos.length > 0 && <PhotosGallery photos={photos} />}
          <Toaster />
        </Container>
      </Section>
    </>
  );
}
