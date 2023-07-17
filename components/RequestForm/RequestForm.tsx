import cn from 'classnames';
import Input from '@/components/Forms/Input';
import Select from '@/components/Forms/Select';
import { useForm, FormProvider } from 'react-hook-form';
import { Typography } from '@/components/Typography';
import Button from '@/components/Button';
import { RadioGroup } from '@/components/Forms/RadioGroup';
import { toast, ToastContainer } from 'react-toastify';

interface RequestFormProps {
  containerClassName?: string;
  onClose: () => void;
}

export function RequestForm(props: RequestFormProps) {
  const { containerClassName, onClose } = props;
  const methods = useForm();
  const { handleSubmit } = methods;

  const containerClasses = cn(
    containerClassName,
    'w-[520px] max-h-[90vh] p-[32px] overflow-scroll',
  );

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success('Your request has been sent', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    onClose();
  };
  const InfoField = ({ children }: { children: React.ReactElement[] }) => (
    <div className="mb-[34px]">{children}</div>
  );
  return (
    <FormProvider {...methods}>
      <form className={containerClasses} onSubmit={handleSubmit(onSubmit)}>
        <Typography type="h1" className="mb-[8px]">
          Request a Callback & Property Delails
        </Typography>
        <Typography type="info" className="mb-[32px] inline-block">
          Feel like exploring the Dominican? Start the day with a hike on one of
          Playa Moron’s many trails.
        </Typography>
        <section className="space-y-[16px] mb-[32px] border-b pb-[32px]">
          <Input name="name" label="Full name" required />
          <Input
            required
            validation={{
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
              min: {
                value: 3,
                message: 'error message', // JS only: <p>error message</p> TS only support string
              },
            }}
            name="email"
            label="E-mail"
          />
          <Input required name="phone" label="Phone number" />
          <Input required name="city" label="Town/City" />
          <Input required name="state" label="State/Country" />
          {/*<Select*/}
          {/*  name="country"*/}
          {/*  label="Country"*/}
          {/*  options={[{ label: 'Country', value: 'Country' }]}*/}
          {/*/>*/}
        </section>
        <section>
          <Typography type="paragraph" className="leading-[24px] mb-[32px]">
            To request detail... Feel like exploring the Dominican? Start the
            day with a hike on one of Playa Moron’s many trails.
          </Typography>
          <InfoField>
            <Typography type="h3" className="mb-[18px]">
              Have you visited the location before?
            </Typography>
            <RadioGroup
              groupName="haveVisited"
              options={[
                { value: 'yes', name: 'Yes' },
                { value: 'no', name: 'No' },
              ]}
            />
          </InfoField>
          <InfoField>
            <Typography type="h3" className="mb-[18px]">
              How soon are you looking to purchase?
            </Typography>
            <Input name="howSoon" />
          </InfoField>
          <InfoField>
            <Typography type="h3" className="mb-[18px]">
              Would you like us to arrange a visit?
            </Typography>
            <RadioGroup
              groupName="arrangeVisit"
              options={[
                { value: 'yes', name: 'Yes' },
                { value: 'no', name: 'No' },
              ]}
            />
          </InfoField>
          <InfoField>
            <Typography type="h3" className="mb-[18px]">
              When would you like to visit?
            </Typography>
            <Input name="whenVisit" />
          </InfoField>
          <InfoField>
            <Typography type="h3" className="mb-[18px]">
              What is your maximum budget?
            </Typography>
            <Select
              name="budget"
              options={[
                { label: '$300,000', value: '1' },
                { label: '$1,000,000', value: '2' },
                { label: '$1,500,000', value: '3' },
                { label: '$2,000,000', value: '4' },
                { label: '$3,000,000', value: '5' },
                { label: '$4,000,000', value: '6' },
                { label: '$5,000,000+', value: '7' },
              ]}
            />
          </InfoField>
          <InfoField>
            <Typography type="h3" className="mb-[18px]">
              Would you like to receive details of somlar properties, updates &
              news via e-mail from Caribbean Real Estate MLS?
            </Typography>
            <RadioGroup
              groupName="emailUpdates"
              options={[
                { value: 'yes', name: 'Yes' },
                { value: 'no', name: 'No' },
              ]}
            />
          </InfoField>
        </section>
        <Button className="w-full justify-center">Confirm</Button>
      </form>
    </FormProvider>
  );
}
