import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import * as Linking from 'expo-linking';

const FeedbackScreen = () => {
  const whatsappNumber = '+919368884649';

  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [feedback, setFeedback] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleFeedbackSubmit = () => {
    const message = `Title: ${title}\nContext: ${context}\nFeedback: ${feedback}`;
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl);
    setSnackbarVisible(true);
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
        placeholder="Enter title..."
      />

      <TextInput
        label="Context"
        multiline
        numberOfLines={4}
        value={context}
        onChangeText={(text) => setContext(text)}
        style={styles.input}
        placeholder="Enter context..."
      />

      <TextInput
        label="Your Feedback"
        multiline
        numberOfLines={4}
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        style={styles.input}
        placeholder="Enter your feedback..."
      />

      <Button mode="contained" onPress={handleFeedbackSubmit} style={styles.button}>
        Submit Feedback
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        action={{ label: 'Dismiss', onPress: handleSnackbarDismiss }}
        style={styles.snackbar}
      >
        Feedback submitted! Thank you.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#2A4BA0',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F9B023',
    borderRadius: 8,
    padding: 10,
    color: '#2A4BA0',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#F9B023',
  },
  snackbar: {
    backgroundColor: '#F9B023',
  },
});

export default FeedbackScreen;
