import axios from 'axios';
import { Question } from '../types/index';

const API_URL = 'https://opentdb.com/api.php?amount=10';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchQuestion = async (): Promise<Question> => {


  let response;
  try {
    response = await axios.get(API_URL);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      console.warn('Rate limit exceeded, retrying in 5 seconds...');
      await delay(5000);
      return fetchQuestion();
    } else {
      throw error;
    }
  }
  return response.data.results[0];
};
