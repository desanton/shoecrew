import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Creating tables...');

  // Create products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      original_price DECIMAL(10, 2),
      image VARCHAR(500) NOT NULL,
      rating INTEGER DEFAULT 5,
      reviews INTEGER DEFAULT 0,
      discount INTEGER,
      is_new_arrival BOOLEAN DEFAULT false,
      is_trending BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create users table (for future auth)
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create favorites table
  await sql`
    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, product_id)
    )
  `;

  console.log('Tables created. Seeding products...');

  // Check if products already exist
  const existingProducts = await sql`SELECT COUNT(*) as count FROM products`;
  
  if (parseInt(existingProducts[0].count) === 0) {
    // Seed products
    await sql`
      INSERT INTO products (name, price, original_price, image, rating, reviews, discount, is_new_arrival, is_trending) VALUES
      ('HAVIT HV-G92 Gamepad', 160, NULL, '/products/shoe-1.png', 5, 88, NULL, true, false),
      ('HAVIT HV-G92 Gamepad', 160, NULL, '/products/shoe-2.png', 5, 88, NULL, true, false),
      ('HAVIT HV-G92 Gamepad', 160, NULL, '/products/shoe-3.png', 5, 88, NULL, true, false),
      ('HAVIT HV-G92 Gamepad', 960, 1160, '/products/shoe-4.png', 4, 75, 30, true, true),
      ('HAVIT HV-G92 Gamepad', 160, NULL, '/products/shoe-5.png', 5, 88, NULL, false, true),
      ('HAVIT HV-G92 Gamepad', 960, 1160, '/products/shoe-6.png', 5, 75, 35, false, true),
      ('HAVIT HV-G92 Gamepad', 160, NULL, '/products/shoe-7.png', 5, 88, NULL, false, true),
      ('HAVIT HV-G92 Gamepad', 960, 1160, '/products/shoe-8.png', 4, 75, 35, false, true)
    `;
    console.log('Products seeded successfully!');
  } else {
    console.log('Products already exist, skipping seed.');
  }

  console.log('Migration complete!');
}

migrate().catch(console.error);
