import { Directory, File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const PHOTO_DIR = 'exercise-photos';
const PHOTO_ASPECT: [number, number] = [4, 3];
const PHOTO_QUALITY = 0.7;

export type PhotoSource = 'gallery' | 'camera';

/** Opens the camera or gallery (permission must already be granted) and copies the photo into app storage. */
export async function pickExercisePhoto(source: PhotoSource, fileId: string): Promise<string | null> {
  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: PHOTO_ASPECT, quality: PHOTO_QUALITY };
  const result = source === 'camera' ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
  if (result.canceled || !result.assets[0]) return null;

  const dir = new Directory(Paths.document, PHOTO_DIR);
  if (!dir.exists) dir.create();
  const target = new File(dir, `${fileId}-${Date.now()}.jpg`);
  new File(result.assets[0].uri).copy(target);
  return target.uri;
}
