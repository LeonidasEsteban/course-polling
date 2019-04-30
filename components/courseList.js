import { Component } from 'react'
import Card from '@material-ui/core/Card';
import styled from 'styled-components'

const Course = styled.div`
  /* margin: 10px; */
  /* display: inline-flex; */
  /* border: 1px solid rgba(0,0,0,.2); */
  padding: 10px;
  /* border-radius: 5px; */
`

class CourseList extends Component {
  render() {
    console.log(this.props.list)
    return (
      <>
        {
          this.props.list.map(course => (
            <Card>
              <Course>
                <h3>
                  {course.title}
                </h3>
                <h4>
                  {course.description}
                </h4>
                <ul>
                  <li>
                    {
                      course.sections.map((section, index) => (
                        <li key={index}>
                          {section.title}
                          {section.description}
                        </li>
                      ))
                    }
                  </li>
                </ul>
              </Course>
            </Card>
          ))
        }
      </>
    )
  }
}

export default CourseList