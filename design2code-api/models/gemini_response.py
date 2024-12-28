from pydantic import BaseModel


class GeminiResponse(BaseModel):
    response: str
