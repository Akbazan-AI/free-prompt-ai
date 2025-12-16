/**
 * Script to add quotes around prompts that don't have them
 * Run: npx tsx scripts/add-quotes.ts
 */

import fs from 'fs';
import path from 'path';

function addQuotesToFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const newLines: string[] = [];

  let insideQuote = false;
  let insidePrompt = false;
  let promptLines: string[] = [];
  let currentTitle = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Keep headers as-is
    if (trimmed.startsWith('#')) {
      // Save accumulated prompt if exists
      if (insidePrompt && promptLines.length > 0) {
        newLines.push(currentTitle);
        newLines.push('"');
        newLines.push(...promptLines);
        newLines.push('"');
        newLines.push('');
        promptLines = [];
        insidePrompt = false;
      }
      newLines.push(line);
      continue;
    }

    // Detect prompt title
    const titleMatch = trimmed.match(/^(\d+)[\.\,]\s*(.+)/);
    if (titleMatch && !insideQuote) {
      // Save previous prompt if exists
      if (insidePrompt && promptLines.length > 0) {
        newLines.push(currentTitle);
        newLines.push('"');
        newLines.push(...promptLines);
        newLines.push('"');
        newLines.push('');
        promptLines = [];
      }

      currentTitle = line;
      insidePrompt = true;
      insideQuote = false;
      continue;
    }

    // Check if already has quotes
    if (trimmed.startsWith('"') || trimmed.startsWith('"')) {
      insideQuote = true;
      insidePrompt = false;
      newLines.push(line);
      continue;
    }

    if (insideQuote) {
      newLines.push(line);
      if (trimmed.endsWith('"') || trimmed.endsWith('"')) {
        insideQuote = false;
        newLines.push('');
      }
      continue;
    }

    // Collect prompt content without quotes
    if (insidePrompt && trimmed) {
      promptLines.push(line);
    } else if (!insidePrompt) {
      newLines.push(line);
    }
  }

  // Save last prompt if exists
  if (insidePrompt && promptLines.length > 0) {
    newLines.push(currentTitle);
    newLines.push('"');
    newLines.push(...promptLines);
    newLines.push('"');
  }

  return newLines.join('\n');
}

async function main() {
  console.log('🚀 Adding quotes to prompts...\n');

  const files = [
    'prompt/image/anh-chan-dung.md',
    'prompt/image/mẹo-customize-promt.md',
    'prompt/office/cong-viec-van-phong.md',
    'prompt/office/meo-toi-uu-prompt-office.md',
  ];

  for (const file of files) {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${file} (not found)`);
      continue;
    }

    console.log(`📝 Processing ${file}...`);

    // Backup original
    const backupPath = filePath + '.backup';
    fs.copyFileSync(filePath, backupPath);
    console.log(`   ✅ Backed up to ${path.basename(backupPath)}`);

    // Add quotes
    const newContent = addQuotesToFile(filePath);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`   ✅ Added quotes\n`);
  }

  console.log('🎉 Done! All prompts now have quotes.');
  console.log('\n💡 Tip: Original files backed up with .backup extension');
}

main();
