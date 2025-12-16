import fs from "fs";
import path from "path";
import { Prompt, ParsedMarkdown } from "./types";

export function parseMarkdownToPrompts(
  content: string,
  category: "image" | "office",
  fileNamePrefix: string = ""
): ParsedMarkdown {
  const prompts: Prompt[] = [];

  // Work on the content after the prompt list header to avoid instructions.
  const marker = /##\s*danh sách prompts/i;
  const markerMatch = content.match(marker);
  const startPos = markerMatch
    ? content.toLowerCase().indexOf(markerMatch[0].toLowerCase()) +
      markerMatch[0].length
    : 0;
  const body = content.slice(startPos);

  const normalizePromptText = (text: string) => {
    let cleaned = text.trim();

    // Remove wrapping straight or smart quotes if present
    cleaned = cleaned.replace(/^[\"“”]\s*/, "").replace(/\s*[\"“”]$/, "");

    // Strip fenced code blocks if both fences exist
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```[a-zA-Z0-9_-]*\s*\n?/, "");
    }
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.replace(/\n?```$/, "");
    }

    return cleaned.trim();
  };

  const titleRegex = /^(\d+)[\.\,]\s*(.+)$/gm;
  const matches = [...body.matchAll(titleRegex)];

  let promptCounter = 0;

  const pushPrompt = (title: string, text: string) => {
    const promptText = normalizePromptText(text);
    if (!promptText) return;

    const looksJson =
      promptText.startsWith("{") ||
      promptText.startsWith("[") ||
      promptText.startsWith('"') ||
      /\".*\":/.test(promptText);

    const tags = extractTags(title);
    if (looksJson && !tags.includes("json")) {
      tags.push("json");
    }

    promptCounter += 1;

    prompts.push({
      id: `${category}-${fileNamePrefix}-${String(promptCounter).padStart(
        4,
        "0"
      )}`,
      title,
      description: "",
      prompt: promptText,
      tags,
      category,
    });
  };

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const next = matches[i + 1];

    const headerTitle = match[2].trim().replace(/^[""]|[""]$/g, "");

    const contentStart = match.index! + match[0].length;
    const contentEnd = next ? next.index! : body.length;
    const rawSection = body.slice(contentStart, contentEnd);

    // Detect variant prompts inside a section, e.g.:
    // +2 Some title...
    //   (content)
    const variantRegex = /^\+(\d+)\s+(.+)$/gm;
    const variants = [...rawSection.matchAll(variantRegex)];

    if (variants.length === 0) {
      // Simple case: whole block is a single prompt
      pushPrompt(headerTitle, rawSection);
      continue;
    }

    // Base prompt: content before first +N line
    const firstVariant = variants[0];
    const baseContent = rawSection.slice(0, firstVariant.index);
    pushPrompt(headerTitle, baseContent);

    // Variant prompts
    for (let v = 0; v < variants.length; v++) {
      const current = variants[v];
      const nextVariant = variants[v + 1];

      const variantTitle = (current[2] || "").trim();
      const variantContentStart = current.index! + current[0].length;
      const variantContentEnd = nextVariant
        ? nextVariant.index!
        : rawSection.length;
      const variantContent = rawSection.slice(
        variantContentStart,
        variantContentEnd
      );

      // If no separate title text after +N, fall back to header title
      const effectiveTitle = variantTitle || headerTitle;
      pushPrompt(effectiveTitle, variantContent);
    }
  }

  return {
    prompts,
    metadata: {
      totalCount: prompts.length,
      category,
      parsedAt: new Date().toISOString(),
    },
  };
}

function extractTags(title: string): string[] {
  const tags: string[] = [];
  const lowerTitle = title.toLowerCase();

  const imageKeywords = {
    "chân dung": "portrait",
    "đen trắng": "black-white",
    cinema: "cinema",
    "phong cảnh": "landscape",
    cafe: "cafe",
    picnic: "picnic",
    selfie: "selfie",
    "nghệ thuật": "artistic",
    "thời trang": "fashion",
    "đường phố": "street",
    tuyết: "snow",
    biển: "beach",
    studio: "studio",
  };

  const officeKeywords = {
    email: "email",
    "báo cáo": "report",
    "thuyết trình": "presentation",
    meeting: "meeting",
    excel: "excel",
    "văn bản": "document",
  };

  const keywords = { ...imageKeywords, ...officeKeywords };

  Object.entries(keywords).forEach(([key, tag]) => {
    if (lowerTitle.includes(key)) {
      tags.push(tag);
    }
  });

  return tags.length > 0 ? tags : ["general"];
}

export async function parseDirectory(
  dirPath: string,
  category: "image" | "office"
): Promise<Prompt[]> {
  const allPrompts: Prompt[] = [];

  const files = fs.readdirSync(dirPath);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  for (const file of mdFiles) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const fileNamePrefix = path
      .basename(file, ".md")
      .replace(/[^a-z0-9]/gi, "-");

    const parsed = parseMarkdownToPrompts(content, category, fileNamePrefix);
    allPrompts.push(...parsed.prompts);
  }

  return allPrompts;
}

export function savePromptsToJSON(prompts: Prompt[], outputPath: string): void {
  const data = JSON.stringify(prompts, null, 2);
  fs.writeFileSync(outputPath, data, "utf-8");
}
