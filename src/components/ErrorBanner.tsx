import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AlertCircle, X, RefreshCw } from "lucide-react-native";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onDismiss, onRetry }) => {
  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <AlertCircle size={20} color="#f43f5e" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Generation Failed</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} style={styles.retryButton} activeOpacity={0.8}>
            <RefreshCw size={14} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton} activeOpacity={0.7}>
          <X size={16} color="#fb7185" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "rgba(67, 12, 30, 0.8)",
    borderColor: "rgba(159, 18, 57, 0.8)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: "rgba(136, 19, 55, 0.5)",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#ffe4e6",
    fontSize: 14,
    fontWeight: "600",
  },
  message: {
    color: "#fecdd3",
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(159, 18, 57, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
  dismissButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(136, 19, 55, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
});
