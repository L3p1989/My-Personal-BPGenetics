import * as React from "react";

export default class HomePage extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  constructor(props: IHomePageProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container hp-container">
        <h1 className="covalence-blue">My Ball Python Genetics</h1>
        <p>
          Welcome to "<u className="page-title">My Ball Python Genetics</u>"!
        </p>
        <h2>Gene Types</h2>
        <p>
          This section will show you what the Gene Types actually mean when they
          say they are dominant, co-dominant, etc.
        </p>
        <h2>Basics</h2>
        <p>
          This section overviews the basic morph genes that go into designer
          morphs
        </p>
        <h2>Morphs</h2>
        <p>
          This will show you all the basic morphs plus whatever combinations
          they can make into designer morphs
        </p>
        <p className="disclaimer">
          all material for this lab was taken from{" "}
          <a href="http://www.worldofballpythons.com">World of Ball Pythons</a>
        </p>
      </div>
    );
  }
}

interface IHomePageProps {}

interface IHomePageState {}
