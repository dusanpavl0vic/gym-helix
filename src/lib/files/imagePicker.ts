import { Directory, File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const PHOTO_DIR = 'exercise-photos';

export type PhotoSource = 'gallery' | 'camera';

/** Lets the user pick or take a photo and copies it into app storage. Returns the local URI or null. */
export async function pickExercisePhoto(source: PhotoSource, fileId: string): Promise<string | null> {
  const permission =
    source === 'camera'
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: [4, 3], quality: 0.7 };
  const result = source === 'camera' ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
  if (result.canceled || !result.assets[0]) return null;

  const dir = new Directory(Paths.document, PHOTO_DIR);
  if (!dir.exists) dir.create();
  const target = new File(dir, `${fileId}-${Date.now()}.jpg`);
  new File(result.assets[0].uri).copy(target);
  return target.uri;
}
