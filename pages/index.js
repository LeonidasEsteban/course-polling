
import { Component } from 'react'
import styled from 'styled-components'

import MyCityMap from '../components/map'
import Sidebar from '../components/sidebar'
const Layout = styled.div`
  display: grid;
  border: 1px solid red;
  grid-template-areas: 'header header'
  'sidebar map';
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr;
  height: 100vh;
  .map-container {
    position: relative;
    grid-area: map;
  }
  .header-container {
    grid-area: header;
  }
`

class Home extends Component {
  static getInitialProps({ req }) {
    return {
      apiKey: req.api_key
    }
  }
  render() {
    return (
      <Layout>
        <header className="header-container">
          header
        </header>
        <Sidebar />
        <div className="map-container">
          <MyCityMap apiKey={this.props.apiKey} />
        </div>
      </Layout>
    )
  }
}

export default Home