# Example: Create a GCS bucket
resource "google_storage_bucket" "default" {
  name          = "${var.project_id}-${var.environment}-bucket"
  location      = var.region
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 90
    }
    action {
      type = "Delete"
    }
  }

  labels = {
    environment = var.environment
    managed_by  = "terraform"
  }
}

# Example: Create a Compute Engine instance
resource "google_compute_instance" "default" {
  name         = "${var.environment}-instance"
  machine_type = "e2-micro"
  zone         = "${var.region}-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
    access_config {
      # Ephemeral public IP
    }
  }

  labels = {
    environment = var.environment
    managed_by  = "terraform"
  }

  tags = ["web", var.environment]
}
