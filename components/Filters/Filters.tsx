'use client';
import { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Select from '@/components/Forms/Select';
import Button from '@/components/Button';
import filtersIcon from './assets/filters.svg';
import { TwoLevelSelect } from '@/components/Forms/TwoLevelSelect';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@/stores/StoreProvider';
import { database } from '@/utils/database';
import { useRouter, usePathname } from 'next/navigation';
import { getCountryArray } from '@/utils/getCountriesArray';

interface FiltersProps {
  containerClassName?: string;
  //todo any
}

interface FormData {
  name: string;
  city: string[];
  email: string;
  password: string;
  role: string;
}

export const Filters = observer((props: FiltersProps) => {
  const { SearchPageStore } = useContext(StoreContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const methods = useForm<FormData>({
    defaultValues: {
      city: [],
    },
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    getCountryArray().then((res) => {
      const locations = res.data?.map((entity) => {
        return {
          parent: entity.country,
          children: entity.cities,
        };
      });
      SearchPageStore.setDict('locations', locations);
    });
  }, []);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    SearchPageStore.setFilters(data);
    const filter: any = data;
    database.fetchEntities(filter, false, 10).then((res) => {
      SearchPageStore.setProperties(res?.data);
      SearchPageStore.setCount(res?.count);
      if (pathname !== '/search') {
        router.push('/search');
      }
      setLoading(false);
    });
  };

  const inputClass = 'w-[16.66%] max-w-[245px] grow';
  return (
    <div className={'border px-[30px] py-[42px] mb-[20px] bg-white rounded'}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-[16px] justify-between items-end"
        >
          <div className="flex gap-[16px] items-end grow">
            <TwoLevelSelect
              className={inputClass}
              name="city"
              label="Location"
              placeholder="All"
              methods={methods}
              data={SearchPageStore.dicts.locations}
            />
            <Select
              className={inputClass}
              name="type"
              label="Property type"
              placeholder="Any"
              options={[
                { value: 'Villa', label: 'Villa' },
                { value: 'Land', label: 'Land' },
                { value: 'House', label: 'House' },
                { value: 'Aparts', label: 'Aparts' },
                { value: 'Condo', label: 'Condo' },
              ]}
              multiple={true}
            />
            <Select
              className={inputClass}
              name="bedrooms"
              label="Bedrooms"
              placeholder="Any"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
              ]}
              multiple={true}
            />
            <Select
              className={inputClass}
              name="price"
              label="Price"
              placeholder="Any"
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
            <Button loading={isLoading}>Submit</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
