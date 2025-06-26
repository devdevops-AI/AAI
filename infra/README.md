# Infrastructure Setup

This sample infrastructure uses `docker-compose` to deploy components described in the architecture:

- `admin_ui`: Web interface for administrators to generate infrastructure code via the local LLM.
- `operator_ui`: Web interface for operators to execute cataloged artifacts.
- `catalog-db`: PostgreSQL database storing catalog entries.
- `execution_engine`: Service responsible for running Terraform, Ansible, or Kubernetes commands.
- `llm`: Placeholder service representing the local LLM.

All services communicate over an isolated `intranet` network.

## Usage

```bash
docker-compose up -d
```

This will build the container images and start the services. You can modify the individual Dockerfiles to integrate actual application code.
