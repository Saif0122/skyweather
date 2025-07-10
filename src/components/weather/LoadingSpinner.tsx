
export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
          <p className="text-white">Fetching weather data...</p>
        </div>
      </div>
    </div>
  );
};
