import pathlib
import traceback
from fastapi import HTTPException
import google.generativeai as genai
from config import settings
from services.utils import read_from_file, decode_base64_to_file, unescape_string

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel(settings.gemini_model)

resources_path = pathlib.Path(__file__).parents[1] / "resources"


async def generate_response(img_type: str, img_base64: str, json: str, framework: str, styling_lib: str) -> str:
    try:
        print(f"started generating response using model: {settings.gemini_model}")
        img_file = f"example.{img_type.lower()}"
        decode_base64_to_file(img_base64, resources_path / img_file)
        uploaded_file = genai.upload_file(resources_path / img_file)
        print(f"file uploaded: {uploaded_file}")

        json = unescape_string(json)
        prompt = read_from_file(resources_path / "prompt.md")
        prompt = prompt.replace("{{ json_data }}", json)
        prompt = prompt.replace("{{ framework }}", framework)
        prompt = prompt.replace("{{ styling_lib }}", styling_lib)
        print(f"final prompt: {prompt}")

        # Generate code using the prompt and the uploaded file
        result = model.generate_content([uploaded_file, "\n\n", prompt])
        response = result.text
        print(f"gemini response: {response}")

        return response
    except TimeoutError as e:
        traceback.print_tb(e.__traceback__)
        raise HTTPException(status_code=500, detail="Timeout Error from Gemini server")
    except Exception as e:
        traceback.print_tb(e.__traceback__)
        raise HTTPException(status_code=500, detail=str(e))
