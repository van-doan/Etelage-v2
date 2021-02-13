import React, { useState } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { IArtsyArtwork } from './Types'
// import moment from 'moment';

interface Props {
    data: IArtsyArtwork,
}

export default (props:Props) => {
  const [showModal, setShow] = useState(false);
  const [user, setUserId] = useState();
  const [addExhibit, setNewExhibit] = useState({
    exhibition_id: null,
    title: '',
    description: '',
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const handleChange = (event:any) => {
//     setNewExhibit({...addExhibit, [event.target.name]: event.target.value})
//   }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // if (addExhibit.exhibition_id === null) {
    //   API.addArtToExhibit({user_id: user, title: addExhibit.title, description: addExhibit.description})
    // } else {
    //   API.editExhibit({user_id: user, title: addExhibit.title, description: addExhibit.description})
    // }
  }

  if(!props.data) return null
  const getLargeImage = () =>  {
    let url = props.data._links.thumbnail.href
    return url.replace("square", "large")
  }
  return (
    <div className="explore-div">
      <input type="image" className="explore-img" alt="" onClick={handleShow} src={getLargeImage()} />
            <div className="explore-overlay">
            <div className="explore-desc">
                <h3 className="explore-title">{props.data.title}</h3>
                <p className="explore-dates">{props.data.description}</p>
            </div>
        </div>
    <Modal 
        visible={showModal} 
        onOk={handleClose}
        onCancel={handleClose}>
          New Art For Your Latest Exhibit?
          <h3 className="modal-art-title">{props.data.title}</h3>
          <p className="modal-art-desc">{props.data.description}</p>
          <Form
            className="modal-art-form">
                <Form.Item rules={[{required: true}]}
                    label="Title"
                    name="title"
                    //   value={addExhibit.title}
                >
                </Form.Item>
                    <Input type="text" allowClear placeholder="Exhibit Title" />
                    {/* onChange={handleChange} to be place above ^ */}
                <Form.Item 
                    rules={[{required: true}]}
                    label="Description"
                    name="description"
                    //   value={addExhibit.title}
                >
                    <Input type="text" allowClear placeholder="Exhibit Description" />
                    {/* onChange={handleChange} to be placed above ^ */}
                </Form.Item>
          </Form>
          <Button onClick={handleSubmit} formMethod="POST">SUBMIT</Button>
          <Button onClick={handleClose}>CANCEL</Button>
    </Modal>
    </div>
  );
}