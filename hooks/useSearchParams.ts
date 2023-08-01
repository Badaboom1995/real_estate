'use client';
import { useSearchParams } from 'next/navigation';
import { normalizeSearchProps } from '@/components/Filters/utils/normalizeSearchProps';
import { paramsToObject } from '@/utils/searchParams';

export const useUrlParams = () => {
  const params = useSearchParams();
  const urlParams = normalizeSearchProps(paramsToObject(params?.entries()));
  return urlParams;
};
