# SpamSenseGPT

SpamSenseGPT is an experimental spam‑message detection web app built during an internship, where the team explored how to use large language models (LLMs) to detect and explain spam, scam, and phishing‑like messages. The app integrates with an OpenAI‑compatible API to classify user‑submitted messages and return a human‑readable explanation that helps users understand why something looks suspicious.

## Internship project context

- Developed as part of an internship research project on applying AI to messaging security and abuse detection.  
- Team goal: validate whether LLMs can improve detection of suspicious messages compared to basic rule‑based filters.  
- The prototype focuses on fast iteration: models, providers, thresholds, and rate‑limiting behaviour are controlled by configuration instead of code changes.

## What the prototype does

1. The user pastes or types a message into the web interface.  
2. The app sends the text to an AI model via an OpenAI‑compatible API.  
3. The model returns a structured response with:  
   - A spam / not‑spam style classification or risk indication  
   - A short explanation of why the message is suspicious or safe  
4. The UI visualises the result using progress indicators and helpful messaging, so the output is understandable even for non‑technical users.


## Tech stack

- **Framework**: Next.js (TypeScript, App Router) for both frontend and API routes.  
- **Language**: TypeScript for type‑safe React components and backend logic.  
- **Styling**: Tailwind CSS utility classes for fast UI iteration.  
- **AI integration**: `openai` SDK targeting OpenAI‑compatible APIs for LLM calls.  
- **UI components**: `react-circular-progressbar` for risk scores and `react-spinners` for loading indicators.  
- **PWA**: `next-pwa` to enable progressive web app capabilities (installable, offline‑friendly behaviour).  
- **Database**: PostgreSQL via the `pg` driver, used to store rate‑limiting data and fingerprint metadata.  
- **Analytics & fingerprinting**: `@vercel/analytics` and `@thumbmarkjs/thumbmarkjs` for usage analytics and device fingerprinting used in abuse‑prevention logic.

## Getting started

### Prerequisites

- Node.js and **pnpm** installed  
- Access to an OpenAI‑compatible LLM API (OpenAI, or another provider that supports the same API shape)  
- A running PostgreSQL instance for storing rate‑limit and fingerprint data
- Optionally API key for [Thumbmarkjs](https://www.thumbmarkjs.com/)


### Database Setup

#### Option 1: Using psql (Command Line)
```bash
psql -U your_username -d your_database -f DATABASE_SCHEMA.sql
```

#### Option 2: Using PostgreSQL GUI (pgAdmin, DBeaver, etc.)
1. Connect to your PostgreSQL database
2. Open the `DATABASE_SCHEMA.sql` file
3. Execute the SQL commands

#### Option 3: Manual SQL
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


### Installation

```bash
# clone the repository
git clone https://github.com/AdMFirst/SpamSenseGPT.git
cd SpamSenseGPT

# install dependencies
pnpm install

# start the dev server
pnpm dev

# open in browser
# http://localhost:3000
```

> This project uses `pnpm` as the primary package manager (see `pnpm-lock.yaml`). Using pnpm is recommended for consistent installs. [dev](https://dev.to/drarig29/pnpm-and-package-lock-json-2d05)

## Environment configuration

This project uses environment variables to configure the LLM provider, model, database connection, and optional fingerprinting. Copy `.env.sample` to `.env.local` or create a `.env.local` file in the project root with the following variables:

### Core AI settings

- `OPENAI_API_KEY` – API key for your OpenAI or OpenAI‑compatible provider.  
- `OPENAI_API_BASE` – Base URL for the API (use this to point to compatible providers or self‑hosted gateways).  
- `LLM_MODEL_USED` – Model name to use (for example, `gpt-4.1-mini`, `gpt-4o`, or any other supported model string).

These variables let you switch providers and models without changing the code.

### Database settings (PostgreSQL, required)

PostgreSQL is required for this project, since it stores rate‑limiting and fingerprint information.

- `DATABASE_URL` – Full PostgreSQL connection string, e.g. `postgres://user:password@host:5432/dbname`.  

If `DATABASE_URL` is not set, the app falls back to individual parameters:

- `DB_HOST` – Database host (default: `localhost`).  
- `DB_PORT` – Database port (default: `5432`).  
- `DB_NAME` – Database name.  
- `DB_USER` – Database user.  
- `DB_PASSWORD` – Database password.

### Rate-limit / fingerprinting

- `NEXT_PUBLIC_THUMBMARK_API_KEY` – API key for Thumbmark.js, used for device fingerprinting in the browser.

The backend combines fingerprint information with PostgreSQL‑stored usage data to implement rate limiting and mitigate abusive usage patterns (for example, repeated spam checks from the same client). If this key is not set, the app still runs, but without cloud fingerprint‑based identification.


## Limitations and future ideas

This is a research prototype, not a production spam filter. Some possible next steps:

- Benchmarking different models and providers on standard spam datasets.  
- Combining LLM‑based classification with traditional heuristics / blacklists.  
- Improving explanations so they are even more actionable for end‑users.  
- Refining fingerprinting and rate‑limiting strategies and making abuse‑prevention rules configurable per deployment.

## License
This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

