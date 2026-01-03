# 🚜 Farm Monitoring System

**Real-time Video Analysis Dashboard for Animal Detection & Human Presence Monitoring**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

[Live Demo](https://smart-farm-monitoring-system-1.onrender.com/) | [Features](#-features) | [Quick Start](#-quick-start) | [Docs](#-documentation)

---

## 🎯 Overview

**Farm Monitoring System** is an intelligent video analysis platform designed for agricultural surveillance. It processes farm surveillance videos to detect animals, monitor human presence, and provide real-time insights through a modern, responsive dashboard.

The system combines a **React + Vite frontend** with a **Flask backend**, enabling farmers and security personnel to monitor their properties efficiently and receive instant alerts.

### ⚡ Key Capabilities
- 📹 **Video Upload & Processing** - Seamless video uploads with instant analysis
- 🐄 **Animal Detection** - Identifies cattle, sheep, goats, pigs, and chickens
- 👥 **Human Presence Detection** - Alerts for unauthorized personnel
- 📊 **Live Dashboard** - Real-time statistics and detection history
- 🔔 **Smart Alerts** - Visual notifications for security events
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

---

## ✨ Features

### 🎥 Video Analysis
- Drag-and-drop or click-to-upload functionality
- Real-time video processing and analysis
- Support for MP4, AVI, MOV formats
- Multiple video batch processing

### 🐾 Animal Detection
Detects multiple species:
- 🐄 Cattle
- 🐑 Sheep
- 🐐 Goats
- 🐷 Pigs
- 🐔 Chickens

Features:
- Count of animals detected
- Confidence scores
- Animal movement tracking
- Species statistics

### 👤 Human Presence Monitoring
- Real-time human figure detection
- Security alerts with visual indicators
- Threat assessment capabilities
- Time-stamped event logging

### 📊 Dashboard Features
- Live animal count statistics
- Human presence status indicator
- Detection history with details
- Export detection reports
- Color-coded alert system

### 🎨 Modern UI
- Clean, intuitive interface
- Tailwind CSS styling
- Lucide React icons
- Responsive for all devices
- WCAG 2.1 AA accessible

---

## 🛠️ Technology Stack

### Frontend
- React 18+ with TypeScript
- Vite (ultra-fast build tool)
- Tailwind CSS (utility-first styling)
- Lucide React (icon library)
- Axios (HTTP client)

### Backend
- Flask (Python web framework)
- Python 3.8+
- Werkzeug (WSGI utilities)

### Development & Deployment
- Node.js & npm
- Git version control
- Render.com hosting
- Docker support (optional)

---

## 📋 Prerequisites

### Required
- Node.js v16.0.0 or higher
- npm v7.0.0 or higher
- Python 3.8 or higher
- pip (Python package manager)
- Git v2.0.0 or higher

### Recommended
- VS Code (code editor)
- Postman (API testing)
- Docker (containerization)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/DastureSachin/Smart-Farm-Monitoring-System.git
cd Smart-Farm-Monitoring-System
```

### 2. Backend Setup (Flask)

```bash
# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

Backend runs at: **http://localhost:5000**

### 3. Frontend Setup (React + Vite)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

### 4. Access Application

Open browser and go to: **http://localhost:5173**

---

## 📁 Project Structure

```
Smart-Farm-Monitoring-System/
├── app.py                          # Flask backend
├── requirements.txt                # Python dependencies
├── package.json                    # Frontend dependencies
├── index.html                      # Frontend entry
├── vite.config.ts                  # Vite config
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js              # Tailwind config
├── src/                            # React source
│   ├── App.tsx                    # Main component
│   ├── main.tsx                   # React entry
│   ├── components/                # React components
│   ├── services/                  # API services
│   └── types/                     # Type definitions
├── uploads/                        # Video uploads
├── templates/                      # Flask templates
└── .gitignore
```

---

## 📝 Available Scripts

### Frontend Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build locally
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

### Backend Commands
```bash
python app.py                    # Start Flask server
FLASK_ENV=development python app.py  # Debug mode
```

---

## 💻 How to Use

### Step 1: Upload Video
- Click upload area or drag-and-drop
- Select farm surveillance video (MP4, AVI, MOV)
- Video uploads and analysis begins

### Step 2: View Results
- Dashboard shows detected animals
- Real-time statistics update
- Detection history appears below

### Step 3: Check Alerts
- Red alert banner if humans detected
- Security status updates
- Time-stamped events logged

### Step 4: Export Data
- Download detection reports
- Share analysis with team
- Archive results

---

## 🔧 Configuration

### Environment Variables

Create `.env` in root directory:

```env
# Flask Setup
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key

# Upload Settings
MAX_UPLOAD_SIZE=104857600
UPLOAD_FOLDER=uploads/
ALLOWED_EXTENSIONS=mp4,avi,mov,mkv

# API Configuration
API_URL=http://localhost:5000
API_TIMEOUT=30000

# Detection Settings
DETECTION_THRESHOLD=0.5
CONFIDENCE_THRESHOLD=0.7

# Logging
LOG_LEVEL=INFO
```

---

## 📊 API Endpoints

### Upload Video
**POST** `/api/upload`

```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@video.mp4"
```

Response:
```json
{
  "success": true,
  "file_id": "video_123",
  "filename": "video.mp4",
  "size": 52428800
}
```

### Analyze Video
**POST** `/api/analyze`

```json
{
  "file_id": "video_123"
}
```

Response:
```json
{
  "success": true,
  "detections": [
    {
      "timestamp": "2024-01-15 10:30:00",
      "animals": {
        "cattle": 3,
        "sheep": 2
      },
      "human_detected": false,
      "confidence": 0.95
    }
  ]
}
```

### Get Detections
**GET** `/api/detections`

Response:
```json
{
  "total_detections": 5,
  "detections": [
    {
      "id": 1,
      "timestamp": "2024-01-15 10:30:00",
      "animals": {
        "cattle": 3,
        "sheep": 2
      },
      "human_present": false
    }
  ]
}
```

---

## 🔌 Integrate Real Detection Models

### Option 1: OpenCV

```python
import cv2

def detect_animals(video_path):
    cap = cv2.VideoCapture(video_path)
    detections = []
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        # Your detection logic here
        # Using YOLO, R-CNN, or other models
        
    return detections
```

### Option 2: TensorFlow

```python
import tensorflow as tf

model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=True
)

def detect_with_tensorflow(frame):
    predictions = model.predict(frame)
    return predictions
```

---

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Set build command: `npm install && npm run build && pip install -r requirements.txt`
6. Set start command: `python app.py`
7. Add environment variables
8. Deploy!

### Docker Deployment

```dockerfile
FROM node:18-alpine as frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.9-slim
WORKDIR /app
COPY --from=frontend /app/dist ./dist
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app.py .
EXPOSE 5000
CMD ["python", "app.py"]
```

Build and run:
```bash
docker build -t farm-monitoring .
docker run -p 5000:5000 farm-monitoring
```

---

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Port 5000 already in use
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS errors
Add to `app.py`:
```python
from flask_cors import CORS
CORS(app)
```

### Video upload fails
Check:
- File size < MAX_UPLOAD_SIZE
- Supported format (mp4, avi, mov)
- uploads/ folder has write permissions

### Dependencies installation fails
```bash
# Clear cache
npm cache clean --force
pip cache purge

# Reinstall
rm -rf node_modules package-lock.json
npm install
pip install -r requirements.txt
```

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
- **[INSTALLATION.md](./docs/INSTALLATION.md)** - Detailed setup
- **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - How to contribute
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Solutions
- **[API_GUIDE.md](./docs/API_GUIDE.md)** - API reference
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

You can:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Use privately

---

## 📸 Screenshots

![Dashboard Screenshot](OutPut1.png)

*Farm Monitoring Dashboard - Real-time animal detection and alerts*

---

## 🎯 Roadmap

### Version 1.0 (Current) ✅
- ✅ Video upload & analysis
- ✅ Animal detection
- ✅ Human presence detection
- ✅ Live dashboard
- ✅ Alert system

### Version 1.1 (Planned)
- [ ] Real ML model integration
- [ ] Email notifications
- [ ] Multi-camera support
- [ ] Advanced analytics
- [ ] Mobile app

### Version 2.0 (Future)
- [ ] Cloud-based deployment
- [ ] Community features
- [ ] Third-party API
- [ ] Enterprise features

---

## 🙏 Acknowledgements

- Inspired by modern farm monitoring systems
- Built with React, Vite, Flask, and Tailwind CSS
- Icons by Lucide React
- Hosted on Render.com

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/DastureSachin/Smart-Farm-Monitoring-System/issues)
- **Discussions:** [GitHub Discussions](https://github.com/DastureSachin/Smart-Farm-Monitoring-System/discussions)
- **Live Demo:** [https://smart-farm-monitoring-system-1.onrender.com/](https://smart-farm-monitoring-system-1.onrender.com/)

---

## 👥 Authors

**Sachin Dasture** ([@DastureSachin](https://github.com/DastureSachin))

---

## ⭐ Show Your Support

If you find this project helpful:
- ⭐ Give it a star on GitHub
- 🔗 Share with others
- 💬 Provide feedback
- 🤝 Contribute improvements

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Made with ❤️ for Farmers and Agricultural Technology**

**Start monitoring your farm today! 🚀**
