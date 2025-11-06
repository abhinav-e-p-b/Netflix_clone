# Netflix Clone 🎬  
![License](https://img.shields.io/github/license/abhinav-e-p-b/Netflix_clone)
![Issues](https://img.shields.io/github/issues/abhinav-e-p-b/Netflix_clone)
![Forks](https://img.shields.io/github/forks/abhinav-e-p-b/Netflix_clone)
![Stars](https://img.shields.io/github/stars/abhinav-e-p-b/Netflix_clone)
![Last Commit](https://img.shields.io/github/last-commit/abhinav-e-p-b/Netflix_clone)

A full-stack Netflix clone built using **React**, **Python**, and **Docker**, designed to replicate the Netflix streaming interface and functionality.

---

## 🚀 Features  
- Netflix-style responsive UI  
- Movie/show listings and details  
- Authentication (Login/Register)  
- RESTful backend API  
- Dockerized setup (frontend + backend + nginx)  
- Configurable environment variables  

---

## 🛠️ Tech Stack  
**Frontend:** React (JavaScript)  
**Backend:** Python (Flask/FastAPI)  
**Containerization:** Docker + nginx  
**Other:** HTML, CSS, Shell, Automation Scripts  

---

## 📁 Project Structure  
```
Netflix_clone/
├── backend/         # Python API service
├── frontend/        # React app
├── scripts/         # Helper scripts
├── nginx.conf       # Reverse proxy configuration
├── Dockerfile       # Docker build file
└── .env.example     # Example environment file
```

---

## ⚙️ Setup Instructions  
### Prerequisites  
- Node.js + npm  
- Python 3.x  
- Docker & Docker Compose  
- Git  

### Clone the repository  
```bash
git clone https://github.com/abhinav-e-p-b/Netflix_clone.git
cd Netflix_clone
```

### Frontend Setup  
```bash
cd frontend
npm install
npm start
```

### Backend Setup  
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate (Windows)
pip install -r requirements.txt
python app.py
```

### Run with Docker  
```bash
docker build -t netflix-clone .
docker run -p 80:80 netflix-clone
```

---

## ⚙️ Environment Variables  
Create a `.env` file based on `.env.example`:
```
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
API_KEY=your_api_key
```

---

## 🧪 Testing  
```bash
cd backend
pytest
```

---

## 🌍 Deployment  
- Deploy frontend on Vercel/Netlify  
- Deploy backend via Render/Heroku  
- Optionally use Docker Compose for production environments  

---

## 🤝 Contributing  
Contributions are welcome!  
1. Fork this repository  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Commit changes (`git commit -m "Add new feature"`)  
4. Push and open a Pull Request  

---

## 📜 License  
This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author  
**Abhinav E. P. B.**  
GitHub: [@abhinav-e-p-b](https://github.com/abhinav-e-p-b)

---

⭐ **If you like this project, please give it a star!** ⭐
