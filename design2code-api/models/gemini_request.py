from pydantic import BaseModel


class GeminiRequest(BaseModel):
    img_type: str = 'png'
    img_base64: str
    json_string: str
    framework: str
    styling_lib: str
