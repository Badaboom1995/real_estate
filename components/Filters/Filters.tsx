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
import { PriceRange } from '@/components/Range/Range';
import { BedsAndBaths } from '@/components/BedsAndBaths';
import { strings } from '@/utils/strings';

interface FiltersProps {
  containerClassName?: string;
}

interface FormData {
  name: string;
  city: string[];
  minPrice: string;
  maxPrice: string;
  bedrooms: string[];
  bathrooms: string[];
}

export const Filters = observer((props: FiltersProps) => {
  const { SearchPageStore } = useContext(StoreContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const methods = useForm<FormData>({
    defaultValues: SearchPageStore.filters,
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(SearchPageStore.filters)));
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
    const filter: any = { ...data };
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
        if (pathname !== '/search') {
          router.push('/search');
        }
        setLoading(false);
      });
  };

  const showBathBedPlaceholder = () => {
    let bathrooms = '';
    let bedrooms = '';
    if (SearchPageStore.filters.bedrooms.length !== 0) {
      bedrooms = `${SearchPageStore.filters.bedrooms.join(',')} bd`;
    }
    if (SearchPageStore.filters.bathrooms.length !== 0) {
      bathrooms = `${SearchPageStore.filters.bathrooms.join(',')} ba`;
    }
    return !bathrooms && !bedrooms ? '' : `${bedrooms} | ${bathrooms}`;
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
              label="Price"
              name="priceRange"
              placeholder={`${
                SearchPageStore.filters.minPrice
              } - ${strings.addCommas(SearchPageStore.filters.maxPrice)} USD`}
              content={<PriceRange rightBorder={12200} methods={methods} />}
            />
            <Select
              className={inputClass}
              label="Bedrooms & bathrooms"
              name="bedsAndBaths"
              placeholder={showBathBedPlaceholder()}
              content={<BedsAndBaths />}
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
