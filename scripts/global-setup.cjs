import fs from 'fs'
import path from 'path'

const dbPath = path.join(__dirname, '../db/db.json')
const backupDbPath = path.join(__dirname, '../db/db-backup.json')
const testDbPath = path.join(__dirname, '../db/db-pristine.json')

export default async () => {
  // Backup the current db.json
  if (fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, backupDbPath)
  }

  // Replace db.json with the test database
  fs.copyFileSync(testDbPath, dbPath)
}
