'use client';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button from '@/components/Button';
import { createContext } from 'react';
import RegisterContext from '@/utils/formContext';
import CheckboxGroup from '@/components/CheckboxGroup';
import Tags from '@/components/Tags';
import Toggle from '@/components/Toggle';
import { Loader } from '@googlemaps/js-api-loader';
import Tabs from '@/components/Tabs';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Form: React.FC = () => {
  const methods = useForm<FormData>();
  const { control } = methods;
  const { handleSubmit, register } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
    // handle form submission here
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Tabs
          className="mb-[48px]"
          tabs={[
            {
              id: '0',
              label: 'dopes',
              content: (
                <div className={'border px-[30px] py-[42px]'}>
                  <div>dopoes</div>
                </div>
              ),
            },
            {
              id: '1',
              label: 'props',
              content: (
                <div className={'border px-[30px] py-[42px]'}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="name" label="Name" placeholder="Your name" />

                    <Input
                      name="email"
                      label="Email"
                      placeholder="Your email"
                    />

                    <Input
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Your password"
                    />
                    <Select
                      name="role"
                      label="Role"
                      options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'user', label: 'User' },
                      ]}
                      multiple={true}
                    />
                    <CheckboxGroup
                      options={[
                        { value: '1', label: 'qwedsds' },
                        { value: '2', label: 'qwedsds' },
                        { value: '3', label: 'qwedsds' },
                      ]}
                      label="asd"
                      name="asd"
                      onChange={() => {}}
                    />
                    <Tags tags={['asd', 'qw', 'qwe']} name="tags" />
                    <Toggle name={'toggl'} onChange={() => {}} label={'qwe'} />
                    <br />
                    <Button variant={'text'}>Submit</Button>
                  </form>
                </div>
              ),
            },
          ]}
        />
      </FormProvider>
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap justify-between gap-y-[24px] mr-[36px] w-[50%]">
          <div className="w-[300px] border">1</div>
          <div className="w-[300px] border">2</div>
          <div className="w-[300px] border">3</div>
          <div className="w-[300px] border">4</div>
        </div>
        <div className="border grow">map</div>
      </div>
    </div>
  );
};

export default Form;
