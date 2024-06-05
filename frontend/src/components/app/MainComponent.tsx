import Navbar from "./Navbar"

function MainComponent({ children }): JSX.Element {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  )
}

export default MainComponent