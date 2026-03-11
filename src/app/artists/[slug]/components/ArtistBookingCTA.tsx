import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ArtistBookingCTAProps {
  artistName: string;
}

export function ArtistBookingCTA({ artistName }: ArtistBookingCTAProps) {
  return (
    <div className="mt-20 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-2xl p-8 lg:p-12 border border-white/10 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Book {artistName}</h2>
      <p className="text-white/60 mb-6 max-w-xl mx-auto">
        Interested in booking {artistName} for your event or collaboration? Get in touch with our team.
      </p>
      <Link href="/contact">
        <Button variant="primary" className="rounded-full px-8 py-3">
          Contact for Booking
        </Button>
      </Link>
    </div>
  );
}
