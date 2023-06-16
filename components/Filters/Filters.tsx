'use client';
import cn from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import Select from '@/components/Forms/Select';
import Button from '@/components/Button';
import filtersIcon from './assets/filters.svg';

interface FiltersProps {
  containerClassName?: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export function Filters(props: FiltersProps) {
  const { containerClassName } = props;
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const inputClass = 'w-[240px] grow';
  return (
    <div className={'border px-[30px] py-[42px] mb-[20px]'}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-[16px] justify-between items-end"
        >
          <div className="flex gap-[16px] items-end grow">
            <Select
              className={inputClass}
              name="role"
              label="Location"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'user1', label: 'User1' },
                { value: 'user2', label: 'User2' },
              ]}
              multiple={true}
            />
            <Select
              className={inputClass}
              name="role"
              label="Property type"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
              ]}
              multiple={true}
            />
            <Select
              className={inputClass}
              name="role"
              label="Bedrooms"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
              ]}
              multiple={true}
            />
            <Select
              className={inputClass}
              name="role"
              label="Price"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
              ]}
              multiple={true}
            />
            <div>
              <Button iconLeft={filtersIcon} variant="transparent">
                Filters
              </Button>
            </div>
          </div>
          <div>
            <Button>Submit</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
