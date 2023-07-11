import { WindowButton } from "./components/Window-Button";

function App() {
  return (
    <main className="bg-slate-500 h-screen flex items-center justify-center text-gray-100">
      {/* className="bg-slate-500 w-4/5 h-1/2 " */}
      <div className="bg-slate-900 w-4/5 h-4/5 items-center p-2 rounded-md" >
        <div className="flex gap-1">
          <WindowButton color="#ed6a5e" />
          <WindowButton color="#f4bf4f" />
          <WindowButton color="#61c554" />
        </div>

        <h1>VIDEO PLAYER</h1>
      </div>
    </main>
  );
}

export default App;
