output "bucket_name" {
  description = "Name of the created GCS bucket"
  value       = google_storage_bucket.default.name
}

output "bucket_url" {
  description = "URL of the created GCS bucket"
  value       = google_storage_bucket.default.url
}

output "instance_name" {
  description = "Name of the compute instance"
  value       = google_compute_instance.default.name
}

output "instance_external_ip" {
  description = "External IP of the compute instance"
  value       = google_compute_instance.default.network_interface[0].access_config[0].nat_ip
}
