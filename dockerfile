FROM python:3.10-slim

WORKDIR /app

# Install system dependencies including PostgreSQL development files
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    git \
    nodejs \
    npm \
    postgresql-client \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the entire repository
COPY . /app/

# Install Python dependencies
RUN pip install --no-cache-dir -U pip

# Install psycopg (PostgreSQL adapter) and asyncpg
RUN pip install --no-cache-dir psycopg psycopg-binary asyncpg

# Install Langflow with all dependencies
RUN pip install --no-cache-dir -e .

EXPOSE 7860

CMD ["langflow", "run", "--host", "0.0.0.0", "--port", "7860"]