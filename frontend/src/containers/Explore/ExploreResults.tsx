import React, { useState } from 'react';
import { Modal, Form, Button, Input, Select, Divider, message } from 'antd';
import { IArtsyArtwork } from './Types'
import { TExhibit } from '../../stores/App/Types'
import AppStore from '../../stores/App/AppStore'
// import { TExhibits } from '../../stores/App/Types'
// import moment from 'moment';
import './styles.scss'

import ExhibitActions from '../../actions/ExhibitActions'
// import Exhibit from '../Exhibit/Exhibit';

const { Option, OptGroup } = Select;

interface Props {
    data: IArtsyArtwork,
    exhibits?: TExhibit[],
}

export default (props:Props) => {
    const [form] = Form.useForm();
    // const [loading, setLoading] = useState(false)
    const [showModal, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('newExhibit');
    // const [data, setData] = useState<IArtsyArtwork | undefined>();
    // const [exhibitData, setExhibitData] = useState<TExhibit[] | undefined>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (selectedValue:any) => {
        setSelectedValue(selectedValue)
    }
    const success = () => {message.success('Artwork has been added to your exhibit!', 3)}


    async function handleSubmit(e:any) {
        // setLoading(true);
        e.preventDefault();
        let exhibitId = form.getFieldValue('exhibitSelect')
        console.log('This is the current id selected', exhibitId)
        let foundExhibit = props.exhibits?.filter((exhibit) => (exhibit.id === exhibitId)) 
        // ^ This gives us the array of exhibit ids
            console.log('this returns the foundExhibitId if found in exhibit array', foundExhibit?.[0]);
        if (typeof foundExhibit?.[0] !== 'undefined') {
            let values = await form.getFieldsValue(['artwork_ids'])
            await ExhibitActions.saveExhibit(values, foundExhibit?.[0])
            console.log('Updates Exhibit Values', values)
            setShow(false);
            return success();
        } else {
            let values = await form.getFieldsValue(['title','description','artwork_ids', 'user']);
            await ExhibitActions.saveExhibit(values)
            // , AppStore.user?.id for above ^ ??
            console.log('New Exhibit Values:', values)
            setShow(false);
            return success();
        }
    }

    // TODO: To show exhibits (and its artwork) on the user's dashboard, we'll need to split the
    // artwork strings and put them into an array and access them that way.

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
        className="modal-art-form"
        visible={showModal} 
        footer={null}
        closable={true}
        getContainer={false}
        forceRender={true}
        >
            <Divider>Add to Your Exhibit</Divider>
          <h3 className="modal-art-title">{props.data.title}</h3>
          <p className="modal-art-desc">{props.data.description}</p>
          <Form
            name="exhibit-form"
            form={form}
            className="modal-art-form"
            >
                <Form.Item 
                    rules={[{required: true}]}
                    name="exhibitSelect"
                    initialValue="newExhibit"
                >
                    <Select onChange={handleChange} value={selectedValue}>
                        <Option value="newExhibit">New Exhibit</Option>
                        <OptGroup label="Your Exhibits">
                        {props.exhibits?.map((exhibit) => ( <Option value={exhibit.id}>{exhibit.title}</Option>))}
                        </OptGroup>
                        {/* Existing Exhibit values will need to be replaced by existing user exhibits */}
                    </Select>
                </Form.Item>
                <Divider>Create New Exhibit</Divider>
                <Form.Item 
                    name="title"
                    rules={[{required: true, 
                    message:'Exhibit title required.'}]}
                    label="Exhibit Title"                   
                    //   value={addExhibit.title}
                >                    
                    <Input type="text" 
                        disabled={selectedValue === 'newExhibit' ? false : true } 
                        allowClear 
                        placeholder="Exhibit Title" />
                </Form.Item>
                <Form.Item 
                    name="description"
                    rules={[{required: true, 
                    message:'Exhibit title required.'}]}
                    label="Exhibit Description"
                    //   value={addExhibit.title}
                >
                    <Input type="text" 
                        disabled={selectedValue === 'newExhibit' ? false : true }  
                        allowClear 
                        placeholder="Exhibit Description" />
                </Form.Item>
                <Form.Item
                    name="artwork_ids"
                    initialValue={props.data._links.thumbnail.href}
                    >
                    <Input type="text" style={{visibility: 'hidden'}}/> 
                </Form.Item>
                <Form.Item
                    name="user"
                    initialValue={AppStore.user}
                    hidden
                    >
                    <Input type="text"/> 
                </Form.Item>
          </Form>
          <div className="modal-art-container">
            <Button type="primary" className="modal-art-container-btn" onClick={handleSubmit} htmlType="submit">SUBMIT</Button>
            <Button className="modal-art-container-btn" onClick={handleClose}>CANCEL</Button>
          </div>
    </Modal>
    </div>
  );
}