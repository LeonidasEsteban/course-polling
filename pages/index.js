
import { Component } from 'react'
import styled from 'styled-components'

import Form from '../components/form'
import Sidebar from '../components/sidebar'
const Layout = styled.div`
  display: grid;
  border: 1px solid red;
  grid-template-areas: 'header header'
  'map map';
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
  // static getInitialProps({ req }) {
  //   return {
  //     apiKey: req.api_key
  //   }
  // }
  render() {
    return (
      <Layout>
        <header className="header-container">
          Create a Course Syllabus
        </header>
        <div className="map-container">
          <Form />
        </div>
      </Layout>
    )
  }
}

export default Home