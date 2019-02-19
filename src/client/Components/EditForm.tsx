import React from "react";

class EditForm extends React.Component<IEditFormProps, IEditFormState> {
  constructor(props: IEditFormProps) {
    super(props);
    this.state = {
      basicCombos: [],
      snake: []
    };
  }

  async componentDidMount() {
    let r = await fetch("/api/basicmorphs");
    let basicCombos = await r.json();
    this.setState({ basicCombos });
    let r2 = await fetch(`/api/morphs/${this.props.name}`);
    let snake = await r2.json();
    this.setState({ snake });
  }

  async handleUpdate() {
    //logic to save an edit
    //await fetch('/api/morphs', {
    //method: 'PUT',
    //headers: {
    //"Content-type": "application/json"
    //},
    //body: JSON.stringify(body)
    //});
    // this.props.history.push('/morphs');
  }

  renderSnekTest() {
    return this.state.basicCombos.map(basicCombo => {
      if (basicCombo.Name === this.props.name) {
        return <option selected value={basicCombo.ID}>{basicCombo.Name}</option>;
      } else {
        return <option value={basicCombo.ID}>{basicCombo.Name}</option>;
      }
    })
  }

  render() {

    return (
      <>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.snake.map(snake => {
                return snake.Name;
              })}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              value={this.state.snake.map(snake => {
                return snake.Description;
              })}
            />
          </div>
          <div className="form-group">
            <label>Gene1</label>
            <select className="form-control">
              {this.renderSnekTest()}
            </select>
          </div>
          <div className="form-group">
            <label>Gene2</label>
            <select className="form-control">
              <option selected>
                {this.state.snake.map(snake => {
                  return snake.Gene2;
                })}
              </option>
              {this.state.basicCombos.map(basicCombo => {
                return <option>{basicCombo.Name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene3</label>
            <select className="form-control">
              <option selected>
                {this.state.snake.map(snake => {
                  return snake.Gene3;
                })}
              </option>
              {this.state.basicCombos.map(basicCombo => {
                return <option>{basicCombo.Name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene4</label>
            <select className="form-control">
              <option selected>
                {this.state.snake.map(snake => {
                  return snake.Gene4;
                })}
              </option>
              {this.state.basicCombos.map(basicCombo => {
                return <option>{basicCombo.Name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene5</label>
            <select className="form-control">
              <option selected>
                {this.state.snake.map(snake => {
                  return snake.Gene5;
                })}
              </option>
              {this.state.basicCombos.map(basicCombo => {
                return <option>{basicCombo.Name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene6</label>
            <select className="form-control">
              <option selected>
                {this.state.snake.map(snake => {
                  return snake.Gene6;
                })}
              </option>
              {this.state.basicCombos.map(basicCombo => {
                return <option>{basicCombo.Name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Picture URL</label>
            <input
              type="text"
              className="form-control"
              value={this.state.snake.map(snake => {
                return snake.URL;
              })}
            />
          </div>
          <button className="save-btn">Save</button>
        </form>
      </>
    );
  }
}

interface IEditFormProps {
  name: string;
}

interface IEditFormState {
  basicCombos: Array<{
    ID: number;
    Name: string;
  }>;
  snake: Array<{
    Name: string;
    Description: string;
    Gene1: string;
    Gene2: string;
    Gene3: string;
    Gene4: string;
    Gene5: string;
    Gene6: string;
    URL: string;
  }>;
}

export default EditForm;
