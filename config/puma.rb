# config/puma.rb

# Set the number of threads
max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

# Specifies the worker count for production
if ENV["RAILS_ENV"] == "production"
  require "concurrent-ruby"
  worker_count = Integer(ENV.fetch("WEB_CONCURRENCY") { Concurrent.physical_processor_count })
  workers worker_count if worker_count > 1
end

# Worker timeout in development
worker_timeout 3600 if ENV.fetch("RAILS_ENV", "development") == "development"

# Use TCP port instead of Unix socket for Windows
port ENV.fetch("PORT") { 3000 }

# Specifies the environment that Puma will run in
environment ENV.fetch("RAILS_ENV") { "development" }

# Allow puma to be restarted by `bin/rails restart` command
plugin :tmp_restart
