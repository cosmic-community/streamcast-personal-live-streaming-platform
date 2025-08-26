# StreamCast - Personal Live Streaming Platform

![StreamCast Preview](https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=300&fit=crop&auto=format)

A professional live streaming platform built with Next.js, Mux video infrastructure, and Cosmic CMS. Create, manage, and broadcast live streams with real-time analytics and viewer engagement.

## Features

- 🎥 **Live Stream Management** - Create and configure live streams with custom metadata
- 📊 **Real-time Analytics** - Track viewer metrics and stream performance
- 🎮 **Professional Dashboard** - Intuitive interface for stream management
- 📱 **Responsive Design** - Optimized for desktop and mobile viewing
- 🚀 **Low-latency Streaming** - Powered by Mux's video infrastructure
- 💾 **Content Management** - Organized stream data with Cosmic CMS
- 🔄 **Real-time Updates** - Live stream status monitoring with webhooks
- 🎯 **Custom Branding** - Personalized streaming experience

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ae06821f09167261d591f5&clone_repository=68ae093e1f09167261d59225)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Using the MUX MCP build a live streaming site for me to use.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Mux** - Video streaming infrastructure
- **Cosmic CMS** - Headless content management
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic CMS account and bucket
- Mux account with API credentials

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables (see Environment Variables section)

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

```typescript
// Fetch all streams
const streams = await cosmic.objects
  .find({ type: 'streams' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Create a new stream
const newStream = await cosmic.objects.insertOne({
  title: 'My Live Stream',
  type: 'streams',
  metadata: {
    description: 'Stream description',
    mux_stream_key: streamKey,
    mux_playback_id: playbackId,
    status: 'scheduled'
  }
})

// Update stream status
await cosmic.objects.updateOne(streamId, {
  metadata: {
    status: 'live'
  }
})
```

## Cosmic CMS Integration

This application integrates with Cosmic CMS to manage:

- **Stream Metadata** - Titles, descriptions, and settings
- **Stream Analytics** - Viewer metrics and performance data
- **User Content** - Stream schedules and configurations
- **Real-time Updates** - Stream status and live information

The content structure includes streams with metadata for Mux integration, enabling seamless video streaming management.

## Deployment

Deploy to Vercel, Netlify, or your preferred hosting platform. Make sure to configure your environment variables in your deployment platform's settings.

For Vercel:
1. Connect your repository
2. Configure environment variables in the dashboard
3. Deploy automatically on push to main branch

<!-- README_END -->