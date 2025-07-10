
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react";

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

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  const getWeatherIcon = (iconCode: string, weatherMain: string) => {
    const main = weatherMain.toLowerCase();
    
    if (main.includes('clear')) {
      return <Sun className="h-16 w-16 text-yellow-300" />;
    } else if (main.includes('rain')) {
      return <CloudRain className="h-16 w-16 text-blue-300" />;
    } else if (main.includes('cloud')) {
      return <Cloud className="h-16 w-16 text-gray-300" />;
    } else {
      return <Sun className="h-16 w-16 text-yellow-300" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl animate-fade-in">
      {/* Main Weather Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">
          {weather.city}, {weather.country}
        </h2>
        
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(weather.icon, weather.weatherMain)}
        </div>
        
        <div className="text-5xl font-bold text-white mb-2">
          {weather.temperature}°C
        </div>
        
        <p className="text-white/80 text-lg capitalize">
          {weather.description}
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Thermometer className="h-6 w-6 text-white/70 mx-auto mb-2" />
          <p className="text-white/60 text-sm">Feels like</p>
          <p className="text-white font-semibold">{weather.feelsLike}°C</p>
        </div>
        
        <div className="text-center">
          <Droplets className="h-6 w-6 text-white/70 mx-auto mb-2" />
          <p className="text-white/60 text-sm">Humidity</p>
          <p className="text-white font-semibold">{weather.humidity}%</p>
        </div>
        
        <div className="text-center">
          <Wind className="h-6 w-6 text-white/70 mx-auto mb-2" />
          <p className="text-white/60 text-sm">Wind</p>
          <p className="text-white font-semibold">{weather.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};
