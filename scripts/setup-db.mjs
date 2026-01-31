import { execSync } from "child_process";

console.log("Pushing Prisma schema to database...");
execSync("npx prisma db push --skip-generate", { stdio: "inherit" });

console.log("Generating Prisma client...");
execSync("npx prisma generate", { stdio: "inherit" });

console.log("Seeding database...");
execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });

console.log("Database setup complete!");
