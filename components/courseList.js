import { Component } from 'react'

class CourseList extends Component {
  async componentDidMount() {
    const response = await fetch('http://localhost:3000/courses')
    const data = await response.json()
    console.log(data)
    // return {
    //   courses: data
    // }
  }
  render() {
    console.log(this.props.list)
    return (
      <div>
        asdsafa
        {
          this.props.list.map(el => (<div>jejej</div>))
        }
      </div>
    )
  }
}

export default CourseList