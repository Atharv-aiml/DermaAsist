import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Image as ImageIcon, AlertTriangle, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { assessmentService } from '@/services/assessment.service';

export default function NewAssessmentPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputMethod, setInputMethod] = useState<'camera' | 'gallery' | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCheckingQuality, setIsCheckingQuality] = useState(false);
  const [qualityCheckResult, setQualityCheckResult] = useState<{ isAcceptable: boolean, issues: string[] } | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async (mode = facingMode) => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser/environment.");
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode }
      });
      setStream(newStream);
      setCameraError(null);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(err.message || t('assessment.cameraError') || "Camera access denied or unavailable.");
    }
  };

  const handleSelectCamera = () => {
    setInputMethod('camera');
    startCamera();
  };

  const handleSelectGallery = () => {
    setInputMethod('gallery');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const switchCamera = () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageUrl);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
        checkImageQuality(imageUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        checkImageQuality(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkImageQuality = (imageUrl: string) => {
    setIsCheckingQuality(true);
    // Simulate image quality check
    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const issues = [];
        let isAcceptable = true;
        
        if (img.width < 200 || img.height < 200) {
          issues.push(t('assessment.qualityIssues.tooSmall') || 'Image resolution is too low.');
          isAcceptable = false;
        }
        
        // Mocking a brightness check
        const isTooDark = Math.random() > 0.9; 
        if (isTooDark) {
          issues.push(t('assessment.qualityIssues.tooDark') || 'Image appears too dark.');
          isAcceptable = false;
        }

        setQualityCheckResult({ isAcceptable, issues });
        setIsCheckingQuality(false);
      };
      img.src = imageUrl;
    }, 1500);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setQualityCheckResult(null);
    if (inputMethod === 'camera') {
      startCamera();
    } else {
      setInputMethod(null);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dataURLtoFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(','), mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) return null;
    let mime = mimeMatch[1];
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  };

  const handleContinue = async () => {
    if (!capturedImage) return;
    setIsSubmitting(true);
    try {
      const file = dataURLtoFile(capturedImage, 'assessment-image.jpg');
      if (!file) throw new Error('Invalid image data');
      
      const assessmentData = await assessmentService.createAssessment();
      const assessmentId = assessmentData.data.id;
      
      await assessmentService.uploadImage(assessmentId, file);
      navigate(`/assessment/${assessmentId}/questionnaire`);
    } catch (err) {
      console.error(err);
      alert('Failed to create assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('assessment.newTitle') || 'New Assessment'}</h1>
        <p className="text-slate-600">{t('assessment.newSubtitle') || 'Provide an image of the affected area for AI analysis.'}</p>
      </div>

      {!inputMethod && !capturedImage && (
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="hover:border-teal-500 cursor-pointer transition-colors shadow-sm hover:shadow-md" onClick={handleSelectCamera}>
            <CardContent className="flex flex-col items-center justify-center p-10 space-y-4">
              <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                <Camera size={40} />
              </div>
              <h3 className="text-xl font-semibold">{t('assessment.useCamera') || 'Take Photo'}</h3>
              <p className="text-center text-sm text-slate-500">{t('assessment.useCameraDesc') || 'Use your device camera to capture the skin condition directly.'}</p>
            </CardContent>
          </Card>
          
          <Card className="hover:border-purple-500 cursor-pointer transition-colors shadow-sm hover:shadow-md" onClick={handleSelectGallery}>
            <CardContent className="flex flex-col items-center justify-center p-10 space-y-4">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <ImageIcon size={40} />
              </div>
              <h3 className="text-xl font-semibold">{t('assessment.uploadGallery') || 'Upload from Gallery'}</h3>
              <p className="text-center text-sm text-slate-500">{t('assessment.uploadGalleryDesc') || 'Select an existing photo from your device storage.'}</p>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2 mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">{t('assessment.guidelinesTitle') || 'Photo Guidelines:'}</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>{t('assessment.guideline1') || 'Ensure good lighting (natural light is best)'}</li>
                <li>{t('assessment.guideline2') || 'Keep the camera steady and focus on the affected area'}</li>
                <li>{t('assessment.guideline3') || 'Take the photo from about 10-15 cm away'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleFileUpload} />

      {inputMethod === 'camera' && !capturedImage && (
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {cameraError ? (
            <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg w-full">
              <p className="mb-4">{cameraError}</p>
              <Button onClick={() => setInputMethod(null)}>{t('common.cancel')}</Button>
            </div>
          ) : (
            <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-[3/4] md:aspect-video shadow-lg">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-white/20 m-8 rounded-lg pointer-events-none"></div>
              
              <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8">
                <Button variant="outline" size="icon" className="bg-white/20 border-white/50 text-white rounded-full h-12 w-12 backdrop-blur-sm" onClick={() => setInputMethod(null)}>
                  <RefreshCw className="w-5 h-5" />
                </Button>
                
                <button onClick={capturePhoto} className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white">
                  <div className="w-16 h-16 bg-white rounded-full"></div>
                </button>
                
                <Button variant="outline" size="icon" className="bg-white/20 border-white/50 text-white rounded-full h-12 w-12 backdrop-blur-sm" onClick={switchCamera}>
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {capturedImage && (
        <div className="max-w-xl mx-auto">
          <Card className="overflow-hidden shadow-lg border-t-4 border-t-teal-600">
            <div className="relative aspect-video bg-slate-100 flex items-center justify-center overflow-hidden">
              <img src={capturedImage} alt="Captured" className="max-w-full max-h-full object-contain" />
              
              {isCheckingQuality && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
                  <p className="text-teal-800 font-medium">{t('assessment.checkingQuality') || 'Checking image quality...'}</p>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              {!isCheckingQuality && qualityCheckResult && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {qualityCheckResult.isAcceptable ? (
                    <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{t('assessment.qualityGood') || 'Image quality looks good!'}</p>
                        <p className="text-sm opacity-90">{t('assessment.qualityGoodDesc') || 'We can proceed with the analysis.'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-2">{t('assessment.qualityPoor') || 'Image quality might be poor.'}</p>
                        <ul className="list-disc pl-4 text-sm space-y-1">
                          {qualityCheckResult.issues.map((issue, idx) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" className="flex-1" onClick={handleRetake}>
                      {t('assessment.retakePhoto') || 'Retake Photo'}
                    </Button>
                    <Button 
                      className="flex-1 bg-teal-600 hover:bg-teal-700" 
                      onClick={handleContinue}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Uploading...' : t('common.continue')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
