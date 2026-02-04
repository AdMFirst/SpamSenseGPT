# SpamSenseGPT Setup Guide

## Prerequisites

- Node.js 18+ and pnpm installed
- PostgreSQL database (local or remote)
- OpenAI API key or compatible service (Groq, Together, etc.)

## Environment Setup

1. Copy `.env.sample` to `.env.local`:
   ```bash
   cp .env.sample .env.local
   ```

2. Configure the following environment variables in `.env.local`:

   ### Required:
   - `DATABASE_URL`: PostgreSQL connection string
     - Example: `postgresql://username:password@localhost:5432/spam_sense_gpt`
   
   - `OPENAI_API_KEY`: Your API key for OpenAI or compatible service
   
   ### Optional:
   - `OPENAI_API_BASE`: Custom API endpoint (default: `https://api.openai.com/v1`)
   - `LLM_MODEL_USED`: Model to use (default: `meta-llama/llama-3.2-3b-instruct:free`)
   - `NEXT_PUBLIC_APP_URL`: Your app's public URL

## Database Setup

### Option 1: Using psql (Command Line)
```bash
psql -U your_username -d your_database -f DATABASE_SCHEMA.sql
```

### Option 2: Using PostgreSQL GUI (pgAdmin, DBeaver, etc.)
1. Connect to your PostgreSQL database
2. Open the `DATABASE_SCHEMA.sql` file
3. Execute the SQL commands

### Option 3: Manual SQL
Run these commands in your PostgreSQL client:

```sql
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    token INTEGER NOT NULL DEFAULT 5,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_uuid ON "user" (uuid);
```

## Installation & Running

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

- `app/` - Next.js 15 app directory with pages and API routes
- `lib/` - Library code (components, data access, utilities)
- `public/` - Static assets
- `app/api/` - API routes
  - `app/api/daftar/route.ts` - User registration
  - `app/api/cekpesan/route.ts` - Spam detection

## Key Features

- **Spam Detection**: Uses AI to analyze messages and rate them 0-100 for spam probability
- **Token System**: Users start with 5 tokens, each analysis costs 1 token
- **Fingerprinting**: Uses FingerprintJS to identify users
- **PWA**: Progressive Web App with offline capabilities

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check firewall/network settings for remote databases

### API Errors
- Verify `OPENAI_API_KEY` is set and valid
- Check `OPENAI_API_BASE` if using a custom endpoint
- Ensure the model specified in `LLM_MODEL_USED` exists on your provider

### Build Errors
- Clear `.next` directory and rebuild
- Ensure Node.js version is 18 or higher
- Run `pnpm install` to ensure all dependencies are installed

## Notes

- The app uses Next.js 16 with Turbopack
- Tailwind CSS v4 with `@tailwindcss/postcss`
- TypeScript for type safety
- PostgreSQL for data persistence
