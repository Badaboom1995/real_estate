'use client';
import { FormProvider, useForm } from 'react-hook-form';
import Toggle from '@/components/Forms/Toggle';
import Select from '@/components/Forms/Select';

interface PropertySortingProps {
  onToggleMap: () => void;
}

export function PropertySorting(props: PropertySortingProps) {
  const { onToggleMap } = props;
  const methods = useForm<FormData>();
  return (
    <FormProvider {...methods}>
      <div className="flex items-center gap-[8px]">
        <div className="flex items-center gap-[8px] mr-[24px]">
          <Toggle name="mapView" onChange={onToggleMap} initialValue={true} />
          <span>Show map</span>
        </div>
        <Select
          name="sort"
          options={[
            { label: 'ascending', value: 'ascending' },
            { label: 'discending', value: 'discending' },
          ]}
        />
      </div>
    </FormProvider>
  );
}
