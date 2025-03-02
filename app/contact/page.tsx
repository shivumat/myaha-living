'use client';
import { useToast } from '#/context/ToastContext';
import FooterCarousel from '#/ui/components/FooterCarousel';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const InfoText = styled.div`
  background-color: #4e2c2c;
  color: white;
  font-size: 18px;
  padding: 30px;
  font-weight: lighter;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  @media (max-width: 800px) {
    padding: 20px;
    font-size: 14px;
  }
`;

const Form = styled.form`
  margin: 30px 0;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 700px;
  @media (max-width: 800px) {
    padding: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 800px) {
    padding: 0.4rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;

  @media (max-width: 800px) {
    padding: 0.4rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { showToast } = useToast();

  const onSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    await fetch('/api/contact/contactUs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    showToast('Form submitted successfully!', 'success');
    reset();
  };

  return (
    <>
      <img src="/images/contact-us/contact-us1.png" />
      <Container>
        <Title>Contact Us</Title>
        <InfoText>
          Feel free to contact us through your preferred channel of
          communication.
        </InfoText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Name</Label>
            <Input {...register('name', { required: 'Name is required' })} />
            {errors.name && (
              <p style={{ color: 'red', fontSize: '0.875rem' }}>
                {errors.name.message as string}
              </p>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Surname</Label>
            <Input {...register('surname')} />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email',
                },
              })}
            />
            {errors.email && (
              <p style={{ color: 'red', fontSize: '0.875rem' }}>
                {errors.email.message as string}
              </p>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Message</Label>
            <Textarea
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && (
              <p style={{ color: 'red', fontSize: '0.875rem' }}>
                {errors.message.message as string}
              </p>
            )}
          </FormGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Container>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ContactForm;
