import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Clock,
  ArrowLeft,
  FileText,
  Tag,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PRESET_TOPICS } from "../data/presets";
import { countWords, estimateReadingTime } from "../utils/parser";
import { VoiceProfile, GenerationResult } from "../types";

interface GeneratorWorkspaceProps {
  profile: VoiceProfile;
  onGenerate: (topic: string) => void;
  result: GenerationResult | null;
  isLoading: boolean;
  onBackToProfile: () => void;
}

export const GeneratorWorkspace: React.FC<GeneratorWorkspaceProps> = ({
  profile,
  onGenerate,
  result,
  isLoading,
  onBackToProfile,
}) => {
  const [topic, setTopic] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = () => {
    if (topic.trim() && !isLoading) {
      onGenerate(topic.trim());
    }
  };

  const handleCopy = async () => {
    if (result?.generatedText) {
      await Clipboard.setStringAsync(result.generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.subheadingRow}>
            <View style={styles.subheadingLine} />
            <Text style={styles.subheading}>02. GENERATION WORKSPACE</Text>
          </View>
          <Text style={styles.title}>Synthesize in Your Voice</Text>
          <Text style={styles.description}>
            Provide a topic or idea. Gemma 4 will craft a piece matching your style.
          </Text>
        </View>

        <TouchableOpacity
          onPress={onBackToProfile}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={14} color="#d946ef" />
          <Text style={styles.backButtonText}>VIEW VOICE DNA</Text>
        </TouchableOpacity>
      </View>

      {/* Target Topic Presets */}
      <View style={styles.presetsSection}>
        <View style={styles.presetsHeader}>
          <Tag size={12} color="#d946ef" />
          <Text style={styles.presetsTitle}>Target Topic Suggestions:</Text>
        </View>
        <View style={styles.presetsContainer}>
          {PRESET_TOPICS.map((pt) => {
            const isSelected = topic === pt.label;
            return (
              <TouchableOpacity
                key={pt.id}
                onPress={() => setTopic(pt.label)}
                style={[
                  styles.presetPill,
                  isSelected ? styles.presetPillSelected : null,
                ]}
                activeOpacity={0.7}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={["#4f46e5", "#c026d3"]}
                    style={styles.gradientPresetBg}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[styles.presetText, styles.presetTextSelected]}>
                      {pt.label}
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.presetText}>{pt.label}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Main Workspace Card */}
      <View style={styles.workspaceCard}>
        <Text style={styles.inputLabel}>TARGET TOPIC OR PROMPT</Text>

        <View style={styles.textareaWrapper}>
          <TextInput
            value={topic}
            onChangeText={setTopic}
            placeholder="e.g. Grabbing a coffee in a rainy city, or why simple code always wins"
            placeholderTextColor="rgba(255, 255, 255, 0.2)"
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
            style={styles.textarea}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!topic.trim() || isLoading}
          style={styles.submitButtonContainer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={!topic.trim() || isLoading ? ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)"] : ["#4f46e5", "#c026d3"]}
            style={[
              styles.submitButton,
              !topic.trim() || isLoading ? styles.disabledSubmitButton : null,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {isLoading ? (
              <View style={styles.buttonInner}>
                <ActivityIndicator size="small" color="#ffffff" style={styles.spinner} />
                <Text style={[styles.submitText, styles.submitTextLoading]}>
                  SYNTHESIZING WITH GEMMA 4...
                </Text>
              </View>
            ) : (
              <View style={styles.buttonInner}>
                <Sparkles size={16} color="#ffffff" />
                <Text style={styles.submitText}>GENERATE SYNTHESIS</Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Output Terminal */}
      {result && (
        <View style={styles.terminal}>
          <View style={styles.terminalHeader}>
            <View style={styles.terminalStatus}>
              <View style={styles.terminalIndicator} />
              <Text style={styles.terminalTitle}>OUTPUT TERMINAL</Text>
            </View>

            <View style={styles.terminalStats}>
              <View style={styles.statRow}>
                <FileText size={12} color="rgba(255,255,255,0.3)" />
                <Text style={styles.statText}>
                  {countWords(result.generatedText)} words
                </Text>
              </View>
              <Text style={styles.statDivider}>•</Text>
              <View style={styles.statRow}>
                <Clock size={12} color="rgba(255,255,255,0.3)" />
                <Text style={styles.statText}>
                  {estimateReadingTime(result.generatedText)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.terminalContent}>
            <Text style={styles.terminalText}>{result.generatedText}</Text>
          </View>

          <View style={styles.terminalFooter}>
            <Text style={styles.terminalId}>ID: GEMMA_V4_SYNTHESIS</Text>

            <View style={styles.terminalActions}>
              <TouchableOpacity
                onPress={() => onGenerate(topic)}
                disabled={isLoading}
                style={styles.terminalButton}
                activeOpacity={0.7}
              >
                <RotateCcw size={14} color="rgba(255,255,255,0.5)" />
                <Text style={styles.terminalButtonText}>Regen</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCopy}
                style={[
                  styles.terminalButton,
                  copied ? styles.copiedButton : null,
                ]}
                activeOpacity={0.7}
              >
                {copied ? (
                  <Check size={14} color="#34d399" />
                ) : (
                  <Copy size={14} color="rgba(255,255,255,0.5)" />
                )}
                <Text
                  style={[
                    styles.terminalButtonText,
                    copied ? styles.copiedButtonText : null,
                  ]}
                >
                  {copied ? "Copied" : "Copy"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  headerLeft: {
    flex: 1,
  },
  subheadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  subheadingLine: {
    width: 20,
    height: 1,
    backgroundColor: "#d946ef",
  },
  subheading: {
    color: "#d946ef",
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
    marginTop: 4,
    lineHeight: 18,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 6,
  },
  backButtonText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "700",
  },
  presetsSection: {
    gap: 8,
  },
  presetsHeader: {
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
  presetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  presetPill: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  presetPillSelected: {
    borderColor: "#c026d3",
    borderWidth: 1,
  },
  gradientPresetBg: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  presetText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  presetTextSelected: {
    color: "#ffffff",
    fontWeight: "700",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  workspaceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  inputLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  textareaWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
  },
  textarea: {
    color: "#ffffff",
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  submitButtonContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  submitButton: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledSubmitButton: {
    opacity: 0.5,
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
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  submitTextLoading: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  terminal: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  terminalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingBottom: 10,
  },
  terminalStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  terminalIndicator: {
    width: 6,
    height: 6,
    backgroundColor: "#d946ef",
    borderRadius: 3,
  },
  terminalTitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  terminalStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 9,
  },
  statDivider: {
    color: "rgba(255, 255, 255, 0.2)",
    fontSize: 9,
  },
  terminalContent: {
    paddingVertical: 4,
  },
  terminalText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  terminalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: 10,
  },
  terminalId: {
    color: "rgba(255, 255, 255, 0.2)",
    fontSize: 8,
  },
  terminalActions: {
    flexDirection: "row",
    gap: 10,
  },
  terminalButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  terminalButtonText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 10,
    fontWeight: "700",
  },
  copiedButton: {
    backgroundColor: "rgba(52, 211, 153, 0.1)",
  },
  copiedButtonText: {
    color: "#34d399",
  },
});
