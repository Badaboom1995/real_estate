import cn from 'classnames';
import { ChooseGroup } from '@/components/Forms/ChooseGroup';

interface BedsAndBathsProps {
  className?: string;
}

export function BedsAndBaths(props: BedsAndBathsProps) {
  const { className } = props;
  const containerClasses = cn(className);

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
