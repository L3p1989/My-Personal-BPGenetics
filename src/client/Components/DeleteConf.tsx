import React from "react";

class DeleteConf extends React.Component<IDeleteConfProps, IDeleteConfState> {
  constructor(props: IDeleteConfProps) {
    super(props);
    this.state = {};
  }

  async handleDelete() {
    //logic to save an edit
    // this.props.history.push('/morphs');
  }

  render() {
    return (
      <div className="delete-confirm">
        <p>Are you sure you want to delete this morph?</p>
        <button className="save-btn">Yes</button>
        <button className="cancel-btn">No</button>
      </div>
    );
  }
}

interface IDeleteConfProps {
  name: string;
}

interface IDeleteConfState {}

export default DeleteConf;
