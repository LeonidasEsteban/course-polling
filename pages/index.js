
import { Component } from 'react'
import styled from 'styled-components'
import Form from '../components/form'
import CourseList from '../components/courseList'
import 'isomorphic-fetch'

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'header header'
  'form courses';
  grid-template-columns: 500px 1fr;
  grid-template-rows: 50px 1fr;
  height: 100vh;
  font-family: system-ui;
  .map-container {
    position: relative;
    grid-area: map;
  }
  .header-container {
    grid-area: header;
    background: gray;
    color: white;
  }
`

class Home extends Component {
  static async getInitialProps() {
    const response = await fetch('http://localhost:3000/courses')
    const data = await response.json()
    console.log(data)
    return {
      courses: data
    }
  }
  render() {
    return (
      <Layout>
        <header className="header-container">
          Create a Course Syllabus
        </header>
        <div className="form-container">
          <Form />
        </div>
        <div className="courseList-container">
          <CourseList list={this.props.courses} />
        </div>
      </Layout>
    )
  }
}

export default Home