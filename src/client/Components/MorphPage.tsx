import React from "react";
import { RouteComponentProps } from "react-router-dom";

export default class MorphPage extends React.Component<
  IMorphProps,
  IMorphState
> {
  constructor(props: IMorphProps) {
    super(props);
    this.props.match.params.name;

    this.state = {
      snake: []
    };
  }

  async componentWillMount() {
    let r = await fetch(`/api/morphs/${this.props.match.params.name}`);
    let snake = await r.json();
    this.setState({ snake });
    console.log(snake);
  }

  render() {
    return (
      <>
        <div className="container morph-container">
          {this.state.snake.map(snek => {
            return (
              <>
                <h1>{snek.Name}</h1>
                <img src={snek.URL} />
                {snek.Description !== null && <p>{snek.Description}</p>}
                <p>1st Gene: "{snek.Gene1}"</p>
                {snek.Gene2 !== null && <p>2nd Gene: "{snek.Gene2}"</p>}
                {snek.Gene3 !== null && <p>3rd Gene: "{snek.Gene3}"</p>}
                {snek.Gene4 !== null && <p>4th Gene: "{snek.Gene4}"</p>}
                {snek.Gene5 !== null && <p>5th Gene: "{snek.Gene5}"</p>}
                {snek.Gene6 !== null && <p>6th Gene: "{snek.Gene6}"</p>}
              </>
            );
          })}
        </div>
      </>
    );
  }
}

interface IMorphProps extends RouteComponentProps<{ name: string }> {}

interface IMorphState {
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