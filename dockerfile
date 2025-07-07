FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    git \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Copy the entire repository
COPY . /app/

# Install Langflow (assuming it has a setup.py or pyproject.toml)
RUN pip install --no-cache-dir -U pip && \
    pip install --no-cache-dir -e .

EXPOSE 7860

CMD ["langflow", "run", "--host", "0.0.0.0", "--port", "7860"]