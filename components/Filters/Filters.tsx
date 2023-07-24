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
import { strings } from '@/utils/strings';
import { objectToParams, paramsToObject } from '@/utils/objectToParams';
import SelectDumb from '@/components/SelectDumb';
import { database } from '@/utils/database';

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
  const checkFilters = () => {
    console.log('before', JSON.parse(JSON.stringify(SearchPageStore.filters)));
  };
  const onSubmit = (data: FormData) => {
    setLoading(true);
    console.log('data', data);
    SearchPageStore.setFilters(data);
    const normalizedParams = objectToParams(data);
    const paramsString = new URLSearchParams(normalizedParams).toString();
    const filter: any = { ...data };
    // console.log('filter', data);
    const { minPrice, maxPrice } = data;
    delete filter.minPrice;
    delete filter.maxPrice;
    database
      .fetchEntities({
        filter,
        sort: false,
        range: [{ name: 'price_dollar', min: minPrice, max: maxPrice }],
      })
      .then((res) => {
        SearchPageStore.setProperties(res?.data);
        SearchPageStore.setCount(res?.count);
        setLoading(false);
        router.push(`/search?${paramsString}`);
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
                { value: 'Apartments', label: 'Apartments' },
                { value: 'Condo', label: 'Condo' },
              ]}
              multiple={true}
            />
            {/*<Select*/}
            {/*  className={inputClass}*/}
            {/*  label="Price"*/}
            {/*  name="priceRange"*/}
            {/*  placeholder={showPricePlaceholder()}*/}
            {/*  content={<PriceRange rightBorder={99999999} methods={methods} />}*/}
            {/*/>*/}
            {/*<Select*/}
            {/*  className={inputClass}*/}
            {/*  label="Bedrooms & bathrooms"*/}
            {/*  name="bedsAndBaths"*/}
            {/*  placeholder={showBathBedPlaceholder()}*/}
            {/*  content={<BedsAndBaths />}*/}
            {/*/>*/}
            <SelectDumb
              label="Price"
              className={inputClass}
              Content={PriceRange}
              contentProps={{ rightBorder: 99999999, methods: methods }}
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
                onClick={checkFilters}
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
