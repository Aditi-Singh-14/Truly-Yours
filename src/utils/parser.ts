import { VoiceProfile } from "../types";

/**
 * Parses raw labeled profile text from Gemma into structured traits for visual cards
 */
export function parseVoiceProfile(rawText: string): VoiceProfile {
  const profile: VoiceProfile = {
    rawProfileText: rawText,
    extractedAt: new Date(),
  };

  const lines = rawText.split("\n");

  for (const line of lines) {
    const lower = line.toLowerCase();
    
    if (lower.includes("sentence length") || lower.includes("sentence structure")) {
      profile.sentenceLength = extractValueAfterColon(line) || "Varied & dynamic";
    } else if (lower.includes("vocabulary") || lower.includes("vocab")) {
      profile.vocabularyTier = extractValueAfterColon(line) || "Modern & expressive";
    } else if (lower.includes("tone") || lower.includes("mood")) {
      profile.tone = extractValueAfterColon(line) || "Conversational";
    } else if (lower.includes("rhythm") || lower.includes("flow") || lower.includes("pace")) {
      profile.rhythm = extractValueAfterColon(line) || "Rhythmic & direct";
    } else if (lower.includes("recurring") || lower.includes("phrases") || lower.includes("words")) {
      const val = extractValueAfterColon(line);
      if (val) {
        profile.recurringPhrases = val
          .split(/[,;•]/)
          .map((p) => p.trim().replace(/^['"-]+|['"-]+$/g, ""))
          .filter(Boolean);
      }
    }
  }

  return profile;
}

function extractValueAfterColon(line: string): string {
  const colonIndex = line.indexOf(":");
  if (colonIndex !== -1 && colonIndex < line.length - 1) {
    return line.substring(colonIndex + 1).trim();
  }
  const dashIndex = line.indexOf("-");
  if (dashIndex !== -1 && dashIndex < line.length - 1) {
    return line.substring(dashIndex + 1).trim();
  }
  return "";
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function estimateReadingTime(text: string): string {
  const words = countWords(text);
  const minutes = Math.ceil(words / 200);
  return minutes <= 1 ? "1 min read" : `${minutes} min read`;
}
