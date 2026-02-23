import { supabase } from '@/config/supabase';
import useUserStore from '@/store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { setUser, id, avatarUrl } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const uploadAvatar = useMutation({
    mutationFn: async (imageUri: string) => {
      console.log('📤 [Avatar] Starting upload:', imageUri);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const fileName = `${session.user.id}_${Date.now()}.jpg`;
      const filePath = `${session.user.id}/${fileName}`;
      console.log('📁 [Avatar] File path:', filePath);

      // For React Native, use FormData or direct file upload
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: fileName,
      } as any);

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, formData, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) {
        console.error('❌ [Avatar] Upload error:', uploadError);
        throw uploadError;
      }
      console.log('✅ [Avatar] Upload successful:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      console.log('🔗 [Avatar] Public URL:', publicUrl);

      if (avatarUrl) {
        console.log('🗑️ [Avatar] Deleting old avatar:', avatarUrl);
        const oldPath = avatarUrl.split('/avatars/')[1];
        if (oldPath) {
          await supabase.storage.from('avatars').remove([oldPath]);
        }
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', session.user.id);

      if (updateError) {
        console.error('❌ [Avatar] Profile update error:', updateError);
        throw updateError;
      }
      console.log('✅ [Avatar] Profile updated');

      return publicUrl;
    },
    onSuccess: (publicUrl) => {
      console.log('🎉 [Avatar] Success! New URL:', publicUrl);
      setUser({ avatarUrl: publicUrl });
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
    onError: (error) => {
      console.error('❌ [Avatar] Mutation error:', error);
    },
  });

  const pickAndUploadImage = async (source: 'camera' | 'gallery') => {
    try {
      setIsProcessing(true);
      console.log('📸 [Avatar] Picking image from:', source);

      let permissionResult;
      if (source === 'camera') {
        permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      } else {
        permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      if (!permissionResult.granted) {
        console.error('❌ [Avatar] Permission denied');
        throw new Error('Permission denied');
      }
      console.log('✅ [Avatar] Permission granted');

      const pickerOptions: ImagePicker.ImagePickerOptions = {
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      };

      const result = source === 'camera'
        ? await ImagePicker.launchCameraAsync(pickerOptions)
        : await ImagePicker.launchImageLibraryAsync(pickerOptions);

      if (result.canceled) {
        console.log('❌ [Avatar] User cancelled');
        setIsProcessing(false);
        return { success: false, canceled: true };
      }

      console.log('✅ [Avatar] Image selected:', result.assets[0].uri);
      await uploadAvatar.mutateAsync(result.assets[0].uri);

      setIsProcessing(false);
      console.log('🎉 [Avatar] All done!');
      return { success: true };
    } catch (error: any) {
      console.error('❌ [Avatar] Error:', error);
      setIsProcessing(false);
      return { success: false, error: error.message };
    }
  };

  return {
    pickAndUploadImage,
    isProcessing,
    isUploading: uploadAvatar.isPending,
  };
};
