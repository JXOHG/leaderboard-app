import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { csvData } = req.body
      const filePath = path.join(process.cwd(), 'public', 'test_csv.csv')

      // Append the new data to the existing file
      fs.appendFileSync(filePath, csvData + '\n')

      res.status(200).json({ message: 'CSV data appended successfully' })
    } catch (error) {
      console.error('Error saving CSV:', error)
      res.status(500).json({ error: 'Failed to save CSV data' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}