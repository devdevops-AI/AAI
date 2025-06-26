FROM python:3.11-slim
WORKDIR /llm
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY llm_server.py ./
CMD ["python", "llm_server.py"]
