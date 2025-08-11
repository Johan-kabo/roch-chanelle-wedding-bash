import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image, Video, Download, Trash2, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  uploadedBy?: string;
  uploadedAt: Date;
}

const MediaUploadSection = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaderName, setUploaderName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!uploaderName.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez entrer votre nom avant d'uploader des fichiers.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
        // Simulate file upload - In real implementation, this would upload to Supabase Storage
        const fileUrl = URL.createObjectURL(file);
        const fileType = file.type.startsWith('image/') ? 'image' : 'video';
        
        const newFile: MediaFile = {
          id: Math.random().toString(36).substring(7),
          name: file.name,
          url: fileUrl,
          type: fileType,
          uploadedBy: uploaderName,
          uploadedAt: new Date()
        };

        setMediaFiles(prev => [...prev, newFile]);
      }

      toast({
        title: "Upload réussi !",
        description: `${files.length} fichier(s) uploadé(s) avec succès.`,
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Erreur d'upload",
        description: "Une erreur est survenue lors de l'upload.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (file: MediaFile) => {
    // In real implementation, this would download from Supabase Storage
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
    
    toast({
      title: "Téléchargement commencé",
      description: `Téléchargement de ${file.name}`,
    });
  };

  const handleDelete = (fileId: string) => {
    setMediaFiles(prev => prev.filter(file => file.id !== fileId));
    toast({
      title: "Fichier supprimé",
      description: "Le fichier a été supprimé avec succès.",
    });
  };

  return (
    <section id="photo-gallery" className="py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-primary animate-float" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Partagez vos souvenirs
            </h2>
            <Camera className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <p className="font-cormorant text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Uploadez et téléchargez les photos et vidéos de notre magnifique journée
          </p>
        </div>

        {/* Upload Section */}
        <Card className="p-8 mb-12 bg-card/50 backdrop-blur-sm border-border/50 opacity-0 animate-scale-in">
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-playfair text-2xl font-bold mb-2">Partager vos photos et vidéos</h3>
              <p className="text-muted-foreground">Aidez-nous à rassembler tous les souvenirs de cette belle journée</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div>
                <Label htmlFor="uploader-name">Votre nom</Label>
                <Input
                  id="uploader-name"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  placeholder="Entrez votre nom"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="file-upload">Sélectionner les fichiers</Label>
                <Input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || !uploaderName.trim()}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
              >
                {uploading ? "Upload en cours..." : "Choisir les fichiers"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Media Gallery */}
        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaFiles.map((file, index) => (
              <Card 
                key={file.id}
                className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-500 opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  {file.type === 'image' ? (
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Video className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-dancing text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-white/80">Par: {file.uploadedBy}</p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => handleDownload(file)}
                      className="h-8 w-8 bg-white/20 hover:bg-white/30"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(file.id)}
                      className="h-8 w-8 bg-red-500/20 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {file.type === 'image' ? (
                      <Image className="w-6 h-6 text-white" />
                    ) : (
                      <Video className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {mediaFiles.length === 0 && (
          <div className="text-center py-12 opacity-0 animate-delayed-fade-in-2">
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              Aucun fichier partagé pour le moment. Soyez les premiers à partager vos souvenirs !
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaUploadSection;