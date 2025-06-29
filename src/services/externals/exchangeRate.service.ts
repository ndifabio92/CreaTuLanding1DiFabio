import axios from "axios";
import { ExchangeRate } from "../../types/externals/ExchangeRate";

export const getUsdToArsRate = async (): Promise<number | null> => {
  try {
    const response = await axios.get<ExchangeRate>(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    console.log("USD to ARS rate:", response.data.rates.ARS);
    return response.data.rates.ARS;
  } catch (error) {
    console.error("Error fetching USD to ARS rate:", error);
    return null;
  }
};
