'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Select from '@/components/Forms/Select';
import Button from '@/components/Button';
import filtersIcon from './assets/filters.svg';
import { TwoLevelSelect } from '@/components/Forms/TwoLevelSelect';
import { useRouter } from 'next/navigation';
import { getCountryArray } from '@/utils/getCountriesArray';
import { PriceRange } from '@/components/Range/Range';
import { BedsAndBaths } from '@/components/BedsAndBaths';
import { objectToParams } from '@/utils/searchParams';
import SelectDumb from '@/components/SelectDumb';
import { propertyTypes } from '@/consts';
import { propertyService } from '@/services/propertyService';
import { Modal } from '@/components/Modal';
import AdditionalFilters from '@/components/Filters/AdditionalFilters';
import reverse from '@/public/assets/reverse.svg';
import { useRecoilState } from 'recoil';
import { dictsAtom } from '@/stores/recoil/dicts/dictsAtom';
import { propertiesAtom } from '@/stores/recoil/properties/propAtom';

interface FiltersProps {
  containerClassName?: string;
  defaultValues?: Record<string, string | string[]>;
  panelView?: boolean;
}

interface FormData {
  name: string;
  city: string[];
  minPrice: string;
  maxPrice: string;
  bedrooms: string[];
  bathrooms: string[];
  underConstruction: boolean;
  features: string[];
}

export const Filters = ({ defaultValues, panelView }: FiltersProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setOpen] = useState<boolean>(false);
  const [dicts, setDicts] = useRecoilState(dictsAtom);
  const [properties, setProperties] = useRecoilState(propertiesAtom);

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
      setDicts({ ...dicts, locations });
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { count, data: properties } = await propertyService.getProperties(
      data,
    );
    const { data: points } = await propertyService.getPoints(data);
    const normalizedParams = objectToParams(data);
    setLoading(false);
    router.push(`/search?${normalizedParams}`);
    setProperties({ count, entities: properties, points });
  };

  const inputClass = 'w-[16.66%] max-w-[245px] grow';
  return (
    <div
      className={`relative z-10 pb-[16px] pr-[24px] mb-[20px] bg-white  ${
        panelView && 'p-[32px] rounded border'
      }`}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-[16px] justify-between items-end"
        >
          <Modal isOpen={isModalOpen} onClose={() => setOpen(false)}>
            <AdditionalFilters onClose={() => setOpen(false)} />
          </Modal>
          <div className="flex gap-[16px] items-end grow">
            <TwoLevelSelect
              className={inputClass}
              name="city"
              label={panelView ? 'Location' : ''}
              placeholder={panelView ? 'All' : 'Location'}
              methods={methods}
              data={dicts.locations}
            />

            <Select
              className={inputClass}
              name="type"
              label={panelView ? 'Property type' : ''}
              placeholder={panelView ? 'Any' : 'Property type'}
              options={propertyOptions}
              multiple={true}
            />
            <SelectDumb
              label={panelView ? 'Price' : ''}
              className={inputClass}
              Content={PriceRange}
              contentProps={{ rightBorder: 60000000, methods: methods }}
            />
            <SelectDumb
              label={panelView ? 'Bedrooms & bathrooms' : ''}
              placeholder={!panelView ? 'Bedrooms & bathrooms' : 'Any'}
              className={inputClass}
              Content={BedsAndBaths}
            />
            <div>
              <Button
                iconLeft={filtersIcon}
                variant="transparent"
                type="button"
                onClick={() => setOpen(true)}
              >
                Filters
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            {!panelView && (
              <Button
                type="button"
                variant="transparent"
                className="justify-center"
                iconLeft={reverse}
                onClick={() => {
                  methods.reset({});
                  router.replace('/search');
                }}
              >
                Clean all
              </Button>
            )}

            <Button loading={isLoading}>Submit</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
