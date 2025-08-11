/*
  # Création de la table pour les fichiers média du mariage

  1. Nouvelle table
    - `media_files`
      - `id` (uuid, clé primaire)
      - `name` (text, nom du fichier)
      - `file_path` (text, chemin dans Supabase Storage)
      - `file_type` (text, 'image' ou 'video')
      - `uploaded_by` (text, nom de la personne)
      - `uploaded_at` (timestamp, date d'upload)
      - `file_size` (bigint, taille du fichier)

  2. Sécurité
    - Activer RLS sur la table `media_files`
    - Politique pour permettre la lecture à tous
    - Politique pour permettre l'insertion à tous (mariage public)
    - Politique pour permettre la suppression à tous
*/

-- Créer la table media_files
CREATE TABLE IF NOT EXISTS media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL CHECK (file_type IN ('image', 'video')),
  uploaded_by text NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  file_size bigint DEFAULT 0
);

-- Activer RLS
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous (mariage public)
CREATE POLICY "Tout le monde peut voir les fichiers média"
  ON media_files
  FOR SELECT
  TO public
  USING (true);

-- Politique pour permettre l'insertion à tous
CREATE POLICY "Tout le monde peut uploader des fichiers"
  ON media_files
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Politique pour permettre la suppression à tous
CREATE POLICY "Tout le monde peut supprimer des fichiers"
  ON media_files
  FOR DELETE
  TO public
  USING (true);

-- Créer un bucket pour les fichiers média s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('wedding-media', 'wedding-media', true)
ON CONFLICT (id) DO NOTHING;

-- Politique de storage pour permettre l'upload à tous
CREATE POLICY "Tout le monde peut uploader dans wedding-media"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'wedding-media');

-- Politique de storage pour permettre la lecture à tous
CREATE POLICY "Tout le monde peut voir les fichiers wedding-media"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'wedding-media');

-- Politique de storage pour permettre la suppression à tous
CREATE POLICY "Tout le monde peut supprimer dans wedding-media"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'wedding-media');