// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xjumesyrpzklymqzuubw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdW1lc3lycHprbHltcXp1dWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDQ5MjgsImV4cCI6MjA1Nzk4MDkyOH0.J-GWtHAKn75ev_Z4KCfzZPMMLkkxITR9MTe2Z5CWA6I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);