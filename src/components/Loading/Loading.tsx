const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    S
      <p className="mt-4 text-gray-700 text-lg font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}

export default Loading;
