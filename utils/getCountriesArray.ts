import supabase from '@/database/supabase';

type InputData = {
  city: string;
  country: string;
}[];

type OutputData = {
  country: string;
  cities: string[];
}[];

export async function getCountryArray() {
  const output: OutputData = [];
  const { data: input, error } = await supabase
    .from('unique_city_country')
    .select('*');
  // Group cities by country
  input.forEach((data: any) => {
    // Find the country in the output array
    const countryInOutput = output.find(
      (item) => item.country === data.country,
    );

    // If the country was not found, create a new entry in the output array
    if (!countryInOutput) {
      output.push({
        country: data.country,
        cities: data.city ? [data.city] : [],
      });
    } else {
      // If the country was found, just append the city to the list of cities of that country
      countryInOutput.cities.push(data.city);
    }
  });

  return { data: output, error };
}
