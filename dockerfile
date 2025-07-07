FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    git \
    nodejs \
    npm \
    postgresql-client \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -U pip

# Install Langflow from PyPI with PostgreSQL support
RUN pip install --no-cache-dir "langflow[postgresql]"

# Install additional PostgreSQL drivers to be sure
RUN pip install --no-cache-dir psycopg[binary] psycopg2-binary asyncpg

# Copy any custom files (for your styling changes later)
COPY . /app/

# Create necessary directories
RUN mkdir -p /app/langflow

EXPOSE 7860

CMD ["langflow", "run", "--host", "0.0.0.0", "--port", "7860"]