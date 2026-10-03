This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Portfolio admin and API

Add these values to `.env.local` (or your existing `.env`) in the project root:

```dotenv
mongo_uri=mongodb+srv://<user>:<password>@<cluster>/<database>
MONGODB_DB=portfolio
ADMIN_SESSION_SECRET=replace-with-at-least-32-random-bytes
```

The API reads the MongoDB connection string from `MONGO_URI` (or `mongo_uri`).
It uses the database in the connection string unless `MONGODB_DB` overrides it.
Keep these values private and configure the same environment variables in your deployment.
`ADMIN_SESSION_SECRET` must be at least 32 bytes. The admin session is signed,
HTTP-only, expires after eight hours, and uses secure cookies in production.
Admin usernames and salted `scrypt` password hashes are stored in MongoDB's
`adminUsers` collection; login does not read admin credentials from environment
variables. Database access uses Mongoose. To create or change the admin login, pipe credentials to the setup
command (the input is not printed):

```powershell
'{"username":"your-admin-username","password":"your-admin-password"}' | npm run admin:set-password
```

Open `/admin` to sign in and add, edit, or delete projects and skill groups, and
to manage the resume URL and current location. Public read endpoints do not
require authentication; all write endpoints require the admin session. For
direct API use, `ADMIN_API_TOKEN` may optionally be configured as an alternative
write credential using `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET`, `POST` | `/api/projects` | List or add projects |
| `GET`, `PATCH`, `PUT`, `DELETE` | `/api/projects/:id` | Read, partially/full update, or delete a project |
| `GET`, `POST` | `/api/skills` | List or add skill groups |
| `GET`, `PATCH`, `PUT`, `DELETE` | `/api/skills/:id` | Read, partially/full update, or delete a skill group |
| `GET`, `PUT`, `DELETE` | `/api/resume` | Read, add/update, or delete the resume URL |
| `GET`, `PUT`, `DELETE` | `/api/location` | Read, add/update, or delete the current location |
| `POST` | `/api/admin/login` | Sign in with the configured admin username and password |
| `POST` | `/api/admin/logout` | Clear the admin session |

Project bodies require `title`, `description`, and `tech` (an array of strings);
`github`, `live`, and `image` are optional. Skill group bodies require `name`
and `tags` (an array of strings); `icon` is optional. Resume updates accept
`{ "url": "https://..." }`; location updates accept
`{ "location": "City, Country" }`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
