import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # TODO set env variables using getenv
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False