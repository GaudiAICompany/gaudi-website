# gaudi-website
Any code related to the website for Gaudi AI 


## 📦 Project Structure

The back end is a Flask application

- `app/` — Core application logic, organized into submodules:
  - `routes/` — View functions and Blueprints
  - `models/` — Database schema
  - `services/` — Business logic and external integrations
  - `forms/` — WTForms for input validation and CSRF protection
  - `templates/` — HTML templates
  - `static/` — Frontend assets (CSS, JS, images)

- `config.py` — Environment-specific configuration classes
- `.env` — Runtime secrets and environment variables
- `requirements.txt` — Python dependencies
- `run.py` — Entry point for local development
- `wsgi.py` — Entry point for production deployment (e.g., Gunicorn)
- `README.md` — Project overview and setup instructions
