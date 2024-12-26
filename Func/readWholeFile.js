import fs from 'fs/promises';

export async function readWholeFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null; // Or throw the error if you want to stop execution
  }
}