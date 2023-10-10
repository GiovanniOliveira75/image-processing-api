# Image Processing API

This Node.js API, built with TypeScript and Fastify, allows you to perform various image processing tasks. It leverages parallel computing, async/await, and promises to efficiently process images using the Sharp package. The API offers the following features:

1. **Upload Files by URL**: You can upload images from external URLs.

2. **Upload Files via Direct Upload**: You can also upload images directly to the API.

3. **Apply Watermark**: Apply watermarks to existing images.

## Getting Started

Follow these instructions to set up and run the Image Processing API on your local machine.

### Prerequisites

- Node.js v18 and npm installed on your system.

### Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/GiovanniOliveira75/image-processing-api.git
```

2. Navigate to the project directory.

```bash
cd image-processing-api
```

3. Install the required dependencies.

```bash
npm install
```

### Usage

1. Start the API server.

```bash
npm run dev
```

2. Use API endpoints to perform image processing tasks.

### API Endpoints

- `POST /process-images-from-url`: Upload images from URLs.
- `POST /process-images-from-upload`: Upload images via direct file upload.
- `POST /apply-watermark`: Apply watermarks to existing images.

## Configuration

You can configure the API by modifying the `.env` file. This file could contain the following variables:
- `PORT`: The port on which the API server will run. Defaults to `3000`.
- `NODE_ENV`: The environment in which the API will run. Defaults to `dev`.
- `APP_URL`: The URL of the API. Defaults to `http://localhost:3000`.

## Acknowledgments

- The Fastify and Sharp communities for their excellent libraries.