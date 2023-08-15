'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Menu } from '@/components/Menu';
import Button from '@/components/Button';
import logo from '@/public/assets/logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import { ChooseGroup } from '@/components/Forms/ChooseGroup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { spaceUnitState } from '@/stores/recoil/atom';
import langIcon from '@/public/assets/lang.svg';
import { usePathname } from 'next/navigation';
import { RequestForm } from '@/components/RequestForm';
import { Modal } from '@/components/Modal';

export const Header = () => {
  const methods = useForm({
    defaultValues: {
      units: 'sqft',
    },
  });
  const setState = useSetRecoilState(spaceUnitState);
  const { watch } = methods;
  const pathname = usePathname();
  const [isModalOpen, setModalOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const units = watch('units');
  const unitsButton = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      unitsButton.current &&
      !unitsButton.current.contains(event.target as Node)
    ) {
      setModalOpen(false);
    }
  };
  useEffect(() => {
    // @ts-ignore
    setState(units);
  }, [units]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white">
      <div
        className={`min-w-[1200px] pl-[48px] m-auto flex items-center justify-between py-[20px] mb-[24px] ${
          pathname !== '/search' ? 'max-w-[1440px]' : ''
        }`}
      >
        <Modal
          isOpen={requestOpen}
          onClose={() => {
            setRequestOpen(false);
          }}
        >
          <RequestForm
            onClose={() => {
              setRequestOpen(false);
            }}
          />
        </Modal>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <Menu />
        <div className="flex items-center" ref={unitsButton}>
          <div className="relative">
            <button
              className="flex items-center text-white mr-[16px] w-[40px] h-[40px] rounded-full justify-center "
              onClick={() => setModalOpen(!isModalOpen)}
            >
              <Image src={langIcon} alt={'lang'} width={24} height={24} />
            </button>
            {isModalOpen && (
              <div className="absolute z-[99] border border-[#D9DBE9] bottom-0 right-[20px] translate-y-full bg-white rounded">
                <FormProvider {...methods}>
                  <form className="whitespace-nowrap px-4">
                    <ChooseGroup
                      type="radio"
                      name="units"
                      options={[
                        { value: 'sqft', label: 'SQ FT' },
                        { value: 'sqmt', label: 'SQ M' },
                      ]}
                    />
                  </form>
                </FormProvider>
              </div>
            )}
          </div>

          <Button
            className="mr-4
        "
            variant="transparent"
            onClick={() => {
              setRequestOpen(true);
            }}
          >
            Request a call
          </Button>
        </div>
      </div>
    </header>
  );
};
