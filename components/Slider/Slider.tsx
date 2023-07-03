'use client';
import React, { useState } from 'react';
import { SliderControls } from '@/components/SliderControls';
import { Typography } from '@/components/Typography';
import Button from '@/components/Button';

interface SliderProps {
  children: React.ReactNode[];
  className?: string;
  itemsPerSlide: number;
  title: string;
}

export const Slider: React.FC<SliderProps> = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { className, children, itemsPerSlide, title } = props;
  let startIndex = currentSlide * itemsPerSlide;
  let endIndex = startIndex + itemsPerSlide + 1;
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === children.length - 1 ? 0 : prevSlide + 1,
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? children.length - 1 : prevSlide - 1,
    );
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-[56px]">
        <Typography type="h1" className="mb-[24px]">
          {title}
        </Typography>
        <div className="flex items-center gap-[24px]">
          <SliderControls prev={goToPrevSlide} next={goToNextSlide} />
          <Button variant="transparent">Show all</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[24px]">
        {children.map((slide, index) => (
          <div
            key={index}
            className={`slide ${
              index > startIndex && index < endIndex ? 'active' : 'hidden'
            }`}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};
