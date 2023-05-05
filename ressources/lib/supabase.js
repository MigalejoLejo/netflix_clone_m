import createClient from "@supabase/supabase-js"

const supabaseUrl = "https://wmieezilllpbbuphsrsd.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtaWVlemlsbGxwYmJ1cGhzcnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMTI1MjUsImV4cCI6MTk5ODU4ODUyNX0.N2XKFV8CqOrJP99VnL2JSWuBenVyGEXldobRfkT9pl0"

const supabase = createClient(supabaseUrl, supabaseKey)