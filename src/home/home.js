import NavigationBar from "./navbar"
import "./home.css"
import Config from "./config"
const Home = () => {

    return(
        <div className= "homeContainer">
        <NavigationBar></NavigationBar>
        <Config></Config>
        </div>
    )
}

export default Home