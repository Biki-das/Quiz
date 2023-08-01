import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qfqlzpdamthzagtvblpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcWx6cGRhbXRoemFndHZibHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3Mjk4MTcsImV4cCI6MjAwNjMwNTgxN30.9TVgB8_tc8TsqDNGkd0c-lYE5YPxsC0TauWqqN0EDUA",
);
