import fs from 'fs'
import path from 'path'

const dbPath = path.join(__dirname, '../db/db.json')
const backupDbPath = path.join(__dirname, '../db/db-backup.json')

export default async () => {
  // Restore the original db.json from backup
  if (fs.existsSync(backupDbPath)) {
    fs.copyFileSync(backupDbPath, dbPath)
    fs.unlinkSync(backupDbPath) // Remove the backup file after restoring
  }
}
