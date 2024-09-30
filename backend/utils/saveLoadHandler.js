import fs from 'fs';

export function savePublishersToFile(publishers) {
  try {
    fs.writeFileSync('./db.json', JSON.stringify(publishers, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing to db.json file:", error);
  }
}
