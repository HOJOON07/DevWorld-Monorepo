import { useCallback, useState } from 'react';

export function useAvatarPreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      
      // 이미지 파일 검증
      if (!file.type.startsWith('image/')) {
        console.error('Please select an image file');
        return;
      }
      
      // 기존 URL 정리
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      // 새 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }
  }, [previewUrl]);
  
  const clearPreview = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);
  
  return { 
    previewUrl, 
    handleFileChange, 
    clearPreview 
  };
}