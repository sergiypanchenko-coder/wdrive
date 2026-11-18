/*
 * Wubber: connection settings.
 *
 * Project URL and the "anon public" key from Supabase (Project Settings → API Keys).
 * The anon key is meant to be public: the database's security rules decide what
 * each person can see. Never put the "service_role" or secret key here.
 */
window.WSR_CONFIG = {
  // true = mock app: bookings run a simulated driver and car on the phone (nothing is sent).
  // false = real pilot: bookings go to the database and the pilot team assigns a driver.
  demoRides: true,
  supabaseUrl: "https://qcrlmxrvmmvccwutztzn.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjcmxteHJ2bW12Y2N3dXR6dHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5ODIyODIsImV4cCI6MjEwNzU1ODI4Mn0.5PnkaHVWM_KsYsFc4dvkchfAvo4wwuX29tAy9QMMB2k"
};
