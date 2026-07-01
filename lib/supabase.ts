import "server-only";
import { createClient } from "@supabase/supabase-js";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
