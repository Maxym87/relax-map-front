# Relax Map Frontend

Frontend for **Relax Map**, a Next.js application for discovering, browsing, and sharing places to relax. The app includes public location pages, authentication flows, profile pages, feedback/reviews, and API proxy routes for communicating with the backend.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- TanStack Query
- Axios
- Formik + Yup
- CSS Modules
- React Hot Toast

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd relax-map-front
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

Open `https://why-not-front-two.vercel.app/`.

## Environment Variables

Create `.env.local` and define:



- `NEXT_PUBLIC_API_URL`: Base URL of the backend API used by client and server-side requests.
- `NEXT_PUBLIC_APP_URL`: Public URL of this frontend app, used for server-side requests to internal Next.js API routes.

## Scripts

- `npm run dev` - Start the local development server
- `npm run build` - Create a production build
- `npm run start` - Run the production server
- `npm run lint` - Run ESLint

## Deployment

This project is ready to deploy on Vercel.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project into Vercel.
3. Add the required environment variables in the Vercel project settings:
   `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL`
4. Deploy.

For production, set `NEXT_PUBLIC_APP_URL` to your deployed frontend domain, for example:


