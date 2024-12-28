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

export async function writeWholeFile(filePath, content) {
  try {
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`File ${filePath} written successfully.`);
  } catch (error) {
      console.error(`Error writing to file ${filePath}:`, error);
      // Handle the error as needed (e.g., throw it, return a specific value, etc.)
  }
}

