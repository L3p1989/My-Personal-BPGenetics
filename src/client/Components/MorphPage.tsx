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
  }

  render() {
    return (
      <>
        <div className="container morph-container">
          <button className="edit-snek btn-secondary">Edit Morph</button>
          <button className="delete-snek btn-secondary">Delete Morph</button>
          {this.state.snake.map(snek => {
            return (
              <>
                <h1 className="covalence-blue">{snek.Name}</h1>
                <img className="snake-pic rounded" src={snek.URL} />
                {snek.Description !== null && (
                  <p>
                    <u className="bold">Description:</u> {snek.Description}
                  </p>
                )}
                <p>
                  {snek.GeneType1}: "{snek.Gene1}"
                </p>
                {snek.Gene2 !== null && (
                  <p>
                    {snek.GeneType2}: "{snek.Gene2}"
                  </p>
                )}
                {snek.Gene3 !== null && (
                  <p>
                    {snek.GeneType3}: "{snek.Gene3}"
                  </p>
                )}
                {snek.Gene4 !== null && (
                  <p>
                    {snek.GeneType4}: "{snek.Gene4}"
                  </p>
                )}
                {snek.Gene5 !== null && (
                  <p>
                    {snek.GeneType5}: "{snek.Gene5}"
                  </p>
                )}
                {snek.Gene6 !== null && (
                  <p>
                    {snek.GeneType6}: "{snek.Gene6}"
                  </p>
                )}
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
    GeneType1: string;
    Gene1: string;
    GeneType2: string;
    Gene2: string;
    GeneType3: string;
    Gene3: string;
    GeneType4: string;
    Gene4: string;
    GeneType5: string;
    Gene5: string;
    GeneType6: string;
    Gene6: string;
    URL: string;
  }>;
}
