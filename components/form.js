import { Component, createRef } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const styles = {
  card: {
    maxWidth: 500,
  }
}

function Section() {
  return (
    <>
      <FormGroup>
        <TextField variant="outlined" name="section-title" margin="normal" label="Title" />
        <TextField variant="outlined" name="section-description" margin="normal" label="Description" />
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
      // const data = await response.json()
      console.log(await response.text())
    }
  }
  form = createRef()
  render() {
    return (
      <Paper>
        <Card className={this.props.classes.card}>
          <CardContent>
            <form onSubmit={this.handleSubmit} ref={this.form} method="POST">
              <FormControl>
                <CardHeader title={<h2>Course proposal</h2>} />
                <TextField
                  name="title"
                  variant="outlined"
                  label="Title"
                  margin="normal"
                />
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  margin="normal"
                />
                <Divider variant="middle" />
                <div>
                  <h2>Syllabus</h2>
                </div>
                {
                  this.state.sectionList.map(() => <Section/>)
                }
                <Button variant="contained" color="primary" onClick={this.onClickAdd}>Add section</Button>
                <div>
                  <Button type="submit" variant="contained" color="primary">Send Course</Button>
                </div>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Paper>
    )
  }
}


export default withStyles(styles)(Form)