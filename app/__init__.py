from flask import Flask

# TODO: add csrf protection to forms

def create_app(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)

    from app.routes.main import main_bp
    app.register_blueprint(main_bp)

    return app