'use client';
import logo from '@/public/assets/logo_white.svg';
import mail from '@/public/assets/mail.svg';
import Image from 'next/image';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

interface FooterProps {
  containerClassName?: string;
}

export function Footer(props: FooterProps) {
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;
  return (
    <div className="p-10 bg-[#262338] flex justify-between items-end">
      <div>
        <ToastContainer />
        <Image src={logo} alt="logo-white" className="mb-[16px]" />
        <p className="text-white font-[400] text-base m-0">
          Real estate in the Caribbean for living and investment
        </p>
      </div>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(
              (data, event) => {
                methods.reset();
                toast.success('Thank you for subscribing!');
              },
              () => {},
            )}
            className="flex items-end gap-[8px]"
          >
            <Input
              variant="transparent"
              name="email"
              label="Subscribe"
              validation={{ required: true, pattern: /^\S+@\S+$/i }}
              iconEnd={mail}
            />
            <Button>Send</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
