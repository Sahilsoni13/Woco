import { BookingCtaBar } from '@/components/hotel-detail/BookingCtaBar';
import { GoodToKnowSection } from '@/components/hotel-detail/GoodToKnowSection';
import { HotelAmenitiesSection } from '@/components/hotel-detail/HotelAmenitiesSection';
import { HotelDetailGallery } from '@/components/hotel-detail/HotelDetailGallery';
import { HotelOverview } from '@/components/hotel-detail/HotelOverview';
import { HotelReviewsSection } from '@/components/hotel-detail/HotelReviewsSection';
import { getHotelDetail } from '@/components/hotel-detail/mock-data';
import { RequestBookingSheet } from '@/components/hotel-detail/RequestBookingSheet';
import { RoomCollectionSection } from '@/components/hotel-detail/RoomCollectionSection';
import * as React from 'react';
import { View } from 'react-native';
import { PublicPageLayout } from './PublicPageLayout';
import { PublicPagePlaceholder } from './PublicPagePlaceholder';

type HotelDetailScreenProps = {
  id: string;
};

// Deliberately scoped to the "view + request" shape, not web's real booking
// engine (live TBO room search, multi-step passenger form with passport/PAN/
// GST fields, KYC gating, family-member selection) — see RequestBookingSheet
// for why. Everything else (gallery, overview, room catalog, reviews, good-
// to-know, amenities) is the real content, just templated from the shared
// hotel catalog since there's no per-hotel backend content either.
export function HotelDetailScreen({ id }: HotelDetailScreenProps) {
  const hotel = getHotelDetail(id);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  if (!hotel) {
    return (
      <PublicPageLayout>
        <PublicPagePlaceholder title="Hotel Not Found" />
      </PublicPageLayout>
    );
  }

  const selectedRoom = hotel.roomTypes.find((room) => room.id === selectedRoomId) ?? null;

  return (
    <View style={{ flex: 1 }}>
      <PublicPageLayout>
        <HotelDetailGallery hotel={hotel} />
        <HotelOverview hotel={hotel} />
        <RoomCollectionSection
          hotel={hotel}
          selectedRoomId={selectedRoomId}
          onSelectRoom={(roomId) => setSelectedRoomId(roomId === selectedRoomId ? null : roomId)}
        />
        <HotelReviewsSection />
        <GoodToKnowSection hotel={hotel} />
        <HotelAmenitiesSection />
      </PublicPageLayout>

      {selectedRoom ? <BookingCtaBar room={selectedRoom} onPress={() => setSheetOpen(true)} /> : null}

      <RequestBookingSheet open={sheetOpen} onOpenChange={setSheetOpen} hotelName={hotel.name} room={selectedRoom} />
    </View>
  );
}
