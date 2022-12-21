import React,{useEffect,useState,useContext} from "react";
import {Form,Button,Radio,Select,DatePicker,InputNumber} from 'antd';
import {useLocation} from "react-router-dom";
import { DataContext } from '../App'
import axios from 'axios'

const FormComponent = () => {
    const {EducationCategory,MaritalSatusCategory} = useContext(DataContext)
    const [getData,setData] = useState({})
    let location = useLocation()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          // Send Axios request here
        }, 3000)
        return () => clearTimeout(delayDebounceFn)
      }, [getData])

    // helper functions
    const onFinish = () => {
        console.log(getData)
        axios.post(' http://localhost:5000/logistic',getData).then(response => {
            console.log(response)
        }).catch(error => {
          console.warn(error)
        })
    }

    const handleEducation = (e) => {
       const dict = {'Basic':0, '2n Cycle':1, 'Graduation':2, 'Master':3,'PhD':4}
       for (let value in dict){
        if(value===e){
            setData({...getData,Education:dict[e]})
        }
       } 
    }

    const handleMaritalStatus = (e) => {
        const dict = {'Single':0, 'Together':1, 'Married':2, 'Divorced':3, 'Widow':4, 'Alone':5,
        'Absurd':6, 'YOLO':7}
        for (let value in dict){
         if(value===e){
             setData({...getData,Marital_Status:dict[e]})
         }
        } 
     }

    return (
        <Form onFinish={onFinish} layout="horizontal" style={{maxHeight:'80vh',width:'40%',display: 'flex',flexDirection: 'column',alignItems: 'stretch'}}>
            <Form.Item  label={<span style={{ color: "white" }}>Select Birth Year : </span>}>
                <DatePicker onChange={(e) => setData({...getData,Year_Birth : e.$d.getFullYear(),algorithm:location.pathname})} />
            </Form.Item>
            <Form.Item label={<span style={{ color: "white" }}>Select Education : </span>}>
                <Select onChange={(e) => handleEducation(e)}>
                    {EducationCategory.map((option,index)=>{
                        return (
                            <Select.Option size='small' name='Education'  key={'education'+index} value={option}>{option}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item label={<span style={{ color: "white" }}>Select Marital Status : </span>}>
                <Select onChange={(e) => handleMaritalStatus(e)}>
                    {MaritalSatusCategory.map((option,index)=>{
                        return (
                            <Select.Option name='Marital_Status'  key={'marital'+index} value={option}>{option}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Income : </span>}>
                <InputNumber  onChange={(e) => setData({...getData,Income:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Days since last Purchase : </span>}>
                <InputNumber onChange={(e) => setData({...getData,Recency:e})} />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Amount spend on wines : </span>}>
                <InputNumber onChange={(e) => setData({...getData,MntWines:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Amount spend on fruits : </span>}>
                <InputNumber onChange={(e) => setData({...getData,MntFruits:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Amount spend on meat : </span>}>
                <InputNumber onChange={(e) => setData({...getData,MntMeatProducts:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Amount spend on fish : </span>}>
                <InputNumber onChange={(e) => setData({...getData,MntFishProducts:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Amount spend on sweet : </span>}>
                <InputNumber onChange={(e) => setData({...getData,MntSweetProducts:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Amount spend on gold : </span>}>
                <InputNumber onChange={(e) => setData({...getData,MntGoldProds:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Deal made with discount : </span>}>
                <InputNumber onChange={(e) => setData({...getData,NumDealsPurchases:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Purchases through company’s website : </span>}>
                <InputNumber onChange={(e) => setData({...getData,NumWebPurchases:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Purchases using catalogue : </span>}>
                <InputNumber onChange={(e) => setData({...getData,NumCatalogPurchases:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Purchases made directly stores : </span>}>
                <InputNumber onChange={(e) => setData({...getData,NumStorePurchases:e})}/>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Customer accepted offer 3rd campaign : </span>}>
                <Radio.Group onChange={(e) => setData({...getData,AcceptedCmp3:Number(e.target.value)})}>
                <Radio value="0"> 0 </Radio>
                <Radio value="1"> 1 </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Customer accepted offer 4th campaign : </span>}>
                <Radio.Group onChange={(e) => setData({...getData,AcceptedCmp4:Number(e.target.value)})}>
                <Radio value="0"> 0 </Radio>
                <Radio value="1"> 1 </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item  rules={[{ required: true }]} label={<span style={{ color: "white" }}>Customer accepted offer 5th campaign : </span>}>
                <Radio.Group onChange={(e) => setData({...getData,AcceptedCmp5:Number(e.target.value)})}>
                <Radio value="0"> 0 </Radio>
                <Radio value="1"> 1 </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Customer accepted offer 1st campaign : </span>}>
                <Radio.Group onChange={(e) => setData({...getData,AcceptedCmp1:Number(e.target.value)})}>
                <Radio value="0"> 0 </Radio>
                <Radio value="1"> 1 </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Customer accepted offer 2st campaign : </span>}>
                <Radio.Group onChange={(e) => setData({...getData,AcceptedCmp2:Number(e.target.value)})}>
                <Radio value="0"> 0 </Radio>
                <Radio value="1"> 1 </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Complain raised in past : </span>}>
                <Radio.Group onChange={(e) => setData({...getData,Complain:Number(e.target.value)})}>
                <Radio value="0"> 0 </Radio>
                <Radio value="1"> 1 </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label={<span style={{ color: "white" }}>Number of childrens : </span>}>
                <InputNumber onChange={(e) => setData({...getData,Childrens:e})}/>
            </Form.Item>
            <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormComponent