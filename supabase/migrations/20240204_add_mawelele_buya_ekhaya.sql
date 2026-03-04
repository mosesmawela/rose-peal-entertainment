-- Migration: Add Mawelele and Buya Ekhaya
-- Created: 2024-02-04

-- Insert Mawelele as an artist
INSERT INTO public.artists (name, slug, bio, spotify_id)
VALUES (
  'Mawelele',
  'mawelele',
  'South African artist known for soulful Afro-soul and contemporary sounds.',
  '3PPaPMwxGz7TECQkbvTzzM'
);

-- Insert "Buya Ekhaya" release
INSERT INTO public.releases (
  title,
  slug,
  artist_id,
  cover_url,
  release_date,
  type,
  description,
  is_featured,
  spotify_embed_url,
  link_tree_url
)
VALUES (
  'Buya Ekhaya',
  'buya-ekhaya',
  (SELECT id FROM public.artists WHERE slug = 'mawelele'),
  'https://ik.imagekit.io/mosesmawela/Rose%20Pearl/buya-ekhaya-cover.jpg',
  '2024-02-04',
  'single',
  'A heartfelt collaboration between Mawelele and Naledi Aphiwe, "Buya Ekhaya" is a soulful journey that speaks to coming home and finding peace.',
  true,
  'https://open.spotify.com/embed/album/3PPaPMwxGz7TECQkbvTzzM?utm_source=generator',
  'https://ffm.to/kd30nnp'
);
