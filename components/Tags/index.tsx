import React from 'react';
import Tag from '@/components/Tags/Tag';

type TagSelectionProps = {
  tags: string[];
  name: string;
};

const Tags = ({ tags, name }: TagSelectionProps) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <Tag
          key={tag}
          value={tag}
          checked={selectedTags.includes(tag)}
          onChange={handleTagChange}
          name={name}
        />
      ))}
    </div>
  );
};

export default Tags;
