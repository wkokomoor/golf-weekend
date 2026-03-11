# The Handicap Report — Deployment Guide

Myrtle Beach Golf Weekend dashboard, deployed to Google Cloud Run via Cloud Build.

## Project Structure

```
golf-site/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.jsx          ← the dashboard component
├── Dockerfile            ← multi-stage: node build → nginx serve
├── nginx.conf            ← serves on port 8080 for Cloud Run
├── cloudbuild.yaml       ← Cloud Build pipeline
├── package.json
└── .dockerignore
```

## Prerequisites

- Google Cloud project with billing enabled
- `gcloud` CLI installed and authenticated
- Cloud Build and Cloud Run APIs enabled

## One-Time Setup

### 1. Set your project

```bash
export PROJECT_ID=your-gcp-project-id
gcloud config set project $PROJECT_ID
```

### 2. Enable required APIs

```bash
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com
```

### 3. Create an Artifact Registry repository

```bash
gcloud artifacts repositories create golf-site \
  --repository-format=docker \
  --location=us-central1 \
  --description="Golf handicap report images"
```

### 4. Grant Cloud Build permission to deploy to Cloud Run

```bash
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud iam service-accounts add-iam-policy-binding \
  ${PROJECT_NUMBER}-compute@developer.gserviceaccount.com \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

## Deploy

### Option A: Manual deploy via Cloud Build

From the `golf-site/` directory:

```bash
gcloud builds submit --config=cloudbuild.yaml .
```

### Option B: Connect to a Git repo for auto-deploy

1. Push this folder to a GitHub/Cloud Source repo
2. In the Cloud Console, go to **Cloud Build → Triggers**
3. Create a trigger pointed at your repo/branch
4. Set the build config to `cloudbuild.yaml`

Every push will auto-build and deploy.

## After Deployment

Get your service URL:

```bash
gcloud run services describe handicap-report \
  --region=us-central1 \
  --format='value(status.url)'
```

Share that URL with the family!

## Local Development

```bash
npm install
npm start
```

Opens at http://localhost:3000.

## Customization Notes

- **Region**: The `cloudbuild.yaml` uses `us-central1`. Change it to match your preferred region.
- **Repository name**: If you already have an Artifact Registry repo, update the image paths in `cloudbuild.yaml` to match.
- **Scaling**: Set to 0–3 instances. A static site like this costs nearly nothing when idle.
- **Adding scores**: Update the `RAW` array in `src/App.jsx` with new rounds each year.
