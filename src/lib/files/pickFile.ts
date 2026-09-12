import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';

/** Returns the picked file's text, or null when cancelled. */
export async function pickJsonFileText(): Promise<string | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/json', 'text/plain', '*/*'],
    copyToCacheDirectory: true,
    multiple: false,
  });
  if (result.canceled || !result.assets[0]) return null;
  return new File(result.assets[0].uri).text();
}
