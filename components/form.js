import { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


function Section() {
  return (
    <>
      <FormGroup>
        <Input name="section-title" placeholder="Título" />
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
  render() {
    return (
      <div>
        <FormControl>
          <Input name="title" placeholder="Título" />
          <div>
            <h2>Syllabus</h2>
          </div>
          {
            this.state.sectionList.map(() => <Section/>)
          }
          <Button onClick={this.onClickAdd}>Agregar Sección</Button>
        </FormControl>
      </div>
    )
  }
}


export default Form