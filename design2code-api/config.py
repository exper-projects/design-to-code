from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str
    gemini_model: str

    class Config:
        env_file = ".env"


settings = Settings()
