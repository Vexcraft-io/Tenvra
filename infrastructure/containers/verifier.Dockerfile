FROM python:3.14.2-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN useradd --create-home --uid 10001 verifier
WORKDIR /app
COPY workers/verifier/pyproject.toml ./
COPY workers/verifier/src ./src
RUN pip install --no-cache-dir .

USER verifier
ENTRYPOINT ["tenvra-verifier"]

