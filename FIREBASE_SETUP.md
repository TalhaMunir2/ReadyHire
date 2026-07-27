# Firebase setup for ReadyHire

## 1. Create the Firebase project

1. Open https://console.firebase.google.com and choose **Add project**.
2. Name it `ReadyHire` and finish the project wizard.
3. Open **Project settings → General → Your apps**.
4. Select the Web icon (`</>`) and register an app named `ReadyHire Web`.
5. Do not enable Firebase Hosting unless you plan to deploy there.

## 2. Add the web configuration

1. In `D:\ReadyHire`, copy `.env.example` to `.env`.
2. Copy values from the Firebase web configuration into `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

3. Restart `npm run dev` after changing `.env`.
4. Never commit `.env` to Git. Firebase web API keys are client identifiers, but Firestore rules must still protect data.

## 3. Enable Email/Password authentication

1. Open **Build → Authentication → Get started**.
2. Select **Sign-in method**.
3. Open **Email/Password**, enable the first Email/Password toggle, and save.
4. Leave Email link/passwordless disabled unless you need it.

## 4. Enable Google Sign-In

1. In **Authentication → Sign-in method**, open **Google**.
2. Enable it.
3. Select a project support email and save.
4. In **Authentication → Settings → Authorized domains**, ensure `localhost` is present.
5. Add your deployed domain later, for example `readyhire.web.app`.

## 5. Create Firestore

1. Open **Build → Firestore Database → Create database**.
2. Choose the region closest to your users. The region cannot be changed later.
3. Start in Production mode.
4. Open the **Rules** tab.
5. Paste the contents of `firestore.rules` and click **Publish**.

Registration writes this document automatically:

```text
users/{firebaseUid}
  uid
  email
  displayName
  photoURL
  role: candidate | recruiter | admin
  createdAt / updatedAt
```

## 6. Create the first admin

1. Register normally through ReadyHire.
2. In Firestore, open `users/{your uid}`.
3. Change `role` to `admin` manually.
4. Do not let users choose the admin role from the registration UI.

## 7. Test locally

```powershell
cd D:\ReadyHire
npm install
npm run dev
```

Test all of these:

- Candidate email/password registration
- Recruiter email/password registration
- Google Sign-In
- Forgot-password email
- A user document appearing in Firestore
- Sign-in with an incorrect password showing a Firebase error

## 8. Password reset configuration

1. Open **Authentication → Templates → Password reset**.
2. Customize the sender name, subject, and message.
3. Update the action URL/domain when the production site is deployed.

## 9. Production checklist

- Add the production site to Authorized domains.
- Publish strict Firestore rules; never use `allow read, write: if true`.
- Create separate Firebase projects for development and production.
- Enable Firebase App Check before public launch.
- Add Firestore indexes only when the Firebase console reports a required query index.
- Keep backend-only secrets in FastAPI environment variables, never in Vite variables.
