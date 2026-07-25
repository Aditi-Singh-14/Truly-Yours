import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Sparkles, FileText, ArrowRight } from "lucide-react-native";
import { PRESET_SAMPLES } from "../data/presets";
import { countWords } from "../utils/parser";

interface VoiceExtractorProps {
  onExtract: (sampleText: string) => void;
  isLoading: boolean;
}

export const VoiceExtractor: React.FC<VoiceExtractorProps> = ({ onExtract, isLoading }) => {
  const [sampleText, setSampleText] = useState<string>("");

  const wordCount = countWords(sampleText);

  const handleSubmit = () => {
    if (sampleText.trim() && !isLoading) {
      onExtract(sampleText.trim());
    }
  };

  const handleSelectPreset = (text: string) => {
    setSampleText(text);
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.subheadingRow}>
          <View style={styles.subheadingLine} />
          <Text style={styles.subheading}>01. VOICE EXTRACTION</Text>
        </View>
        <Text style={styles.title}>Paste your writing sample</Text>
        <Text style={styles.description}>
          Provide 100–300 words of your natural writing. Gemma 4 will extract your sentence length, vocabulary tier, tone, and rhythm.
        </Text>
      </View>

      {/* Quick Presets */}
      <View style={styles.presetsSection}>
        <View style={styles.presetsHeader}>
          <View style={styles.presetsTitleRow}>
            <FileText size={14} color="#6366f1" />
            <Text style={styles.presetsTitle}>Quick Presets (1-tap fill):</Text>
          </View>
          <Text style={styles.presetsTapText}>Tap to load</Text>
        </View>

        <View style={styles.presetButtonsContainer}>
          {PRESET_SAMPLES.map((preset) => (
            <TouchableOpacity
              key={preset.id}
              onPress={() => handleSelectPreset(preset.text)}
              style={styles.presetCard}
              activeOpacity={0.7}
            >
              <View style={styles.presetMeta}>
                <Text style={styles.presetName} numberOfLines={1}>
                  {preset.title}
                </Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{preset.badge}</Text>
                </View>
              </View>
              <Text style={styles.presetExcerpt} numberOfLines={2}>
                "{preset.text}"
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Form */}
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.inputLabel}>WRITING SAMPLE</Text>
          <View style={styles.countsContainer}>
            <Text
              style={[
                styles.wordCount,
                wordCount < 30 ? styles.lowWords : styles.sufficientWords,
              ]}
            >
              {wordCount} words
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.charCount}>{sampleText.length} chars</Text>
          </View>
        </View>

        <View style={styles.textareaWrapper}>
          <TextInput
            value={sampleText}
            onChangeText={setSampleText}
            placeholder="Paste 100-300 words of your writing here... (e.g. recent post, thoughts, email, or article)"
            placeholderTextColor="rgba(255, 255, 255, 0.2)"
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            style={styles.textarea}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!sampleText.trim() || isLoading}
          style={[
            styles.submitButton,
            !sampleText.trim() || isLoading ? styles.disabledButton : null,
          ]}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <View style={styles.buttonInner}>
              <ActivityIndicator size="small" color="#000000" style={styles.spinner} />
              <Text style={styles.submitText}>EXTRACTING VOICE DNA...</Text>
            </View>
          ) : (
            <View style={styles.buttonInner}>
              <Sparkles size={16} color="#000000" />
              <Text style={styles.submitText}>ANALYZE MY VOICE DNA</Text>
              <ArrowRight size={16} color="#000000" style={styles.arrow} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  header: {
    marginBottom: 4,
  },
  subheadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  subheadingLine: {
    width: 20,
    height: 1,
    backgroundColor: "#818cf8",
  },
  subheading: {
    color: "#818cf8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  description: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  presetsSection: {
    gap: 8,
  },
  presetsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  presetsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  presetsTitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  presetsTapText: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  presetButtonsContainer: {
    gap: 10,
  },
  presetCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  presetMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  presetName: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    flex: 1,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 9,
    fontFamily: "System",
  },
  presetExcerpt: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 11,
    fontStyle: "italic",
    lineHeight: 15,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  countsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  wordCount: {
    fontSize: 10,
    fontWeight: "600",
  },
  lowWords: {
    color: "#fbbf24",
  },
  sufficientWords: {
    color: "#34d399",
  },
  separator: {
    color: "rgba(255, 255, 255, 0.2)",
    fontSize: 10,
  },
  charCount: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 10,
  },
  textareaWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 140,
  },
  textarea: {
    color: "#ffffff",
    fontSize: 13,
    lineHeight: 18,
    fontStyle: "italic",
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  spinner: {
    marginRight: 2,
  },
  submitText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  arrow: {
    marginLeft: 2,
    opacity: 0.7,
  },
});
