import cn from 'classnames';
import { ChooseGroup } from '@/components/Forms/ChooseGroup';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface BedsAndBathsProps {
  className?: string;
  setTitle: (title: string) => void;
}

export function BedsAndBaths(props: BedsAndBathsProps) {
  const { className, setTitle } = props;
  const containerClasses = cn(className);
  const { watch } = useFormContext();
  const beds = watch('bedrooms', []);
  const baths = watch('bathrooms', []);

  const showBathBedPlaceholder = (beds: string[], baths: string[]) => {
    let bathrooms = baths.length ? baths.join(',') + ' bd' : '';
    let bedrooms = beds.length ? beds.join(',') + ' ba' : '';
    if (!bathrooms && !bedrooms) return 'Any';
    if (!bathrooms) return bedrooms;
    if (!bedrooms) return bathrooms;
    return `${bedrooms} | ${bathrooms}`;
  };
  useEffect(() => {
    console.log('run', beds, baths);
    if (!beds.length && !baths.length) return;
    setTitle(showBathBedPlaceholder(beds, baths));
  }, [beds, baths]);

  return (
    <div className={containerClasses}>
      <ChooseGroup
        type="checkbox"
        name="bedrooms"
        label="Bedrooms"
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
        ]}
      />
      <ChooseGroup
        type="checkbox"
        name="bathrooms"
        label="Bathrooms"
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
        ]}
      />
    </div>
  );
}
