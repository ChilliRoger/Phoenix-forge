export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-red-500 font-mono text-sm">INITIALIZING PHOENIX FORGE...</p>
      </div>
    </div>
  );
}
