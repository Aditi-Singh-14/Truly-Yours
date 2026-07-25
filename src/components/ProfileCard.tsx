import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import {
  Sparkles,
  Edit3,
  Check,
  RotateCcw,
  Code,
  Layers,
  ArrowRight,
  MessageSquare,
  Zap,
  BookOpen,
  Volume2,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { VoiceProfile } from "../types";

interface ProfileCardProps {
  profile: VoiceProfile;
  onProceedToGenerate: () => void;
  onReset: () => void;
  onUpdateProfileText: (updatedText: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onProceedToGenerate,
  onReset,
  onUpdateProfileText,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(profile.rawProfileText);
  const [showRaw, setShowRaw] = useState(false);

  const handleSaveEdit = () => {
    onUpdateProfileText(editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(99, 102, 241, 0.1)", "rgba(255, 255, 255, 0.03)"]}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Card Header Row */}
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={["#6366f1", "#d946ef"]}
              style={styles.headerIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Sparkles size={16} color="#ffffff" />
            </LinearGradient>
            <View>
              <View style={styles.titleRow}>
                <Text style={styles.headerTitle}>EXTRACTED VOICE DNA</Text>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>ACTIVE</Text>
                </View>
              </View>
              <Text style={styles.headerSubtitle}>Synthesized by Gemma 4</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => setShowRaw(!showRaw)}
              style={styles.smallButton}
              activeOpacity={0.7}
            >
              {showRaw ? (
                <Layers size={14} color="#818cf8" />
              ) : (
                <Code size={14} color="#818cf8" />
              )}
              <Text style={styles.smallButtonText}>
                {showRaw ? "Structured" : "Raw"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (isEditing) {
                  handleSaveEdit();
                } else {
                  setEditedText(profile.rawProfileText);
                  setIsEditing(true);
                }
              }}
              style={styles.smallButton}
              activeOpacity={0.7}
            >
              {isEditing ? (
                <Check size={14} color="#34d399" />
              ) : (
                <Edit3 size={14} color="rgba(255,255,255,0.4)" />
              )}
              <Text style={styles.smallButtonText}>
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Body */}
        {isEditing ? (
          <View style={styles.bodySection}>
            <Text style={styles.sectionLabel}>EDIT VOICE PARAMETERS</Text>
            <View style={styles.textareaContainer}>
              <TextInput
                value={editedText}
                onChangeText={setEditedText}
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
                style={styles.editTextarea}
              />
            </View>
            <View style={styles.editActions}>
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveEdit}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : showRaw ? (
          <View style={styles.rawContainer}>
            <Text style={styles.rawText}>{profile.rawProfileText}</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {/* Tone */}
            <View style={styles.gridItem}>
              <View style={styles.gridItemHeader}>
                <Volume2 size={12} color="#818cf8" />
                <Text style={styles.gridItemLabel}>TONE</Text>
              </View>
              <Text style={styles.gridItemValue}>
                {profile.tone || "Conversational & Direct"}
              </Text>
            </View>

            {/* Vocabulary Tier */}
            <View style={styles.gridItem}>
              <View style={styles.gridItemHeader}>
                <BookOpen size={12} color="#f472b6" />
                <Text style={styles.gridItemLabel}>VOCABULARY</Text>
              </View>
              <Text style={styles.gridItemValue}>
                {profile.vocabularyTier || "Casual & Accessible"}
              </Text>
            </View>

            {/* Sentence Tendency */}
            <View style={styles.gridItem}>
              <View style={styles.gridItemHeader}>
                <Zap size={12} color="#818cf8" />
                <Text style={styles.gridItemLabel}>SENTENCE STRUCTURE</Text>
              </View>
              <Text style={styles.gridItemValue}>
                {profile.sentenceLength || "Short & Punchy"}
              </Text>
            </View>

            {/* Overall Rhythm */}
            <View style={styles.gridItem}>
              <View style={styles.gridItemHeader}>
                <MessageSquare size={12} color="#34d399" />
                <Text style={styles.gridItemLabel}>RHYTHM & FLOW</Text>
              </View>
              <Text style={styles.gridItemValue}>
                {profile.rhythm || "Fast-paced, clear momentum"}
              </Text>
            </View>

            {/* Recurring Markers */}
            {profile.recurringPhrases && profile.recurringPhrases.length > 0 && (
              <View style={styles.markersContainer}>
                <Text style={styles.markersLabel}>RECURRING MARKERS & PHRASES</Text>
                <View style={styles.tagsContainer}>
                  {profile.recurringPhrases.map((phrase, idx) => (
                    <View key={idx} style={styles.tag}>
                      <Text style={styles.tagText}>"{phrase}"</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Action Controls */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={onReset}
            style={styles.resetButton}
            activeOpacity={0.8}
          >
            <RotateCcw size={16} color="rgba(255,255,255,0.7)" />
            <Text style={styles.resetButtonText}>RE-EXTRACT VOICE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onProceedToGenerate}
            style={styles.proceedButtonContainer}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#4f46e5", "#c026d3"]}
              style={styles.proceedButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.proceedButtonText}>TO GENERATION WORKSPACE</Text>
              <ArrowRight size={16} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.2)",
    padding: 16,
    gap: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  activeBadge: {
    backgroundColor: "rgba(52, 211, 153, 0.15)",
    borderColor: "rgba(52, 211, 153, 0.25)",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  activeBadgeText: {
    color: "#34d399",
    fontSize: 8,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 9,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  smallButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  smallButtonText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    fontWeight: "600",
  },
  bodySection: {
    gap: 8,
  },
  sectionLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  textareaContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  editTextarea: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16,
    minHeight: 110,
    fontFamily: "System",
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 11,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  rawContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  rawText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "System",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    gap: 4,
  },
  gridItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  gridItemLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  gridItemValue: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
  markersContainer: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    gap: 6,
    marginTop: 2,
  },
  markersLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 6,
    height: 44,
    justifyContent: "center",
  },
  resetButtonText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  proceedButtonContainer: {
    flex: 1,
    height: 44,
  },
  proceedButton: {
    flex: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  proceedButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
