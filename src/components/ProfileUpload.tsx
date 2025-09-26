import { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export const ProfileUpload = () => {
  const [profile, setProfile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload for demo
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile picture has been updated successfully"
      });
      setUploading(false);
    }, 2000);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const getInitials = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.fullName?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';
    }
    return 'U';
  };

  return (
    <div className="relative inline-block">
      <Avatar className="w-16 h-16">
        <AvatarImage src={profile?.avatar_url} alt="Profile" />
        <AvatarFallback className="text-lg font-semibold">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
      
      <Button
        onClick={triggerFileSelect}
        disabled={uploading}
        size="sm"
        variant="secondary"
        className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0"
      >
        {uploading ? (
          <Upload className="w-4 h-4 animate-spin" />
        ) : (
          <Camera className="w-4 h-4" />
        )}
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};