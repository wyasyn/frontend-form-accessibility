import { Toaster } from "@/components/ui/toaster";
import { MainItem } from "./components/formItem";

function App() {
    return (
        <>
            <main className="grid place-items-center min-h-dvh w-full">
                <MainItem />
            </main>

            <Toaster />
        </>
    );
}

export default App;
