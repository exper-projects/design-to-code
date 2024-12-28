# Design2Code



## Getting started

1. Create environment
```bash
python3 -m venv .venv
```

2. Activate environment
```bash
source .venv/bin/activate 
```

3. Install dependencies
```bash
pip3 install -r requirements.txt
```

4. Create `.env` file
```
GEMINI_API_KEY=<YOUR_API_KEY>
GEMINI_MODEL=gemini-1.5-pro
```

5. Run application
```bash
uvicorn main:app --reload
```
 