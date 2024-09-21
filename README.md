# Boardify

## Overview

Collaborate on documents and whiteboards in one unified platform for maximum productivity.

- Whiteboard Tools
- Document Editing
- Real-Time Collaboration
- Customizable Themes
- Easy Export and Sharing

## Getting Started

To get started with the project, follow the instructions below.

### Prerequisites

- Node.js (v14.x or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ashukumar2001/boardify.git
   cd boardify
   ```

2. Install the dependencies:

   If you are using npm:

   ```sh
   npm install
   ```

   If you are using yarn:

   ```sh
   yarn install
   ```

### Setup Environment Variables

1. Copy the example environment file to `.env.local`:

   ```sh
   cp .env.example .env.local
   ```

2. Open the `.env.local` file and fill in the required values:

   ```plaintext
   LIVEBLOCKS_SECRET=
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=
   CONVEX_DEPLOY_KEY=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_BASE_URL=
   R2_BUCKET_PUBLIC_URL=
   R2_ACCESS_KEY_ID=
   R2_ACCOUNT_ID=
   R2_SECRET_ACCESS_KEY=
   R2_S3_ENDPOINT=
   R2_BUCKET=
   ```

   - `LIVEBLOCKS_SECRET`: Your Liveblocks secret key.
   - `CONVEX_DEPLOYMENT`: Your Convex deployment identifier.
   - `NEXT_PUBLIC_CONVEX_URL`: The public URL of your Convex deployment.
   - `CONVEX_DEPLOY_KEY`: Your Convex deploy key.
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key.
   - `CLERK_SECRET_KEY`: Your Clerk secret key.
   - `NEXT_PUBLIC_BASE_URL`: The base URL of your application.
   - `R2_BUCKET_PUBLIC_URL`: Public URL of your R2 bucket.
   - `R2_ACCESS_KEY_ID`: Your R2 access key ID.
   - `R2_ACCOUNT_ID`: Your R2 account ID.
   - `R2_SECRET_ACCESS_KEY`: Your R2 secret access key.
   - `R2_S3_ENDPOINT`: Your R2 S3 endpoint.
   - `R2_BUCKET`: The name of your R2 bucket.

### Running the Project

To start the development server:

If you are using npm:

```sh
npm run dev
```
