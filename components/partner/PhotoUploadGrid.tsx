import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';

export type PartnerPhoto = { uri: string };

const MAX_PHOTOS = 10;

type PhotoUploadGridProps = {
  photos: PartnerPhoto[];
  onChange: (photos: PartnerPhoto[]) => void;
};

// Web's version is a real drag-and-drop uploader wired to a backend endpoint
// (`publicApi.uploadPartnerPhotos`) — there's no upload backend here, so a
// picked photo never actually leaves the device, but the picker itself
// (camera + gallery, expo-image-picker) is real, same "mock the network
// call, not the picker" convention as CreateTicketSheet.tsx.
export function PhotoUploadGrid({ photos, onChange }: PhotoUploadGridProps) {
  const remaining = MAX_PHOTOS - photos.length;

  async function handleTakePhoto() {
    if (remaining <= 0) return;
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!result.canceled) {
      onChange([...photos, { uri: result.assets[0].uri }]);
    }
  }

  async function handleChooseFromGallery() {
    if (remaining <= 0) return;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.6,
      allowsMultipleSelection: true,
      selectionLimit: remaining,
    });
    if (!result.canceled) {
      onChange([...photos, ...result.assets.map((asset) => ({ uri: asset.uri }))]);
    }
  }

  function removePhoto(index: number) {
    onChange(photos.filter((_, i) => i !== index));
  }

  return (
    <View className="gap-3">
      <View className="flex-row gap-2">
        <Pressable
          onPress={handleTakePhoto}
          disabled={remaining <= 0}
          className="border-border flex-1 items-center gap-1.5 rounded-xl border border-dashed py-5 disabled:opacity-40">
          <Icon as={Camera} size={18} className="text-ltx-gold" />
          <Text className="font-montserrat text-muted-foreground text-[11px]">Take Photo</Text>
        </Pressable>
        <Pressable
          onPress={handleChooseFromGallery}
          disabled={remaining <= 0}
          className="border-border flex-1 items-center gap-1.5 rounded-xl border border-dashed py-5 disabled:opacity-40">
          <Icon as={ImageIcon} size={18} className="text-ltx-gold" />
          <Text className="font-montserrat text-muted-foreground text-[11px]">Choose from Gallery</Text>
        </Pressable>
      </View>

      {photos.length > 0 ? (
        <View className="flex-row flex-wrap gap-2">
          {photos.map((photo, index) => (
            <View key={photo.uri + index} className="h-24 w-[31%] overflow-hidden rounded-xl">
              <Image source={{ uri: photo.uri }} style={{ width: '100%', height: '100%' }} />
              <Pressable
                onPress={() => removePhoto(index)}
                hitSlop={8}
                className="absolute right-1.5 top-1.5 h-6 w-6 items-center justify-center rounded-full bg-black/60">
                <Icon as={X} size={13} className="text-white" />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      <Text className="font-montserrat text-muted-foreground text-[12px]">{photos.length}/{MAX_PHOTOS} photos</Text>
    </View>
  );
}
