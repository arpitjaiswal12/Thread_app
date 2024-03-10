import "./App.css";
import Bottombar from "./components/Bottombar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Topbar from "./components/Topbar";
// import Home from "./pages/Home";

function App() {
  return (
    <>
      <Topbar />

      <main>
        <LeftSidebar />
        <section className=" bg-black">
          <div className=" w-full max-w-4xl">
            {/* <Home/> */}
          </div>
        </section>
        <RightSidebar />
      </main>
      <Bottombar/>
    </>
  );
}

export default App;
