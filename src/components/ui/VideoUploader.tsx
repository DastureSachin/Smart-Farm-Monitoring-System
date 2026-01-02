import React, { useState, useRef } from 'react';
import { Upload, X, Play, Pause, RotateCcw } from 'lucide-react';

interface VideoUploaderProps {
  onAnalysisComplete?: (results: any) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onAnalysisComplete }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
    }
  };

  const handleAnalyze = async () => {
    if (!videoFile) return;
    
    setIsAnalyzing(true);
    
    try {
      // In a real app, you would upload the video to your backend here
      // const formData = new FormData();
      // formData.append('video', videoFile);
      // const response = await fetch('/api/analyze-video', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const results = await response.json();
      
      // Mock analysis results (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResults = {
        duration: '2:45',
        objectsDetected: [
          { name: 'Cow', count: 5, confidence: 0.92 },
          { name: 'Person', count: 2, confidence: 0.89 },
          { name: 'Tractor', count: 1, confidence: 0.95 },
        ],
        anomalies: [
          { time: '00:32', type: 'Unusual Movement', confidence: 0.87 },
          { time: '01:45', type: 'Potential Distress', confidence: 0.76 },
        ],
        healthMetrics: {
          averageActivity: 'Moderate',
          restingTime: '45%',
          feedingTime: '30%',
          movingTime: '25%',
        },
      };
      
      setAnalysisResults(mockResults);
      onAnalysisComplete?.(mockResults);
    } catch (error) {
      console.error('Error analyzing video:', error);
      alert('Failed to analyze video. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoUrl('');
    setAnalysisResults(null);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Upload Video for Analysis</h2>
      
      {!videoFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="video-upload" className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
            <Upload className="w-10 h-10 text-gray-400" />
            <p className="text-gray-600">Drag and drop a video file here, or click to select</p>
            <p className="text-sm text-gray-500">Supported formats: MP4, WebM, OGG</p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full rounded-lg shadow-sm"
              controls={false}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button
                onClick={togglePlay}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={resetVideo}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={removeVideo}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-colors"
              title="Remove video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{videoFile.name}</h3>
              <p className="text-sm text-gray-500">
                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB • {videoFile.type.split('/')[1].toUpperCase()}
              </p>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isAnalyzing
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
            </button>
          </div>
        </div>
      )}

      {analysisResults && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Detected Objects</h4>
              <div className="space-y-2">
                {analysisResults.objectsDetected.map((obj: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{obj.name}</span>
                    <span className="text-gray-700 font-medium">
                      {obj.count} ({(obj.confidence * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Health Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Average Activity</span>
                  <span className="font-medium">{analysisResults.healthMetrics.averageActivity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resting Time</span>
                  <span className="font-medium">{analysisResults.healthMetrics.restingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Feeding Time</span>
                  <span className="font-medium">{analysisResults.healthMetrics.feedingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Moving Time</span>
                  <span className="font-medium">{analysisResults.healthMetrics.movingTime}</span>
                </div>
              </div>
            </div>

            {analysisResults.anomalies.length > 0 && (
              <div className="md:col-span-2 bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-700 mb-2">Anomalies Detected</h4>
                <ul className="space-y-2">
                  {analysisResults.anomalies.map((anomaly: any, index: number) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-red-700">{anomaly.type} at {anomaly.time}</span>
                      <span className="text-red-600 font-medium">
                        {(anomaly.confidence * 100).toFixed(1)}% confidence
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
