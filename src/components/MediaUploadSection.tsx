import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Image, Video, Download, Trash2, Camera, X, Grid, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase, type MediaFile } from "@/lib/supabase";

const MediaUploadSection = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [displayedFiles, setDisplayedFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaderName, setUploaderName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Charger les fichiers existants au démarrage
  useEffect(() => {
    loadMediaFiles();
  }, []);

  const loadMediaFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement:', error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les fichiers existants.",
          variant: "destructive",
        });
        return;
      }

      setMediaFiles(data || []);
      filterAndPaginateFiles(data || [], filter, 1);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndPaginateFiles = (files: MediaFile[], filterType: 'all' | 'image' | 'video', page: number) => {
    let filtered = files;
    if (filterType !== 'all') {
      filtered = files.filter(file => file.file_type === filterType);
    }
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedFiles(filtered.slice(startIndex, endIndex));
  };

  const handleFilterChange = (newFilter: 'all' | 'image' | 'video') => {
    setFilter(newFilter);
    setCurrentPage(1);
    filterAndPaginateFiles(mediaFiles, newFilter, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    filterAndPaginateFiles(mediaFiles, filter, page);
  };

  const getFilteredFiles = () => {
    return filter === 'all' ? mediaFiles : mediaFiles.filter(file => file.file_type === filter);
  };

  const totalPages = Math.ceil(getFilteredFiles().length / itemsPerPage);
  const totalFiles = getFilteredFiles().length;

  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('wedding-media')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

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
        const fileType = file.type.startsWith('image/') ? 'image' : 'video';
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${fileType}s/${fileName}`;

        // Upload vers Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('wedding-media')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Erreur upload storage:', uploadError);
          toast({
            title: "Erreur d'upload",
            description: `Erreur lors de l'upload de ${file.name}`,
            variant: "destructive",
          });
          continue;
        }

        // Sauvegarder les métadonnées en base
        const { data: newFile, error: dbError } = await supabase
          .from('media_files')
          .insert({
            name: file.name,
            file_path: filePath,
            file_type: fileType,
            uploaded_by: uploaderName,
            file_size: file.size
          })
          .select()
          .single();

        if (dbError) {
          console.error('Erreur base de données:', dbError);
          // Nettoyer le fichier uploadé en cas d'erreur DB
          await supabase.storage
            .from('wedding-media')
            .remove([filePath]);
          
          toast({
            title: "Erreur de sauvegarde",
            description: `Erreur lors de la sauvegarde de ${file.name}`,
            variant: "destructive",
          });
          continue;
        }

        // Ajouter le nouveau fichier à la liste
        if (newFile) {
          const updatedFiles = [newFile, ...mediaFiles];
          setMediaFiles(updatedFiles);
          filterAndPaginateFiles(updatedFiles, filter, currentPage);
        }
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
      console.error('Erreur générale:', error);
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
    const fileUrl = getFileUrl(file.file_path);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = file.name;
    link.target = '_blank';
    link.click();
    
    toast({
      title: "Téléchargement commencé",
      description: `Téléchargement de ${file.name}`,
    });
  };

  const handleDelete = async (file: MediaFile) => {
    try {
      // Supprimer de Supabase Storage
      const { error: storageError } = await supabase.storage
        .from('wedding-media')
        .remove([file.file_path]);

      if (storageError) {
        console.error('Erreur suppression storage:', storageError);
      }

      // Supprimer de la base de données
      const { error: dbError } = await supabase
        .from('media_files')
        .delete()
        .eq('id', file.id);

      if (dbError) {
        console.error('Erreur suppression DB:', dbError);
        toast({
          title: "Erreur de suppression",
          description: "Impossible de supprimer le fichier.",
          variant: "destructive",
        });
        return;
      }

      // Retirer de la liste locale
      const updatedFiles = mediaFiles.filter(f => f.id !== file.id);
      setMediaFiles(updatedFiles);
      filterAndPaginateFiles(updatedFiles, filter, currentPage);
      
      toast({
        title: "Fichier supprimé",
        description: "Le fichier a été supprimé avec succès.",
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section id="photo-gallery" className="py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground text-lg">
              Chargement des souvenirs...
            </p>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Gallery Controls */}
        {mediaFiles.length > 0 && (
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('all')}
                  className="text-sm"
                >
                  Tous ({mediaFiles.length})
                </Button>
                <Button
                  variant={filter === 'image' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('image')}
                  className="text-sm"
                >
                  Photos ({mediaFiles.filter(f => f.file_type === 'image').length})
                </Button>
                <Button
                  variant={filter === 'video' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('video')}
                  className="text-sm"
                >
                  Vidéos ({mediaFiles.filter(f => f.file_type === 'video').length})
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'masonry' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('masonry')}
              >
                <Grid className="w-4 h-4 mr-2" />
                Mosaïque
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grille
              </Button>
            </div>
          </div>
        )}

        {/* Media Gallery */}
        {totalFiles > 0 && (
          <>
            <div className={`${
              viewMode === 'masonry' 
                ? 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6' 
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            }`}>
              {displayedFiles.map((file, index) => (
                <Card 
                  key={file.id}
                  className={`group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-500 opacity-0 animate-scale-in ${
                    viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className={`relative overflow-hidden cursor-pointer ${
                      viewMode === 'masonry' ? 'aspect-auto' : 'aspect-square'
                    }`}
                    onClick={() => setSelectedMedia(file)}
                  >
                    {file.file_type === 'image' ? (
                      <img 
                        src={getFileUrl(file.file_path)} 
                        alt={file.name}
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                          viewMode === 'masonry' ? 'h-auto' : 'h-full'
                        }`}
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-full bg-muted flex items-center justify-center ${
                        viewMode === 'masonry' ? 'aspect-video' : 'h-full'
                      }`}>
                        <Video className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-dancing text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-white/80">Par: {file.uploaded_by}</p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(file);
                      }}
                      className="h-8 w-8 bg-white/20 hover:bg-white/30"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file);
                      }}
                      className="h-8 w-8 bg-red-500/20 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {file.file_type === 'image' ? (
                      <Image className="w-6 h-6 text-white" />
                    ) : (
                      <Video className="w-6 h-6 text-white" />
                    )}
                  </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="text-center mt-6 text-sm text-muted-foreground">
              Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, totalFiles)} sur {totalFiles} fichiers
            </div>
          </>
        )}

        {mediaFiles.length === 0 && (
          <div className="text-center py-12 opacity-0 animate-delayed-fade-in-2">
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              Aucun fichier partagé pour le moment. Soyez les premiers à partager vos souvenirs !
            </p>
          </div>
        )}

        {/* Media Viewer Modal */}
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95 border-0">
            <DialogTitle className="sr-only">
              {selectedMedia?.name}
            </DialogTitle>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 h-10 w-10"
              >
                <X className="w-6 h-6" />
              </Button>

              {selectedMedia && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full h-full flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-4">
                      {selectedMedia.file_type === 'image' ? (
                        <img 
                          src={getFileUrl(selectedMedia.file_path)} 
                          alt={selectedMedia.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <video 
                          src={getFileUrl(selectedMedia.file_path)}
                          controls
                          className="max-w-full max-h-full"
                          autoPlay
                        />
                      )}
                    </div>
                    
                    <div className="p-6 bg-black/50 text-white">
                      <h3 className="font-playfair text-xl font-bold mb-2">{selectedMedia.name}</h3>
                      <p className="text-white/80 mb-4">Partagé par: {selectedMedia.uploaded_by}</p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleDownload(selectedMedia)}
                          className="bg-primary hover:bg-primary/80"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleDelete(selectedMedia);
                            setSelectedMedia(null);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MediaUploadSection;