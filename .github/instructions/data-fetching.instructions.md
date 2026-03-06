description: Read this file to understand how to fetch data in the project

#Data Fetching Guidelines

This document outlines the best practices for fetching data in the project. Follow these guidelines to ensure consistency and maintainability across the codebase.

## 1. Use Server Components for Data Fetching
- Always fetch data in server components whenever possible. This allows for better performance and SEO benefits.
- Always avoid fetching data in client components.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in the component.

ALL helper functions in the /data directory should use Drizzle ORM to interact with the database. 