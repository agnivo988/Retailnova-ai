import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_ENV = [
  'DATABASE_URL',
  'JWT_SECRET',
  'REDIS_URL',
  'AI_SERVICE_URL',
];

export const validateEnv = () => {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated');
};
