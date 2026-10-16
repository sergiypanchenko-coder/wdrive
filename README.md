# WDrive: Torino pilot website

A real website for the WDrive pilot:

- Riders create an account, book a ride on a map of Torino (search down to the house number, drop a pin, or use the phone's GPS), get a 4-digit PIN, follow the ride live, share trip details, use an emergency button and leave feedback.
- Drivers apply in the app. Once the team has verified them, they see the rides assigned to them and start each trip with the passenger's PIN.
- The pilot team gets a dashboard: match each request to a driver, verify drivers, see emergency alerts and the pilot numbers (H3, H4, H6), and download everything as spreadsheet files.

It is plain HTML, CSS and JavaScript with no build step. Supabase stores the data and handles logins, and Vercel puts it online.

## What's in the folder

| File | What it is |
|---|---|
| `index.html`, `styles.css`, `app.js` | The website |
| `config.js` | **The only file you edit:** your Supabase address and public key |
| `supabase/setup.sql` | Creates the database tables and security rules |
| `data/torino-map.json` | Torino streets and ~118,000 house numbers from OpenStreetMap |
| `vendor/leaflet.js` | The map library (Leaflet 1.9.4) |
| `vercel.json`, `manifest.webmanifest`, `icon.svg` | Hosting settings and the home-screen icon |

## Setup (about one hour, once)

### 1. Create the database (Supabase)

1. Sign in at [supabase.com](https://supabase.com) and click **New project**. Name it `WDrive`, pick **Central EU (Frankfurt)** and save the database password somewhere safe.
2. When the project is ready, open **SQL Editor** → **New query**. Open `supabase/setup.sql`, copy everything, paste it in and click **Run**. You should see "Success. No rows returned".
3. For the pilot, go to **Authentication → Sign In / Providers → Email** and turn **off** "Confirm email". (Leave it on if you want people to confirm their email address first. Step 4 then matters more.)
4. Go to **Project Settings → API** (sometimes called **Data API**) and keep this page open. You need the **Project URL** and the **anon public** key (also called the publishable key).

### 2. Connect the website to the database

Open `config.js` in any text editor and replace the two placeholder values with your Project URL and anon public key. Keep the quotes. Do **not** use the `service_role` key.

### 3. Put the code on GitHub

1. Sign in at [github.com](https://github.com) and create a **New repository** named `wdrive` (Private is fine).
2. On the new repository's page, click **uploading an existing file**, drag in **everything inside** the `wdrive` folder (including the `data`, `supabase` and `vendor` folders), and click **Commit changes**.

### 4. Publish it (Vercel)

1. In [vercel.com](https://vercel.com), click **Add New → Project** and import the `wdrive` repository. (The first time, Vercel asks to connect to GitHub.)
2. Framework Preset: **Other**. Leave the build settings empty and click **Deploy**.
3. After about a minute you get a web address such as `wdrive.vercel.app`. That's your app.
4. Back in Supabase, go to **Authentication → URL Configuration** and set **Site URL** to that address. Password-reset and confirmation emails then link back to your site.

### 5. Make yourself the pilot team

1. Open your new website and create your own account.
2. In Supabase **SQL Editor**, run this with your email in place of the example:

   ```sql
   update public.profiles set role = 'team' where email = 'you@example.com';
   ```
3. Reload the website. **Pilot dashboard** now appears in your menu. Do the same for your teammates once they have accounts.

### 6. Try a full ride

Use two phones, or a phone and a laptop:

1. Account A applies on **Drive with us**. You verify her on the dashboard after checking her ID and NCC licence.
2. Account B books a ride.
3. On the dashboard, assign the ride to the driver with a price and pickup time.
4. The driver enters B's PIN to start the trip, then taps **Passenger dropped off**.
5. B answers the short feedback survey, and the numbers appear on the dashboard.

## Changing the site later

Edit the files on GitHub (or upload new versions). Vercel republishes automatically within a minute.

## Good to know

- **Install on Android:** open the site in Chrome, then menu ⋮ → **Add to Home screen**. It opens full-screen like an app.
- **Emergency button:** it shows 112 and alerts the team dashboard. It does **not** call anyone by itself, so keep the dashboard open on a team phone during every pilot ride.
- **Security:** each rider sees only her own rides; a driver sees only rides assigned to her; only the team sees everything. The ride PIN is checked by the database, so a driver can't read it from the app. Passwords are handled by Supabase and never stored by this code.
- **Personal data (GDPR):** you store names, phone numbers, emails and addresses. Before inviting real riders, write a short privacy notice (what you collect, why, how long you keep it, who to contact) and delete test data after the pilot (**Table Editor** in Supabase).
- **Phone-number logins** need a paid SMS provider (for example Twilio) connected in Supabase. Email and password works without one.
- **Map data** is © OpenStreetMap contributors (ODbL), downloaded in October 2026.
