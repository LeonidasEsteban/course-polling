import { Component, createRef } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


function Section() {
  return (
    <>
      <FormGroup>
        <Input name="section-title" placeholder="Title" />
        <Input name="section-description" placeholder="Description" />
      </FormGroup>
    </>
  )
}

class Form extends Component {
  state = {
    sectionList: [1]
  }
  onClickAdd = () => {
    const list = this.state.sectionList
    list.push(1)
    this.setState({
      sectionList: list
    })
  }
  handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(this.form.current)
    const sections = []
    form.getAll('section-title').forEach((title, i)=> sections[i] = {title})
    form.getAll('section-description').forEach((description, i)=> sections[i] = {...sections[i], description})
    const body = {
      title: form.get('title'),
      description: form.get('description'),
      sections,
      userName: 'userTest',
    }
    console.log(body)
    const response = await fetch('/courses', {
      method: 'POST',
      body: JSON.stringify(body),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(response.status === 200) {
      const data = await response.json()
      console.log(data)
    }
  }
  form = createRef()
  render() {
    return (
      <form onSubmit={this.handleSubmit} ref={this.form} method="POST">
        <FormControl>
          <h1>Course proposal</h1>
          <Input name="title" placeholder="Title" />
          <Input name="description" placeholder="Description" />
          <div>
            <h2>Syllabus</h2>
          </div>
          {
            this.state.sectionList.map(() => <Section/>)
          }
          <Button onClick={this.onClickAdd}>Agregar Sección</Button>
          <Input type="submit" value="Send Course"/>
        </FormControl>
      </form>
    )
  }
}


export default Form