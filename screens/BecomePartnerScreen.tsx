import { Logo } from '@/components/layout/Logo';
import { OptionSheet } from '@/components/partner/OptionSheet';
import { PhotoUploadGrid, type PartnerPhoto } from '@/components/partner/PhotoUploadGrid';
import { StepProgress } from '@/components/partner/StepProgress';
import {
  AMENITIES_LIST,
  COUNTRIES,
  COUNTRY_DIAL_CODES,
  GST_REGEX,
  TOTAL_STEPS,
  isValidEmail,
} from '@/components/partner/mock-data';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { router } from 'expo-router';
import { Check, CircleCheck, ChevronDown, ChevronLeft, ChevronRight, LoaderCircle, Star } from 'lucide-react-native';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
      {children}
    </Text>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="font-montserrat text-[12px] text-red-500">{message}</Text>;
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <View className="border-border bg-secondary gap-3 rounded-xl border p-4">
      <View className="flex-row items-center justify-between">
        <Text className="font-montserrat text-muted-foreground text-[11px] font-bold uppercase tracking-[1.5px]">
          {title}
        </Text>
        <Pressable onPress={onEdit} hitSlop={8}>
          <Text className="font-montserrat text-ltx-gold text-[12px] font-semibold">Edit</Text>
        </Pressable>
      </View>
      {children}
    </View>
  );
}

// Ported from LTX web's /become-a-partner (a public 6-step hotel-partner
// application form). This is a lead-gen form, not the authenticated
// /partner/* dashboard — a separate role flow this app deliberately doesn't
// reimplement (see project_wocoapp_member_flow_scope) — so building this
// doesn't reopen that scope decision. Submission is mocked (no backend), same
// as Contact/Support; the description field is a plain multiline input
// instead of web's rich-text editor, same "reduce editor-heavy web features
// to plain text" simplification already used for Support's message field.
export function BecomePartnerScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [referenceId, setReferenceId] = React.useState('');

  const [hotelName, setHotelName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [starRating, setStarRating] = React.useState('');

  const [address, setAddress] = React.useState('');
  const [cityName, setCityName] = React.useState('');
  const [countryName, setCountryName] = React.useState('');
  const [countrySheetOpen, setCountrySheetOpen] = React.useState(false);

  const [amenities, setAmenities] = React.useState<string[]>([]);

  const [photos, setPhotos] = React.useState<PartnerPhoto[]>([]);

  const [contactName, setContactName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneDial, setPhoneDial] = React.useState('+91');
  const [phoneDigits, setPhoneDigits] = React.useState('');
  const [gstNumber, setGstNumber] = React.useState('');
  const [dialSheetOpen, setDialSheetOpen] = React.useState(false);

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const dialMeta = COUNTRY_DIAL_CODES.find((c) => c.dial === phoneDial);

  function clearError(key: string) {
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validateStep(s: number): boolean {
    const next: Record<string, string> = {};
    if (s === 1) {
      if (!hotelName.trim()) next.hotelName = 'Hotel name is required';
      if (!description.trim()) next.description = 'Description is required';
      if (!starRating) next.starRating = 'Please select a star rating';
    }
    if (s === 2) {
      if (!address.trim()) next.address = 'Street address is required';
      if (!cityName.trim()) next.cityName = 'City is required';
      if (!countryName) next.countryName = 'Please select a country';
    }
    if (s === 3) {
      if (amenities.length === 0) next.amenities = 'Please select at least one amenity';
    }
    if (s === 4) {
      if (photos.length === 0) next.photos = 'Please upload at least one photo';
    }
    if (s === 5) {
      if (!contactName.trim()) next.contactName = 'Contact name is required';
      if (!email.trim() || !isValidEmail(email)) next.email = 'Enter a valid email address';
      if (!phoneDigits.trim()) {
        next.phone = 'Phone number is required';
      } else if (dialMeta && !dialMeta.test(phoneDigits)) {
        next.phone = `Enter a valid ${dialMeta.hint} for ${phoneDial}`;
      }
      if (gstNumber && !GST_REGEX.test(gstNumber.toUpperCase())) {
        next.gstNumber = 'Enter a valid 15-character GST number (e.g. 22AAAAA0000A1Z5)';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goToStep(target: number) {
    setStep(target);
  }

  function handleNext() {
    if (!validateStep(step)) return;
    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => s - 1);
  }

  function toggleAmenity(amenity: string) {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
    clearError('amenities');
  }

  async function handleSubmit() {
    for (let s = 1; s <= 5; s++) {
      if (!validateStep(s)) {
        setStep(s);
        return;
      }
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setReferenceId(Math.random().toString(36).slice(2, 10).toUpperCase());
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <View className="bg-background flex-1 items-center justify-center gap-1 px-8" style={{ paddingTop: insets.top }}>
        <View className="bg-ltx-gold/15 mb-3 h-20 w-20 items-center justify-center rounded-full">
          <Icon as={CircleCheck} size={36} className="text-ltx-gold" />
        </View>
        <Text className="font-noto-serif text-foreground text-center text-[22px]">Application Submitted</Text>
        <Text className="font-montserrat text-muted-foreground mt-2 text-center text-[14px] leading-6">
          Thank you for your interest in partnering with WOCO Travel. Our team will review your application and get
          back to you within 3–5 business days.
        </Text>
        {referenceId ? (
          <Text className="font-montserrat text-muted-foreground mt-3 text-[12px]">
            Reference ID: <Text className="text-foreground font-semibold">{referenceId}</Text>
          </Text>
        ) : null}
        <Pressable
          onPress={() => router.replace('/')}
          className="bg-ltx-gold active:opacity-90 mt-8 items-center rounded-full px-8 py-3.5">
          <Text className="font-montserrat text-primary text-[13px] font-semibold uppercase tracking-[1.5px]">
            Return to Homepage
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="bg-background flex-1">
      <View className="border-border bg-background border-b" style={{ paddingTop: insets.top }}>
        <View className="h-14 flex-row items-center justify-between px-5">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Icon as={ChevronLeft} size={20} className="text-foreground" />
          </Pressable>
          <Logo />
          <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1.5px]">
            Partner
          </Text>
        </View>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 112 }}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
        showsVerticalScrollIndicator={false}>
        <StepProgress step={step} />

        <View className="border-border bg-background mt-6 gap-5 rounded-2xl border p-5">
          {step === 1 ? (
            <>
              <View className="gap-1">
                <Text className="font-noto-serif text-foreground text-[19px]">Tell us about your property</Text>
                <Text className="font-montserrat text-muted-foreground text-[13px]">
                  Provide the essential details about your hotel.
                </Text>
              </View>

              <View className="gap-1.5">
                <FieldLabel>Hotel / Property Name *</FieldLabel>
                <Input
                  value={hotelName}
                  onChangeText={(text) => {
                    setHotelName(text);
                    clearError('hotelName');
                  }}
                  placeholder="e.g. The Grand Hyatt Mumbai"
                  className="rounded-xl text-sm"
                />
                <FieldError message={errors.hotelName} />
              </View>

              <View className="gap-1.5">
                <FieldLabel>Description *</FieldLabel>
                <Input
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                    clearError('description');
                  }}
                  placeholder="Describe your property — its character, setting, and what makes it special…"
                  multiline
                  numberOfLines={4}
                  className="rounded-xl py-2.5 text-sm"
                  style={{ height: 110, textAlignVertical: 'top' }}
                />
                <FieldError message={errors.description} />
              </View>

              <View className="gap-1.5">
                <FieldLabel>Star Rating *</FieldLabel>
                <View className="flex-row flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const selected = starRating === String(n);
                    return (
                      <Pressable
                        key={n}
                        onPress={() => {
                          setStarRating(String(n));
                          clearError('starRating');
                        }}
                        className={cn(
                          'flex-row items-center gap-1 rounded-xl border px-3.5 py-2.5',
                          selected ? 'border-ltx-gold bg-ltx-gold/10' : 'border-border bg-secondary'
                        )}>
                        {Array.from({ length: n }).map((_, i) => (
                          <Icon
                            key={i}
                            as={Star}
                            size={13}
                            className={selected ? 'text-ltx-gold' : 'text-muted-foreground/40'}
                          />
                        ))}
                      </Pressable>
                    );
                  })}
                </View>
                <FieldError message={errors.starRating} />
              </View>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <View className="gap-1">
                <Text className="font-noto-serif text-foreground text-[19px]">Where is your property located?</Text>
                <Text className="font-montserrat text-muted-foreground text-[13px]">
                  Help guests and our team find you.
                </Text>
              </View>

              <View className="gap-1.5">
                <FieldLabel>Street Address</FieldLabel>
                <Input
                  value={address}
                  onChangeText={(text) => {
                    setAddress(text);
                    clearError('address');
                  }}
                  placeholder="e.g. 1234 Marine Drive, Nariman Point"
                  className="rounded-xl text-sm"
                />
                <FieldError message={errors.address} />
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 gap-1.5">
                  <FieldLabel>City</FieldLabel>
                  <Input
                    value={cityName}
                    onChangeText={(text) => {
                      setCityName(text);
                      clearError('cityName');
                    }}
                    placeholder="e.g. Mumbai"
                    className="rounded-xl text-sm"
                  />
                  <FieldError message={errors.cityName} />
                </View>
                <View className="flex-1 gap-1.5">
                  <FieldLabel>Country</FieldLabel>
                  <Pressable
                    onPress={() => setCountrySheetOpen(true)}
                    className="border-input bg-background h-10 flex-row items-center justify-between rounded-xl border px-3">
                    <Text
                      numberOfLines={1}
                      className={cn(
                        'font-montserrat flex-1 text-[13px]',
                        countryName ? 'text-foreground' : 'text-muted-foreground/50'
                      )}>
                      {countryName || 'Select'}
                    </Text>
                    <Icon as={ChevronDown} size={14} className="text-muted-foreground" />
                  </Pressable>
                  <FieldError message={errors.countryName} />
                </View>
              </View>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <View className="gap-1">
                <Text className="font-noto-serif text-foreground text-[19px]">What does your property offer?</Text>
                <Text className="font-montserrat text-muted-foreground text-[13px]">
                  Select all amenities available to guests.
                </Text>
              </View>

              <View className="flex-row flex-wrap gap-2">
                {AMENITIES_LIST.map((amenity) => {
                  const selected = amenities.includes(amenity);
                  return (
                    <Pressable
                      key={amenity}
                      onPress={() => toggleAmenity(amenity)}
                      style={{ width: '31%' }}
                      className={cn(
                        'flex-row items-center gap-2 rounded-xl border px-2.5 py-2.5',
                        selected ? 'border-ltx-gold bg-ltx-gold/10' : 'border-border bg-secondary'
                      )}>
                      <View
                        className={cn(
                          'h-4 w-4 items-center justify-center rounded border',
                          selected ? 'bg-ltx-gold border-ltx-gold' : 'border-border bg-background'
                        )}>
                        {selected ? <Icon as={Check} size={10} className="text-primary-foreground" /> : null}
                      </View>
                      <Text
                        numberOfLines={1}
                        className={cn(
                          'font-montserrat flex-1 text-[11px]',
                          selected ? 'text-ltx-gold font-semibold' : 'text-muted-foreground'
                        )}>
                        {amenity}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {amenities.length > 0 ? (
                <Text className="font-montserrat text-ltx-gold text-[12px]">
                  {amenities.length} amenit{amenities.length === 1 ? 'y' : 'ies'} selected
                </Text>
              ) : null}
              <FieldError message={errors.amenities} />
            </>
          ) : null}

          {step === 4 ? (
            <>
              <View className="gap-1">
                <Text className="font-noto-serif text-foreground text-[19px]">Add photos of your property</Text>
                <Text className="font-montserrat text-muted-foreground text-[13px]">Upload up to 10 photos.</Text>
              </View>

              <PhotoUploadGrid
                photos={photos}
                onChange={(next) => {
                  setPhotos(next);
                  clearError('photos');
                }}
              />
              <FieldError message={errors.photos} />
            </>
          ) : null}

          {step === 5 ? (
            <>
              <View className="gap-1">
                <Text className="font-noto-serif text-foreground text-[19px]">Contact & business details</Text>
                <Text className="font-montserrat text-muted-foreground text-[13px]">
                  We'll use these to reach you about your application.
                </Text>
              </View>

              <View className="gap-1.5">
                <FieldLabel>Contact Person Name *</FieldLabel>
                <Input
                  value={contactName}
                  onChangeText={(text) => {
                    setContactName(text);
                    clearError('contactName');
                  }}
                  placeholder="e.g. Priya Sharma"
                  className="rounded-xl text-sm"
                />
                <FieldError message={errors.contactName} />
              </View>

              <View className="gap-1.5">
                <FieldLabel>Business Email *</FieldLabel>
                <Input
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    clearError('email');
                  }}
                  placeholder="e.g. partnerships@yourhotel.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="rounded-xl text-sm"
                />
                <FieldError message={errors.email} />
              </View>

              <View className="gap-1.5">
                <FieldLabel>Phone Number *</FieldLabel>
                <View className="flex-row gap-2">
                  <Pressable
                    onPress={() => setDialSheetOpen(true)}
                    className="border-input bg-background h-10 flex-row items-center gap-1 rounded-xl border px-3">
                    <Text className="font-montserrat text-foreground text-[13px] font-semibold">{phoneDial}</Text>
                    <Icon as={ChevronDown} size={12} className="text-muted-foreground" />
                  </Pressable>
                  <Input
                    value={phoneDigits}
                    onChangeText={(text) => {
                      setPhoneDigits(text.replace(/\D/g, ''));
                      clearError('phone');
                    }}
                    placeholder="Phone number"
                    keyboardType="number-pad"
                    maxLength={dialMeta?.maxLen}
                    className="flex-1 rounded-xl"
                  />
                </View>
                <FieldError message={errors.phone} />
              </View>

              <View className="gap-1.5">
                <FieldLabel>GST Number (optional)</FieldLabel>
                <Input
                  value={gstNumber}
                  onChangeText={(text) => {
                    setGstNumber(text.toUpperCase());
                    clearError('gstNumber');
                  }}
                  placeholder="e.g. 22AAAAA0000A1Z5"
                  autoCapitalize="characters"
                  className="rounded-xl text-sm"
                />
                <FieldError message={errors.gstNumber} />
                <Text className="font-montserrat text-muted-foreground text-[11px]">
                  15-character GST registration number (India)
                </Text>
              </View>
            </>
          ) : null}

          {step === 6 ? (
            <>
              <View className="gap-1">
                <Text className="font-noto-serif text-foreground text-[19px]">Review your application</Text>
                <Text className="font-montserrat text-muted-foreground text-[13px]">
                  Check everything looks right before submitting.
                </Text>
              </View>

              <ReviewCard title="Basic Info" onEdit={() => goToStep(1)}>
                <View className="gap-1">
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">Hotel Name</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">{hotelName}</Text>
                  </View>
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">Star Rating</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">
                      {starRating ? `${starRating} star${starRating === '1' ? '' : 's'}` : '—'}
                    </Text>
                  </View>
                </View>
              </ReviewCard>

              <ReviewCard title="Location" onEdit={() => goToStep(2)}>
                <View className="gap-1">
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">Address</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">{address || '—'}</Text>
                  </View>
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">City</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">{cityName || '—'}</Text>
                  </View>
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">Country</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">{countryName || '—'}</Text>
                  </View>
                </View>
              </ReviewCard>

              <ReviewCard title="Contact" onEdit={() => goToStep(5)}>
                <View className="gap-1">
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">Contact Name</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">{contactName}</Text>
                  </View>
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">Email</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">{email}</Text>
                  </View>
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">Phone</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">
                      {phoneDigits ? `${phoneDial} ${phoneDigits}` : '—'}
                    </Text>
                  </View>
                  <View className="flex-row justify-between gap-4">
                    <Text className="font-montserrat text-muted-foreground text-[13px]">GST Number</Text>
                    <Text className="font-montserrat text-foreground text-[13px]">{gstNumber || '—'}</Text>
                  </View>
                </View>
              </ReviewCard>

              {description ? (
                <ReviewCard title="Description" onEdit={() => goToStep(1)}>
                  <Text numberOfLines={6} className="font-montserrat text-foreground text-[13px]">
                    {description}
                  </Text>
                </ReviewCard>
              ) : null}

              {amenities.length > 0 ? (
                <ReviewCard title="Amenities" onEdit={() => goToStep(3)}>
                  <View className="flex-row flex-wrap gap-1.5">
                    {amenities.map((amenity) => (
                      <View key={amenity} className="bg-ltx-gold/10 rounded-full px-3 py-1">
                        <Text className="font-montserrat text-ltx-gold text-[12px] font-medium">{amenity}</Text>
                      </View>
                    ))}
                  </View>
                </ReviewCard>
              ) : null}

              {photos.length > 0 ? (
                <ReviewCard title={`Photos (${photos.length})`} onEdit={() => goToStep(4)}>
                  <View className="flex-row flex-wrap gap-2">
                    {photos.slice(0, 5).map((photo, index) => (
                      <Image
                        key={photo.uri + index}
                        source={{ uri: photo.uri }}
                        style={{ width: 56, height: 56, borderRadius: 10 }}
                      />
                    ))}
                    {photos.length > 5 ? (
                      <View className="border-border bg-background h-14 w-14 items-center justify-center rounded-lg border">
                        <Text className="font-montserrat text-muted-foreground text-[12px]">
                          +{photos.length - 5}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </ReviewCard>
              ) : null}
            </>
          ) : null}
        </View>
      </KeyboardAwareScrollView>

      <View
        className="border-border bg-background absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t px-5 pt-3"
        style={{ paddingBottom: insets.bottom + 12 }}>
        <Pressable
          onPress={handleBack}
          disabled={step === 1}
          className="border-border flex-row items-center gap-1.5 rounded-full border px-5 py-3 disabled:opacity-40">
          <Icon as={ChevronLeft} size={16} className="text-muted-foreground" />
          <Text className="font-montserrat text-muted-foreground text-[13px] font-medium">Back</Text>
        </Pressable>

        {step < TOTAL_STEPS ? (
          <Pressable
            onPress={handleNext}
            className="bg-ltx-gold active:opacity-90 flex-row items-center gap-1.5 rounded-full px-6 py-3">
            <Text className="font-montserrat text-primary text-[13px] font-semibold uppercase tracking-[1px]">
              Continue
            </Text>
            <Icon as={ChevronRight} size={16} className="text-primary" />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleSubmit}
            disabled={submitting}
            className="bg-ltx-gold active:opacity-90 flex-row items-center gap-1.5 rounded-full px-6 py-3 disabled:opacity-60">
            {submitting ? (
              <Icon as={LoaderCircle} size={16} className="text-primary" />
            ) : (
              <Icon as={CircleCheck} size={16} className="text-primary" />
            )}
            <Text className="font-montserrat text-primary text-[13px] font-semibold uppercase tracking-[1px]">
              {submitting ? 'Submitting…' : 'Submit Application'}
            </Text>
          </Pressable>
        )}
      </View>

      <OptionSheet
        title="Select Country"
        open={countrySheetOpen}
        onOpenChange={setCountrySheetOpen}
        options={COUNTRIES.map((c) => ({ label: c, value: c }))}
        value={countryName}
        onChange={(value) => {
          setCountryName(value);
          clearError('countryName');
        }}
      />
      <OptionSheet
        title="Country Code"
        open={dialSheetOpen}
        onOpenChange={setDialSheetOpen}
        options={COUNTRY_DIAL_CODES.map((c) => ({ label: `${c.flag} ${c.dial}`, value: c.dial }))}
        value={phoneDial}
        onChange={setPhoneDial}
      />
    </View>
  );
}
