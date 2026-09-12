import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export async function shareJsonFile(fileName: string, content: string): Promise<void> {
  const file = new File(Paths.cache, fileName);
  if (file.exists) file.delete();
  file.create();
  file.write(content);
  await Sharing.shareAsync(file.uri, { mimeType: 'application/json', dialogTitle: fileName, UTI: 'public.json' });
}
