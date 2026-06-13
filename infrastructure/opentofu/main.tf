locals {
  name_prefix = "${var.project_name}-${var.environment}"

  planned_services = [
    "ecs-fargate",
    "rds-postgresql",
    "s3-artifacts",
    "kms-signing",
    "ecr-images",
    "opentelemetry",
  ]
}

output "scaffold" {
  description = "Documents the planned control-plane boundary without creating cloud resources."
  value = {
    name_prefix      = local.name_prefix
    region           = var.aws_region
    planned_services = local.planned_services
  }
}

