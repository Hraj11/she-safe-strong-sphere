import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function TestSupabase() {
  const [status, setStatus] = useState("Checking connection...");

  useEffect(() => {
    async function testConnection() {
      try {
        // Try a simple Supabase query
        const { data, error } = await supabase.from("text_table").select("*").limit(1);

        if (error) {
          console.error("Error connecting to Supabase:", error);
          setStatus("❌ Connection failed! Check console for details.");
        } else {
          console.log("✅ Connection successful. Data:", data);
          setStatus("✅ Connected to Supabase successfully!");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setStatus("⚠️ Unexpected error occurred.");
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
      <h2>Supabase Connection Test</h2>
      <p>{status}</p>
    </div>
  );
}
