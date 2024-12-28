from fastapi import APIRouter, HTTPException
from models.gemini_request import GeminiRequest
from models.gemini_response import GeminiResponse
from services import gemini_service as service

router = APIRouter()


@router.post("/generate", response_model=GeminiResponse)
async def generate_response(request: GeminiRequest):
    response = await service.generate_response(request.img_type, request.img_base64, request.json_string, request.framework, request.styling_lib)
    return GeminiResponse(response=response)
