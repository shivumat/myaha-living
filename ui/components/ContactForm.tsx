import newStyled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import Colors from '../colors/colors';

const Form = newStyled.form`
  margin: 30px 0;
  background-color: ${Colors.white};
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 700px;
  @media (max-width: 800px) {
    padding: 1rem;
  }
`;

const FormGroup = newStyled.div`
  margin-bottom: 1rem;
`;

const Label = newStyled.label`
  display: block;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = newStyled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 800px) {
    padding: 0.4rem;
  }
`;

const Textarea = newStyled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;

  @media (max-width: 800px) {
    padding: 0.4rem;
  }
`;

const SubmitButton = newStyled.button`
  width: 100%;
  background-color: ${Colors.white};
  color: ${Colors.white};
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContactFormComponent = (props: {
  onSubmit: (data: any) => Promise<void>;
  className?: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitClick = (data: any) => {
    props.onSubmit(data);
    reset();
  };

  return (
    <Form className={props.className} onSubmit={handleSubmit(onSubmitClick)}>
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
  );
};

export default ContactFormComponent;
