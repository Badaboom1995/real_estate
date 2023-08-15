const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hwixlidrrahmkzbnhepa.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aXhsaWRycmFobWt6Ym5oZXBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTM3MzQzOSwiZXhwIjoyMDAwOTQ5NDM5fQ.1yz86K4qzZjdFx8qlUlUxeNT6RI7zlFzG_HgzDbfhZY';
const supabase = createClient(supabaseUrl, supabaseKey);

const selectBunch = async (offset: number) => {
  const { data: properties, error } = await supabase
    .from('NewProperties')
    .select('id, pictures')
    .range(offset, offset + 99);
  if (error) {
    return [];
  }
  return properties;
};
const fetchImage = async (url: string) => {
  try {
    const response = await fetch(url, {});
    const buffer = await response.arrayBuffer();
    return buffer;
  } catch (e: any) {
    return null;
  }
};
const runLoadToCDN = async () => {
  for (let i = 0; i < 21; i++) {
    const res = await selectBunch(i * 100);
    if (!res.length) continue;
    for (const item of res) {
      if (!item.pictures) continue;
      const pictures_new = [];
      const promises: Promise<any>[] = [];
      item.pictures.forEach((picture: any) => {
        promises.push(fetchImage(picture));
      });
      const buffers = await Promise.all(promises);
      const paths = buffers
        .filter((buff) => buff)
        .map((buffer, index) => ({
          url: `public/property${item.id}-${index}.jpg`,
          index,
        }));
      for (const path of paths) {
        try {
          await supabase.storage
            .from('properties_images')
            .upload(path.url, buffers[path.index], {
              cacheControl: '3600',
              upsert: false,
            });
          const { data: signedURL } = supabase.storage
            .from('properties_images')
            .getPublicUrl(path);
          pictures_new.push(signedURL.publicUrl);
          console.log(signedURL.publicUrl);
        } catch (e) {
          console.log(e);
        }
      }

      try {
        await supabase
          .from('NewProperties')
          .update({ pictures_new })
          .eq('id', item.id);

        console.log(pictures_new);
      } catch (e: any) {
        console.log(e);
      }
    }
  }
};

runLoadToCDN();
