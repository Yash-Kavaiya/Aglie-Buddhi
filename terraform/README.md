# GCP Infrastructure with Terraform

This directory contains Terraform configuration for deploying infrastructure to Google Cloud Platform.

## Prerequisites

1. **Install Terraform**: Download from [terraform.io](https://www.terraform.io/downloads)
2. **Install gcloud CLI**: Follow [GCP documentation](https://cloud.google.com/sdk/docs/install)
3. **Authenticate with GCP**:
   ```bash
   gcloud auth application-default login
   ```
4. **Set your GCP project**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

## Setup

1. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Edit `terraform.tfvars` with your GCP project details:
   ```hcl
   project_id  = "your-gcp-project-id"
   region      = "us-central1"
   environment = "dev"
   ```

## Deployment

1. **Initialize Terraform** (downloads providers):
   ```bash
   terraform init
   ```

2. **Format code** (optional but recommended):
   ```bash
   terraform fmt
   ```

3. **Validate configuration**:
   ```bash
   terraform validate
   ```

4. **Preview changes**:
   ```bash
   terraform plan
   ```

5. **Apply changes**:
   ```bash
   terraform apply
   ```

6. **View outputs**:
   ```bash
   terraform output
   ```

## What's Deployed

- **GCS Bucket**: Storage bucket with versioning and lifecycle rules
- **Compute Instance**: e2-micro VM instance running Debian 11

## Cleanup

To destroy all resources:
```bash
terraform destroy
```

## Security Notes

- Never commit `terraform.tfvars` or `.tfstate` files
- Use service accounts with minimal permissions for production
- Enable GCP APIs required for your resources
- Consider using remote state (GCS backend) for team collaboration

## Next Steps

- Add more resources (Cloud Run, Cloud Functions, VPC, etc.)
- Set up remote state backend
- Configure workspaces for multiple environments
- Add CI/CD pipeline integration
