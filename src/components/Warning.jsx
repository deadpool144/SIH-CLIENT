const ServerWarning = () => {
  return (
    <div className="bg-amber-800 bg-opacity-30 border border-amber-700 rounded-lg p-4 w-11/12 max-w-6xl mx-auto my-6 text-center text-white shadow-md backdrop-blur-sm">
      <p className="font-bold text-xl mb-1">Development Notice:</p>
      <p className="text-base">
        This application is in its development phase. It uses a free server, which may take up to a minute to start after a period of inactivity. Thank you for your patience!
      </p>
    </div>
  );
};

export default ServerWarning;
