import axios from 'axios';

const API_BASE_URL = '/api';

export interface MergedData {
    targetTime: string;
    actual: number;
    forecast: number;
    horizon: number;
}

export const fetchMergedData = async (horizon: number, start?: string, end?: string): Promise<MergedData[]> => {
    const response = await axios.get(`${API_BASE_URL}/merged-data`, {
        params: { horizon, start, end }
    });
    return response.data;
};

export const fetchActualData = async () => {
    const response = await axios.get(`${API_BASE_URL}/actual-data`);
    return response.data;
};

export const fetchForecastData = async () => {
    const response = await axios.get(`${API_BASE_URL}/forecast-data`);
    return response.data;
};
