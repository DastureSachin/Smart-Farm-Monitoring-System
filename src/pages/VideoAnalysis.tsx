import React from 'react';
import VideoUploader from '../components/ui/VideoUploader';

const VideoAnalysis: React.FC = () => {
  const handleAnalysisComplete = (results: any) => {
    console.log('Analysis complete:', results);
    // You can add additional logic here to handle the analysis results
    // For example, save to state, send to a server, or update a dashboard
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Video Analysis</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <VideoUploader onAnalysisComplete={handleAnalysisComplete} />
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Upload Your Video</h3>
              <p className="text-gray-600 text-sm">Upload a video file from your device. We support MP4, WebM, and OGG formats.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Analyze</h3>
              <p className="text-gray-600 text-sm">Our AI will analyze the video for animal behavior, health indicators, and potential issues.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Get Insights</h3>
              <p className="text-gray-600 text-sm">View detailed analytics and insights about your livestock and farm conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysis;
