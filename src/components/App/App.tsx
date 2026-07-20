import Section from '../Section/Section';
import Container from '../Container/Container';

import { getPhotos } from '../../services/photos';
import Form from '../Form/Form';
import toast, { Toaster } from 'react-hot-toast';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';

export default function App() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSabmit = async (query: string) => {
    try {
      setLoading(true);
      setPhotos(null);
      const data = await getPhotos(query);

      if (data.length === 0) {
        toast.error('По вашому запиту нічого не знайдено');
        return;
      }
      setPhotos(data);
      console.log(data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const closeModal = () => {
    setSelectedPhoto(null);
  };
  return (
    <>
      <Section>
        <Container>
          <Form onSabmit={handleSabmit} />
          {photos && photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={setSelectedPhoto} />
          )}
          <Toaster />
          {loading && <Loader />}
          {error && <Text>Error</Text>}
          {selectedPhoto && (
            <Modal onClose={closeModal}>
              <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
