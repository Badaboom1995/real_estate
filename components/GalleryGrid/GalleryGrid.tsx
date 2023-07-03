import Button from '@/components/Button';
import Image from 'next/image';
import photo from '@/assets/photo.svg';

interface GalleryGridProps {
  className?: string;
  pictures: any;
}

export const GalleryGrid = (props: GalleryGridProps) => {
  const { className } = props;
  const pictures = props.pictures || [];
  return (
    <div
      className={`${className} grid grid-cols-2 gap-[2px] h-[500px] w-full rounded overflow-hidden`}
    >
      <div className="relative bg-gray-300">
        {pictures[0] && (
          <Image
            className={'w-full h-full object-cover'}
            src={pictures[0]}
            width={670}
            height={500}
            alt="hero-picture"
          />
        )}
        <Button
          iconLeft={photo}
          color="white"
          className="absolute bottom-[24px] left-[24px] gap-[12px]"
        >
          See all photos
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-[2px] gap-y-[1px]">
        <div className="h-[248px] bg-gray-300">
          <Image
            className={'w-full h-full object-cover'}
            src={pictures[1]}
            width={670}
            height={500}
            alt="hero-picture"
          />
        </div>
        <div className="h-[248px] bg-gray-300">
          <Image
            className={'w-full h-full object-cover'}
            src={pictures[2]}
            width={670}
            height={500}
            alt="hero-picture"
          />
        </div>
        <div className="h-[248px] bg-gray-300">
          <Image
            className={'w-full h-full object-cover'}
            src={pictures[3]}
            width={670}
            height={500}
            alt="hero-picture"
          />
        </div>
        <div className="h-[248px] bg-gray-300">
          <Image
            className={'w-full h-full object-cover'}
            src={pictures[4]}
            width={670}
            height={500}
            alt="hero-picture"
          />
        </div>
      </div>
    </div>
  );
};
