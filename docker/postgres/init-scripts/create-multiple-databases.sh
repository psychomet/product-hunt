#!/bin/bash

set -e
set -u

# Function to create user and database
create_user_and_database() {
    local database=$1
    echo "  Creating user and database '$database'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE USER $database WITH PASSWORD '$database';
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

# Create the primary Vendure database
if [ "$POSTGRES_DB" != "vendure" ]; then
    create_user_and_database vendure
fi

# Create additional databases from the POSTGRES_ADDITIONAL_DATABASES environment variable
if [ -n "${POSTGRES_ADDITIONAL_DATABASES:-}" ]; then
    echo "Creating additional databases: $POSTGRES_ADDITIONAL_DATABASES"
    for db in $(echo $POSTGRES_ADDITIONAL_DATABASES | tr ',' ' '); do
        create_user_and_database $db
    done
    echo "Multiple databases created"
fi 