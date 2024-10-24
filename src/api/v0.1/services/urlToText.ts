import axios from "axios";
import { convert } from "html-to-text";

// fetch HTML content from a URL
async function fetchHTML(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Unable to fetch HTML content from ${url}: ${error}`);
  }
}

export default async function extractTextFromURL(url: string) {
  try {
    const html = await fetchHTML(url);
    const text = convert(html, {
      wordwrap: 130,
    });
    return text;
  } catch (error) {
    console.error(error);
  }
}

// const url = 'https://stcet.ac.in';
// extractTextFromURL(url)
//     .then(text => console.log(text))
//     .catch(error => console.error(error));
