import Section from '../Section/Section';
import Container from '../Container/Container';

import { getPhotos } from '../../services/photos';
import Form from '../Form/Form';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const handleSabmit = async (query: string) => {
    try {
      const data = await getPhotos(query);
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
          <Toaster />
        </Container>
      </Section>
    </>
  );
}
