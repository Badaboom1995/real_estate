const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hwixlidrrahmkzbnhepa.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aXhsaWRycmFobWt6Ym5oZXBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTM3MzQzOSwiZXhwIjoyMDAwOTQ5NDM5fQ.1yz86K4qzZjdFx8qlUlUxeNT6RI7zlFzG_HgzDbfhZY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
