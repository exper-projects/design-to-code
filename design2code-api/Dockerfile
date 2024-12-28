FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY . /app

RUN pip install --no-cache-dir -r /app/requirements.txt

WORKDIR /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
