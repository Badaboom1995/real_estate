import React from 'react';
import { Typography } from '@/components/Typography';
import Toggle from '@/components/Forms/Toggle';
import CheckboxGroup from '@/components/Forms/CheckboxGroup';
import { featuresDict } from '@/consts';
import Button from '@/components/Button';
import reverse from '@/public/assets/reverse.svg';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactElement;
}) => {
  return (
    <div className="flex items-center justify-between">
      <Typography type="text">{label}</Typography>
      {children}
    </div>
  );
};
const AdditionalFilters = (props: { onClose: () => void }) => {
  const { onClose } = props;
  const { reset } = useFormContext();
  const router = useRouter();
  return (
    <div className="w-[456px] p-[32px]">
      <div className="mb-[32px]">
        <div className="pb-[32px] mb-[32px] border-b">
          <Typography type="h2" className="mb-[32px]">
            Filters
          </Typography>
          <Row label="Under construction">
            <Toggle name="is_construction" />
          </Row>
        </div>
        <CheckboxGroup name="features" reversed options={featuresDict} />
      </div>
      <div className="grid grid-cols-2 gap-[5px]">
        <Button
          type="button"
          variant="transparent"
          className="justify-center"
          iconLeft={reverse}
          onClick={() => {
            reset({});
            onClose();
            router.replace('/search');
          }}
        >
          Clean all
        </Button>
        <Button type="button" onClick={onClose} className="justify-center">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AdditionalFilters;
