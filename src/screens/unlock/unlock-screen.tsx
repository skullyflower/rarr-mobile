import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Banner, Button, TextInput } from "react-native-paper";

import Confirm from "@/components/confirm";
import ColorBox from "@/components/layout/color-box";
import CollapsingText from "@/components/layout/collapsing-text";
import InlineHtmlText from "@/components/layout/inline-html-text";
import PageCard from "@/components/layout/page-card";
import useToggleLock from "@/hooks/use-toggle-lock";
import { resetLogs, unlockLog } from "@/lib/storage/journal-store";
import strings from "@/data/unlock.json";

export default function UnlockScreen() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLocked, hasLock, setIsLocked } = useToggleLock();

  const handleUnlock = (): void => {
    if (user.length === 0 || password.length === 0) return;
    unlockLog(user, password).then((stillLocked) => {
      setIsLocked(stillLocked);
      if (!stillLocked) {
        setSuccess(strings.unlock.success);
        setError(null);
      } else {
        setSuccess(null);
        setError(strings.unlock.fail);
      }
    });
  };

  const handleReset = (): void => {
    resetLogs()
      .then((stillLocked) => {
        setIsLocked(stillLocked);
        setSuccess(strings.reset.success);
        setError(null);
      })
      .catch((err) => {
        setError(`${strings.reset.fail}: ${err}`);
      })
      .finally(() => setConfirmVisible(false));
  };

  if (!isLocked && success) {
    return (
      <View style={styles.container}>
        <Banner
          visible
          icon="check-circle">
          {success}
        </Banner>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard header={hasLock ? strings.unlock.title : strings.setup.title}>
        <View style={styles.stack}>
          {error && (
            <Banner
              visible
              icon="alert-circle">
              {error}
            </Banner>
          )}

          {!hasLock && (
            <View style={styles.stack}>
              <CollapsingText>
                <View style={styles.stack}>
                  {strings.setup.collapsedText.map((line, i) => (
                    <InlineHtmlText
                      key={`c-${i}`}
                      html={line}
                      variant="bodyMedium"
                    />
                  ))}
                </View>
              </CollapsingText>
              <InlineHtmlText
                html={strings.setup.text}
                variant="bodyMedium"
                style={styles.bold}
              />
            </View>
          )}

          <ColorBox>
            <View style={styles.stack}>
              <TextInput
                label="Name"
                autoComplete="username"
                mode="outlined"
                value={user}
                onChangeText={setUser}
              />
              <TextInput
                label="Password"
                autoComplete="password"
                secureTextEntry
                mode="outlined"
                value={password}
                onChangeText={setPassword}
              />
              <View style={styles.buttonRow}>
                {isLocked ? (
                  <Button
                    mode="text"
                    onPress={() => setConfirmVisible(true)}>
                    Reset and delete log
                  </Button>
                ) : (
                  <Button
                    mode="text"
                    onPress={() => setConfirmVisible(false)}>
                    Cancel
                  </Button>
                )}
                <Button
                  mode="contained"
                  disabled={user.length < 1 || password.length < 1}
                  onPress={handleUnlock}>
                  {isLocked ? "Unlock" : "Set Up Lock"}
                </Button>
              </View>
            </View>
          </ColorBox>
        </View>
      </PageCard>
      <Confirm
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title={strings.reset.title}
        message={strings.reset.confirm}
        onConfirm={handleReset}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
  },
  stack: {
    gap: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});
