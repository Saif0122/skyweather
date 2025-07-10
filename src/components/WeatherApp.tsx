
import { useState, useEffect } from "react";
import { SearchBar } from "./weather/SearchBar";
import { WeatherDisplay } from "./weather/WeatherDisplay";
import { ErrorMessage } from "./weather/ErrorMessage";
import { LoadingSpinner } from "./weather/LoadingSpinner";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  weatherMain: string;
}

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backgroundClass, setBackgroundClass] = useState("bg-gradient-to-br from-blue-400 to-blue-600");

  const API_KEY = "demo_key"; // Users will need to replace with their own API key

  const getWeatherBackground = (weatherMain: string, description: string) => {
    const weather = weatherMain.toLowerCase();
    const desc = description.toLowerCase();
    
    if (weather.includes('clear') || desc.includes('clear')) {
      return "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400";
    } else if (weather.includes('rain') || desc.includes('rain')) {
      return "bg-gradient-to-br from-gray-600 via-blue-600 to-blue-800";
    } else if (weather.includes('cloud') || desc.includes('cloud')) {
      return "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600";
    } else if (weather.includes('snow') || desc.includes('snow')) {
      return "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500";
    } else if (weather.includes('storm') || weather.includes('thunder')) {
      return "bg-gradient-to-br from-gray-800 via-purple-800 to-black";
    } else {
      return "bg-gradient-to-br from-blue-400 to-blue-600";
    }
  };

  const fetchWeather = async (city: string) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Note: This is a demo implementation. Users need to get their own API key from OpenWeatherMap
      if (API_KEY === "demo_key") {
        // Demo data for when no API key is available
        setTimeout(() => {
          const demoData: WeatherData = {
            city: city,
            country: "Demo",
            temperature: 22,
            description: "Clear sky",
            icon: "01d",
            humidity: 65,
            windSpeed: 3.5,
            feelsLike: 24,
            weatherMain: "Clear"
          };
          setWeatherData(demoData);
          setBackgroundClass(getWeatherBackground(demoData.weatherMain, demoData.description));
          setLoading(false);
          localStorage.setItem('lastSearchedCity', city);
        }, 1000);
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      const weatherInfo: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: Math.round(data.main.feels_like),
        weatherMain: data.weather[0].main
      };
      
      setWeatherData(weatherInfo);
      setBackgroundClass(getWeatherBackground(weatherInfo.weatherMain, weatherInfo.description));
      localStorage.setItem('lastSearchedCity', city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${backgroundClass} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            SkyCast
          </h1>
          <p className="text-white/80 text-lg">Live Weather Forecast</p>
        </div>

        {/* Search */}
        <SearchBar onSearch={fetchWeather} loading={loading} />

        {/* Error Message */}
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Weather Display */}
        {weatherData && !loading && (
          <WeatherDisplay weather={weatherData} />
        )}

        {/* API Key Notice */}
        {API_KEY === "demo_key" && (
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-white/90 text-sm text-center">
              <strong>Demo Mode:</strong> To use real weather data, get a free API key from{" "}
              <a 
                href="https://openweathermap.org/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                OpenWeatherMap
              </a>
              {" "}and replace the API_KEY in the code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
