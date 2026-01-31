-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount_percent INTEGER,
  image_url VARCHAR(500) NOT NULL,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_new_arrival BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (for future auth integration)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_is_new_arrival ON products(is_new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_is_trending ON products(is_trending);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_id ON favorites(product_id);

-- Seed initial product data
INSERT INTO products (name, slug, price, original_price, discount_percent, image_url, rating, review_count, is_new_arrival, is_trending)
VALUES 
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-1', 160.00, NULL, NULL, '/products/shoe-1.png', 5, 88, true, false),
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-2', 160.00, NULL, NULL, '/products/shoe-2.png', 5, 88, true, false),
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-3', 160.00, NULL, NULL, '/products/shoe-3.png', 5, 88, true, false),
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-4', 960.00, 1160.00, 30, '/products/shoe-4.png', 4, 75, true, true),
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-5', 160.00, NULL, NULL, '/products/shoe-5.png', 5, 88, false, true),
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-6', 960.00, 1160.00, 35, '/products/shoe-6.png', 5, 75, false, true),
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-7', 160.00, NULL, NULL, '/products/shoe-7.png', 5, 88, false, true),
  ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad-8', 960.00, 1160.00, 35, '/products/shoe-8.png', 4, 75, false, true)
ON CONFLICT (slug) DO NOTHING;
