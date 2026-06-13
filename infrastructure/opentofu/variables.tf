variable "project_name" {
  description = "Stable infrastructure project identifier."
  type        = string
  default     = "tenvra"
}

variable "aws_region" {
  description = "Planned AWS region for the pilot control plane."
  type        = string
  default     = "eu-north-1"
}

variable "environment" {
  description = "Deployment environment. This scaffold does not deploy resources."
  type        = string
  default     = "development"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "environment must be development, staging, or production."
  }
}

