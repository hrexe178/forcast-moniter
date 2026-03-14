# Forecast Monitoring Web Application

Production-ready dashboard for monitoring and analyzing UK Wind Generation vs Forecasts using BMRS Elexon API.

## Architecture

- **Frontend**: Next.js (App Router), TailwindCSS, Recharts, Lucide React.
- **Backend**: Node.js, Express, Axios (Data Fetching), Luxon (Time conversion).
- **Data Source**: BMRS Elexon API v1 (FUELHH for actuals, WINDFOR for forecasts).

## Project Structure

```text
/forecast-monitor-app
    /frontend        - Next.js Web App
    /backend         - Express API Server
    /analysis        - Jupyter Notebook for Wind Data Analysis
```

## Features

- **Dynamic Forecasting**: Select "Forecast Horizon" (0-48h) to see historical forecast accuracy.
- **Merged View**: Automatically aligns actual and forecast values by Target Time (UTC).
- **Interactive Charts**: Line charts comparing Actual (Blue) vs Forecast (Green).
- **Data Range Selection**: Filter January 2024 data by start and end times.
- **Error Analysis**: Built-in metrics for average generation.

## Setup Instructions

### 1. Backend

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
   The backend runs on `http://localhost:5000`.

### 2. Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:3000`. Open it in your browser.

## Deployment

- **Frontend**: Deploy to Vercel. 
  - Ensure `NEXT_PUBLIC_API_URL` environment variable points to your deployed backend.
- **Backend**: Deploy to Render or Heroku.
  - Set `PORT` environment variable.

## AI Tools Used

- **Antigravity AI (Google Deepmind)**: For code generation, architectural design, and documentation.

## Analysis Notebook

The `/analysis/wind_analysis.ipynb` contains:
- **Forecast Error Analysis**: MAE, Median, P99, error correlation with horizon/time.
- **Wind Reliability Analysis**: Percentile generation, minimum dependable capacity.
