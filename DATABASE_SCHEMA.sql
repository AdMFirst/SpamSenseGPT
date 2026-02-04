-- SpamSenseGPT Database Schema
-- This schema is required for the application to work

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    token INTEGER NOT NULL DEFAULT 5,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster uuid lookups
CREATE INDEX IF NOT EXISTS idx_user_uuid ON "user" (uuid);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_user_updated_at 
    BEFORE UPDATE ON "user" 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: View for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    COUNT(*) as total_users,
    SUM(token) as total_tokens,
    AVG(token) as avg_tokens,
    MIN(created_at) as earliest_registration,
    MAX(created_at) as latest_registration
FROM "user";
