# AAI Infrastructure Setup

This repository contains sample code to deploy a minimal version of the architecture described for the secure, air-gapped automation system. The `infra` directory includes a `docker-compose` configuration and placeholder services for:

- **Admin UI** - allows prompt-based code generation.
- **Operator UI** - executes cataloged artifacts.
- **Catalog DB** - PostgreSQL database for storing generated code metadata.
- **Execution Engine** - runs Terraform/Ansible/Kubernetes tasks.
- **Local LLM** - represents the local language model service.

The components run on an isolated `intranet` Docker network.

## Running

Ensure Docker is installed, then run:

```bash
docker-compose -f infra/docker-compose.yml up -d
```

This spins up the services using the provided Dockerfiles. Replace the placeholder Python applications with real implementations as needed.
