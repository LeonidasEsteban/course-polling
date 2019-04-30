import { Component } from 'react'
import Card from '@material-ui/core/Card';
import styled from 'styled-components'
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

const Course = styled.div`
  /* margin: 10px; */
  /* display: inline-flex; */
  /* border: 1px solid rgba(0,0,0,.2); */
  padding: 10px;
  /* border-radius: 5px; */
`

class CourseList extends Component {
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }
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
                <CardActions>
                  <IconButton color="primary">
                    <Icon className="fa fa-star" fontSize="large"/>
                  </IconButton>
                </CardActions>
              </Course>
            </Card>
          ))
        }
      </>
    )
  }
}

export default CourseList