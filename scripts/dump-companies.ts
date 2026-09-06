// Prints every registered company as JSON, for scripts/verify_companies.py to
// check against reference/finance record.xlsx.
//   npx tsx scripts/dump-companies.ts > /tmp/companies.json
import { COMPANIES } from "@/data";

process.stdout.write(JSON.stringify(COMPANIES, null, 1));
