
import { MOCK_ARTISTS } from "@/lib/mock/data";
import { ArtistProfileClient } from "@/components/suite/ArtistProfileClient";

export async function generateStaticParams() {
    return MOCK_ARTISTS.map((artist) => ({
        id: artist.id,
    }));
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ArtistProfileClient id={id} />;
}
