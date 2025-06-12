-- Enable row level security for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Service role can manage all users" ON users;

-- Create policies for users table
CREATE POLICY "Users can view their own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data" 
  ON users FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage all users" 
  ON users 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow public access for signup process
CREATE POLICY "Allow public insert during signup" 
  ON users FOR INSERT 
  WITH CHECK (true);
