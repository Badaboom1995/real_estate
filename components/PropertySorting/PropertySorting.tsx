'use client';
import { FormProvider, useForm } from 'react-hook-form';
import SelectDumb from '@/components/SelectDumb';
import { RadioGroup } from '@/components/Forms/RadioGroup';
import { useContext, useEffect } from 'react';
import { SortEnum } from '@/types/SearchPropsTypes';
import { propertyService } from '@/services/propertyService';
import { useUrlParams } from '@/hooks/useSearchParams';
import { getUpdatedSearchState } from '@/utils/searchParams';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { propertiesAtom } from '@/stores/recoil/properties/propAtom';

interface PropertySortingProps {
  onChange?: (value: string) => void;
}
const sortOptions = [
  { name: 'Price (lowest first)', value: SortEnum.PRICE_ASC },
  { name: 'Price (highest first)', value: SortEnum.PRICE_DESC },
];

const SelectOptions = () => (
  <div className="p-[16px] whitespace-nowrap">
    <RadioGroup groupName="sort" direction="col" options={sortOptions} />
  </div>
);

export function PropertySorting(props: PropertySortingProps) {
  const { onChange } = props;
  const [propertiesState, setPropertiesState] = useRecoilState(propertiesAtom);
  const searchParams = useUrlParams();
  const methods = useForm({
    defaultValues: { sort: searchParams.sort || null },
  });
  const { watch } = methods;
  const sort = watch('sort');
  const router = useRouter();

  useEffect(() => {
    if (!sort) return;
    const subscription = watch(
      (value) => onChange && onChange(value.sort || SortEnum.PRICE_ASC),
    );

    propertyService.getProperties({ ...searchParams, sort }).then((res) => {
      setPropertiesState({ ...propertiesState, entities: res.data });
    });

    getUpdatedSearchState(searchParams, { sort }, router);
    return () => subscription.unsubscribe();
  }, [sort]);

  return (
    <FormProvider {...methods}>
      <form action="">
        <SelectDumb
          size="md"
          placeholder={
            sortOptions.find((option) => option.value === sort)?.name || 'Sort'
          }
          Content={SelectOptions}
        />
      </form>
    </FormProvider>
  );
}
