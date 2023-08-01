'use client';
import { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Select from '@/components/Forms/Select';
import Button from '@/components/Button';
import filtersIcon from './assets/filters.svg';
import { TwoLevelSelect } from '@/components/Forms/TwoLevelSelect';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@/stores/StoreProvider';
import { useRouter } from 'next/navigation';
import { getCountryArray } from '@/utils/getCountriesArray';
import { PriceRange } from '@/components/Range/Range';
import { BedsAndBaths } from '@/components/BedsAndBaths';
import { objectToParams } from '@/utils/searchParams';
import SelectDumb from '@/components/SelectDumb';
import { propertyTypes } from '@/consts';
import { propertyService } from '@/services/propertyService';

interface FiltersProps {
  containerClassName?: string;
  defaultValues?: Record<string, string | string[]>;
}

interface FormData {
  name: string;
  city: string[];
  minPrice: string;
  maxPrice: string;
  bedrooms: string[];
  bathrooms: string[];
}

export const Filters = observer(({ defaultValues }: FiltersProps) => {
  const { SearchPageStore } = useContext(StoreContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<FormData>({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const propertyOptions = propertyTypes.map((type) => ({
    value: type,
    label: type,
  }));

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { count, data: properties } = await propertyService.getProperties(
      data,
    );
    const normalizedParams = objectToParams(data);
    setLoading(false);
    router.push(`/search?${normalizedParams}`);
    SearchPageStore.setProperties(properties);
    SearchPageStore.setCount(count);
  };

  const inputClass = 'w-[16.66%] max-w-[245px] grow';
  return (
    <div className="relative z-10 border px-[30px] py-[42px] mb-[20px] bg-white rounded">
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
              options={propertyOptions}
              multiple={true}
            />
            <SelectDumb
              label="Price"
              className={inputClass}
              Content={PriceRange}
              contentProps={{ rightBorder: 60000000, methods: methods }}
            />
            <SelectDumb
              label="Bedrooms & bathrooms"
              className={inputClass}
              Content={BedsAndBaths}
            />
            <div>
              <Button
                iconLeft={filtersIcon}
                variant="transparent"
                type="button"
              >
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
