import React, { useState } from 'react';
import { Modal, Form, Button, Input, Select, Divider } from 'antd';
import { IArtsyArtwork, TExhibit } from './Types'
// import { TExhibits } from '../../stores/App/Types'
// import moment from 'moment';
import './styles.scss'

import ExhibitActions from '../../actions/ExhibitActions'
import Exhibit from '../Exhibit/Exhibit';
import { ConsoleSqlOutlined } from '@ant-design/icons';

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
    const [exhibitData, setExhibitData] = useState<TExhibit[] | undefined>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (selectedValue:any) => {
        setSelectedValue(selectedValue)
    }
    


    async function handleSubmit(e:any) {
        // setLoading(true);
        e.preventDefault();
        let exhibitId = form.getFieldValue('exhibitSelect')
        let foundExhibitId = props.exhibits?.map((exhibit) => (exhibit.id))
        // TODO - the above return an array of exhibit IDs - we'll need to make sure we're matching
        // the value of each index to the selected value so we can properly update/add artwork
        // to the specific exhibit
        console.log('this returns an array of exhibit IDs', foundExhibitId);
        // if (exhibitId !== foundExhibitId) {
        //     let values = await form.getFieldsValue(['title','description','artwork_ids']);
        //     await ExhibitActions.saveExhibit(values)
        //     console.log('submitted values', values)
        // } else if (exhibitId === foundExhibitId) {
        //     let values = await form.getFieldsValue(['exhibitSelect', 'artwork_ids'])
        //     await ExhibitActions.saveExhibit(values)
        //     console.log('submitted values', values)
        // }

        // let values = await form.getFieldsValue(['exhibitSelect', 'title','description','artwork_ids']);
        // await ExhibitActions.saveExhibit(values)
        // console.log('submitted values', values)
        setShow(false);
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
          </Form>
          <div className="modal-art-container">
            <Button type="primary" className="modal-art-container-btn" onClick={handleSubmit} htmlType="submit">SUBMIT</Button>
            <Button className="modal-art-container-btn" onClick={handleClose}>CANCEL</Button>
          </div>
    </Modal>
    </div>
  );
}