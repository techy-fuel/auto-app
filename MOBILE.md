# 📱 AutoPilot CRM — Android App (Capacitor)

This project is wrapped with **Capacitor** so the same React app runs as a
native Android app and can be published to the Google Play Store.

The app loads its data live from **Supabase** + the **Vercel API**
(`https://auto-app-five.vercel.app`), so the phone needs an internet connection.

---

## 1. Aapko kya chahiye (Prerequisites)

Apne **computer** (Windows/Mac) par install karein:

1. **Node.js** (v18+) — https://nodejs.org
2. **Android Studio** — https://developer.android.com/studio
   - Pehli baar khulne par Android SDK install hone dein.
3. **Java JDK 17** — Android Studio ke saath aa jata hai (alag se zaroori nahi usually).

> ⚠️ Yeh remote/cloud environment APK build nahi kar sakta. Build apne PC par
> Android Studio se hogi. Saari files ready hain — sirf build karni hai.

---

## 2. Project setup (ek baar)

```bash
# repo clone karke uske andar:
npm install
```

---

## 3. App build & run (har baar code change ke baad)

```bash
# 1) web app build karo + native project me copy karo
npm run sync

# 2) Android Studio me kholo
npx cap open android
```

Android Studio khulne ke baad:
- Upar **device/emulator** choose karo (ya phone USB se connect karo + USB debugging on).
- Green **▶ Run** button dabao → app phone/emulator par chal jayegi.

> Shortcut: `npm run android` ek hi command me build + sync + Android Studio khol deta hai.

---

## 4. Play Store ke liye signed app banana (AAB)

Play Store ko **.aab** file chahiye (signed).

### a) Signing key banao (ek hi baar, isे sambhaal kar rakho!)
```bash
keytool -genkey -v -keystore autopilot.keystore -alias autopilot \
  -keyalg RSA -keysize 2048 -validity 10000
```
> Yeh `autopilot.keystore` file + password kabhi mat khona — future updates ke liye
> yahi key chahiye hogi.

### b) `android/key.properties` banao:
```
storePassword=YOUR_PASSWORD
keyPassword=YOUR_PASSWORD
keyAlias=autopilot
storeFile=../../autopilot.keystore
```
(Build signing wire karne ke steps: https://capacitorjs.com/docs/android/deploying-to-google-play)

### c) Release bundle banao:
```bash
npm run build
npx cap sync android
npm run android:bundle
```
AAB yahan milegi:
`android/app/build/outputs/bundle/release/app-release.aab`

---

## 5. Google Play Store par publish

1. **Play Console account** banao — ek baar ka **$25**: https://play.google.com/console
2. **Create app** → naam, language, type (App), free/paid.
3. **Production → Create release** → upar wali `.aab` upload karo.
4. **Store listing** bharo:
   - App icon (512×512) — `assets/icon-only.png` se bana sakte ho
   - Feature graphic (1024×500)
   - Kam se kam 2 phone **screenshots** (app chalakar le lo)
   - Short + full description
   - **Privacy Policy URL** (zaroori hai — ek simple page bana ke host karo)
5. **Content rating** questionnaire + **Data safety** form bharo.
6. Review submit karo → Google 1–3 din me approve karta hai.

---

## 6. Push Notifications (optional, baad me)

Code ready hai (`src/lib/push.js`) par actual notifications ke liye **Firebase** chahiye:

1. Firebase project banao → https://console.firebase.google.com
2. Android app add karo (package: `com.techyfuel.autopilotcrm`)
3. `google-services.json` download karke `android/app/` me daalo
4. FCM se notifications bhejo (device token console me log hota hai)

Iske bina app theek chalega — bas push notifications off rahenge.

---

## 7. App ko update kaise karein

Jab bhi website/CRM me koi change karo:
```bash
npm run build
npx cap sync android
# phir Android Studio se naya version build + Play Store par upload
```
> Note: `android/app/build.gradle` me har naye Play Store upload ke liye
> `versionCode` (number) badhao aur `versionName` update karo.

---

## App details
| | |
|---|---|
| App name | AutoPilot CRM |
| Package / appId | `com.techyfuel.autopilotcrm` |
| Web source | `dist/` (Vite build) |
| API/data | Supabase + `https://auto-app-five.vercel.app/api/*` |
