# Gym log — setup (about 10 minutes)

## 1. Supabase (database)

1. Open the Supabase project you're reusing (tables are named `gym_…` so they sit alongside the other app's tables).
2. Left menu → **SQL Editor** → New query → paste the whole of `supabase.sql` → **Run**. You should see "Success. No rows returned".
3. Authentication is shared with the other app in that project. If you already have a login there, just **Sign in** with it in the gym app — no need to create a new account.
4. Left menu → **Project Settings** → **API**. Copy the **Project URL** and the **anon public** key.

## 2. Put the URL and key in the app

Open `index.html`, near the top of the `<script>` block:

```
const SUPABASE_URL = "https://xxxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJ...";
```

(If you leave them blank, the app asks for them on first open and remembers them on that phone instead.)

The anon key is safe to have in a public page: the SQL above locks every row to the signed-in user, so the key alone gets nobody anything.

## 3. Host it (GitHub Pages)

1. GitHub → New repository (e.g. `gym`), public or private both work for Pages on a free account only if public — make it **public** (there is nothing private in these files once step 1 is done).
2. Upload all of these files: `index.html`, `seed.js`, `manifest.webmanifest`, `icon-180.png`, `icon-512.png`. (`supabase.sql` and this README can go in too, harmless.)
3. Repo → **Settings** → **Pages** → Source: "Deploy from a branch", Branch: `main`, folder `/ (root)` → Save.
4. After a minute the page is live at `https://<your-username>.github.io/gym/`.

Vercel works the same way (import the repo, no build step) if you prefer.

## 4. On the iPhone

1. Open the URL in Safari. Tap **Create account**, enter an email + password, (confirm the email if you left that on), then **Sign in**.
2. Settings tab → **Import** — loads the May–Oct history and the exercise list. Do this once.
3. Share button → **Add to Home Screen**. It then opens full-screen like an app and stays signed in.

## How it works

- **Today**: suggests the day (push / legs / pull) that's been longest since trained; tap another to override. Each exercise shows last session, a warm-up, today's target, and steppers to log sets. "Add another exercise" pulls in anything from other days (equipment busy, etc.).
- **Rule**: 3×5 at the working weight. 5/5/5 two sessions running → +5 kg next time (+2.5 kg on pull-ups and rows, +2 kg on swings when every set hits target+5). A set of 3 or fewer at the working weight → −5 kg next time. Tick **max attempt** for a heavy single — it's logged and charted (dashed diamond) but never counts toward the rule. A max test is suggested every 8 weeks on bench / press / squat.
- **Pull-ups**: weight is *added* kg (0 = bodyweight).
- **Progress**: top working weight per session, max attempts, bodyweight vs the 70 kg line, cardio.
- **Settings**: edit any exercise (working weight, increment, target, day, archive), add new ones, export CSV.

## If it ever says "Can't reach the database"

Free Supabase projects pause after ~7 days with no traffic. Open the Supabase dashboard, press **Restore**, wait a minute, reload the app. Nothing is lost.
