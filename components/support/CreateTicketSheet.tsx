import { FilterSheet } from '@/components/search/FilterSheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, LoaderCircle, X } from 'lucide-react-native';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { CATEGORIES, type Ticket, type TicketCategory } from './mock-data';

type PickedImage = {
  uri: string;
  fileName: string;
  fileSizeKb: number;
};

type CreateTicketSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: Pick<Ticket, 'subject' | 'message' | 'category'> & { attachment?: PickedImage }) => void;
};

function toPickedImage(asset: ImagePicker.ImagePickerAsset): PickedImage {
  const fileName = asset.fileName ?? asset.uri.split('/').pop() ?? 'photo.jpg';
  const fileSizeKb = asset.fileSize ? Math.round(asset.fileSize / 1024) : 0;
  return { uri: asset.uri, fileName, fileSizeKb };
}

// Web's version has a real drag-and-drop file upload wired to a backend
// endpoint — there's no upload backend here, so the picked photo never
// actually leaves the device, but the picker itself (camera + gallery) is
// real (expo-image-picker), not mocked, since that part doesn't need a
// backend to be genuine.
export function CreateTicketSheet({ open, onOpenChange, onCreate }: CreateTicketSheetProps) {
  const [category, setCategory] = React.useState<TicketCategory | null>(null);
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [attachment, setAttachment] = React.useState<PickedImage | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setCategory(null);
      setSubject('');
      setMessage('');
      setAttachment(null);
      setError(null);
    }
  }, [open]);

  async function handleTakePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setError('Camera permission is required to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.6, allowsEditing: true });
    if (!result.canceled) {
      setAttachment(toPickedImage(result.assets[0]));
      setError(null);
    }
  }

  async function handleChooseFromGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setError('Photo library permission is required to attach a photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.6,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setAttachment(toPickedImage(result.assets[0]));
      setError(null);
    }
  }

  async function handleSubmit() {
    if (!subject.trim()) {
      setError('Subject is required.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
    setSubmitting(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    onCreate({
      subject: subject.trim(),
      message: message.trim(),
      category,
      attachment: attachment ?? undefined,
    });
  }

  return (
    <FilterSheet title="Raise New Ticket" open={open} onOpenChange={onOpenChange}>
      <View className="gap-5 pt-1">
        <View className="gap-2">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold uppercase tracking-[1px]">
            Category
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const selected = category === cat.value;
              return (
                <Pressable
                  key={cat.value}
                  onPress={() => setCategory(cat.value)}
                  className={cn(
                    'rounded-full border px-3.5 py-2',
                    selected ? 'border-ltx-gold bg-secondary' : 'border-border'
                  )}>
                  <Text
                    className={cn(
                      'font-montserrat text-[12px]',
                      selected ? 'text-ltx-gold font-semibold' : 'text-muted-foreground'
                    )}>
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="gap-1.5">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold">Subject</Text>
          <Input
            value={subject}
            onChangeText={setSubject}
            placeholder="Brief description of your request"
            className="rounded-xl text-[13px]"
          />
        </View>

        <View className="gap-1.5">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold">Message</Text>
          <Input
            value={message}
            onChangeText={setMessage}
            placeholder="Please provide any specific requirements or preferences"
            multiline
            numberOfLines={4}
            className="rounded-xl py-2.5 text-[13px]"
            // Input's base className has an unconditional `h-10` (fixed
            // 40px) with no web-scoped override available — a `native:`
            // variant only wins on native, so on web the box stayed locked
            // at 40px while 4 lines of text tried to render inside it,
            // squishing into the Attachment section right below. An
            // explicit numeric `style` height always wins over any
            // className-derived height on every platform, unlike a
            // className override fighting the base class.
            style={{ height: 110, textAlignVertical: 'top' }}
          />
        </View>

        <View className="gap-2">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold">Attachment (Optional)</Text>

          {attachment ? (
            <View className="border-border flex-row items-center gap-3 rounded-xl border p-3">
              <Image source={{ uri: attachment.uri }} style={{ width: 56, height: 56, borderRadius: 10 }} />
              <View className="flex-1">
                <Text numberOfLines={1} className="font-montserrat-medium text-foreground text-[12px]">
                  {attachment.fileName}
                </Text>
                {attachment.fileSizeKb > 0 ? (
                  <Text className="font-montserrat text-muted-foreground text-[10px]">{attachment.fileSizeKb}KB</Text>
                ) : null}
              </View>
              <Pressable
                onPress={() => setAttachment(null)}
                hitSlop={8}
                className="bg-secondary h-7 w-7 items-center justify-center rounded-full">
                <Icon as={X} size={14} className="text-foreground" />
              </Pressable>
            </View>
          ) : (
            <View className="flex-row gap-2">
              <Pressable
                onPress={handleTakePhoto}
                className="border-border flex-1 items-center gap-1.5 rounded-xl border border-dashed py-4">
                <Icon as={Camera} size={18} className="text-muted-foreground" />
                <Text className="font-montserrat text-muted-foreground text-[11px]">Camera</Text>
              </Pressable>
              <Pressable
                onPress={handleChooseFromGallery}
                className="border-border flex-1 items-center gap-1.5 rounded-xl border border-dashed py-4">
                <Icon as={ImageIcon} size={18} className="text-muted-foreground" />
                <Text className="font-montserrat text-muted-foreground text-[11px]">Gallery</Text>
              </Pressable>
            </View>
          )}
        </View>

        {error ? <Text className="font-montserrat text-[12px] text-red-500">{error}</Text> : null}

        <Button size="lg" className="rounded-full" onPress={handleSubmit} disabled={submitting}>
          {submitting ? <Icon as={LoaderCircle} size={14} className="text-primary-foreground" /> : null}
          <Text className="text-primary-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
            Submit Ticket
          </Text>
        </Button>
      </View>
    </FilterSheet>
  );
}
