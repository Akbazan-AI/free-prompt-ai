/**
 * Script to parse markdown files to JSON
 * Run: npx tsx scripts/parse-prompts.ts
 */

import path from 'path';
import { parseDirectory, savePromptsToJSON } from '../lib/prompts/parser';

async function main() {
  console.log('🚀 Starting to parse markdown files...\n');

  try {
    // Parse image prompts
    console.log('📸 Parsing image prompts...');
    const imagePath = path.join(process.cwd(), 'prompt/image');
    const imagePrompts = await parseDirectory(imagePath, 'image');
    const imageOutputPath = path.join(process.cwd(), 'data/prompts/image.json');
    savePromptsToJSON(imagePrompts, imageOutputPath);
    console.log(`✅ Saved ${imagePrompts.length} image prompts to ${imageOutputPath}\n`);

    // Parse office prompts
    console.log('💼 Parsing office prompts...');
    const officePath = path.join(process.cwd(), 'prompt/office');
    const officePrompts = await parseDirectory(officePath, 'office');
    const officeOutputPath = path.join(process.cwd(), 'data/prompts/office.json');
    savePromptsToJSON(officePrompts, officeOutputPath);
    console.log(`✅ Saved ${officePrompts.length} office prompts to ${officeOutputPath}\n`);

    // Save all prompts combined
    const allPrompts = [...imagePrompts, ...officePrompts];
    const allOutputPath = path.join(process.cwd(), 'data/prompts/all.json');
    savePromptsToJSON(allPrompts, allOutputPath);
    console.log(`✅ Saved ${allPrompts.length} total prompts to ${allOutputPath}\n`);

    console.log('🎉 Parsing completed successfully!');
  } catch (error) {
    console.error('❌ Error parsing prompts:', error);
    process.exit(1);
  }
}

main();
