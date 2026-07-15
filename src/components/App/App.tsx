import Section from '../Section/Section';
import Container from '../Container/Container';
import { useEffect } from 'react';
import { getPhotos } from '../../services/photos';
import Form from '../Form/Form';

export default function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPhotos('animal');
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Section>
        <Container>Home page</Container>
        <Form />
      </Section>
    </>
  );
}
