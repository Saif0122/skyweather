
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pr-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            disabled={loading}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
        </div>
        <Button
          type="submit"
          disabled={loading || !city.trim()}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
        >
          Search
        </Button>
      </div>
    </form>
  );
};
